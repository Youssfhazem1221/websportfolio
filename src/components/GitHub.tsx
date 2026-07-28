"use client";

import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { SITE } from "@/lib/site";
import MagneticButton from "./MagneticButton";

const REPOS = [
  {
    name: "minibus-egypt",
    description: "Real Cairo transit data → a live, searchable route-finder for microbus networks.",
    language: "TypeScript",
    langColor: "#3178c6",
    stars: 12,
    forks: 3,
    url: "https://github.com/Youssfhazem1221/minibus-egypt",
  },
  {
    name: "portfolio",
    description: "Modern, high-performance personal portfolio built with Next.js, Three.js & Tailwind CSS.",
    language: "TypeScript",
    langColor: "#3178c6",
    stars: 8,
    forks: 2,
    url: "https://github.com/Youssfhazem1221",
  },
  {
    name: "data-analysis-workflows",
    description: "Automated ETL pipelines, LLM-assisted ticket handling & operational dashboard metrics.",
    language: "Python",
    langColor: "#3572A5",
    stars: 15,
    forks: 5,
    url: "https://github.com/Youssfhazem1221",
  },
];

export default function GitHub() {
  return (
    <section id="github" className="relative py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          index="05 — Open Source"
          title={<>GitHub <span className="grad-text">Activity</span></>}
          aside="Code, experiments & open-source projects."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REPOS.map((repo, i) => (
            <Reveal key={repo.name} delay={i * 0.08}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex h-full flex-col justify-between p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-[family-name:var(--font-display)] text-lg font-bold group-hover:text-[color:var(--accent)] transition-colors">
                      {repo.name}
                    </span>
                    <span className="text-xs text-[color:var(--text-faint)]">Public</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-dim)]">
                    {repo.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[color:var(--line)] pt-4 text-xs text-[color:var(--text-faint)]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: repo.langColor }}
                    />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-3">
                    <span>★ {repo.stars}</span>
                    <span>🔀 {repo.forks}</span>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <MagneticButton>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ink)] px-6 py-3 text-sm font-semibold text-[color:var(--ink)] transition-colors hover:bg-[color:var(--ink)] hover:text-[color:var(--paper)]"
            >
              Follow on GitHub @Youssfhazem1221
              <span aria-hidden>↗</span>
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
