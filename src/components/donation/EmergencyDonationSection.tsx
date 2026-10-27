"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Heart,
  Handshake,
} from "lucide-react";
import styles from "./donation.module.css";

const trustPillars = [
  {
    title: "Verified Cases",
    description: "Only genuine and verified requests",
    icon: CheckCircle2,
    badgeClass: styles.trustBadgeNavy,
  },
  {
    title: "Transparent Use",
    description: "Funds used only for intended purpose",
    icon: Users,
    badgeClass: styles.trustBadgeGold,
  },
  {
    title: "Real People",
    description: "Support individuals and families in need",
    icon: Heart,
    badgeClass: styles.trustBadgeBlue,
  },
  {
    title: "Stronger Communities",
    description: "Helping build a safer and more inclusive society",
    icon: Handshake,
    badgeClass: styles.trustBadgeAmber,
  },
];

export default function EmergencyDonationSection() {
  return (
    <section
      id="emergency-support"
      className={styles.emergencySection}
      aria-labelledby="emergency-heading"
    >
      <div className={styles.container}>
        {/* ============================================================
            1. TOP HERO: Urgent Support for Real Needs
            ============================================================ */}
        <div className={styles.emergencyHeroGrid}>
          {/* Left Column: Heading & Text */}
          <div className={styles.emergencyHeroContent}>
            <div className={styles.emergencyEyebrowWrap}>
              <span className={styles.emergencyEyebrowBar} aria-hidden="true" />
              <span className={styles.emergencyEyebrow}>
                EMERGENCY &amp; HUMANITARIAN ASSISTANCE
              </span>
            </div>

            <h2 id="emergency-heading" className={styles.emergencyMainHeading}>
              Urgent Support<br />
              for <span className={styles.emergencyGoldText}>Real Needs</span>
            </h2>

            <p className={styles.emergencyDescription}>
              Your contribution can provide life-saving medical care, educational
              support, disaster relief and help families rebuild their homes.
              Together, we can stand with vulnerable communities in their most
              difficult times.
            </p>

            <Link href="/donation/emergency" className={styles.btnExploreEmergency}>
              Explore Emergency Cases
              <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
            </Link>
          </div>

          {/* Right Column: Montage Artwork */}
          <div className={styles.emergencyHeroMedia}>
            <div className={styles.emergencyMontageImageWrap}>
              <Image
                src="/images/donation/emergency/emergency-montage-hd.jpg"
                alt="Urgent Support for Real Needs - Humanitarian assistance montage showing medical care, education, flood rescue and child hope"
                fill
                quality={96}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={styles.emergencyMontageImg}
                priority
              />
            </div>
          </div>
        </div>

        {/* ============================================================
            2. BOTTOM TRUST & TRANSPARENCY CARD
            ============================================================ */}
        <div className={styles.emergencyTrustCard}>
          <div className={styles.emergencyTrustGrid}>
            {trustPillars.map((pillar) => {
              const PillarIcon = pillar.icon;
              return (
                <div key={pillar.title} className={styles.trustItem}>
                  <div className={pillar.badgeClass} aria-hidden="true">
                    <PillarIcon size={24} strokeWidth={2.4} />
                  </div>
                  <div className={styles.trustText}>
                    <h4 className={styles.trustTitle}>{pillar.title}</h4>
                    <p className={styles.trustDesc}>{pillar.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
