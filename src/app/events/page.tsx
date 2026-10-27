import type { Metadata } from "next";
import EventsHero from "@/components/events/EventsHero";
import FeaturedEvent from "@/components/events/FeaturedEvent";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import PastActivities from "@/components/events/PastActivities";
import EventsImpact from "@/components/events/EventsImpact";
import Testimonials from "@/components/events/Testimonials";
import EventsNewsletter from "@/components/events/EventsNewsletter";
import EventsCTA from "@/components/events/EventsCTA";

export const metadata: Metadata = {
  title: "Events & Community Activities - Human Rights & Social Justice Mission",
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
  openGraph: {
    title: "HRSJM Events & Community Activities",
    description:
      "Join our public seminars, legal clinics, and human rights campaigns across Indian states.",
    url: "https://hrsjm.org/events",
  },
};

export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <FeaturedEvent />
      <UpcomingEvents />
      <PastActivities />
      <EventsImpact />
      <Testimonials />
      <EventsNewsletter />
      <EventsCTA />
    </>
  );
}