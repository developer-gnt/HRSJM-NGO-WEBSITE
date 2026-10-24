"use client";

import EmergencyHero from "./EmergencyHero";
import EmergencyCategoriesBar from "./EmergencyCategoriesBar";
import EmergencyFeaturedCases from "./EmergencyFeaturedCases";
import EmergencyImpactCounters from "./EmergencyImpactCounters";
import EmergencyHowItWorks from "./EmergencyHowItWorks";
import EmergencyHopeBanner from "./EmergencyHopeBanner";
import EmergencyFaq from "./EmergencyFaq";
import styles from "./emergency.module.css";

export default function EmergencyPage() {
  return (
    <div className={styles.page}>
      <EmergencyHero />
      <EmergencyCategoriesBar />
      <EmergencyFeaturedCases />
      <EmergencyImpactCounters />
      <EmergencyHowItWorks />
      <EmergencyHopeBanner />
      <EmergencyFaq />
    </div>
  );
}
