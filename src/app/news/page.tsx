import type { Metadata } from "next";
import NewsHero from "@/components/news/NewsHero";
import FeaturedNews from "@/components/news/FeaturedNews";
import LatestNews from "@/components/news/LatestNews";
import KnowledgeBanner from "@/components/news/KnowledgeBanner";
import CommunityVoices from "@/components/news/CommunityVoices";

export const metadata: Metadata = {
  title: "News & Blog",
  description:
    "Latest updates, community stories, human rights insights and awareness resources from Human Rights & Social Justice Mission.",
};

export default function NewsPage() {
  return (
    <>
      <NewsHero />
      <FeaturedNews />
      <LatestNews />
      <KnowledgeBanner />
      <CommunityVoices />
    </>
  );
}
