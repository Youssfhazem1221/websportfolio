"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

const INTERACTIVE = [
  "a",
  "button",
  '[role="button"]',
  "input",
  "textarea",
  "select",
  "summary",
  '[data-cursor-hover="true"]',
].join(", ");

const srgbToLinear = (v: number) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};

/*
  Walk up for the first opaque background so the reticle can invert itself.
  Without this the cobalt cursor disappears over the accent-filled CTAs and the
  ink-filled hover states — the very elements it exists to acknowledge.
*/
function isOnDark(start: Element | null): boolean {
  let node: Element | null = start;
  while (node) {
    const match = getComputedStyle(node).backgroundColor.match(/rgba?\(([^)]+)\)/);
    if (match) {
      const parts = match[1].split(",").map(Number);
      const [r, g, b] = parts;
      if ((parts[3] ?? 1) > 0.5) {
        const lum =
          0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
        return lum < 0.4;
      }
    }
    node = node.parentElement;
  }
  return false;
}

/*
  Precision reticle:
  A measuring-instrument crosshair that tracks the pointer exactly, and locks
  into four corner brackets over anything interactive.
*/
export default function CustomCursor() {
  // Both queries are read unconditionally — `&&` between the hook calls would
  // short-circuit the second one.
  const pointerFine = useMediaQuery("(pointer: fine)");
  const prefersStill = useMediaQuery("(prefers-reduced-motion: reduce)");
  // Hiding the native cursor is itself a motion/accessibility cost, so
  // reduced-motion users keep their own.
  const enabled = pointerFine && !prefersStill;

  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [onDark, setOnDark] = useState(false);

  // The crosshair tracks raw values — a lagging crosshair reads as broken.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // The brackets trail slightly, which is what makes the lock-on feel physical.
  const bracketX = useSpring(x, { stiffness: 320, damping: 26, mass: 0.55 });
  const bracketY = useSpring(y, { stiffness: 320, damping: 26, mass: 0.55 });

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor-active");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    // Buttons transition their background on hover, so sample once now and
    // again after the transition settles, or we'd read the pre-hover colour.
    let settle: ReturnType<typeof setTimeout>;
    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      setHovered(!!target?.closest?.(INTERACTIVE));
      setOnDark(isOnDark(target));
      clearTimeout(settle);
      settle = setTimeout(() => setOnDark(isOnDark(target)), 220);
    };

    const onLeave = () => {
      setVisible(false);
      setPressed(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", () => setPressed(true), { passive: true });
    window.addEventListener("pointerup", () => setPressed(false), { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      clearTimeout(settle);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [x, y, enabled]);

  if (!enabled) return null;

  const scale = pressed ? 0.82 : 1;
  const stroke = onDark ? "var(--paper)" : "var(--accent)";

  return (
    <>
      {/* Crosshair — exact position, no smoothing */}
      <motion.svg
        aria-hidden
        viewBox="-24 -24 48 48"
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-12 w-12 -translate-x-1/2 -translate-y-1/2"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0, scale }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <g
          stroke={stroke}
          strokeWidth={1.3}
          strokeLinecap="round"
          style={{
            opacity: hovered ? 0 : 1,
            transform: hovered ? "scale(0.55)" : "scale(1)",
            transition: "opacity 180ms ease-out, transform 220ms cubic-bezier(0.21,0.6,0.35,1)",
            transformOrigin: "center",
          }}
        >
          <line x1="0" y1="-13" x2="0" y2="-5.5" />
          <line x1="0" y1="5.5" x2="0" y2="13" />
          <line x1="-13" y1="0" x2="-5.5" y2="0" />
          <line x1="5.5" y1="0" x2="13" y2="0" />
        </g>
        {/* The centre point persists through both states for continuity */}
        <circle cx="0" cy="0" r={hovered ? 1.1 : 1.5} fill={stroke} />
      </motion.svg>

      {/* Corner brackets — trailing, rotate into place on lock-on */}
      <motion.svg
        aria-hidden
        viewBox="-24 -24 48 48"
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-12 w-12 -translate-x-1/2 -translate-y-1/2"
        style={{ x: bracketX, y: bracketY }}
        animate={{
          opacity: visible && hovered ? 1 : 0,
          scale: (hovered ? 1 : 0.62) * scale,
          rotate: hovered ? 0 : 45,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 26, mass: 0.5 }}
      >
        <g
          fill="none"
          stroke={stroke}
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M -15 -9 L -15 -15 L -9 -15" />
          <path d="M 9 -15 L 15 -15 L 15 -9" />
          <path d="M 15 9 L 15 15 L 9 15" />
          <path d="M -9 15 L -15 15 L -15 9" />
        </g>
      </motion.svg>
    </>
  );
}
