import BenefitsHero from "./BenefitsHero";
import KeyBenefits from "./KeyBenefits";
import CommunityImpact from "./CommunityImpact";
import ContributionSection from "./ContributionSection";
import BenefitsCTA from "./BenefitsCTA";
import styles from "./benefits.module.css";

export default function BenefitsPage() {
  return (
    <main className={styles.benefitsPage}>
      {/* 1. Benefits Hero Banner */}
      <BenefitsHero />

      {/* 2. Key Benefits — 6 cards in 3x2 grid */}
      <KeyBenefits />

      {/* 3. Community Impact — Stronger Communities. Brighter Futures. */}
      <CommunityImpact />

      {/* 4. More Than Individual Benefits — Image and Contribution list */}
      <ContributionSection />

      {/* 5. Final CTA — Join HRSJM Today */}
      <BenefitsCTA />
    </main>
  );
}
