import type { Metadata } from "next";
import AllArticlesPage from "@/components/articles/AllArticlesPage";

export const metadata: Metadata = {
  title: "All Articles & Research Publications - HRSJM India",
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
  openGraph: {
    title: "HRSJM Articles & Research Publications",
    description:
      "Expert legal commentary and grassroots stories on human rights and constitutional justice.",
    url: "https://hrsjm.org/articles",
  },
};

export default function ArticlesRoute() {
  return <AllArticlesPage />;
}
