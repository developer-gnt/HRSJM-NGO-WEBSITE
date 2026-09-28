import type { Metadata } from "next";
import DonationHero from "@/components/donation/DonationHero";
import ImpactStats from "@/components/donation/ImpactStats";
import DonationForm from "@/components/donation/DonationForm";
import DonationSupports from "@/components/donation/DonationSupports";
import RealImpact from "@/components/donation/RealImpact";
import LastingImpact from "@/components/donation/LastingImpact";
import DonationFAQ from "@/components/donation/DonationFAQ";
import DonationCTA from "@/components/donation/DonationCTA";

export const metadata: Metadata = {
  title: "Donate to HRSJM - Support Human Rights & Social Justice",
  description:
    "Your donation helps HRSJM protect human rights, provide legal aid, and empower vulnerable communities across India.",
};

export default function DonationPage() {
  return (
    <main>
      <DonationHero />
      <ImpactStats />
      <DonationForm />
      <DonationSupports />
      <RealImpact />
      <LastingImpact />
      <DonationFAQ />
      <DonationCTA />
    </main>
  );
}
