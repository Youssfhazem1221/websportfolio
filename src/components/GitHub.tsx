import SectionHeader from "./SectionHeader";
import RepoGrid from "./RepoGrid";
import { SITE } from "@/lib/site";
import { fetchPortfolioRepos, type Repo } from "@/lib/github";
import MagneticButton from "./MagneticButton";

// Fetched once at build time so the cards are in the HTML; RepoGrid refreshes them live.
async function buildTimeRepos(): Promise<Repo[] | null> {
  // Optional: a read-only token lifts GitHub's limit from 60 to 5,000 calls an hour.
  const token = process.env.GITHUB_TOKEN;
  try {
    return await fetchPortfolioRepos({
      "X-GitHub-Api-Version": "2022-11-28",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });
  } catch (err) {
    // A GitHub hiccup must not fail the deploy: the browser fetch fills the section in.
    console.warn("GitHub section: repos unavailable at build time,", err);
    return null;
  }
}

export default async function GitHub() {
  const repos = await buildTimeRepos();

  return (
    <section id="github" className="relative py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          index="05 — Open Source"
          title={<>GitHub <span className="grad-text">Activity</span></>}
          aside="Pulled live from GitHub."
        />

        <RepoGrid initial={repos} />

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
