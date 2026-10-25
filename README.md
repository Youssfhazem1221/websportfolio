# Youssf Hazem · portfolio

Personal portfolio: shipped products, design case studies, and live GitHub repos.

| | |
|---|---|
| Live | https://websportfolio.vercel.app (the Vercel project `youssfhazem` serves the same build at youssfhazem.vercel.app) |
| Stack | Next.js 16 (App Router), React 19, Tailwind CSS 4, Framer Motion, three.js |
| Deploys | Every push to `main` deploys through Vercel's GitHub integration |

## Where the content lives

| Section | Source | To change it |
|---|---|---|
| Shipped products (Waraqa, MiniBus Egypt) | `src/data/shipped.ts` + images in `public/work/<slug>/` | Add an entry; screenshots as `.webp` |
| Design case studies | `src/data/projects.ts` + `public/work/<slug>/NN.webp` | Add an entry with its Behance link |
| GitHub section | **GitHub itself**, read live by `src/lib/github.ts` | See below, no code change |
| Name, links, CV | `src/lib/site.ts`, `public/Youssf-Hazem-CV.pdf` | Edit the constants |

## GitHub sync

The GitHub section lists every **public, non-fork, non-archived** repo of `Youssfhazem1221` that has the topic **`portfolio`**, newest push first (up to 6).

- **Show a repo:** on its GitHub page → ⚙️ next to *About* → add the topic `portfolio`.
- **Card text:** the repo's *Description*. The **Live ↗** button: its *Website* field.
- **Hide a repo:** remove the topic.
- **When it updates:** the page re-renders at most once an hour (ISR, `revalidate = 3600`). If GitHub is down, the last good version stays up.

Optional env var `GITHUB_TOKEN` (a fine-grained token with public read access only) lifts the GitHub API limit from 60 to 5,000 calls an hour. Not needed at one call an hour.

## Env vars

| Name | Needed? | What |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL for share previews, sitemap and robots. Defaults to `https://websportfolio.vercel.app`; set it only when moving to a custom domain |
| `GITHUB_TOKEN` | No | See GitHub sync |

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build, also checks types
npm run lint
```
