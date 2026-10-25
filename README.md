# Youssf Hazem · portfolio

Personal portfolio: shipped products, design case studies, and live GitHub repos.

| | |
|---|---|
| Live | https://youssfhazem.pages.dev (Cloudflare Pages, project `youssfhazem`) |
| Mirrors | websportfolio.vercel.app and youssfhazem.vercel.app still build from `main`; their canonical tag points at the Cloudflare address |
| Stack | Next.js 16 static export (App Router), React 19, Tailwind CSS 4, Framer Motion, three.js |
| Deploy | `npm run deploy`: builds `out/` and uploads it with Wrangler (`wrangler.jsonc`) |

## Where the content lives

| Section | Source | To change it |
|---|---|---|
| Shipped products (Waraqa, MiniBus Egypt) | `src/data/shipped.ts` + images in `public/work/<slug>/` | Add an entry; screenshots as `.webp`; deploy |
| Design case studies | `src/data/projects.ts` + `public/work/<slug>/NN.webp` | Add an entry with its Behance link; deploy |
| GitHub section | **GitHub itself**, read by `src/lib/github.ts` | See below, no code change and no deploy |
| Name, links, CV | `src/lib/site.ts`, `public/Youssf-Hazem-CV.pdf` | Edit the constants; deploy |
| Response headers | `public/_headers` | Cloudflare Pages format |

## GitHub sync

The GitHub section lists every **public, non-fork, non-archived** repo of `Youssfhazem1221` that has the topic **`portfolio`**, newest push first (up to 6).

- **Show a repo:** on its GitHub page → ⚙️ next to *About* → add the topic `portfolio`.
- **Card text:** the repo's *Description*. The **Live ↗** button: its *Website* field.
- **Hide a repo:** remove the topic.
- **When it updates:** the list is baked into the HTML at build time, then each visitor's browser fetches it again from the GitHub API, so changes show on the next page view. If GitHub is unreachable, the built list stays.
- **Fresh builds:** `prebuild` clears Next's fetch cache, which would otherwise keep the build-time GitHub answer for a year.

Optional env var `GITHUB_TOKEN` at build time (a fine-grained token with public read access only) lifts the build's API limit from 60 to 5,000 calls an hour. Not needed at one call per build.

## Env vars

| Name | Needed? | What |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL for share previews, sitemap and robots. Defaults to `https://youssfhazem.pages.dev`; set it only when moving to a custom domain |
| `GITHUB_TOKEN` | No | See GitHub sync |

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into out/, also checks types
npm start        # serves out/ like Cloudflare does, on http://localhost:8788
npm run lint
npm run deploy   # build + upload to Cloudflare Pages (needs `wrangler login` once)
```
