import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { SITE } from "@/lib/site";
import { getPortfolioRepos, type Repo } from "@/lib/github";
import MagneticButton from "./MagneticButton";

// GitHub's own language colours (linguist)
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#663399",
};

const MAX_REPOS = 6;

async function loadRepos(): Promise<Repo[] | null> {
  try {
    return (await getPortfolioRepos()).slice(0, MAX_REPOS);
  } catch (err) {
    // On a live site, rethrow: ISR keeps serving the last good page and retries.
    // During a build or in dev, show the profile link instead of failing.
    const live =
      process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-production-build";
    if (live) throw err;
    console.warn("GitHub section: repos unavailable,", err);
    return null;
  }
}

const updated = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });

export default async function GitHub() {
  const repos = await loadRepos();

  return (
    <section id="github" className="relative py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          index="05 — Open Source"
          title={<>GitHub <span className="grad-text">Activity</span></>}
          aside="Pulled live from GitHub, refreshed every hour."
        />

        {repos?.length ? (
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
        ) : (
          <Reveal>
            <p className="mt-12 text-center text-[color:var(--text-dim)]">
              Code, experiments and side projects live on my GitHub.
            </p>
          </Reveal>
        )}

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
