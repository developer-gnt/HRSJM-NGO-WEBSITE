import type { Metadata } from "next";
import RightsHero from "@/components/rights/RightsHero";
import ExploreRightsSection from "@/components/rights/ExploreRightsSection";
import RightsFeaturedVideo from "@/components/rights/RightsFeaturedVideo";
import RightsResources from "@/components/rights/RightsResources";
import RightsImpact from "@/components/rights/RightsImpact";
import RightsFAQ from "@/components/rights/RightsFAQ";
import RightsFinalCTA from "@/components/rights/RightsFinalCTA";

export const metadata: Metadata = {
  title: "Know Your Rights - Fundamental Rights & Legal Awareness Guide | HRSJM",
  description:
    "Comprehensive legal rights guide by HRSJM. Understand your constitutional rights, right to education, child protection, women rights, consumer rights, and senior citizen laws in India.",
  keywords: [
    "Know Your Rights India",
    "Fundamental Rights Constitution of India",
    "Human Rights Awareness Guide",
    "Women Legal Rights India",
    "Child Rights Protection India",
    "Citizen Legal Handbook",
    "मानव अधिकार जानकारी भारत",
  ],
  alternates: {
    canonical: "/rights",
  },
  openGraph: {
    title: "Know Your Rights - Human Rights & Social Justice Mission",
    description:
      "Empowering citizens with legal literacy and practical knowledge to defend their constitutional and fundamental human rights.",
    url: "https://hrsjm.org/rights",
  },
};

export default function RightsPage() {
  return (
    <>
      <RightsHero />
      <ExploreRightsSection />
      <RightsFeaturedVideo />
      <RightsResources />
      <RightsImpact />
      <RightsFAQ />
      <RightsFinalCTA />
    </>
  );
}
