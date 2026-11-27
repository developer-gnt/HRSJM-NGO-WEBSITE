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

export default async function FeaturedEvent({
  initialEvent,
}: {
  initialEvent?: BackendEvent | null;
} = {}) {
  let featuredEvent: BackendEvent | null = initialEvent !== undefined ? initialEvent : null;

  if (initialEvent === undefined) {
    try {
      const data = await fetchUpcomingEvents({ limit: 50 });
      if (data.items && data.items.length > 0) {
        // Prioritize the event specifically tagged as Featured in Admin WebApp
        const explicitlyFeatured = data.items.find((item: BackendEvent) =>
          item.tags && Array.isArray(item.tags) && item.tags.some((t: string) => {
            const clean = t.trim().toLowerCase();
            return clean === "featured" || clean === "featured event";
          })
        );

        if (explicitlyFeatured) {
          featuredEvent = explicitlyFeatured;
        } else {
          // Fallback to first upcoming event if none explicitly tagged
          featuredEvent = data.items.find((i: BackendEvent) => i.status === "UPCOMING") || data.items[0];
        }
      }
    } catch (err) {
      console.warn("Could not fetch featured event from database:", err);
    }
  }

  if (!featuredEvent) {
    return (
      <section id="featured-event" className={styles.featured} aria-labelledby="featured-event-heading">
        <div className={styles.sectionInner}>
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <p className={styles.sectionEyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Featured Event
            </p>
            <h2 id="featured-event-heading" className={styles.featuredTitle}>
              No Featured Event Scheduled
            </h2>
            <p className={styles.featuredDesc} style={{ maxWidth: "600px", margin: "12px auto" }}>
              There are currently no upcoming events scheduled. Please check back later or explore our past activities.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const title = featuredEvent.title;
  const dateStr = formatEventDate(featuredEvent.start_at);
  const locationStr = featuredEvent.location || featuredEvent.address || "India";
  const description =
    featuredEvent.short_information ||
    featuredEvent.description ||
    "Join our community initiative for human rights and public welfare.";
  const imageSrc = resolveEventCoverImage(featuredEvent.cover_image_url, featuredEvent.category);
  const detailHref = `/events/${featuredEvent.id}`;
  const donateHref = `/donation?event_id=${featuredEvent.id}&cause=${encodeURIComponent("Event: " + featuredEvent.title)}`;

  return (
    <section id="featured-event" className={styles.featured} aria-labelledby="featured-event-heading">
      <div className={styles.sectionInner}>
        <div className={styles.featuredGrid}>
          <div className={styles.featuredBody}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "6px" }}>
              <p className={styles.sectionEyebrow} style={{ margin: 0 }}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Featured Event
              </p>
              {Boolean(featuredEvent.is_donation_enabled) && (
                <span className={styles.donationBadgeInline}>
                  <Heart size={11} fill="currentColor" aria-hidden="true" />
                  Featured for Donation
                </span>
              )}
            </div>
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
              {Boolean(featuredEvent.is_donation_enabled) && (
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
              )}
            </div>
          </div>

          <div className={styles.featuredMedia} style={{ position: "relative", minHeight: "300px" }}>
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(min-width: 1024px) 55vw, (min-width: 640px) 58vw, 100vw"
              unoptimized={imageSrc.startsWith("data:")}
              style={{ objectFit: "cover", borderRadius: "12px" }}
            />
            {Boolean(featuredEvent.is_donation_enabled) && (
              <span className={styles.donationBadgeOverMedia}>
                <Heart size={11} fill="currentColor" aria-hidden="true" />
                Featured for Donation
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
