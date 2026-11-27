import { createOpenGraph } from "@/lib/seo";
import type { Metadata } from "next";
import NewsHero from "@/components/news/NewsHero";
import FeaturedNews from "@/components/news/FeaturedNews";
import LatestNews from "@/components/news/LatestNews";
import KnowledgeBanner from "@/components/news/KnowledgeBanner";
import CommunityVoices from "@/components/news/CommunityVoices";
import NewsCTA from "@/components/news/NewsCTA";
import { fetchNews } from "@/lib/backendApi";

export const metadata: Metadata = {
  title: "Human Rights News & Legal Blog | HRSJM India",
  description:
    "Latest human rights news, legal updates, grassroots campaign reports, and constitutional justice articles from HRSJM leaders across India.",
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
  openGraph: createOpenGraph({
    title: "Human Rights News & Legal Blog | HRSJM India",
    description: "Latest human rights news, legal updates, grassroots campaign reports, and constitutional justice articles from HRSJM leaders across India.",
    urlPath: "/news",
    image: "/logo.png",
    imageAlt: "Human Rights News & Legal Blog | HRSJM India",
  }),
};

export const revalidate = 60;

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
