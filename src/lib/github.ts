// Live repo data for the GitHub section. A repo shows up when it has the
// `portfolio` topic on GitHub, so curating the section never needs a code change.
export const GITHUB_USER = "Youssfhazem1221";
export const PORTFOLIO_TOPIC = "portfolio";
export const MAX_REPOS = 6;

export type Repo = {
  name: string;
  description: string;
  url: string;
  /** live demo, from the repo's "Website" field */
  homepage: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
};

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
};

const API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?type=owner&sort=pushed&per_page=100`;

const absolute = (url: string | null) =>
  !url ? null : /^https?:\/\//.test(url) ? url : `https://${url}`;

/**
 * Public repos tagged `portfolio`, newest push first. Runs once at build time (so the
 * cards are in the HTML) and again in each visitor's browser (so they stay current).
 * The browser call sends no custom headers, which keeps it a simple CORS request.
 */
export async function fetchPortfolioRepos(headers: Record<string, string> = {}): Promise<Repo[]> {
  const res = await fetch(API_URL, { headers: { Accept: "application/vnd.github+json", ...headers } });
  if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);

  const repos: ApiRepo[] = await res.json();
  return repos
    .filter((r) => !r.private && !r.fork && !r.archived && r.topics?.includes(PORTFOLIO_TOPIC))
    .slice(0, MAX_REPOS)
    .map((r) => ({
      name: r.name,
      description: r.description ?? "",
      url: r.html_url,
      homepage: absolute(r.homepage),
      language: r.language,
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
    }));
}
