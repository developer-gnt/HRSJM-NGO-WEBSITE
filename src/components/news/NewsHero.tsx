"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  HeartHandshake,
  Megaphone,
  Newspaper,
  Scale,
  Tv,
} from "lucide-react";
import { useScrollReveal, revealDelay, revealStagger } from "@/hooks/useScrollReveal";
import styles from "./news.module.css";

const categories = [
  { icon: Newspaper, title: "Latest Articles", sub: "Fresh updates" },
  { icon: Megaphone, title: "Announcements", sub: "Official updates" },
  { icon: Scale, title: "Legal Insights", sub: "Understand your rights" },
  { icon: HeartHandshake, title: "Success Stories", sub: "Real people, real impact" },
  { icon: CalendarDays, title: "Events & Activities", sub: "Programs and campaigns" },
  { icon: Tv, title: "Media Coverage", sub: "In the news" },
];

export default function NewsHero() {
  const sectionRef = useScrollReveal(styles);

  return (
    <section ref={sectionRef} className={styles.hero} aria-labelledby="news-hero-heading">
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb" data-reveal>
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <ChevronRight size={13} strokeWidth={2} className={styles.breadcrumbSeparator} aria-hidden="true" />
          <span className={styles.breadcrumbCurrent} aria-current="page">
            News &amp; Blog
          </span>
        </nav>

        <div className={styles.heroMain}>
          <p className={styles.eyebrow} data-reveal style={revealDelay(1)}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            News &amp; Blog
          </p>
          <h1 id="news-hero-heading" className={styles.heading} data-reveal style={revealDelay(2)}>
            <span className={styles.headingLine}>Stories</span>
            <span className={styles.headingLine}>
              That <span className={styles.headingGold}>Drive Change.</span>
            </span>
          </h1>
          <p className={styles.description} data-reveal style={revealDelay(3)}>
            Latest updates, community stories, human rights insights and
            awareness resources from Human Rights &amp; Social Justice Mission.
          </p>
          <div className={styles.actions} data-reveal style={revealDelay(4)}>
            <Link href="#featured-article" className={styles.btnGold}>
              Browse Articles
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <p className={styles.scriptNote} aria-hidden="true">
          Informed.
          <br />
          Aware.
          <br />
          Empowered.
          <br />
          Together.
          <span className={styles.scriptStroke} />
        </p>

        <ul className={styles.categories} aria-label="News categories">
          {categories.map(({ icon: Icon, title, sub }, index) => (
            <li
              key={title}
              className={styles.category}
              data-reveal-item
              style={revealStagger(index)}
            >
              <span className={styles.categoryIcon}>
                <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className={styles.categoryText}>
                <span className={styles.categoryTitle}>{title}</span>
                <span className={styles.categorySub}>{sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
