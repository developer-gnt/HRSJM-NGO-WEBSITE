import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Clock,
  MapPin,
  Tag,
  Users,
} from "lucide-react";
import allEventsData from "@/data/all-events.json";
import EventCard, { type EventItem } from "./EventCard";
import shared from "./events.module.css";
import styles from "./eventDetail.module.css";

type AllEventsItem = EventItem & { category: string };

const events: AllEventsItem[] = allEventsData;

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((item) => item.id === slug);
  if (!event) return { title: "Event Not Found" };
  return { title: event.title, description: event.description };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((item) => item.id === slug);
  if (!event) notFound();

  const statusClass =
    event.statusType === "open" ? styles.statusOpen : styles.statusSoon;

  const relatedEvents = events
    .filter(
      (item) => item.id !== event.id && item.category === event.category
    )
    .slice(0, 3);

  return (
    <div className={shared.sectionInner}>
      <section className={styles.detail} aria-labelledby="event-detail-heading">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <ChevronRight size={13} strokeWidth={2} className={styles.breadcrumbSeparator} aria-hidden="true" />
          <Link href="/events" className={styles.breadcrumbLink}>
            Events &amp; Activities
          </Link>
          <ChevronRight size={13} strokeWidth={2} className={styles.breadcrumbSeparator} aria-hidden="true" />
          <Link href="/events/all" className={styles.breadcrumbLink}>
            Upcoming Events
          </Link>
          <ChevronRight size={13} strokeWidth={2} className={styles.breadcrumbSeparator} aria-hidden="true" />
          <span className={styles.breadcrumbCurrent}>{event.title}</span>
        </nav>

        <article className={styles.card}>
          <div className={styles.media}>
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(min-width: 768px) 48vw, 100vw"
            />
          </div>

          <div className={styles.body}>
            <div className={styles.metaRow}>
              <span className={styles.date}>{event.date}</span>
              <span className={`${styles.status} ${statusClass}`}>
                {event.status}
              </span>
            </div>

            <h1 id="event-detail-heading" className={styles.title}>
              {event.title}
            </h1>

            <p className={styles.location}>
              <MapPin size={14} strokeWidth={2} aria-hidden="true" />
              {event.location}
            </p>

            <p className={styles.desc}>{event.description}</p>

            <ul className={styles.facts} style={{ listStyle: "none" }}>
              <li className={styles.fact}>
                <span className={styles.factLabel}>
                  <CalendarDays size={14} strokeWidth={2} aria-hidden="true" />
                  Date
                </span>
                <span className={styles.factValue}>{event.date}</span>
              </li>
              <li className={styles.fact}>
                <span className={styles.factLabel}>
                  <MapPin size={14} strokeWidth={2} aria-hidden="true" />
                  Location
                </span>
                <span className={styles.factValue}>{event.location}</span>
              </li>
              <li className={styles.fact}>
                <span className={styles.factLabel}>
                  <Tag size={14} strokeWidth={2} aria-hidden="true" />
                  Category
                </span>
                <span className={styles.factValue}>{event.category}</span>
              </li>
              <li className={styles.fact}>
                <span className={styles.factLabel}>
                  <Users size={14} strokeWidth={2} aria-hidden="true" />
                  Entry
                </span>
                <span className={styles.factValue}>Free for all</span>
              </li>
              <li className={styles.fact}>
                <span className={styles.factLabel}>
                  <Clock size={14} strokeWidth={2} aria-hidden="true" />
                  Timings
                </span>
                <span className={styles.factValue}>10:00 AM onwards</span>
              </li>
            </ul>

            <div className={styles.actions}>
              <Link href="/events/all" className={styles.btnLight}>
                <ArrowLeft size={15} strokeWidth={2.2} aria-hidden="true" />
                Back to All Events
              </Link>
            </div>
          </div>
        </article>

        {relatedEvents.length > 0 && (
          <section
            style={{ marginTop: "56px" }}
            aria-labelledby="related-events-heading"
          >
            <p className={shared.sectionEyebrow}>
              <span className={shared.eyebrowDot} aria-hidden="true" />
              More From This Category
            </p>
            <h2
              id="related-events-heading"
              className={shared.upcomingTitle}
              style={{ marginTop: "10px" }}
            >
              You May Also Like
            </h2>
            <div className={shared.upcomingGrid}>
              {relatedEvents.map((item) => (
                <EventCard key={item.id} event={item} />
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  );
}