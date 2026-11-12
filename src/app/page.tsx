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

export const metadata: Metadata = {
  title: "HRSJM | Human Rights & Social Justice Mission - Justice, Equality & Dignity for All",
  description:
    "Join the Human Rights & Social Justice Mission (HRSJM). We fight for constitutional rights, legal justice, public welfare, women empowerment, and human dignity across India.",
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
  openGraph: {
    title: "HRSJM - Human Rights & Social Justice Mission",
    description:
      "A nationwide human rights movement dedicated to constitutional values, free legal guidance, citizen empowerment, and public welfare.",
    url: "https://hrsjm.org",
    images: [
      {
        url: "/home-hero-bg.png",
        width: 1200,
        height: 630,
        alt: "Human Rights & Social Justice Mission Banner",
      },
    ],
  },
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
