import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain HTML/CSS/JS in out/, served by Cloudflare Pages (see wrangler.jsonc).
  // The GitHub section refreshes in the browser, so no server is needed.
  output: "export",
};

export default nextConfig;
