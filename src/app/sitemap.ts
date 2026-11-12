import type { MetadataRoute } from "next";
import { rightsDetailData } from "@/data/rightsDetailData";
import { newsArticlesData } from "@/data/newsDetailData";
import { latestArticles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hrsjm.org";
  const now = new Date();

  // Core static landing and category pages
  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/aims-and-objectives", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/our-vision", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/our-history", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/rights", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/what-hrsjm-does", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/membership", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/membership/categories", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/membership/apply", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/membership/renew", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/benefits", priority: 0.8, changeFrequency: "monthly" as const },
    {
      path: "/how-to-become-a-district-and-state-president",
      priority: 0.85,
      changeFrequency: "monthly" as const,
    },
    { path: "/donation", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/donation/emergency", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/complaint", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/events", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/events/all", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/news", priority: 0.85, changeFrequency: "daily" as const },
    { path: "/articles", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/featured-article", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/success-stories", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/faqs", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/help", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/constitution", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/refund-and-cancellation-policy", priority: 0.4, changeFrequency: "yearly" as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Dynamic Rights Guides
  const rightsEntries: MetadataRoute.Sitemap = Object.keys(rightsDetailData).map((slug) => ({
    url: `${baseUrl}/rights/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic News Articles
  const newsEntries: MetadataRoute.Sitemap = Object.keys(newsArticlesData).map((slug) => ({
    url: `${baseUrl}/news/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // Dynamic Articles
  const articleEntries: MetadataRoute.Sitemap = latestArticles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticEntries, ...rightsEntries, ...newsEntries, ...articleEntries];
}
