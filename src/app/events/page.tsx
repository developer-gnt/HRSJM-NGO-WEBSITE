import { createOpenGraph, createTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import EventsHero from "@/components/events/EventsHero";
import FeaturedEvent from "@/components/events/FeaturedEvent";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import PastActivities from "@/components/events/PastActivities";
import EventsImpact from "@/components/events/EventsImpact";
import Testimonials from "@/components/events/Testimonials";
import EventsNewsletter from "@/components/events/EventsNewsletter";
import EventsCTA from "@/components/events/EventsCTA";
import {
  fetchUpcomingEvents,
  formatEventDate,
  resolveEventCoverImage,
  type BackendEvent,
} from "@/lib/backendApi";
import type { ActivityItem } from "@/components/events/ActivityCard";
import type { EventItem } from "@/components/events/EventCard";

export const metadata: Metadata = {
  title: "Events & Community Activities | HRSJM",
  description:
    "Participate in nationwide legal awareness workshops, human rights rallies, charity drives, and grassroots community conferences organized by HRSJM across India.",
  keywords: [
    "HRSJM Events",
    "Human Rights Workshops India",
    "Legal Awareness Camps",
    "Social Justice Campaigns",
    "NGO Conferences India",
    "Community Drives Mumbai",
  ],
  alternates: {
    canonical: "/events",
  },
  openGraph: createOpenGraph({
    title: "Events & Community Activities | HRSJM",
    description: "Participate in nationwide legal awareness workshops, human rights rallies, charity drives, and grassroots community conferences organized by HRSJM across India.",
    urlPath: "/events",
    image: "/logo.png",
    imageAlt: "Events & Community Activities | HRSJM",
  }),
  twitter: createTwitter({
    title: "Events & Community Activities | HRSJM",
    description: "Participate in nationwide legal awareness workshops, human rights rallies, charity drives, and grassroots community conferences organized by HRSJM across India.",
    image: "/logo.png",
  }),
};

// Enable ISR (Incremental Static Regeneration) for fast page loads
export const revalidate = 60;

export default async function EventsPage() {
  let pastActivities: ActivityItem[] = [];
  let featuredEvent: BackendEvent | null = null;
  let upcomingEventItems: EventItem[] = [];

  try {
    // Parallelize requests to backend API instead of waterfalls
    const [upcomingData, completedData] = await Promise.all([
      fetchUpcomingEvents({ status: "UPCOMING", limit: 20 }),
      fetchUpcomingEvents({ status: "COMPLETED", limit: 20 }),
    ]);

    // 1. Process featured event from upcoming items
    if (upcomingData.items && upcomingData.items.length > 0) {
      const explicitlyFeatured = upcomingData.items.find((item: BackendEvent) =>
        item.tags && Array.isArray(item.tags) && item.tags.some((t: string) => {
          const clean = t.trim().toLowerCase();
          return clean === "featured" || clean === "featured event";
        })
      );
      featuredEvent = explicitlyFeatured || upcomingData.items[0];

      // Filter upcoming list so featured is not repeated if multiple exist
      const displayItems = (featuredEvent && upcomingData.items.length > 1)
        ? upcomingData.items.filter((item: BackendEvent) => item.id !== featuredEvent?.id)
        : upcomingData.items;

      upcomingEventItems = displayItems.map((event: BackendEvent) => ({
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
        isDonationEnabled: Boolean(event.is_donation_enabled),
      }));
    }

    // 2. Process completed events for past activities
    if (completedData.items && completedData.items.length > 0) {
      pastActivities = completedData.items.map((event) => ({
        id: event.id,
        title: event.title,
        subtitle: event.short_information || event.description?.slice(0, 80) || undefined,
        date: formatEventDate(event.start_at),
        location: event.location || event.address || "India",
        category: event.category || "Community",
        image: resolveEventCoverImage(event.cover_image_url, event.category),
        href: `/events/${event.id}`,
      }));
    }
  } catch (err) {
    console.warn("Could not fetch events for EventsPage:", err);
  }

  return (
    <>
      <EventsHero />
      <FeaturedEvent initialEvent={featuredEvent} />
      <UpcomingEvents initialEvents={upcomingEventItems} />
      <PastActivities initialActivities={pastActivities} />
      <EventsImpact />
      <Testimonials />
      <EventsNewsletter />
      <EventsCTA />
    </>
  );
}
