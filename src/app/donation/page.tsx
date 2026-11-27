import type { Metadata } from "next";
import { createOpenGraph, createTwitter } from "@/lib/seo";
import DonationHero from "@/components/donation/DonationHero";
import ImpactStats from "@/components/donation/ImpactStats";
import DonationForm from "@/components/donation/DonationForm";
import EmergencyDonationSection from "@/components/donation/EmergencyDonationSection";
import DonationSupports from "@/components/donation/DonationSupports";
import RealImpact from "@/components/donation/RealImpact";
import LastingImpact from "@/components/donation/LastingImpact";
import DonationFAQ from "@/components/donation/DonationFAQ";
import DonationCTA from "@/components/donation/DonationCTA";

export const metadata: Metadata = {
  title: "Donate to HRSJM | Support Human Rights & Legal Aid",
  description:
    "Make an 80G tax-exempt donation to the Human Rights & Social Justice Mission (HRSJM). Fund free legal aid, emergency survivor relief, and human rights advocacy.",
  keywords: [
    "Donate to Human Rights NGO India",
    "80G Tax Exemption Donation NGO",
    "Support HRSJM",
    "Online NGO Donation India",
    "Donate for Legal Aid",
    "Tax Deductible Donation India",
    "दान करें मानव अधिकार",
  ],
  alternates: {
    canonical: "/donation",
  },
  openGraph: createOpenGraph({
    title: "Donate to HRSJM - Empower Human Rights & Social Justice",
    description:
      "Support nationwide grassroots legal aid, emergency citizen assistance, and human dignity with your contribution to HRSJM.",
    urlPath: "/donation",
    image: "/donation-hero.png",
    imageAlt: "Donate to HRSJM Human Rights Mission",
  }),
  twitter: createTwitter({
    title: "Donate to HRSJM - Empower Human Rights & Social Justice",
    description:
      "Support nationwide grassroots legal aid, emergency citizen assistance, and human dignity with your contribution to HRSJM.",
    image: "/donation-hero.png",
  }),
};

export default function DonationPage() {
  return (
    <main style={{ overflowX: "hidden", width: "100%", maxWidth: "100%" }}>
      <DonationHero />
      <ImpactStats />
      <DonationForm />
      <EmergencyDonationSection />
      <DonationSupports />
      <RealImpact />
      <LastingImpact />
      <DonationFAQ />
      <DonationCTA />
    </main>
  );
}
