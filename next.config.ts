import type { NextConfig } from "next";

// Allows next/image to load photos uploaded to R2, once R2_PUBLIC_URL is
// set. Empty list (no remote images allowed) until then.
function r2Hostname(): string | null {
  const url = process.env.R2_PUBLIC_URL;
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

const r2Host = r2Hostname();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: r2Host ? [{ protocol: "https", hostname: r2Host }] : [],
  },
};

export default nextConfig;

// Lets the regular `next dev` server use Cloudflare bindings (R2, etc.)
// locally, matching how the app behaves once deployed to Workers.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
