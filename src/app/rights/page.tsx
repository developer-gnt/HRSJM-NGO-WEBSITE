import type { Metadata } from "next";
import RightsHero from "@/components/rights/RightsHero";
import ExploreRightsSection from "@/components/rights/ExploreRightsSection";
import RightsFeaturedVideo from "@/components/rights/RightsFeaturedVideo";
import RightsResources from "@/components/rights/RightsResources";
import RightsImpact from "@/components/rights/RightsImpact";
import RightsFAQ from "@/components/rights/RightsFAQ";
import RightsFinalCTA from "@/components/rights/RightsFinalCTA";

export const metadata: Metadata = {
  title: "Know Your Rights",
  description:
    "Explore key areas of human rights that protect your dignity, freedom and equal opportunities — and learn how HRSJM helps you understand, claim and defend your rights.",
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
