import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import styles from "./events.module.css";

export type EventItem = {
  id: string;
  date: string;
  title: string;
  location: string;
  description: string;
  status: string;
  statusType: string;
  image: string;
  href?: string;
  action: {
    label: string;
    type: string;
  };
};

const actionHrefs: Record<string, string> = {
  details: "#featured-event",
  notify: "#events-newsletter",
};

export default function EventCard({ event }: { event: EventItem }) {
  const statusClass =
    event.statusType === "open" ? styles.statusOpen : styles.statusSoon;

  return (
    <article className={styles.eventCard}>
      <div className={styles.eventMedia}>
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 432px, (min-width: 640px) 50vw, 100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.eventBody}>
        <div className={styles.eventTop}>
          <span className={styles.eventDate}>{event.date}</span>
          <span className={`${styles.eventStatus} ${statusClass}`}>
            {event.status}
          </span>
        </div>
        <h3 className={styles.eventTitle}>{event.title}</h3>
        <p className={styles.eventLocation}>
          <MapPin size={14} strokeWidth={2} aria-hidden="true" />
          {event.location}
        </p>
        <p className={styles.eventDesc}>{event.description}</p>
        <Link
          href={event.href ?? actionHrefs[event.action.type] ?? "#event-details"}
          className={styles.eventCta}
        >
          {event.action.label}
          <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}