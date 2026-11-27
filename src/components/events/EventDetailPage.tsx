import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  Tag,
  Users,
} from "lucide-react";
import allEventsData from "@/data/all-events.json";
import activitiesData from "@/data/activities.json";
import {
  fetchEventById,
  formatEventDate,
  formatEventTime,
  resolveEventCoverImage,
  type BackendEvent,
} from "@/lib/backendApi";
import HRSJMOrgOverview from "./HRSJMOrgOverview";
import HRSJM14YearsJourney from "./HRSJM14YearsJourney";
import HRSJMHistoryVision from "./HRSJMHistoryVision";
import HRSJMPovertyEradication from "./HRSJMPovertyEradication";
import HRSJMAdvancingRights from "./HRSJMAdvancingRights";
import HRSJMWorldFoodDay from "./HRSJMWorldFoodDay";
import EventCard, { type EventItem } from "./EventCard";
import shared from "./events.module.css";
import styles from "./eventDetail.module.css";

type AllEventsItem = EventItem & { category: string };

const events: AllEventsItem[] = allEventsData;

export function generateStaticParams() {
  const eventSlugs = events.map((event) => ({ slug: event.id }));
  const activitySlugs = activitiesData.map((activity) => ({ slug: activity.id }));
  return [
    ...eventSlugs,
    ...activitySlugs,
    { slug: "hrsjm-organisation-overview" },
    { slug: "organisation-overview" },
    { slug: "human-rights-awareness-rally" },
    { slug: "free-legal-aid-camp" },
    { slug: "womens-rights-awareness-program" },
    { slug: "community-cleanliness-drive" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug === "hrsjm-organisation-overview" || slug === "organisation-overview") {
    return {
      title: "Organisation Overview | HRSJM",
      description:
        "Learn about HRSJM's mission, constitutional focus areas, leadership and nationwide community programs across India.",
      alternates: {
        canonical: `/events/${slug}`,
      },
    };
  }

  const activity =
    activitiesData.find((item) => item.id === slug) ||
    (slug === "human-rights-awareness-rally" ? activitiesData[0] : undefined) ||
    (slug === "free-legal-aid-camp" ? activitiesData[1] : undefined) ||
    (slug === "womens-rights-awareness-program" ? activitiesData[2] : undefined) ||
    (slug === "community-cleanliness-drive" ? activitiesData[3] : undefined);

  if (activity) {
    const desc = `Explore ${activity.title} in ${activity.location} and HRSJM's organizational overview.`;
    return {
      title: `${activity.title} | HRSJM Events`,
      description: desc.slice(0, 155),
      alternates: {
        canonical: `/events/${slug}`,
      },
    };
  }

  // 1. Check central database first
  try {
    const dbEvent = await fetchEventById(slug);
    if (dbEvent) {
      const desc = dbEvent.short_information || dbEvent.description || "Human rights community events and activities by HRSJM.";
      return {
        title: `${dbEvent.title} | HRSJM Events`,
        description: desc.slice(0, 155),
        alternates: {
          canonical: `/events/${slug}`,
        },
      };
    }
  } catch { }

  // 2. Check static data
  const staticEvent = events.find((item) => item.id === slug);
  if (staticEvent) {
    const desc = staticEvent.description || "HRSJM community activities and events in action.";
    return {
      title: `${staticEvent.title} | HRSJM Events`,
      description: desc.slice(0, 155),
      alternates: {
        canonical: `/events/${slug}`,
      },
    };
  }

  return {
    title: "Event Details | HRSJM",
    description: "Join HRSJM events, workshops and legal aid clinics across India.",
    alternates: {
      canonical: `/events/${slug}`,
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "hrsjm-organisation-overview" || slug === "organisation-overview") {
    return <HRSJMOrgOverview />;
  }

  const activity =
    activitiesData.find((item) => item.id === slug) ||
    (slug === "human-rights-awareness-rally" ? activitiesData[0] : undefined) ||
    (slug === "free-legal-aid-camp" ? activitiesData[1] : undefined) ||
    (slug === "womens-rights-awareness-program" ? activitiesData[2] : undefined) ||
    (slug === "community-cleanliness-drive" ? activitiesData[3] : undefined);

  if (slug === "human-rights-social-justice-mission-14-years-journey" || slug === "free-legal-aid-camp") {
    return <HRSJM14YearsJourney activity={activity || activitiesData[1]} />;
  }

  if (
    slug === "human-rights-social-justice-mission-history-vision-social-contribution" ||
    slug === "womens-rights-awareness-program"
  ) {
    return <HRSJMHistoryVision activity={activity || activitiesData[2]} />;
  }

  if (
    slug === "international-day-for-the-eradication-of-poverty-17-october" ||
    slug === "community-cleanliness-drive"
  ) {
    return <HRSJMPovertyEradication activity={activity || activitiesData[3]} />;
  }

  if (slug === "advancing-human-rights-and-social-justice-in-india") {
    return <HRSJMAdvancingRights activity={activity || activitiesData[4]} />;
  }

  if (slug === "world-food-day-human-rights-and-social-justice-mission") {
    return <HRSJMWorldFoodDay activity={activity || activitiesData[5]} />;
  }

  if (activity) {
    return <HRSJMOrgOverview activity={activity} />;
  }

  // 1. Query central database by ID
  let rawDbEvent: BackendEvent | null = null;
  let matchedEvent: AllEventsItem | null = null;

  try {
    rawDbEvent = await fetchEventById(slug);
    if (rawDbEvent) {
      matchedEvent = {
        id: rawDbEvent.id,
        title: rawDbEvent.title,
        category: rawDbEvent.category || "General Event",
        description: rawDbEvent.description || rawDbEvent.short_information || "",
        date: formatEventDate(rawDbEvent.start_at),
        location: rawDbEvent.location || rawDbEvent.address || "India",
        status: rawDbEvent.status === "UPCOMING" ? "Upcoming" : "Completed",
        statusType: rawDbEvent.status === "UPCOMING" ? "open" : "completed",
        image: resolveEventCoverImage(rawDbEvent.cover_image_url, rawDbEvent.category),
        action: { label: "Event Details", type: "link" },
        href: `/events/${rawDbEvent.id}`,
      };
    }
  } catch (err) {
    console.warn("Event lookup error:", err);
  }

  // 2. Check static events as fallback for legacy named routes
  if (!matchedEvent) {
    matchedEvent = events.find((item) => item.id === slug) || null;
  }

  if (!matchedEvent) {
    notFound();
  }

  const statusClass =
    matchedEvent.statusType === "open" ? styles.statusOpen : styles.statusSoon;

  const relatedEvents = events
    .filter(
      (item) => item.id !== matchedEvent!.id && item.category === matchedEvent!.category
    )
    .slice(0, 3);

  const eventTimeStr = rawDbEvent
    ? formatEventTime(rawDbEvent.start_at, rawDbEvent.end_at, rawDbEvent.all_day)
    : "10:00 AM onwards";

  const eventVenueStr = rawDbEvent?.address || matchedEvent.location;
  const isDonationEnabled = Boolean(rawDbEvent?.is_donation_enabled);
  const donateHref = `/donation?event_id=${matchedEvent.id}&cause=${encodeURIComponent(
    "Event: " + matchedEvent.title
  )}`;

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
          <span className={styles.breadcrumbCurrent}>{matchedEvent.title}</span>
        </nav>

        <article className={styles.card}>
          <div className={styles.media}>
            <Image
              src={matchedEvent.image}
              alt={matchedEvent.title}
              fill
              sizes="(min-width: 768px) 48vw, 100vw"
              unoptimized={matchedEvent.image?.startsWith("data:")}
              style={{ objectFit: "cover" }}
            />
            {isDonationEnabled && (
              <span className={styles.donationBadgeOverMedia}>
                <Heart size={11} fill="currentColor" aria-hidden="true" />
                Featured for Donation
              </span>
            )}
          </div>

          <div className={styles.body}>
            <div className={styles.metaRow}>
              <span className={styles.date}>{matchedEvent.date}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                {isDonationEnabled && (
                  <span className={styles.donationBadge}>
                    <Heart size={10} fill="currentColor" aria-hidden="true" />
                    Featured for Donation
                  </span>
                )}
                <span className={`${styles.status} ${statusClass}`}>
                  {matchedEvent.status}
                </span>
              </div>
            </div>

            <h1 id="event-detail-heading" className={styles.title}>
              {matchedEvent.title}
            </h1>

            <p className={styles.location}>
              <MapPin size={14} strokeWidth={2} aria-hidden="true" />
              {matchedEvent.location}
            </p>

            <p className={styles.desc}>{matchedEvent.description}</p>

            <ul className={styles.facts} style={{ listStyle: "none" }}>
              <li className={styles.fact}>
                <span className={styles.factLabel}>
                  <CalendarDays size={14} strokeWidth={2} aria-hidden="true" />
                  Date
                </span>
                <span className={styles.factValue}>{matchedEvent.date}</span>
              </li>
              <li className={styles.fact}>
                <span className={styles.factLabel}>
                  <Clock size={14} strokeWidth={2} aria-hidden="true" />
                  Timings
                </span>
                <span className={styles.factValue}>{eventTimeStr}</span>
              </li>
              <li className={styles.fact}>
                <span className={styles.factLabel}>
                  <MapPin size={14} strokeWidth={2} aria-hidden="true" />
                  Venue / Location
                </span>
                <span className={styles.factValue}>{eventVenueStr}</span>
              </li>
              <li className={styles.fact}>
                <span className={styles.factLabel}>
                  <Tag size={14} strokeWidth={2} aria-hidden="true" />
                  Category
                </span>
                <span className={styles.factValue}>{matchedEvent.category}</span>
              </li>
              <li className={styles.fact}>
                <span className={styles.factLabel}>
                  <Users size={14} strokeWidth={2} aria-hidden="true" />
                  Entry
                </span>
                <span className={styles.factValue}>
                  {rawDbEvent?.registration_required
                    ? "Registration Required"
                    : "Free Entry / Open to Public"}
                </span>
              </li>
              {rawDbEvent?.capacity ? (
                <li className={styles.fact}>
                  <span className={styles.factLabel}>
                    <Users size={14} strokeWidth={2} aria-hidden="true" />
                    Capacity
                  </span>
                  <span className={styles.factValue}>
                    {rawDbEvent.capacity} Attendees
                  </span>
                </li>
              ) : null}
            </ul>

            <div className={styles.actions} style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
              <Link href="/events/" className={styles.btnLight}>
                <ArrowLeft size={15} strokeWidth={2.2} aria-hidden="true" />
                Back to All Events
              </Link>
              {isDonationEnabled && (
                <Link
                  href={donateHref}
                  className={shared.btnGold}
                  style={{
                    color: "#0a2540",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    borderRadius: "8px",
                  }}
                >
                  <Heart size={16} fill="currentColor" aria-hidden="true" />
                  Donate for this Event
                </Link>
              )}
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
