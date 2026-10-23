import OurVisionHero from "./OurVisionHero";
import OurVisionCards from "./OurVisionCards";
import OurVisionInAction from "./OurVisionInAction";
import OurVisionFocusIssues from "./OurVisionFocusIssues";
import OurVisionHealTheWorld from "./OurVisionHealTheWorld";
import OurVisionStatementBanner from "./OurVisionStatementBanner";
import OurVisionQuoteBanner from "./OurVisionQuoteBanner";
import OurVisionContactStrip from "./OurVisionContactStrip";
import styles from "./our-vision.module.css";

export default function OurVisionPage() {
  return (
    <div className={styles.page}>
      {/* 1. Hero with Breadcrumb & Artwork */}
      <OurVisionHero />

      {/* 2. Dual Pillar Cards: Our Vision & Our Movement */}
      <OurVisionCards />

      {/* 3. Our Vision in Action with Solidarity Hands */}
      <OurVisionInAction />

      {/* 4. Key Focus Areas - 10 Core Issues Cards */}
      <OurVisionFocusIssues />

      {/* 5. Let Us Join Hands to Heal the World */}
      <OurVisionHealTheWorld />

      {/* 6. Navy Statement Banner: Humanity First */}
      <OurVisionStatementBanner />

      {/* 7. Scenic Aspiration Callout Banner */}
      <OurVisionQuoteBanner />

      {/* 8. Contact & Commitment Ribbon */}
      <OurVisionContactStrip />
    </div>
  );
}
