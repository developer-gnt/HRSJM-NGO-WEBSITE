import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import styles from "./events.module.css";

export default function FeaturedEvent() {
  return (
    <section id="featured-event" className={styles.featured} aria-labelledby="featured-event-heading">
      <div className={styles.sectionInner}>
        <div className={styles.featuredGrid}>
          <div className={styles.featuredBody}>
            <p className={styles.sectionEyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Featured Event
            </p>
            <h2 id="featured-event-heading" className={styles.featuredTitle}>
              <span className={styles.titleLine}>Legal Awareness Camp</span>
              <span className={styles.titleLine}>in Mumbai</span>
            </h2>
            <div className={styles.featuredMeta}>
              <span className={styles.metaItem}>
                <Calendar size={16} strokeWidth={2} className={styles.metaIcon} aria-hidden="true" />
                15 Oct 2026
              </span>
              <span className={styles.metaItem}>
                <MapPin size={16} strokeWidth={2} className={styles.metaIcon} aria-hidden="true" />
                Mumbai, Maharashtra
              </span>
            </div>
            <p className={styles.featuredDesc}>
              A special legal awareness camp to educate citizens about their
              fundamental rights, RTI, and how to seek legal help when their
              rights are violated.
            </p>
            <div className={styles.featuredActions}>
              <Link href="/events/all" className={styles.btnLight}>
                View Details
              </Link>
            </div>
          </div>

          <div className={styles.featuredMedia}>
            <Image
              src="/images/events-featured-legal-camp.png"
              alt="Legal Awareness Camp in Mumbai"
              width={1828}
              height={860}
              sizes="(min-width: 1024px) 55vw, (min-width: 640px) 58vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}