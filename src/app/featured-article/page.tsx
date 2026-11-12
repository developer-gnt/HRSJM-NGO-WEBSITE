import type { Metadata } from "next";
import FeaturedArticlePage from "@/components/news/FeaturedArticlePage";
import { featuredArticle } from "@/data/articles";

export const metadata: Metadata = {
  title: `${featuredArticle.title} | HRSJM Special Report`,
  description: featuredArticle.description,
  keywords: [
    "Human Rights Featured Article",
    "HRSJM Special Report",
    "Legal Analysis India",
    "Constitutional Awareness",
  ],
  alternates: {
    canonical: "/featured-article",
  },
  openGraph: {
    title: featuredArticle.title,
    description: featuredArticle.description,
    url: "https://hrsjm.org/featured-article",
    images: [
      {
        url: featuredArticle.image,
        width: 1200,
        height: 630,
        alt: featuredArticle.title,
      },
    ],
  },
};

export default function FeaturedArticleRoute() {
  return <FeaturedArticlePage />;
}