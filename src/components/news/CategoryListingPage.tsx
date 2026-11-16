"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { findArticleCategory } from "@/data/articleCategories";
import { notFound } from "next/navigation";
import { useScrollReveal, revealDelay } from "@/hooks/useScrollReveal";
import ArticleCard from "./ArticleCard";
import CategorySidebar from "./CategorySidebar";
import shared from "./news.module.css";
import styles from "./categoryListing.module.css";
import { formatNewsDate, resolveNewsThumbnail, type BackendNews } from "@/lib/backendApi";
import type { Article } from "@/data/articles";

export default function CategoryListingPage({ slug }: { slug: string }) {
  const sectionRef = useScrollReveal(shared);
  const category = findArticleCategory(slug);

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;
    const catLabel = category.label;
    let isMounted = true;
    async function loadCategoryNews() {
      try {
        const res = await fetch(
          `/api/news?status=PUBLISHED&category=${encodeURIComponent(catLabel)}&limit=50`,
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.items)) {
          const mapped: Article[] = data.items.map((item: BackendNews) => ({
            slug: item.slug || item.id,
            href: `/news/${item.slug || item.id}`,
            image: resolveNewsThumbnail(item.thumbnail_url, item.category),
            alt: item.title,
            category: item.category || catLabel,
            title: item.title,
            description: item.summary || item.content?.slice(0, 140) || "",
            date: formatNewsDate(item.published_at),
            readTime: `${Math.max(
              1,
              Math.ceil((item.content?.split(/\s+/).length || 100) / 200)
            )} min read`,
            author: item.author || "HRSJM Team",
          }));
          if (isMounted) setArticles(mapped);
        }
      } catch (err) {
        console.warn("Could not load category news:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadCategoryNews();
    return () => {
      isMounted = false;
    };
  }, [category]);

  if (!category) notFound();

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
                    key={article.slug || article.title}
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
