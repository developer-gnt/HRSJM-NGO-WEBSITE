import { createOpenGraph, createTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import AllArticlesPage from "@/components/articles/AllArticlesPage";

export const metadata: Metadata = {
  title: "Articles & Research Publications | HRSJM India",
  description:
    "Read in-depth research articles, legal explainers, human rights analyses, and policy commentaries authored by advocates and leaders at HRSJM.",
  keywords: [
    "Human Rights Articles India",
    "Legal Analysis Publications",
    "HRSJM Research",
    "Constitutional Rights Essays",
    "Social Justice Articles",
  ],
  alternates: {
    canonical: "/articles",
  },
  openGraph: createOpenGraph({
    title: "Articles & Research Publications | HRSJM India",
    description: "Read in-depth research articles, legal explainers, human rights analyses, and policy commentaries authored by advocates and leaders at HRSJM.",
    urlPath: "/articles",
    image: "/logo.png",
    imageAlt: "Articles & Research Publications | HRSJM India",
  }),
  twitter: createTwitter({
    title: "Articles & Research Publications | HRSJM India",
    description: "Read in-depth research articles, legal explainers, human rights analyses, and policy commentaries authored by advocates and leaders at HRSJM.",
    image: "/logo.png",
  }),
};

export default function ArticlesRoute() {
  return <AllArticlesPage />;
}
