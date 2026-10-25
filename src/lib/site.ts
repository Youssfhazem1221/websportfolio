// Central site config. The canonical host for OG tags, sitemap and robots is the
// live Vercel domain; set NEXT_PUBLIC_SITE_URL only when a custom domain replaces it.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://websportfolio.vercel.app";

export const SITE = {
  name: "Youssf Hazem",
  role: "Product analyst who designs & builds",
  tagline: "I turn data into products people actually use.",
  location: "Cairo, Egypt",
  email: "youssf.hazem1331@gmail.com",
  whatsapp: "https://wa.me/201069237525",
  linkedin: "https://www.linkedin.com/in/youssfhazem12211",
  behance: "https://www.behance.net/youssfhazem1221",
  github: "https://github.com/Youssfhazem1221",
  cv: "/Youssf-Hazem-CV.pdf",
} as const;
