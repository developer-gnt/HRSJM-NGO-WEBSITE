"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ArticleCard from "./ArticleCard";
import NewsSidebar from "./NewsSidebar";
import { formatNewsDate, resolveNewsThumbnail, type BackendNews } from "@/lib/backendApi";
import type { Article } from "@/data/articles";
import styles from "./news.module.css";

export default function LatestNews({
  initialArticles,
}: {
  initialArticles?: BackendNews[];
}) {
  const sectionRef = useScrollReveal(styles);
  const [articles, setArticles] = useState<Article[]>(() => {
    if (initialArticles && initialArticles.length > 0) {
      return initialArticles.map((item) => ({
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
    }
    return [];
  });

  useEffect(() => {
    let isMounted = true;
    async function loadLatestNews() {
      try {
        const res = await fetch("/api/news?status=PUBLISHED&limit=12", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.items)) {
          const list = data.items.length > 1 ? data.items.slice(1) : data.items;
          const mapped: Article[] = list.map((item: BackendNews) => ({
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
        console.warn("Could not load latest news:", err);
      }
    }
    loadLatestNews();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="latest-news"
      className={styles.latest}
      aria-labelledby="latest-heading"
    >
      <div className={styles.sectionInner}>
        <div className={styles.latestGrid}>
          <div className={styles.latestMain}>
            <div className={styles.latestHeader} data-reveal>
              <div>
                <p className={styles.sectionEyebrow}>
                  <span className={styles.eyebrowDot} aria-hidden="true" />
                  Latest Articles
                </p>
                <h2 id="latest-heading" className={styles.sectionTitle}>
                  Latest News &amp; Updates
                </h2>
              </div>
              <Link href="/articles" className={styles.viewAll}>
                View All Articles
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
              </Link>
            </div>

            {articles.length > 0 ? (
              <div className={styles.articleGrid}>
                {articles.map((article, index) => (
                  <ArticleCard key={`${article.slug || article.title}-${index}`} article={article} index={index} />
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
                  No published news articles available at the moment.
                </p>
              </div>
            )}
          </div>

          <NewsSidebar />
        </div>
      </div>
    </section>
  );
}
