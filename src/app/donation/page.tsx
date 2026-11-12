import type { Metadata } from "next";
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
  title: "Donate to HRSJM - Support Human Rights, Legal Aid & Social Justice in India",
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
  openGraph: {
    title: "Donate to HRSJM - Empower Human Rights & Social Justice",
    description:
      "Support nationwide grassroots legal aid, emergency citizen assistance, and human dignity with your contribution to HRSJM.",
    url: "https://hrsjm.org/donation",
    images: [
      {
        url: "/donation-hero.png",
        width: 1200,
        height: 630,
        alt: "Donate to HRSJM Human Rights Mission",
      },
    ],
  },
};

export default function DonationPage() {
  return (
    <main>
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
