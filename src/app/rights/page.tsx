import type { Metadata } from "next";
import RightsHero from "@/components/rights/RightsHero";
import ExploreRightsSection from "@/components/rights/ExploreRightsSection";
import RightsFeaturedVideo from "@/components/rights/RightsFeaturedVideo";
import RightsResources from "@/components/rights/RightsResources";
import RightsImpact from "@/components/rights/RightsImpact";
import RightsFAQ from "@/components/rights/RightsFAQ";
import RightsFinalCTA from "@/components/rights/RightsFinalCTA";
import { createOpenGraph, createTwitter } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Know Your Rights - Legal Awareness Guide | HRSJM",
  description:
    "Understand your constitutional and legal rights in India. Practical guides covering women's safety, child protection, RTE, and consumer protection.",
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
  openGraph: createOpenGraph({
    title: "Know Your Rights - Human Rights & Social Justice Mission",
    description:
      "Empowering citizens with legal literacy and practical knowledge to defend their constitutional and fundamental human rights.",
    urlPath: "/rights",
    image: "/rights-hero-bg.png",
    imageAlt: "Know Your Rights - Legal Guide by HRSJM",
  }),
  twitter: createTwitter({
    title: "Know Your Rights - Human Rights & Social Justice Mission",
    description: "Empowering citizens with legal literacy and practical knowledge to defend their constitutional and fundamental human rights.",
    image: "/rights-hero-bg.png",
  }),
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
