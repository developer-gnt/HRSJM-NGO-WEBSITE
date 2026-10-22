import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleDetailPage from "@/components/articles/ArticleDetailPage";
import { findLatestArticleBySlug, latestArticles } from "@/data/articles";

export function generateStaticParams() {
  return latestArticles
    .filter((article) => article.slug)
    .map((article) => ({ slug: article.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = findLatestArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return { title: article.title, description: article.description };
}

export default async function ArticleRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = findLatestArticleBySlug(slug);
  if (!article) notFound();

  return <ArticleDetailPage article={article} />;
}
