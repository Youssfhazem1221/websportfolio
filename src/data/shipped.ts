export type Shipped = {
  slug: string;
  name: string;
  /** status chip, e.g. "Founder · Live store" */
  badge: string;
  stack: string;
  /** short punchy value line under the name */
  outcome: string;
  body: string;
  tags: string[];
  live: { label: string; href: string };
  code?: { label: string; href: string }[];
  image: { src: string; alt: string };
  /** optional phone screenshot layered over the main image */
  phone?: { src: string; alt: string };
};

export const SHIPPED: Shipped[] = [
  {
    slug: "waraqa",
    name: "Waraqa (ورقة)",
    badge: "Founder · Live store",
    stack: "Next.js · Cloudflare · Sheets",
    outcome: "My own sketchbook brand, running on a store and CRM I built myself.",
    body:
      "Waraqa sells handmade sketchbooks across Egypt, cash on delivery. I built the bilingual store (English and Arabic) on Next.js and Cloudflare Workers, used Google Sheets as a free backend for stock and orders, and hand every order to WhatsApp for confirmation. A separate CRM runs the order board, stock and unit economics. I run the brand too: products, copy and SEO.",
    tags: ["English + Arabic", "Cash on delivery", "Google Sheets backend", "WhatsApp orders", "Own CRM", "SEO"],
    live: { label: "Visit waraqa.art", href: "https://waraqa.art" },
    code: [
      { label: "Store code", href: "https://github.com/Youssfhazem1221/waraqa-store" },
      { label: "CRM code", href: "https://github.com/Youssfhazem1221/waraqacrm" },
    ],
    image: { src: "/work/waraqa/home.webp", alt: "Waraqa store home page in English" },
    phone: { src: "/work/waraqa/mobile-ar.webp", alt: "Waraqa store on a phone, in Arabic" },
  },
  {
    slug: "minibus",
    name: "MiniBus Egypt",
    badge: "Shipped",
    stack: "Next.js · Data",
    outcome: "Real Cairo transit data → a live, searchable route-finder people actually use.",
    body:
      "A route-finder for Cairo's microbus network. I collected and structured real transit data — including government PDF line data — into a fast, searchable app that helps people actually get around the city. Data wrangling, product design, and shipping, end to end.",
    tags: ["Real transit data", "Route search", "Deployed live", "Mobile-first", "Arabic / RTL"],
    live: { label: "Visit live site", href: "https://busmasr.pages.dev/" },
    image: { src: "/work/minibus/app-wide.png", alt: "MiniBus Egypt — live route-finder app" },
  },
];
