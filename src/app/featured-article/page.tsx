import type { Metadata } from "next";
import FeaturedArticlePage from "@/components/news/FeaturedArticlePage";
import { featuredArticle } from "@/data/articles";

export const metadata: Metadata = {
  title: featuredArticle.title,
  description: featuredArticle.description,
};

export default function FeaturedArticleRoute() {
  return <FeaturedArticlePage />;
}