"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import ProjectModal from "./ProjectModal";
import { PROJECTS, type Project } from "@/data/projects";

export default function Work() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="relative py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          index="02 — Work"
          title={<>Selected <span className="grad-text">work</span></>}
          aside="One shipped product, then a few case studies. Click any to see the real screens."
        />

        {/* Flagship — MiniBus Egypt */}
        <Reveal delay={0.05}>
          <div className="grad-border mt-10 overflow-hidden">
            <div className="grid gap-8 p-7 md:grid-cols-[1.1fr_1fr] md:p-10">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border)] bg-[color:var(--paper-2)] px-3 py-1 text-xs font-semibold text-[color:var(--green)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--green)]" /> Flagship · Shipped
                  </span>
                  <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--paper-2)] px-3 py-1 text-xs font-medium text-[color:var(--ink-dim)]">
                    Next.js · Data
                  </span>
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-extrabold md:text-4xl">
                  MiniBus Egypt
                </h3>
                <p className="mt-3 max-w-md text-lg font-medium text-[color:var(--ink)]">
                  Real Cairo transit data → a live, searchable route-finder people actually use.
                </p>
                <p className="mt-3 max-w-md leading-relaxed text-[color:var(--text-dim)]">
                  A route-finder for Cairo&apos;s microbus network. I collected and structured
                  real transit data — including government PDF line data — into a fast, searchable
                  app that helps people actually get around the city. Data wrangling, product
                  design, and shipping, end to end.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2 text-xs">
                  {["Real transit data", "Route search", "Deployed live", "Mobile-first", "Arabic / RTL"].map(
                    (t) => (
                      <li
                        key={t}
                        className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[color:var(--text-dim)]"
                      >
                        {t}
                      </li>
                    )
                  )}
                </ul>
                <div className="mt-7">
                  <a
                    href="https://busmasr.pages.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--accent-press)]"
                  >
                    Visit live site
                    <span aria-hidden>↗</span>
                  </a>
                </div>
              </div>

              <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--accent-tint)] shadow-[0_24px_60px_-30px_rgba(22,21,28,0.4)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/work/minibus/app-wide.png"
                  alt="MiniBus Egypt — live route-finder app"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </Reveal>

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
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
