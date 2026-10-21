"use client";

import { useState } from "react";
import Link from "next/link";
import { latestArticles } from "@/data/articles";
import { useScrollReveal, revealDelay } from "@/hooks/useScrollReveal";
import ArticleCard from "@/components/news/ArticleCard";
import NewsSidebar from "@/components/news/NewsSidebar";
import shared from "@/components/news/news.module.css";
import styles from "./allArticles.module.css";

/* All Articles page. Every card comes from the shared article data (the
   same source the Latest News grid and category listings read); the
   category filter narrows the grid client-side without removing anything
   from the data. */
export default function AllArticlesPage() {
  const sectionRef = useScrollReveal(shared);
  const [activeCategory, setActiveCategory] = useState<string>("All Articles");

  const categories = [
    "All Articles",
    ...Array.from(new Set(latestArticles.map((article) => article.category))),
  ];

  const filteredArticles =
    activeCategory === "All Articles"
      ? latestArticles
      : latestArticles.filter((article) => article.category === activeCategory);

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
            Explore our latest stories, insights, community updates and human
            rights news.
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
                  ? latestArticles.length
                  : latestArticles.filter((article) => article.category === category).length;
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
                <div className={shared.articleGrid}>
                  {filteredArticles.map((article, index) => (
                    <ArticleCard
                      key={article.title}
                      article={article}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <p className={styles.listingEmpty}>
                  No articles in this category yet — new stories are published
                  regularly, so check back soon.
                </p>
              )}
            </div>

            <NewsSidebar />
          </div>
        </div>
      </section>
    </>
  );
}
