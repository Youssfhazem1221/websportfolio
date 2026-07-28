"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useMediaQuery } from "@/lib/useMediaQuery";

/* ------------------------------------------------------------------ *
 *  Pointer — normalized device coords, shared with the scene          *
 * ------------------------------------------------------------------ */

type PointerState = { x: number; y: number; tx: number; ty: number; inside: boolean };

const restingPointer = (): PointerState => ({ x: 0, y: 0, tx: 0, ty: 0, inside: false });

// Attaches listeners only. The ref itself is created by the consuming
// component so the frame loop is allowed to smooth it in place.
function usePointerListeners(ref: React.RefObject<PointerState>) {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const p = ref.current;
      p.tx = (e.clientX / window.innerWidth) * 2 - 1;
      p.ty = -((e.clientY / window.innerHeight) * 2 - 1);
      p.inside = true;
    };
    // Let the field settle back to rest when the cursor leaves the page.
    const onLeave = () => {
      const p = ref.current;
      p.inside = false;
      p.tx = 0;
      p.ty = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [ref]);
}

/* ------------------------------------------------------------------ *
 *  Quality tiers — node count drives the whole frame cost            *
 * ------------------------------------------------------------------ */

type Tier = {
  count: number;
  radius: number;
  linkDist: number;
  maxLinks: number;
  pointSize: number;
  dpr: [number, number];
  antialias: boolean;
};

// linkDist is tuned per tier so each node keeps ~5-6 neighbours regardless of
// density — otherwise the mobile tier reads as loose dust instead of a network.
const DESKTOP: Tier = {
  count: 150,
  radius: 2.4,
  linkDist: 0.95,
  maxLinks: 900,
  // Multiplied by the fit scale at render time: gl_PointSize ignores object
  // scale, so a fixed size would grow relative to a shrunk sphere.
  pointSize: 0.085,
  dpr: [1, 2],
  antialias: true,
};

const MOBILE: Tier = {
  count: 70,
  radius: 2.05,
  linkDist: 1.18,
  maxLinks: 400,
  pointSize: 0.105,
  dpr: [1, 1.5],
  antialias: false,
};

/* ------------------------------------------------------------------ *
 *  Palette — driven by CSS custom properties                          *
 * ------------------------------------------------------------------ */

type Palette = { accent: string; ink: string; paper: string };

const FALLBACK: Palette = { accent: "#1b45e0", ink: "#16151c", paper: "#f4f2ec" };

function readPalette(): Palette {
  if (typeof document === "undefined") return FALLBACK;
  const s = getComputedStyle(document.documentElement);
  const get = (name: keyof Palette, token: string) =>
    s.getPropertyValue(token).trim() || FALLBACK[name];
  return {
    accent: get("accent", "--accent"),
    ink: get("ink", "--ink"),
    paper: get("paper", "--paper"),
  };
}

// Re-reads on <html> attribute changes, so a future theme toggle needs no
// changes in here — the network just picks up the new tokens.
function usePalette(): Palette {
  const [palette, setPalette] = useState<Palette>(readPalette);

  useEffect(() => {
    const update = () => setPalette(readPalette());
    update();
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    });
    return () => mo.disconnect();
  }, []);

  return palette;
}

/* ------------------------------------------------------------------ *
 *  Network                                                            *
 * ------------------------------------------------------------------ */

// Small seeded PRNG so the constellation is identical on every load.
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const REPEL_RADIUS = 1.9; // local units of pointer influence
const REPEL_STRENGTH = 0.5; // max displacement at the cursor

// A round sprite for the nodes. Default gl points are squares, which read as
// pixel artefacts against a light background.
function useDotTexture() {
  const texture = useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const half = size / 2;
    const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.62, "rgba(255,255,255,1)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useEffect(() => () => texture?.dispose(), [texture]);
  return texture;
}

function DataNetwork({
  tier,
  palette,
  animate,
}: {
  tier: Tier;
  palette: Palette;
  animate: boolean;
}) {
  // Created here rather than inside a custom hook: the frame loop smooths it
  // in place, and that is only permitted for a ref built in this component.
  const pointer = useRef<PointerState>(restingPointer());
  usePointerListeners(pointer);

  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { viewport, size } = useThree();
  const dotTexture = useDotTexture();

  // Breakpoint on CSS pixels to match Tailwind's `md:`, not on world units —
  // the old `viewport.width < 7.5` test was true at every realistic window
  // size, so the network never actually moved out of the headline.
  const isNarrow = size.width < 768;

  // Fit the sphere to the column it lives in, rather than letting a fixed
  // radius overflow the viewport and wash over the copy and the nav.
  // On narrow screens the sphere has to fit between the CTA row (~-0.08h) and
  // the canvas floor (-0.5h), so it is sized to that band rather than centred.
  const diameter = isNarrow
    ? Math.min(viewport.height * 0.38, viewport.width * 0.84)
    : Math.min(viewport.height * 0.86, viewport.width * 0.46);
  const scale = diameter / (2 * tier.radius);
  const offsetX = isNarrow ? 0 : viewport.width * 0.25;
  const offsetY = isNarrow ? -viewport.height * 0.27 : 0;

  const colors = useMemo(
    () => ({
      accent: new THREE.Color(palette.accent),
      ink: new THREE.Color(palette.ink),
      paper: new THREE.Color(palette.paper),
    }),
    [palette]
  );

  // Base node positions: Fibonacci sphere for even coverage, plus a little
  // seeded jitter so it reads organic rather than manufactured.
  const base = useMemo(() => {
    const { count, radius } = tier;
    const arr = new Float32Array(count * 3);
    const rng = makeRng(0x9e3779b9);

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const r = radius + (rng() - 0.5) * 0.45;

      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [tier]);

  // Per-node base tint: mostly cobalt, a minority in ink for weight.
  const tint = useMemo(() => {
    const { count } = tier;
    const arr = new Float32Array(count * 3);
    const rng = makeRng(0x85ebca6b);

    for (let i = 0; i < count; i++) {
      const c = rng() < 0.7 ? colors.accent : colors.ink;
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [tier, colors]);

  const { pointsGeom, linesGeom } = useMemo(() => {
    const { count, maxLinks } = tier;

    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    pg.setAttribute("color", new THREE.BufferAttribute(new Float32Array(count * 3), 3));

    // Capped at maxLinks rather than the complete graph's N(N-1)/2 — the old
    // buffer reserved 386 KB to draw a few hundred segments.
    const lg = new THREE.BufferGeometry();
    lg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(maxLinks * 6), 3));
    lg.setAttribute("color", new THREE.BufferAttribute(new Float32Array(maxLinks * 6), 3));

    return { pointsGeom: pg, linesGeom: lg };
  }, [tier]);

  useEffect(() => {
    return () => {
      pointsGeom.dispose();
      linesGeom.dispose();
    };
  }, [pointsGeom, linesGeom]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const { count, radius, linkDist, maxLinks } = tier;
    const t = animate ? state.clock.elapsedTime * 0.15 : 0;
    const p = pointer.current;

    if (animate) {
      p.x += (p.tx - p.x) * 0.06;
      p.y += (p.ty - p.y) * 0.06;
    }

    // The rotation is applied here per-node instead of on the object, so the
    // pointer interaction below can work in the same space the viewer sees.
    const rotY = t * 0.5 + p.x * 0.25;
    const rotX = -p.y * 0.18;
    const cy = Math.cos(rotY);
    const sy = Math.sin(rotY);
    const cx = Math.cos(rotX);
    const sx = Math.sin(rotX);

    // Pointer in the group's local units: NDC -> world at z=0, then undo the
    // group's own offset and scale.
    const px = ((p.x * viewport.width) / 2 - offsetX) / scale;
    const py = ((p.y * viewport.height) / 2 - offsetY) / scale;
    const repel = animate && p.inside;

    // Reached through the object refs rather than the memoised bindings —
    // per-frame buffer writes are ref mutations, not render-time state changes.
    const nodeGeom = pointsRef.current.geometry;
    const linkGeom = linesRef.current.geometry;

    const posAttr = nodeGeom.attributes.position;
    const colAttr = nodeGeom.attributes.color;
    const pos = posAttr.array as Float32Array;
    const col = colAttr.array as Float32Array;

    const linkPosAttr = linkGeom.attributes.position;
    const linkColAttr = linkGeom.attributes.color;
    const linkPos = linkPosAttr.array as Float32Array;
    const linkCol = linkColAttr.array as Float32Array;

    const invSpan = 1 / (2 * radius);
    const linkDistSq = linkDist * linkDist;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Radial breathing, applied before rotation (rotation is rigid, so the
      // order is equivalent and this way it costs three multiplies).
      let bx = base[i3];
      let by = base[i3 + 1];
      let bz = base[i3 + 2];

      if (animate) {
        const wave = 1 + Math.sin(t * 2 + (bx + by) * 1.5) * 0.06;
        bx *= wave;
        by *= wave;
        bz *= wave;
      }

      // Rotate about Y, then X.
      const x1 = bx * cy + bz * sy;
      const z1 = bz * cy - bx * sy;
      let x = x1;
      let y = by * cx - z1 * sx;
      const z = by * sx + z1 * cx;

      // Magnetic repulsion, now genuinely under the cursor.
      if (repel) {
        const dx = x - px;
        const dy = y - py;
        const d = Math.hypot(dx, dy);
        if (d < REPEL_RADIUS && d > 1e-4) {
          const falloff = 1 - d / REPEL_RADIUS;
          const push = (falloff * falloff * REPEL_STRENGTH) / d;
          x += dx * push;
          y += dy * push;
        }
      }

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      // Atmospheric depth: far nodes recede toward the page colour. This is
      // what gives the network volume on a light background, where the old
      // additive blending simply erased it.
      const depth = 0.28 + 0.72 * Math.min(1, Math.max(0, (z + radius) * invSpan));
      const cr = tint[i3];
      const cg = tint[i3 + 1];
      const cb = tint[i3 + 2];
      col[i3] = colors.paper.r + (cr - colors.paper.r) * depth;
      col[i3 + 1] = colors.paper.g + (cg - colors.paper.g) * depth;
      col[i3 + 2] = colors.paper.b + (cb - colors.paper.b) * depth;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    // Proximity links. Segments fade with both depth and length, so the
    // network has a soft edge instead of a hard cut-off at linkDist.
    let seg = 0;
    for (let i = 0; i < count && seg < maxLinks; i++) {
      const i3 = i * 3;
      const xi = pos[i3];
      const yi = pos[i3 + 1];
      const zi = pos[i3 + 2];

      for (let j = i + 1; j < count && seg < maxLinks; j++) {
        const j3 = j * 3;
        const dx = xi - pos[j3];
        const dy = yi - pos[j3 + 1];
        const dz = zi - pos[j3 + 2];
        const dSq = dx * dx + dy * dy + dz * dz;
        if (dSq >= linkDistSq) continue;

        const o = seg * 6;
        linkPos[o] = xi;
        linkPos[o + 1] = yi;
        linkPos[o + 2] = zi;
        linkPos[o + 3] = pos[j3];
        linkPos[o + 4] = pos[j3 + 1];
        linkPos[o + 5] = pos[j3 + 2];

        const depth =
          0.5 *
          (Math.min(1, Math.max(0, (zi + radius) * invSpan)) +
            Math.min(1, Math.max(0, (pos[j3 + 2] + radius) * invSpan)));
        // Keep a floor on the length term so mid-length links still read as
        // cobalt rather than washing out to grey.
        const k = (0.4 + 0.6 * (1 - dSq / linkDistSq)) * (0.3 + 0.7 * depth);

        const r = colors.paper.r + (colors.accent.r - colors.paper.r) * k;
        const g = colors.paper.g + (colors.accent.g - colors.paper.g) * k;
        const b = colors.paper.b + (colors.accent.b - colors.paper.b) * k;

        linkCol[o] = linkCol[o + 3] = r;
        linkCol[o + 1] = linkCol[o + 4] = g;
        linkCol[o + 2] = linkCol[o + 5] = b;

        seg++;
      }
    }

    linkGeom.setDrawRange(0, seg * 2);
    linkPosAttr.needsUpdate = true;
    linkColAttr.needsUpdate = true;
  });

  return (
    <group position={[offsetX, offsetY, 0]} scale={scale}>
      <points ref={pointsRef} geometry={pointsGeom}>
        {/* Normal blending — additive can only brighten, which made this
            invisible on the cream background. */}
        {/* `map` alone: its alpha channel multiplies the material's, giving
            round sprites. `alphaMap` would sample the sprite's green channel,
            which is opaque throughout, and bring the squares back. */}
        <pointsMaterial
          size={tier.pointSize * scale}
          map={dotTexture ?? undefined}
          vertexColors
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef} geometry={linesGeom}>
        <lineBasicMaterial vertexColors transparent opacity={0.9} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

/* ------------------------------------------------------------------ *
 *  Canvas                                                             *
 * ------------------------------------------------------------------ */

export default function HeroCanvas({ active = true }: { active?: boolean }) {
  const palette = usePalette();
  const isSmall = useMediaQuery("(max-width: 767px)");
  const prefersStill = useMediaQuery("(prefers-reduced-motion: reduce)");

  const tier = isSmall ? MOBILE : DESKTOP;
  const animate = !prefersStill;
  const running = active && animate;

  return (
    <Canvas
      dpr={tier.dpr}
      frameloop={running ? "always" : "demand"}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ antialias: tier.antialias, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "transparent" }}
    >
      {/* No lights: pointsMaterial and lineBasicMaterial are both unlit. */}
      <DataNetwork tier={tier} palette={palette} animate={animate} />
    </Canvas>
  );
}
