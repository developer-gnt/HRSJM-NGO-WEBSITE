import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryListingPage from "@/components/news/CategoryListingPage";
import { articleCategories, findArticleCategory } from "@/data/articleCategories";

export function generateStaticParams() {
  // "All Posts" lives at /news, so only the named categories get routes.
  return articleCategories
    .filter((category) => category.slug !== "all-posts")
    .map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = findArticleCategory(slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.label} - News & Blog`,
    description: category.description,
  };
}

export default async function CategoryRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = findArticleCategory(slug);
  if (!category) notFound();

  // Pass only the slug - the category object carries an icon component,
  // which cannot cross the server→client boundary.
  return <CategoryListingPage slug={slug} />;
}