import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import styles from "./benefits.module.css";

export default function BenefitsHero() {
  return (
    <section className={styles.hero} aria-labelledby="benefits-hero-heading">
      {/* Background Graphic & Scrim */}
      <div className={styles.heroBg} aria-hidden="true">
        <Image
          src="/benefits/benefits-hero-people.png"
          alt="HRSJM members standing together in solidarity and collective action"
          fill
          priority
          sizes="100vw"
          className={styles.heroImg}
        />
        <div className={styles.heroScrim} />
      </div>

      <div className={styles.container}>
        <div className={styles.heroInner}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator} aria-hidden="true">
              &gt;
            </span>
            <span className={styles.breadcrumbCurrent} aria-current="page">
              Benefits
            </span>
          </nav>

          {/* Eyebrow */}
          <div className={styles.heroEyebrowGroup}>
            <div className={styles.heroEyebrowLine} aria-hidden="true" />
            <p className={styles.heroEyebrow}>MEMBERSHIP BENEFITS</p>
          </div>

          {/* Heading */}
          <h1 id="benefits-hero-heading" className={styles.heroHeading}>
            <span>Benefits</span>
            <span>That Create</span>
            <span className={styles.heroGold}>Real Change.</span>
          </h1>

          {/* Supporting Text */}
          <p className={styles.heroDescription}>
            Your membership with HRSJM offers meaningful opportunities to learn,
            contribute, connect and be part of a larger movement for a fairer,
            more inclusive society.
          </p>

          {/* CTA Action */}
          <Link href="/membership/categories" className={styles.btnGold}>
            <span>Join as a Member</span>
            <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
