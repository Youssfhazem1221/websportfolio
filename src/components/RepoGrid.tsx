"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { fetchPortfolioRepos, type Repo } from "@/lib/github";

// GitHub's own language colours (linguist)
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#663399",
};

// UTC, so the HTML from the build and the browser agree on the month
const updated = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export default function RepoGrid({ initial }: { initial: Repo[] | null }) {
  const [repos, setRepos] = useState(initial);

  // The list baked in at build time can be days old: refresh it from GitHub on every visit.
  useEffect(() => {
    let cancelled = false;
    fetchPortfolioRepos()
      .then((fresh) => {
        if (!cancelled) setRepos(fresh);
      })
      .catch(() => {
        // offline or rate-limited: keep the build-time list
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!repos?.length) {
    return (
      <Reveal>
        <p className="mt-12 text-center text-[color:var(--text-dim)]">
          Code, experiments and side projects live on my GitHub.
        </p>
      </Reveal>
    );
  }

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo, i) => (
        <Reveal key={repo.name} delay={i * 0.08}>
          <div className="card group relative flex h-full flex-col justify-between p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
            <div>
              <div className="flex items-start justify-between gap-3">
                {/* the title's ::after stretches over the card, so the whole card opens the repo */}
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all font-[family-name:var(--font-display)] text-lg font-bold transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-[color:var(--accent)]"
                >
                  {repo.name}
                </a>
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 shrink-0 rounded-full border border-[color:var(--border-strong)] px-2.5 py-1 text-xs font-semibold text-[color:var(--ink)] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
                  >
                    Live <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
              {repo.description && (
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-dim)]">
                  {repo.description}
                </p>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-[color:var(--line)] pt-4 text-xs text-[color:var(--text-faint)]">
              {repo.language ? (
                <span className="flex items-center gap-1.5 font-medium">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: LANG_COLORS[repo.language] ?? "var(--ink-faint)" }}
                  />
                  {repo.language}
                </span>
              ) : (
                <span />
              )}
              <span className="flex items-center gap-3">
                {repo.stars > 0 && <span>★ {repo.stars}</span>}
                <span>Updated {updated(repo.pushedAt)}</span>
              </span>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
