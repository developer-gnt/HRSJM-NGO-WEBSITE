"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  HeartHandshake,
  Megaphone,
  Newspaper,
  Scale,
  Tv,
} from "lucide-react";
import { useScrollReveal, revealDelay, revealStagger } from "@/hooks/useScrollReveal";
import styles from "./news.module.css";

const categories = [
  { icon: Newspaper, label: "All Posts", count: 98, active: true },
  { icon: Megaphone, label: "Announcements", count: 12 },
  { icon: Scale, label: "Legal Insights", count: 26 },
  { icon: HeartHandshake, label: "Success Stories", count: 20 },
  { icon: CalendarDays, label: "Events & Activities", count: 22 },
  { icon: Tv, label: "Media Coverage", count: 18 },
];

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
                <Link href="#featured-article">
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
                <Link href="#featured-article" className={styles.btnGold}>
                  Read Full Article
                  <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>

          <aside className={styles.sidebar} aria-label="Article categories">
            <div className={styles.sidebarCard} data-reveal style={revealDelay(2)}>
              <h3 className={styles.sidebarTitle}>Categories</h3>
              <ul className={styles.categoryList}>
                {categories.map(({ icon: Icon, label, count, active }, index) => (
                  <li key={label} data-reveal-item style={revealStagger(index)}>
                    <Link
                      href="#featured-article"
                      className={`${styles.categoryItem}${active ? ` ${styles.categoryItemActive}` : ""}`}
                      aria-current={active ? "true" : undefined}
                    >
                      <span className={styles.categoryItemIcon}>
                        <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <span className={styles.categoryItemLabel}>{label}</span>
                      <span className={styles.categoryItemCount}>{count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
