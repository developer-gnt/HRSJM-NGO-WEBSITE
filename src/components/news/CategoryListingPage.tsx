"use client";

import Link from "next/link";
import { findArticleCategory } from "@/data/articleCategories";
import { featuredArticle, latestArticles } from "@/data/articles";
import { notFound } from "next/navigation";
import { useScrollReveal, revealDelay } from "@/hooks/useScrollReveal";
import ArticleCard from "./ArticleCard";
import CategorySidebar from "./CategorySidebar";
import shared from "./news.module.css";
import styles from "./categoryListing.module.css";

/* Category listing page. Articles come from the shared article data -
   the Featured Article leads its own category. Cards without a detail
   page render as previews; the Featured Article links through. */
export default function CategoryListingPage({ slug }: { slug: string }) {
  const sectionRef = useScrollReveal(shared);

  const category = findArticleCategory(slug);
  if (!category) notFound();

  const articles = [
    ...(featuredArticle.category === category.label ? [featuredArticle] : []),
    ...latestArticles.filter((article) => article.category === category.label),
  ];

  return (
    <section ref={sectionRef} aria-labelledby="category-heading">
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator} aria-hidden="true">
              /
            </span>
            <Link href="/news" className={styles.breadcrumbLink}>
              News &amp; Blog
            </Link>
            <span className={styles.breadcrumbSeparator} aria-hidden="true">
              /
            </span>
            <span className={styles.breadcrumbCurrent}>{category.label}</span>
          </nav>

          <p className={styles.eyebrow} data-reveal>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            News &amp; Blog
          </p>
          <h1
            id="category-heading"
            className={styles.heading}
            data-reveal
            style={revealDelay(1)}
          >
            {category.label}
          </h1>
          <p
            className={styles.description}
            data-reveal
            style={revealDelay(2)}
          >
            {category.description}
          </p>
        </div>
      </header>

      <div className={shared.sectionInner}>
        <div className={styles.listingGrid}>
          <div className={styles.listingMain} data-reveal style={revealDelay(1)}>
            <p className={styles.resultsMeta} aria-live="polite">
              Showing {articles.length}{" "}
              {articles.length === 1 ? "article" : "articles"} in{" "}
              {category.label}
            </p>

            {articles.length > 0 ? (
              <div className={shared.articleGrid}>
                {articles.map((article, index) => (
                  <ArticleCard
                    key={article.title}
                    article={article}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <p className={styles.listingEmpty}>
                No articles in this category yet - new stories are published
                regularly, so check back soon.
              </p>
            )}
          </div>

          <div className={styles.sidebarSticky}>
            <CategorySidebar activeLabel={category.label} />
          </div>
        </div>
      </div>
    </section>
  );
}