"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import ProjectModal from "./ProjectModal";
import ShippedCard from "./ShippedCard";
import { PROJECTS, type Project } from "@/data/projects";
import { SHIPPED } from "@/data/shipped";
import { SITE } from "@/lib/site";

export default function Work() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="relative py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          index="02 — Work"
          title={<>Selected <span className="grad-text">work</span></>}
          aside="Products I built and run, then design case studies. Click any case study to see the real screens."
        />

        {/* Shipped products: live sites, alternating sides */}
        <div className="mt-10 flex flex-col gap-8">
          {SHIPPED.map((item, i) => (
            <Reveal key={item.slug} delay={0.05}>
              <ShippedCard item={item} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>

        {/* Case studies — editorial alternating rows */}
        <div className="mt-8 flex flex-col gap-8">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={0.04 * i}>
              <button
                onClick={() => setActive(p)}
                className={`group grid w-full items-center gap-6 text-left md:grid-cols-2 md:gap-10 ${
                  i % 2 === 1 ? "md:[direction:rtl]" : ""
                }`}
              >
                {/* cover */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[color:var(--border)] [direction:ltr]">
                  <span className="absolute inset-0 z-0 bg-[color:var(--paper-2)]" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="relative z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute right-4 top-4 z-20 rounded-full bg-black/50 px-3 py-1 font-[family-name:var(--font-sans)] text-xs text-white backdrop-blur">
                    {p.images.length} frames
                  </span>
                </div>

                {/* text */}
                <div className="[direction:ltr]">
                  <div className="flex items-center gap-3 font-[family-name:var(--font-sans)] text-sm text-[color:var(--text-faint)]">
                    <span className="grad-text text-lg font-bold">
                      0{i + 1}
                    </span>
                    <span>{p.category} · {p.year}</span>
                  </div>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-md font-medium text-[color:var(--ink)]">{p.outcome}</p>
                  <p className="mt-2 max-w-md text-sm text-[color:var(--ink-dim)]">{p.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--pink-soft)]">
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--border-strong)] transition-transform group-hover:translate-x-1">
                      →
                    </span>
                    View case study
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-12 text-center text-sm text-[color:var(--text-dim)]">
            More:{" "}
            <a
              href="https://youssf.waraqa.art"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[color:var(--ink)] underline decoration-[color:var(--line-strong)] underline-offset-4 transition-colors hover:text-[color:var(--accent)] hover:decoration-[color:var(--accent)]"
            >
              paper motion films ↗
            </a>{" "}
            ·{" "}
            <a
              href={SITE.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[color:var(--ink)] underline decoration-[color:var(--line-strong)] underline-offset-4 transition-colors hover:text-[color:var(--accent)] hover:decoration-[color:var(--accent)]"
            >
              all design work on Behance ↗
            </a>
          </p>
        </Reveal>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
