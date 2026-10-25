// Live repo data for the GitHub section. A repo shows up when it has the
// `portfolio` topic on GitHub, so curating the section never needs a code change.
export const GITHUB_USER = "Youssfhazem1221";
export const PORTFOLIO_TOPIC = "portfolio";

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

const absolute = (url: string | null) =>
  !url ? null : /^https?:\/\//.test(url) ? url : `https://${url}`;

export async function getPortfolioRepos(): Promise<Repo[]> {
  // Optional: a read-only token lifts the API limit from 60 to 5,000 calls an hour.
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?type=owner&sort=pushed&per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);

  const repos: ApiRepo[] = await res.json();
  return repos
    .filter((r) => !r.private && !r.fork && !r.archived && r.topics?.includes(PORTFOLIO_TOPIC))
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
