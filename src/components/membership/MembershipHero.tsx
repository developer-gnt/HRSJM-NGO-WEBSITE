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
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" />
          <span aria-current="page">Complaints / Get Help</span>
        </nav>

        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>
              <span className={styles.heroEyebrowDot} aria-hidden="true" />
              Complaint / Get Help
            </p>

            <h1 id="membership-hero-heading" className={styles.heroHeading}>
              <span>Raise a Concern.</span>
              <span className={styles.heroHeadingGold}>Get Support.</span>
            </h1>

            <p className={styles.heroDescription}>
              If you or someone you know has faced a human rights violation or
              needs legal, social or community support, we are here to help.
              Your voice matter, and we will stand with you.
            </p>

            <div className={styles.heroActions}>
              <a href="#membership-options" className={styles.btnGold}>
                File a Complaint
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </a>
              <a href="#why-membership" className={styles.btnOutline}>
                Explore Support Options
              </a>
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
