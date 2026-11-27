import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import KnowYourRightsSection from "@/components/home/KnowYourRightsSection";
import WhatWeDoSection from "@/components/home/WhatWeDoSection";
import OurImpactSection from "@/components/home/OurImpactSection";
import HumanStoriesSection from "@/components/home/HumanStoriesSection";
import TakeActionSection from "@/components/home/TakeActionSection";
import { maintenanceConfig } from "@/config/maintenance";
import MaintenancePage from "@/components/maintenance/MaintenancePage";
import { createOpenGraph, createTwitter } from "@/lib/seo";

export const metadata: Metadata = {
  title: "HRSJM - Human Rights & Social Justice Mission India",
  description:
    "Join HRSJM, India's leading human rights NGO. Defending constitutional rights, free legal justice, women empowerment, and human dignity across India.",
  keywords: [
    "Human Rights NGO India",
    "Human Rights and Social Justice Mission",
    "HRSJM",
    "Best Human Rights Organization India",
    "File Human Rights Complaint Online",
    "Join Human Rights NGO",
    "Legal Aid Support India",
    "मानव अधिकार संगठन भारत",
    "मानव अधिकार एवं सामाजिक न्याय मिशन",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: createOpenGraph({
    title: "HRSJM - Human Rights & Social Justice Mission India",
    description:
      "Join HRSJM, India's leading human rights NGO. Defending constitutional rights, free legal justice, women empowerment, and human dignity across India.",
    urlPath: "/",
    image: "/social-preview.jpg",
    imageAlt: "Human Rights & Social Justice Mission (HRSJM) - Official Preview",
  }),
  twitter: createTwitter({
    title: "HRSJM - Human Rights & Social Justice Mission India",
    description:
      "Join HRSJM, India's leading human rights NGO. Defending constitutional rights, free legal justice, women empowerment, and human dignity across India.",
    image: "/social-preview.jpg",
  }),
};

export default function Home() {
  if (maintenanceConfig.enabled) {
    return <MaintenancePage />;
  }

  return (
    <main aria-label="HRSJM website content">
      <HeroSection />
      <AboutSection />
      <KnowYourRightsSection />
      <WhatWeDoSection />
      <OurImpactSection />
      <HumanStoriesSection />
      <TakeActionSection />
    </main>
  );
}
