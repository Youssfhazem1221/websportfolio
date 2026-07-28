import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { SITE, SITE_URL } from "@/lib/site";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";

// Wide, confident headlines — heavy weights, paired with uppercase + tracking
const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

// Same family, normal width, for body/UI — keeps the type system cohesive
const sans = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const description =
  "Product analyst who designs and builds. I turn data into products people actually use. Cairo, Egypt.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Youssf Hazem — Product analyst who designs & builds",
  description,
  keywords: [
    "Youssf Hazem",
    "product analyst",
    "data analyst",
    "UI/UX designer",
    "Cairo",
    "Egypt",
    "portfolio",
  ],
  authors: [{ name: SITE.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Youssf Hazem — Product analyst who designs & builds",
    description,
    type: "website",
    url: "/",
    siteName: SITE.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Youssf Hazem — Product analyst who designs & builds",
    description,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: "Product Analyst",
  description,
  url: SITE_URL,
  address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
  sameAs: [SITE.linkedin, SITE.behance, SITE.github],
  knowsAbout: [
    "Data Analysis",
    "Data Visualization",
    "UI/UX Design",
    "Product Design",
    "Front-end Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full">
        <PageLoader />
        <ScrollProgress />
        <CustomCursor />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
