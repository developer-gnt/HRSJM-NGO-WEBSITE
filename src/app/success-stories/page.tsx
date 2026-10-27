import type { Metadata } from "next";
import SuccessStoriesHero from "@/components/success-stories/SuccessStoriesHero";
import SuccessStoriesGrid from "@/components/success-stories/SuccessStoriesGrid";
import WhatWeDoSection from "@/components/home/WhatWeDoSection";
import SuccessStoriesCTA from "@/components/success-stories/SuccessStoriesCTA";

export const metadata: Metadata = {
  title: "Success Stories & Human Impact Case Studies | HRSJM",
  description:
    "Real impact stories of justice, dignity, and life transformation. Read verified case studies of citizens and families empowered through HRSJM legal and community interventions.",
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
  openGraph: {
    title: "Success Stories - Real Impact with HRSJM",
    description:
      "Explore inspiring case studies of citizens who claimed their rights and found justice through HRSJM.",
    url: "https://hrsjm.org/success-stories",
  },
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