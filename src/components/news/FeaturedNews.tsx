"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { featuredArticle } from "@/data/articles";
import { useScrollReveal, revealDelay } from "@/hooks/useScrollReveal";
import CategorySidebar from "./CategorySidebar";
import styles from "./news.module.css";

export default function FeaturedNews() {
  const sectionRef = useScrollReveal(styles);

  return (
    <section ref={sectionRef} className={styles.featured} aria-labelledby="featured-heading">
      <div className={styles.sectionInner}>
        <h2 id="featured-heading" className={styles.sectionEyebrow} data-reveal>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          Featured Article
        </h2>

        <div className={styles.featuredGrid}>
          <article className={styles.featuredCard} data-reveal style={revealDelay(1)}>
            <div className={styles.featuredMedia}>
              <Image
                src="/images/news-featured-supreme-court.png"
                alt="Supreme Court of India at sunset, seen through trees along the approach avenue"
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1023px) 55vw, 480px"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className={styles.featuredBody}>
              <div className={styles.featuredTags}>
                <span className={styles.tag}>Legal &bull; Human Rights</span>
                <span className={`${styles.tag} ${styles.tagGold}`}>Featured</span>
              </div>

              <h3 className={styles.featuredTitle}>
                <Link href={featuredArticle.href ?? "/featured-article"}>
                  Strengthening Fundamental Rights in a Changing India
                </Link>
              </h3>

              <p className={styles.featuredDesc}>
                An in-depth look at recent developments in human rights and the
                importance of constitutional and community-centered action.
              </p>

              <div className={styles.featuredMeta}>
                <span className={styles.avatar} aria-hidden="true">
                  H
                </span>
                <span className={styles.metaText}>
                  <span className={styles.author}>HRSJM Editorial Team</span>
                  <span className={styles.metaInfo}>Sep 24, 2025 &bull; 8 min read</span>
                </span>
              </div>

              <div className={styles.featuredAction}>
                <Link href={featuredArticle.href ?? "/featured-article"} className={styles.btnGold}>
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
