import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ArticleDetailPage from "@/components/articles/ArticleDetailPage";
import NewsArticleDetailView from "@/components/news/NewsArticleDetailView";
import { findLatestArticleBySlug } from "@/data/articles";
import { newsArticlesData } from "@/data/newsDetailData";
import { fetchNewsByIdOrSlug } from "@/lib/backendApi";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dbNews = await fetchNewsByIdOrSlug(slug);
  if (dbNews) {
    const desc = dbNews.summary || "HRSJM legal and human rights article.";
    return {
      title: `${dbNews.title} | HRSJM Articles`,
      description: desc.slice(0, 155),
      alternates: {
        canonical: `/articles/${slug}`,
      },
    };
  }
  const richArticle = newsArticlesData[slug];
  if (richArticle) {
    const desc = richArticle.subtitle || richArticle.title;
    return {
      title: richArticle.title,
      description: desc.slice(0, 155),
      alternates: {
        canonical: `/articles/${slug}`,
      },
    };
  }
  const article = findLatestArticleBySlug(slug);
  if (!article) {
    return {
      title: "Article Not Found | HRSJM",
      alternates: {
        canonical: `/articles/${slug}`,
      },
    };
  }
  return {
    title: `${article.title} | HRSJM Articles`,
    description: article.description?.slice(0, 155),
    alternates: {
      canonical: `/articles/${slug}`,
    },
  };
}

export default async function ArticleRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check database first
  const dbNews = await fetchNewsByIdOrSlug(slug);
  if (dbNews) {
    redirect(`/news/${dbNews.slug || dbNews.id}`);
  }

  if (newsArticlesData[slug]) {
    return <NewsArticleDetailView data={newsArticlesData[slug]} />;
  }

  const article = findLatestArticleBySlug(slug);
  if (!article) notFound();

  return <ArticleDetailPage article={article} />;
}
