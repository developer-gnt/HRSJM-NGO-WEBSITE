import type { Metadata } from "next";
import SuccessStoriesHero from "@/components/success-stories/SuccessStoriesHero";
import SuccessStoriesGrid from "@/components/success-stories/SuccessStoriesGrid";
import WhatWeDoSection from "@/components/home/WhatWeDoSection";
import SuccessStoriesCTA from "@/components/success-stories/SuccessStoriesCTA";

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "Real stories of dignity, justice and change from the people and communities HRSJM supports across India.",
};

export default function SuccessStoriesPage() {
  return (
    <>
      <SuccessStoriesHero />
      <SuccessStoriesGrid />
      <WhatWeDoSection />
      <SuccessStoriesCTA />
    </>
  );
}