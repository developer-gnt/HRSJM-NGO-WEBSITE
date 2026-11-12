import Link from "next/link";
import Icon from "@/components/ui/Icon";
import styles from "./successStories.module.css";

export default function SuccessStoriesHero() {
  return (
    <section className={styles.hero} aria-labelledby="success-stories-heading">
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">
            /
          </span>
          <span className={styles.breadcrumbCurrent} aria-current="page">
            Success Stories
          </span>
        </nav>

        <p className={styles.eyebrow}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          Human Stories
        </p>

        <h1 id="success-stories-heading" className={styles.heading}>
          Real Lives.{" "}
          <span className={styles.headingGold}>Real Impact.</span>
        </h1>

        <p className={styles.description}>
          Behind every case is a person whose life changed. These are the
          stories of the people and communities HRSJM stands with - proof that
          awareness, advocacy and support create lasting change.
        </p>

        <span className={styles.heroStroke} aria-hidden="true">
          <span className={styles.heroStrokeDot} />
        </span>
      </div>
    </section>
  );
}