"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { latestArticles as articles } from "@/data/articles";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ArticleCard from "./ArticleCard";
import NewsSidebar from "./NewsSidebar";
import styles from "./news.module.css";

export default function LatestNews() {
  const sectionRef = useScrollReveal(styles);

  return (
    <section ref={sectionRef} id="latest-news" className={styles.latest} aria-labelledby="latest-heading">
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

            <div className={styles.articleGrid}>
              {articles.map((article, index) => (
                <ArticleCard key={article.title} article={article} index={index} />
              ))}
            </div>
          </div>

          <NewsSidebar />
        </div>
      </div>
    </section>
  );
}
