import { createOpenGraph, createTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import EmergencyPage from "@/components/emergency/EmergencyPage";

export const metadata: Metadata = {
  title: "Emergency & Humanitarian Relief Fund | HRSJM",
  description:
    "Donate to the HRSJM Emergency Relief Fund. Support urgent medical crises, disaster-affected families, and immediate legal defense with 100% transparency.",
  keywords: [
    "Emergency Relief Fund NGO",
    "Humanitarian Assistance India",
    "Medical Emergency NGO Support",
    "Disaster Relief Donation India",
    "HRSJM Emergency Fund",
  ],
  alternates: {
    canonical: "/donation/emergency",
  },
  openGraph: createOpenGraph({
    title: "Emergency & Humanitarian Relief Fund | HRSJM",
    description: "Donate to the HRSJM Emergency Relief Fund. Support urgent medical crises, disaster-affected families, and immediate legal defense with 100% transparency.",
    urlPath: "/donation/emergency",
    image: "/donation-hero.png",
    imageAlt: "Emergency & Humanitarian Relief Fund | HRSJM",
  }),
  twitter: createTwitter({
    title: "Emergency & Humanitarian Relief Fund | HRSJM",
    description: "Donate to the HRSJM Emergency Relief Fund. Support urgent medical crises, disaster-affected families, and immediate legal defense with 100% transparency.",
    image: "/donation-hero.png",
  }),
};

export default function Page() {
  return <EmergencyPage />;
}
