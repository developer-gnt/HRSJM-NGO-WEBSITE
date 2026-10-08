import Link from "next/link";
import shared from "./events.module.css";
import styles from "./allEvents.module.css";

export default function AllEventsHero() {
  return (
    <section className={styles.hero} aria-labelledby="all-events-heading">
      <span className={styles.heroDecor} aria-hidden="true" />
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">
            /
          </span>
          <Link href="/events" className={styles.breadcrumbLink}>
            Events &amp; Activities
          </Link>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">
            /
          </span>
          <span className={styles.breadcrumbCurrent}>All Events</span>
        </nav>

        <p className={`${shared.sectionEyebrow} ${styles.eyebrow}`}>
          <span className={shared.eyebrowDot} aria-hidden="true" />
          Events &amp; Activities
        </p>

        <h1 id="all-events-heading" className={styles.heading}>
          Upcoming Events
        </h1>
        <p className={styles.description}>
          Join our upcoming programs, drives and initiatives across India.
        </p>

        <span className={styles.heroStroke} aria-hidden="true">
          <span className={styles.heroStrokeDot} />
        </span>
      </div>
    </section>
  );
}