import { createOpenGraph } from "@/lib/seo";
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
} from "@/lib/backendApi";
import type { ActivityItem } from "@/components/events/ActivityCard";

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
};

export const revalidate = 60;

export default async function EventsPage() {
  let pastActivities: ActivityItem[] = [];

  try {
    const data = await fetchUpcomingEvents({ status: "COMPLETED", limit: 50 });
    if (data.items && data.items.length > 0) {
      pastActivities = data.items.map((event) => ({
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
    console.warn("Could not fetch past events for SSR:", err);
  }

  return (
    <>
      <EventsHero />
      <FeaturedEvent />
      <UpcomingEvents />
      <PastActivities initialActivities={pastActivities} />
      <EventsImpact />
      <Testimonials />
      <EventsNewsletter />
      <EventsCTA />
    </>
  );
}
