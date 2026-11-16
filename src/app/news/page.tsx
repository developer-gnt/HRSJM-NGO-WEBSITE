import type { Metadata } from "next";
import NewsHero from "@/components/news/NewsHero";
import FeaturedNews from "@/components/news/FeaturedNews";
import LatestNews from "@/components/news/LatestNews";
import KnowledgeBanner from "@/components/news/KnowledgeBanner";
import CommunityVoices from "@/components/news/CommunityVoices";
import NewsCTA from "@/components/news/NewsCTA";
import { fetchNews } from "@/lib/backendApi";

export const metadata: Metadata = {
  title: "Human Rights News & Legal Insights Blog | HRSJM India",
  description:
    "Stay informed with the latest human rights news, grassroots community reports, legal analyses, and social justice campaign updates from HRSJM across India.",
  keywords: [
    "Human Rights News India",
    "HRSJM Blog",
    "Social Justice News India",
    "Legal Rights Articles",
    "Human Rights Violations News",
    "NGO Ground Reports India",
  ],
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "HRSJM News & Human Rights Insights",
    description:
      "Latest human rights stories, legal awareness articles, and field reports from across India.",
    url: "https://hrsjm.org/news",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewsPage() {
  const newsData = await fetchNews({ status: "PUBLISHED", limit: 20 });
  const featured = newsData.items.length > 0 ? newsData.items[0] : null;
  const latest = newsData.items.length > 1 ? newsData.items.slice(1) : [];

  return (
    <>
      <NewsHero />
      <FeaturedNews initialArticle={featured} />
      <LatestNews initialArticles={latest} />
      <KnowledgeBanner />
      <CommunityVoices />
      <NewsCTA />
    </>
  );
}
