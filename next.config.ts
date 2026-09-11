import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pinned explicitly: a stray package-lock.json in the home directory
  // otherwise causes Turbopack to infer the wrong workspace root.
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // All photography is served from /public. No remote patterns are allowed,
    // so nothing on this site can hotlink a third-party image host.
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        // The ambient hero loop is immutable and fingerprinted by filename.
        source: "/media/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
