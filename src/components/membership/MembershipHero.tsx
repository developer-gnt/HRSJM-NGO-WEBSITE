import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  CircleDot,
  HeartHandshake,
} from "lucide-react";
import styles from "./membership.module.css";

export default function MembershipHero() {
  const features = [
    "Confidential & Safe",
    "Support from Experts",
    "Guidance at Every Step",
    "People-Centred Approach",
  ];

  return (
    <section className={styles.hero} aria-labelledby="membership-hero-heading">
      <Image
        src="/membership/membership-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.heroBackground}
      />
      <div className={styles.heroScrim} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" />
            <span className={styles.breadcrumbCurrent} aria-current="page">Membership</span>
          </nav>

          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>
              <span className={styles.heroEyebrowDot} aria-hidden="true" />
              Membership
            </p>

            <h1 id="membership-hero-heading" className={styles.heroHeading}>
              <span>Join the Movement.</span>
              <span className={styles.heroHeadingGold}>Be the Change.</span>
            </h1>

            <p className={styles.heroDescription}>
              Become a member of Human Rights &amp; Social Justice Mission and
              stand up for human rights, dignity and social justice. Your
              support helps us build a more just, equal and inclusive society.
            </p>

            <div className={styles.heroActions}>
              <Link href="/membership/categories" className={styles.btnGold}>
                Become a Member
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </Link>
              <Link href="/benefits" className={styles.btnOutline}>
                Explore Member Benefits
              </Link>
            </div>

            <div className={styles.heroFeatures}>
              {features.map((feature, index) => (
                <div key={feature} className={styles.heroFeature}>
                  <span className={styles.heroFeatureIcon}>
                    {index === 0 ? (
                      <HeartHandshake size={15} strokeWidth={2} aria-hidden="true" />
                    ) : index === 1 ? (
                      <CircleDot size={15} strokeWidth={2} aria-hidden="true" />
                    ) : index === 2 ? (
                      <ChevronRight size={15} strokeWidth={2} aria-hidden="true" />
                    ) : (
                      <HeartHandshake size={15} strokeWidth={2} aria-hidden="true" />
                    )}
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.heroVisualLabel}>
              <span>Your</span>
              <span>Voice</span>
              <span>Matters.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
