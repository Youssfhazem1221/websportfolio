import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Rendered once at build time (the site is a static export).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
