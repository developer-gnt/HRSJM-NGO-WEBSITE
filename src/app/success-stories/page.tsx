import { createOpenGraph } from "@/lib/seo";
import type { Metadata } from "next";
import SuccessStoriesHero from "@/components/success-stories/SuccessStoriesHero";
import SuccessStoriesGrid from "@/components/success-stories/SuccessStoriesGrid";
import WhatWeDoSection from "@/components/home/WhatWeDoSection";
import SuccessStoriesCTA from "@/components/success-stories/SuccessStoriesCTA";

export const metadata: Metadata = {
  title: "Success Stories & Human Impact Case Studies | HRSJM",
  description:
    "Read real impact stories and case studies of citizens and families who secured justice and restored dignity through HRSJM legal and social support.",
  keywords: [
    "HRSJM Success Stories",
    "Human Rights Impact Case Studies",
    "Legal Aid Success Stories India",
    "NGO Impact Reports India",
    "Citizen Rights Victories",
  ],
  alternates: {
    canonical: "/success-stories",
  },
  openGraph: createOpenGraph({
    title: "Success Stories & Human Impact Case Studies | HRSJM",
    description: "Read real impact stories and case studies of citizens and families who secured justice and restored dignity through HRSJM legal and social support.",
    urlPath: "/success-stories",
    image: "/logo.png",
    imageAlt: "Success Stories & Human Impact Case Studies | HRSJM",
  }),
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