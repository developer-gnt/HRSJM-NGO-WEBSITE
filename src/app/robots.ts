import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hrsjm.org";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/payments/",
          "/maintenance",
          "/membership/login",
          "/404",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
