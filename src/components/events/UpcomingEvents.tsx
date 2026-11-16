import Link from "next/link";
import { ArrowRight } from "lucide-react";
import fallbackEventsData from "@/data/upcoming-events.json";
import {
  fetchUpcomingEvents,
  formatEventDate,
  resolveEventCoverImage,
  type BackendEvent,
} from "@/lib/backendApi";
import EventCard, { type EventItem } from "./EventCard";
import styles from "./events.module.css";

export default async function UpcomingEvents() {
  let events: EventItem[] = [];

  try {
    const data = await fetchUpcomingEvents({ status: "UPCOMING", limit: 6 });
    if (data.items && data.items.length > 0) {
      events = data.items.map((event: BackendEvent) => ({
        id: event.id,
        title: event.title,
        description:
          event.short_information ||
          event.description ||
          "Join our community initiative for human rights and public welfare.",
        date: formatEventDate(event.start_at),
        location: event.location || event.address || "India",
        status: "Upcoming",
        statusType: "open",
        image: resolveEventCoverImage(event.cover_image_url, event.category),
        action: {
          label: "Event Details",
          type: "link",
        },
        href: `/events/${event.id}`,
      }));
    }
  } catch (err) {
    console.warn("Could not fetch upcoming events from database:", err);
  }

  // Graceful fallback to verified curated items if database has no active upcoming events
  if (events.length === 0) {
    events = fallbackEventsData;
  }

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
