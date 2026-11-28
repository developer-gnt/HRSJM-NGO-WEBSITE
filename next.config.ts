import type { NextConfig } from "next";

const securityHeaders = [
  // 1. Prevent Clickjacking: Page Can Be Embedded in Other Sites
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // 2. Missing HTTPS Strict-Transport-Security (HSTS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // 3. Prevent MIME-sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // 4. Referrer Policy
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // 5. Permissions Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // 6. Cross-Origin Policies (allow preview scrapers and social sharing)
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "cross-origin",
  },
  // 7. Missing Content Security Policy (CSP) & frame-ancestors
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https: http:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https: http: ws: wss:",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Compress assets using gzip/brotli
  compress: true,
  // Optimize package imports for smaller bundles & faster execution
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async headers() {
    // Only apply strict security headers in production to avoid blocking localhost development & Turbopack HMR
    if (process.env.NODE_ENV !== "production") {
      return [];
    }

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Cache static public assets aggressively and allow social preview scrapers
        source: "/:all*(svg|jpg|png|webp|avif|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
        ],
      },
      {
        // Membership categories preview caching for crawlers & CDN
        source: "/membership/categories",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
        ],
      },
    ];
  },
  /* The old Success Stories category listing is retired from the active
     flow - anyone landing on it is sent to the dedicated page instead. */
  async redirects() {
    return [
      {
        source: "/news/category/success-stories",
        destination: "/success-stories",
        permanent: true,
      },
      {
        source: "/login",
        destination: "https://webapp.hrsjm.org/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
