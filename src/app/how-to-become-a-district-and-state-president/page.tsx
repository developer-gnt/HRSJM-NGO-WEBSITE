import type { Metadata } from "next";
import { createOpenGraph, createTwitter } from "@/lib/seo";
import PresidentPage from "@/components/president/PresidentPage";

export const metadata: Metadata = {
  title: "Become a District or State President | HRSJM",
  description:
    "Lead HRSJM in your district or state. Learn our official appointment criteria, build a 25-member active unit, and champion human rights and social justice.",
  keywords: [
    "How to Become a District President NGO",
    "HRSJM State President Appointment",
    "NGO Leadership Roles India",
    "District President Human Rights Mission",
    "Join HRSJM Leadership Team",
    "25 Member NGO Unit India",
  ],
  alternates: {
    canonical: "/how-to-become-a-district-and-state-president",
  },
  openGraph: createOpenGraph({
    title: "How to Become a District / State President | HRSJM",
    description:
      "Form a dedicated 25-member unit and take official leadership for human rights, equality, and public welfare in your district or state.",
    urlPath: "/how-to-become-a-district-and-state-president",
    image: "/president-hero-full.jpg",
    imageAlt: "HRSJM District and State President Leadership",
  }),
  twitter: createTwitter({
    title: "How to Become a District / State President | HRSJM",
    description:
      "Form a dedicated 25-member unit and take official leadership for human rights, equality, and public welfare in your district or state.",
    image: "/president-hero-full.jpg",
  }),
};

export default function Page() {
  return <PresidentPage />;
}
