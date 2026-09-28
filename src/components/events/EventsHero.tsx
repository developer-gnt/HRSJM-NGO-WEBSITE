"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Flag,
  GraduationCap,
  Megaphone,
  Play,
  Scale,
  UsersRound,
} from "lucide-react";
import { useScrollReveal, revealDelay, revealStagger } from "@/hooks/useScrollReveal";
import styles from "./events.module.css";

const activities = [
  { icon: Megaphone, title: "Awareness Programs", sub: "Spread knowledge" },
  { icon: Scale, title: "Legal Aid Camps", sub: "Support & guidance" },
  { icon: UsersRound, title: "Community Outreach", sub: "On-ground impact" },
  { icon: GraduationCap, title: "Educational Workshops", sub: "Empower through learning" },
  { icon: Flag, title: "Campaigns & Drives", sub: "For a better tomorrow" },
];

export default function EventsHero() {
  const sectionRef = useScrollReveal(styles);

  return (
    <section ref={sectionRef} className={styles.hero} aria-labelledby="events-hero-heading">
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb" data-reveal>
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <ChevronRight size={13} strokeWidth={2} className={styles.breadcrumbSeparator} aria-hidden="true" />
          <span className={styles.breadcrumbCurrent} aria-current="page">
            Events &amp; Activities
          </span>
        </nav>

        <div className={styles.heroMain}>
          <p className={styles.eyebrow} data-reveal style={revealDelay(1)}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Events &amp; Activities
          </p>
          <h1 id="events-hero-heading" className={styles.heading} data-reveal style={revealDelay(2)}>
            <span className={styles.headingLine}>People. Actions.</span>
            <span className={styles.headingLine}>
              <span className={styles.headingGold}>Stronger Communities.</span>
            </span>
          </h1>
          <p className={styles.description} data-reveal style={revealDelay(3)}>
            Explore our events, campaigns and community activities working
            towards a more just, equal and inclusive India.
          </p>
          <div className={styles.actions} data-reveal style={revealDelay(4)}>
            <Link href="#upcoming-events" className={styles.btnGold}>
              Upcoming Events
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <Link href="#activities" className={styles.btnGhost}>
              <Play size={15} strokeWidth={2.2} aria-hidden="true" />
              Our Activities
            </Link>
          </div>
        </div>

        <p className={styles.scriptNote} aria-hidden="true">
          Together
          <br />
          We Create
          <br />
          Real Change.
          <span className={styles.scriptStroke} />
        </p>

        <ul className={styles.categories} aria-label="Event and activity categories">
          {activities.map(({ icon: Icon, title, sub }, index) => (
            <li
              key={title}
              className={styles.category}
              data-reveal-item
              style={revealStagger(index)}
            >
              <span className={styles.categoryIcon}>
                <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
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
