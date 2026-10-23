import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsArticleDetailView from "@/components/news/NewsArticleDetailView";
import { newsArticlesData } from "@/data/newsDetailData";

export function generateStaticParams() {
  return Object.keys(newsArticlesData).map((slug) => ({ slug }));
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
  return { title: "Article Not Found" };
}

export default async function NewsArticleRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = newsArticlesData[slug];
  if (!article) notFound();

  return <NewsArticleDetailView data={article} />;
}
