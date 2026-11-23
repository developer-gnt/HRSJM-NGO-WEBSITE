"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useScrollReveal, revealDelay } from "@/hooks/useScrollReveal";
import CategorySidebar from "./CategorySidebar";
import { formatNewsDate, resolveNewsThumbnail, type BackendNews } from "@/lib/backendApi";
import styles from "./news.module.css";

export default function FeaturedNews({
  initialArticle,
}: {
  initialArticle?: BackendNews | null;
}) {
  const sectionRef = useScrollReveal(styles);
  const [article, setArticle] = useState<BackendNews | null>(initialArticle || null);

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      try {
        const res = await fetch("/api/news?status=PUBLISHED&limit=1", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.items) && data.items.length > 0) {
          if (isMounted) setArticle(data.items[0]);
        }
      } catch (err) {
        console.warn("Could not load featured news:", err);
      }
    }
    loadFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!article) {
    return (
      <section
        ref={sectionRef}
        id="featured-article"
        className={styles.featured}
        aria-labelledby="featured-heading"
      >
        <div className={styles.sectionInner}>
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <h2 id="featured-heading" className={styles.sectionEyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Featured News
            </h2>
            <h3 className={styles.featuredTitle} style={{ marginTop: "12px" }}>
              No Featured Articles Published
            </h3>
            <p className={styles.featuredDesc} style={{ maxWidth: "600px", margin: "12px auto" }}>
              Articles and updates published by the HRSJM team will appear here dynamically.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const title = article.title;
  const description =
    article.summary || article.content?.slice(0, 160) || "Read the latest update from HRSJM.";
  const dateStr = formatNewsDate(article.published_at);
  const authorStr = article.author || "HRSJM Team";
  const categoryStr = article.category || "News";
  const imageSrc = resolveNewsThumbnail(article.thumbnail_url, article.category);
  const articleHref = `/news/${article.slug || article.id}`;
  const readTimeStr = `${Math.max(
    1,
    Math.ceil((article.content?.split(/\s+/).length || 100) / 200)
  )} min read`;
  const authorInitial = authorStr.charAt(0).toUpperCase() || "H";

  return (
    <section
      ref={sectionRef}
      id="featured-article"
      className={styles.featured}
      aria-labelledby="featured-heading"
    >
      <div className={styles.sectionInner}>
        <h2 id="featured-heading" className={styles.sectionEyebrow} data-reveal>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          Featured Article
        </h2>

        <div className={styles.featuredGrid}>
          <article className={styles.featuredCard} data-reveal style={revealDelay(1)}>
            <div className={styles.featuredMedia}>
              <Image
                src={imageSrc}
                alt={title}
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1023px) 55vw, 480px"
                unoptimized={imageSrc.startsWith("data:")}
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className={styles.featuredBody}>
              <div className={styles.featuredTags}>
                <span className={styles.tag}>{categoryStr}</span>
                <span className={`${styles.tag} ${styles.tagGold}`}>Featured</span>
              </div>

              <h3 className={styles.featuredTitle}>
                <Link href={articleHref}>{title}</Link>
              </h3>

              <p className={styles.featuredDesc}>{description}</p>

              <div className={styles.featuredMeta}>
                <span className={styles.avatar} aria-hidden="true">
                  {authorInitial}
                </span>
                <span className={styles.metaText}>
                  <span className={styles.author}>{authorStr}</span>
                  <span className={styles.metaInfo}>
                    {dateStr}{readTimeStr ? ` • ${readTimeStr}` : ""}
                  </span>
                </span>
              </div>

              <div className={styles.featuredAction}>
                <Link href={articleHref} className={styles.btnGold}>
                  Read Full Article
                  <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>

          <CategorySidebar activeLabel="All Posts" />
        </div>
      </div>
    </section>
  );
}
