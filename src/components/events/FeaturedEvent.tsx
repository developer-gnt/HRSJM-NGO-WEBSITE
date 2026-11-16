import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Heart } from "lucide-react";
import {
  fetchUpcomingEvents,
  formatEventDate,
  resolveEventCoverImage,
  type BackendEvent,
} from "@/lib/backendApi";
import styles from "./events.module.css";

export default async function FeaturedEvent() {
  let featuredEvent: BackendEvent | null = null;

  try {
    const data = await fetchUpcomingEvents({ status: "UPCOMING", limit: 1 });
    if (data.items && data.items.length > 0) {
      featuredEvent = data.items[0];
    }
  } catch (err) {
    console.warn("Could not fetch featured event from database:", err);
  }

  const title = featuredEvent?.title || "Legal Awareness Camp in Mumbai";
  const dateStr = featuredEvent ? formatEventDate(featuredEvent.start_at) : "15 Oct 2026";
  const locationStr = featuredEvent
    ? featuredEvent.location || featuredEvent.address || "Maharashtra, India"
    : "Mumbai, Maharashtra";
  const description =
    featuredEvent?.short_information ||
    featuredEvent?.description ||
    "A special legal awareness camp to educate citizens about their fundamental rights, RTI, and how to seek legal help when their rights are violated.";
  const imageSrc = featuredEvent
    ? resolveEventCoverImage(featuredEvent.cover_image_url, featuredEvent.category)
    : "/images/events-featured-legal-camp.jpg";
  const detailHref = featuredEvent ? `/events/${featuredEvent.id}` : "/events/all";
  const donateHref = featuredEvent
    ? `/donation?event_id=${featuredEvent.id}&cause=${encodeURIComponent("Event: " + featuredEvent.title)}`
    : "/donation";

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
              <span className={styles.titleLine}>{title}</span>
            </h2>
            <div className={styles.featuredMeta}>
              <span className={styles.metaItem}>
                <Calendar size={16} strokeWidth={2} className={styles.metaIcon} aria-hidden="true" />
                {dateStr}
              </span>
              <span className={styles.metaItem}>
                <MapPin size={16} strokeWidth={2} className={styles.metaIcon} aria-hidden="true" />
                {locationStr}
              </span>
            </div>
            <p className={styles.featuredDesc}>{description}</p>
            <div className={styles.featuredActions} style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
              <Link href={detailHref} className={styles.btnLight}>
                View Details
              </Link>
              <Link
                href={donateHref}
                className={styles.btnGold}
                style={{
                  color: "#0a2540",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <Heart size={15} fill="currentColor" aria-hidden="true" />
                Donate for Event
              </Link>
            </div>
          </div>

          <div className={styles.featuredMedia} style={{ position: "relative", minHeight: "300px" }}>
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(min-width: 1024px) 55vw, (min-width: 640px) 58vw, 100vw"
              style={{ objectFit: "cover", borderRadius: "12px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
