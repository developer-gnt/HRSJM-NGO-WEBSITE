import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsArticleDetailView from "@/components/news/NewsArticleDetailView";
import { newsArticlesData, type NewsArticleDetail, type NewsSectionItem } from "@/data/newsDetailData";
import {
  fetchNews,
  fetchNewsByIdOrSlug,
  formatNewsDate,
  resolveNewsThumbnail,
  type BackendNews,
} from "@/lib/backendApi";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

function mapBackendNewsToDetail(
  item: BackendNews,
  relatedItems: BackendNews[] = []
): NewsArticleDetail {
  const content = item.content || item.summary || "";
  const rawParagraphs = content
    .split(/\n\n+|\r\n\r\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const paragraphs =
    rawParagraphs.length > 0 ? rawParagraphs : [item.summary || "No full content provided."];

  const sections: NewsSectionItem[] = [
    {
      id: "overview",
      tocTitle: "Overview & Report",
      heading: "Overview & Ground Report",
      paragraphs: paragraphs.slice(0, 3),
    },
  ];

  if (paragraphs.length > 3) {
    sections.push({
      id: "details",
      tocTitle: "In-Depth Details",
      heading: "Detailed Coverage",
      paragraphs: paragraphs.slice(3),
    });
  }

  if (Array.isArray(item.highlights) && item.highlights.length > 0) {
    sections.push({
      id: "highlights",
      tocTitle: "Key Highlights",
      heading: "Key Takeaways & Highlights",
      paragraphs: item.highlights.map((h) => String(h)),
    });
  }

  const relatedArticles = relatedItems
    .filter((r) => r.id !== item.id && r.slug !== item.slug)
    .slice(0, 3)
    .map((r) => ({
      slug: r.slug || r.id,
      category: r.category || "General News",
      title: r.title,
      date: formatNewsDate(r.published_at),
      readTime: `${Math.max(1, Math.ceil((r.content?.split(/\s+/).length || 100) / 200))} min read`,
      image: resolveNewsThumbnail(r.thumbnail_url, r.category),
    }));

  const thumbnail = resolveNewsThumbnail(item.thumbnail_url, item.category);

  return {
    slug: item.slug || item.id,
    category: item.category || "General News",
    categorySlug: (item.category || "general").toLowerCase().replace(/[^a-z0-9]/g, "-"),
    title: item.title,
    subtitle: item.summary || "",
    date: formatNewsDate(item.published_at),
    readTime: `${Math.max(1, Math.ceil((content.split(/\s+/).length || 100) / 200))} min read`,
    bannerImage: thumbnail,
    cardImage: thumbnail,
    summaryCallout: item.summary_detailed || item.summary || item.title,
    sections,
    cta: {
      heading: "Support Our Human Rights Work",
      description:
        "Join our mission to defend constitutional protections, provide free legal aid, and empower underprivileged communities across India.",
      buttonText: "Make a Donation",
      buttonHref: "/donation",
    },
    sidebarQuotePoster: {
      image: thumbnail,
    },
    relatedArticles,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // 1. Check central database first
  const dbNews = await fetchNewsByIdOrSlug(slug);
  if (dbNews) {
    const desc = dbNews.summary || dbNews.content?.slice(0, 155) || "Human rights news and updates from HRSJM.";
    return {
      title: `${dbNews.title} | HRSJM News`,
      description: desc.slice(0, 155),
      alternates: {
        canonical: `/news/${dbNews.slug || dbNews.id}`,
      },
    };
  }

  // 2. Legacy fallback
  const richArticle = newsArticlesData[slug];
  if (richArticle) {
    const desc = richArticle.subtitle || richArticle.title;
    return {
      title: richArticle.title,
      description: desc.slice(0, 155),
      alternates: {
        canonical: `/news/${slug}`,
      },
    };
  }
  return {
    title: "Article Not Found | HRSJM",
    alternates: {
      canonical: `/news/${slug}`,
    },
  };
}

export default async function NewsArticleRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. Fetch from live database
  const dbNews = await fetchNewsByIdOrSlug(slug);
  if (dbNews) {
    let related: BackendNews[] = [];
    try {
      const relRes = await fetchNews({ limit: 4 });
      related = relRes.items;
    } catch {}
    const detailData = mapBackendNewsToDetail(dbNews, related);
    return <NewsArticleDetailView data={detailData} />;
  }

  // 2. Fallback to static data if present for legacy paths
  const article = newsArticlesData[slug];
  if (!article) notFound();

  return <NewsArticleDetailView data={article} />;
}
