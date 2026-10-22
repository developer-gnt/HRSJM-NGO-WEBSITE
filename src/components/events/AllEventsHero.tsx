import Link from "next/link";
import {
  ChevronRight,
  Flag,
  GraduationCap,
  Megaphone,
  Scale,
  UsersRound,
} from "lucide-react";
import styles from "./allEvents.module.css";

const categories = [
  { icon: Megaphone, title: "Awareness Programs", sub: "Spread knowledge" },
  { icon: Scale, title: "Legal Aid Camps", sub: "Support & guidance" },
  { icon: UsersRound, title: "Community Outreach", sub: "On-ground impact" },
  { icon: GraduationCap, title: "Workshops & Seminars", sub: "Empower through learning" },
  { icon: Flag, title: "Campaigns & Drives", sub: "For a better tomorrow" },
];

export default function AllEventsHero() {
  return (
    <section className={styles.hero} aria-labelledby="all-events-heading">
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <ChevronRight
            size={13}
            strokeWidth={2}
            className={styles.breadcrumbSeparator}
            aria-hidden="true"
          />
          <Link href="/events" className={styles.breadcrumbLink}>
            Events &amp; Activities
          </Link>
          <ChevronRight
            size={13}
            strokeWidth={2}
            className={styles.breadcrumbSeparator}
            aria-hidden="true"
          />
          <span className={styles.breadcrumbCurrent} aria-current="page">
            Upcoming Events
          </span>
        </nav>

        <div className={styles.heroMain}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Events &amp; Activities Calendar
          </p>

          <h1 id="all-events-heading" className={styles.heading}>
            <span className={styles.headingLine}>All Upcoming</span>
            <span className={styles.headingGold}>Events &amp; Programs</span>
          </h1>

          <p className={styles.description}>
            Explore all scheduled workshops, legal aid camps, community drives,
            and empowerment sessions across India. Find an event in your city and
            register to participate.
          </p>
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
          {categories.map(({ icon: Icon, title, sub }) => (
            <li key={title} className={styles.category}>
              <span className={styles.categoryIcon}>
                <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
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