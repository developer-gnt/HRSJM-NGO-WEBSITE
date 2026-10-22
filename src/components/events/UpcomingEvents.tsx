import Link from "next/link";
import { ArrowRight } from "lucide-react";
import eventsData from "@/data/upcoming-events.json";
import EventCard, { type EventItem } from "./EventCard";
import styles from "./events.module.css";

const events: EventItem[] = eventsData;

export default function UpcomingEvents() {
  return (
    <section
      id="upcoming-events"
      className={styles.upcoming}
      aria-labelledby="upcoming-events-heading"
    >
      <div className={styles.sectionInner}>
        <div className={styles.upcomingHeader}>
          <div>
            <p className={styles.sectionEyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Upcoming Events
            </p>
            <h2 id="upcoming-events-heading" className={styles.upcomingTitle}>
              Upcoming Events
            </h2>
            <p className={styles.upcomingSub}>
              Join our upcoming programs, drives and initiatives across India.
            </p>
          </div>

          <div className={styles.upcomingControls}>
            <Link href="/events/all" className={styles.viewAll}>
              View All Events
              <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className={styles.upcomingGrid}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}