import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import KnowYourRightsSection from "@/components/home/KnowYourRightsSection";
import WhatWeDoSection from "@/components/home/WhatWeDoSection";
import OurImpactSection from "@/components/home/OurImpactSection";
import HumanStoriesSection from "@/components/home/HumanStoriesSection";
import TakeActionSection from "@/components/home/TakeActionSection";

export default function Home() {
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
