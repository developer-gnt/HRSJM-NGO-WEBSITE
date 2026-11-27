import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ArticleDetailPage from "@/components/articles/ArticleDetailPage";
import NewsArticleDetailView from "@/components/news/NewsArticleDetailView";
import { findLatestArticleBySlug } from "@/data/articles";
import { newsArticlesData } from "@/data/newsDetailData";
import { fetchNewsByIdOrSlug, resolveNewsThumbnail } from "@/lib/backendApi";
import { createOpenGraph, createTwitter } from "@/lib/seo";

export const dynamicParams = true;
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;  const dbNews = await fetchNewsByIdOrSlug(slug);
  if (dbNews) {
    const desc = dbNews.summary || "HRSJM legal and human rights article.";
    const title = `${dbNews.title} | HRSJM Articles`;
    const canonicalPath = `/articles/${slug}`;
    const img = dbNews.thumbnail_url ? resolveNewsThumbnail(dbNews.thumbnail_url) : undefined;
    return {
      title,
      description: desc.slice(0, 155),
      alternates: {
        canonical: canonicalPath,
      },
      openGraph: createOpenGraph({
        title,
        description: desc.slice(0, 155),
        urlPath: canonicalPath,
        image: img,
        type: "article",
      }),
      twitter: createTwitter({
        title,
        description: desc.slice(0, 155),
        image: img,
      }),
    };
  }  const richArticle = newsArticlesData[slug];
  if (richArticle) {
    const desc = richArticle.subtitle || richArticle.title;
    const title = richArticle.title;
    const canonicalPath = `/articles/${slug}`;
    const img = richArticle.bannerImage || richArticle.cardImage || undefined;
    return {
      title,
      description: desc.slice(0, 155),
      alternates: {
        canonical: canonicalPath,
      },
      openGraph: createOpenGraph({
        title,
        description: desc.slice(0, 155),
        urlPath: canonicalPath,
        image: img,
        type: "article",
      }),
      twitter: createTwitter({
        title,
        description: desc.slice(0, 155),
        image: img,
      }),
    };
  }  const article = findLatestArticleBySlug(slug);
  if (!article) {
    return {
      title: "Article Not Found | HRSJM",
      alternates: {
        canonical: `/articles/${slug}`,
      },
    };
  }
  const title = `${article.title} | HRSJM Articles`;
  const desc = article.description?.slice(0, 155) || "HRSJM legal and human rights article.";
  const canonicalPath = `/articles/${slug}`;
  const img = article.image || undefined;
  return {
    title,
    description: desc,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: createOpenGraph({
      title,
      description: desc,
      urlPath: canonicalPath,
      image: img,
      type: "article",
    }),
    twitter: createTwitter({
      title,
      description: desc,
      image: img,
    }),
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
