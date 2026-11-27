import { createOpenGraph, createTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import AllEventsHero from "@/components/events/AllEventsHero";
import AllEventsListing from "@/components/events/AllEventsListing";
import AllEventsCTA from "@/components/events/AllEventsCTA";

export const metadata: Metadata = {
  title: "Upcoming Events | Events & Activities",
  description:
    "Browse every upcoming HRSJM workshop, seminar, community drive and awareness program across India, and register for the ones you want to join.",
  alternates: {
    canonical: "/events/all",
  },
  openGraph: createOpenGraph({
    title: "Upcoming Events | Events & Activities",
    description: "Browse every upcoming HRSJM workshop, seminar, community drive and awareness program across India, and register for the ones you want to join.",
    urlPath: "/events/all",
    image: "/logo.png",
    imageAlt: "Upcoming Events | Events & Activities",
  }),
  twitter: createTwitter({
    title: "Upcoming Events | Events & Activities",
    description: "Browse every upcoming HRSJM workshop, seminar, community drive and awareness program across India, and register for the ones you want to join.",
    image: "/logo.png",
  }),
};

export default function AllEventsPage() {
  return (
    <>
      <AllEventsHero />
      <AllEventsListing />
      <AllEventsCTA />
    </>
  );
}