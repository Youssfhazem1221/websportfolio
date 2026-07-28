// Central site config. Set NEXT_PUBLIC_SITE_URL at deploy time to the real
// domain (e.g. https://youssfhazem.com) so OG tags / sitemap use the right host.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://youssfhazem.pages.dev";

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
