import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsArticleDetailView from "@/components/news/NewsArticleDetailView";
import ArticleDetailPage from "@/components/articles/ArticleDetailPage";
import { findLatestArticleBySlug, latestArticles } from "@/data/articles";
import { newsArticlesData } from "@/data/newsDetailData";

export function generateStaticParams() {
  const slugs = new Set([
    ...Object.keys(newsArticlesData),
    ...latestArticles.filter((a) => a.slug).map((a) => a.slug as string),
  ]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const richArticle = newsArticlesData[slug];
  if (richArticle) {
    return { title: richArticle.title, description: richArticle.subtitle };
  }
  const article = findLatestArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return { title: article.title, description: article.description };
}

export default async function NewsArticleRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (newsArticlesData[slug]) {
    return <NewsArticleDetailView data={newsArticlesData[slug]} />;
  }

  const article = findLatestArticleBySlug(slug);
  if (!article) notFound();

  return <ArticleDetailPage article={article} />;
}
