import type { Metadata } from "next";
import AllArticlesPage from "@/components/articles/AllArticlesPage";

export const metadata: Metadata = {
  title: "Latest News & Updates",
  description:
    "Explore our latest stories, insights, community updates and human rights news from Human Rights & Social Justice Mission.",
};

export default function ArticlesRoute() {
  return <AllArticlesPage />;
}
