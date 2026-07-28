"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { SITE } from "@/lib/site";

import MagneticButton from "./MagneticButton";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

const EASE: [number, number, number, number] = [0.21, 0.6, 0.35, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(true);

  // Pause the 3D render loop when the hero scrolls out of view (perf/battery).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="top" ref={sectionRef} className="relative overflow-hidden">
      {/* Background 3D Canvas spanning the entire hero container */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none opacity-100">
        <HeroCanvas active={active} />
      </div>

      <div className="container-x relative z-10 grid min-h-[100svh] grid-cols-1 items-center gap-10 pt-28 pb-16 md:grid-cols-[1.1fr_1fr] md:gap-12">
        {/* Left — copy */}
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 min-w-0">
          <motion.div variants={item} className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-[3px] bg-[color:var(--accent)]" />
            <span className="font-[family-name:var(--font-sans)] text-xs uppercase tracking-[0.18em] text-[color:var(--ink-dim)]">
              Available · Cairo, Egypt
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,4rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-[color:var(--ink)]"
          >
            I turn <span className="text-[color:var(--accent)]">data</span> into products people actually use.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-md text-lg leading-relaxed text-[color:var(--ink-dim)]"
          >
            Product analyst who designs and builds — I dig into the data, then shape it into
            products that are as insightful as they are usable.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <a
                href="#work"
                className="rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--accent-press)]"
              >
                See my work
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[color:var(--ink)] px-6 py-3 text-sm font-semibold text-[color:var(--ink)] transition-colors hover:bg-[color:var(--ink)] hover:text-[color:var(--paper)]"
              >
                Message on WhatsApp
              </a>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <a
                href={SITE.cv}
                download
                className="group inline-flex items-center gap-1.5 px-2 py-3 text-sm font-semibold text-[color:var(--ink-dim)] underline decoration-[color:var(--line-strong)] underline-offset-4 transition-colors hover:text-[color:var(--accent)] hover:decoration-[color:var(--accent)]"
              >
                Download CV
                <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Right — deliberately empty: reserves the column so the copy stays
            left and the network reads as the hero visual. */}
        <div className="pointer-events-none relative h-[200px] w-full md:h-[520px]" aria-hidden />
      </div>
    </section>
  );
}
