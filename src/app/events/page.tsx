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
  title: "Events & Activities",
  description:
    "Explore our events, campaigns and community activities working towards a more just, equal and inclusive India.",
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