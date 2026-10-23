"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight, ShieldCheck, Heart, FileCheck } from "lucide-react";
import styles from "./emergency.module.css";

export default function EmergencyHero() {
  return (
    <section className={styles.heroSection} aria-label="Emergency & Humanitarian Assistance">
      {/* 1. Background Montage with artistic navy fade */}
      <div className={styles.heroBgWrap} aria-hidden="true">
        <Image
          src="/images/donation/emergency/emergency-montage-hd.jpg"
          alt="Emergency assistance - Children, families, flood rescue and rehabilitation"
          fill
          priority
          quality={96}
          sizes="(max-width: 1024px) 100vw, 58vw"
          className={styles.heroBgImg}
        />
        <div className={styles.heroBgFade} />
      </div>

      {/* 2. Interactive Real HTML Content Layer */}
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className={styles.heroBreadcrumbs}>
              <Link href="/" className={styles.breadcrumbLink}>
                Home
              </Link>
              <ChevronRight className={styles.breadcrumbSep} size={13} strokeWidth={2.4} />
              <Link href="/donation" className={styles.breadcrumbLink}>
                Donation
              </Link>
              <ChevronRight className={styles.breadcrumbSep} size={13} strokeWidth={2.4} />
              <span className={styles.breadcrumbCurrent}>
                Emergency &amp; Humanitarian Assistance
              </span>
            </nav>

            {/* Eyebrow */}
            <div className={styles.heroEyebrowWrap}>
              <span className={styles.heroEyebrowBar} aria-hidden="true" />
              <span className={styles.heroEyebrow}>
                EMERGENCY &amp; HUMANITARIAN ASSISTANCE
              </span>
            </div>

            {/* Main Grand Heading */}
            <h1 className={styles.heroHeading}>
              Because<br />
              Every Life <span className={styles.goldHighlight}>Matters.</span>
            </h1>

            {/* Subtitle */}
            <p className={styles.heroSubtitle}>
              Support individuals and families facing urgent medical, educational,
              disaster-related and housing emergencies. Your help can save lives
              and bring hope when it is needed most.
            </p>

            {/* Action Buttons */}
            <div className={styles.heroBtnRow}>
              <Link href="/donation#donate" className={styles.btnDonatePrimary}>
                Donate Now
                <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
              </Link>
              <Link href="/contact" className={styles.btnRequestHelp}>
                Request Help
                <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
              </Link>
            </div>

            {/* 3 Trust Badges */}
            <div className={styles.heroTrustRow}>
              <div className={styles.heroTrustItem}>
                <div className={styles.heroTrustIconWrap} aria-hidden="true">
                  <ShieldCheck size={18} strokeWidth={2.4} />
                </div>
                <div className={styles.heroTrustText}>
                  <span className={styles.heroTrustTitle}>Verified Cases</span>
                  <span className={styles.heroTrustSub}>Only genuine requests</span>
                </div>
              </div>

              <div className={styles.heroTrustItem}>
                <div className={styles.heroTrustIconWrap} aria-hidden="true">
                  <FileCheck size={18} strokeWidth={2.4} />
                </div>
                <div className={styles.heroTrustText}>
                  <span className={styles.heroTrustTitle}>Transparent Use</span>
                  <span className={styles.heroTrustSub}>Funds used for intended purpose</span>
                </div>
              </div>

              <div className={styles.heroTrustItem}>
                <div className={styles.heroTrustIconWrap} aria-hidden="true">
                  <Heart size={18} strokeWidth={2.4} />
                </div>
                <div className={styles.heroTrustText}>
                  <span className={styles.heroTrustTitle}>Real Impact</span>
                  <span className={styles.heroTrustSub}>Support real people in need</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
