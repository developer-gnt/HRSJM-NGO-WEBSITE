"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useScrollReveal, revealDelay } from "@/hooks/useScrollReveal";
import ArticleCard from "@/components/news/ArticleCard";
import NewsSidebar from "@/components/news/NewsSidebar";
import shared from "@/components/news/news.module.css";
import { formatNewsDate, resolveNewsThumbnail, type BackendNews } from "@/lib/backendApi";
import type { Article } from "@/data/articles";
import styles from "./allArticles.module.css";

export default function AllArticlesPage() {
  const sectionRef = useScrollReveal(shared);
  const [activeCategory, setActiveCategory] = useState<string>("All Articles");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadAllArticles() {
      try {
        const res = await fetch("/api/news?status=PUBLISHED&limit=100", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.items)) {
          const mapped: Article[] = data.items.map((item: BackendNews) => ({
            slug: item.slug || item.id,
            href: `/news/${item.slug || item.id}`,
            image: resolveNewsThumbnail(item.thumbnail_url, item.category),
            alt: item.title,
            category: item.category || "General News",
            title: item.title,
            description: item.summary || item.content?.slice(0, 140) || "",
            date: formatNewsDate(item.published_at),
            readTime: `${Math.max(1, Math.ceil((item.content?.split(/\s+/).length || 100) / 200))} min read`,
            author: item.author || "HRSJM Team",
          }));
          if (isMounted) setArticles(mapped);
        }
      } catch (err) {
        console.warn("Could not load all articles from database:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadAllArticles();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    return [
      "All Articles",
      ...Array.from(new Set(articles.map((article) => article.category))),
    ];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return activeCategory === "All Articles"
      ? articles
      : articles.filter(
          (article) => article.category.toLowerCase() === activeCategory.toLowerCase()
        );
  }, [activeCategory, articles]);

  return (
    <>
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
            <span className={styles.breadcrumbCurrent}>All Articles</span>
          </nav>

          <p className={styles.eyebrow} data-reveal>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Latest Articles
          </p>
          <h1 id="all-articles-heading" className={styles.heading} data-reveal style={revealDelay(1)}>
            Latest News &amp; Updates
          </h1>
          <p className={styles.description} data-reveal style={revealDelay(2)}>
            Explore our latest stories, insights, community updates and human rights news.
          </p>
        </div>
      </header>

      <section
        ref={sectionRef}
        className={styles.listing}
        aria-labelledby="all-articles-heading"
      >
        <div className={shared.sectionInner}>
          <div className={styles.filterRow} role="group" aria-label="Filter articles by category">
            {categories.map((category) => {
              const count =
                category === "All Articles"
                  ? articles.length
                  : articles.filter(
                      (article) => article.category.toLowerCase() === category.toLowerCase()
                    ).length;
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  className={`${styles.filterPill}${isActive ? ` ${styles.filterPillActive}` : ""}`}
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                  <span className={styles.filterCount}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.listingGrid}>
            <div className={styles.listingMain} data-reveal style={revealDelay(1)}>
              <p className={styles.resultsMeta} aria-live="polite">
                Showing {filteredArticles.length}{" "}
                {filteredArticles.length === 1 ? "article" : "articles"}
                {activeCategory !== "All Articles" ? ` in ${activeCategory}` : ""}
              </p>

              {filteredArticles.length > 0 ? (
                <div className={styles.articleGrid}>
                  {filteredArticles.map((article, index) => (
                    <ArticleCard
                      key={`${article.slug || article.title}-${index}`}
                      article={article}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "48px 24px",
                    background: "rgba(0,0,0,0.02)",
                    borderRadius: "12px",
                    margin: "24px 0",
                  }}
                >
                  <p style={{ color: "var(--color-navy-muted, #556987)", fontSize: "1.05rem" }}>
                    No published articles found in this category.
                  </p>
                </div>
              )}
            </div>

            <NewsSidebar />
          </div>
        </div>
      </section>
    </>
  );
}
