import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
        destination: "/membership/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
