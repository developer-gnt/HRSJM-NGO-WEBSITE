"use client";

import Image from "next/image";
import Link from "next/link";
import {
  HeartPulse,
  GraduationCap,
  CloudLightning,
  Home,
  ArrowRight,
  CheckCircle2,
  Users,
  Heart,
  Handshake,
} from "lucide-react";
import styles from "./donation.module.css";

const emergencyCategories = [
  {
    id: "medical",
    title: "Medical Assistance",
    description:
      "Support for hospitalisation, major operations, critical illnesses and emergency medical treatment.",
    image: "/images/donation/emergency/emergency-medical.jpg",
    alt: "Child in hospital bed receiving life-saving medical care",
    themeClass: styles.cardMedical,
    btnClass: styles.btnCardMedical,
    iconWrapClass: styles.iconWrapMedical,
    arrowClass: styles.arrowCircleMedical,
    icon: HeartPulse,
    btnText: "View Medical Cases",
    href: "/donation/emergency#featured-cases",
  },
  {
    id: "education",
    title: "Educational Assistance",
    description:
      "Help for school fees, college admissions, uniforms, books, stationery and other learning needs.",
    image: "/images/donation/emergency/emergency-education.jpg",
    alt: "Smiling school students in uniforms receiving education support",
    themeClass: styles.cardEducation,
    btnClass: styles.btnCardEducation,
    iconWrapClass: styles.iconWrapEducation,
    arrowClass: styles.arrowCircleEducation,
    icon: GraduationCap,
    btnText: "View Education Cases",
    href: "/donation/emergency#featured-cases",
  },
  {
    id: "disaster",
    title: "Disaster Relief",
    description:
      "Emergency support during floods, storms, heavy rainfall, fires and other natural or accidental disasters.",
    image: "/images/donation/emergency/emergency-disaster.jpg",
    alt: "Emergency rescue team in flood waters saving affected families",
    themeClass: styles.cardDisaster,
    btnClass: styles.btnCardDisaster,
    iconWrapClass: styles.iconWrapDisaster,
    arrowClass: styles.arrowCircleDisaster,
    icon: CloudLightning,
    btnText: "View Relief Cases",
    href: "/donation/emergency#featured-cases",
  },
  {
    id: "housing",
    title: "Housing & Rehabilitation",
    description:
      "Assistance for house damage, building collapse and rehabilitation of affected families.",
    image: "/images/donation/emergency/emergency-housing.jpg",
    alt: "Housing damage assistance and family rehabilitation",
    themeClass: styles.cardHousing,
    btnClass: styles.btnCardHousing,
    iconWrapClass: styles.iconWrapHousing,
    arrowClass: styles.arrowCircleHousing,
    icon: Home,
    btnText: "View Housing Cases",
    href: "/donation/emergency#featured-cases",
  },
];

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
            2. THE 4 EMERGENCY CATEGORY CARDS
            ============================================================ */}
        <div id="emergency-categories" className={styles.emergencyCardsGrid}>
          {emergencyCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className={`${styles.emergencyCard} ${cat.themeClass}`}
              >
                {/* Card Top: Icon, Title, and Small Arrow */}
                <div className={styles.cardHeaderTop}>
                  <div className={cat.iconWrapClass} aria-hidden="true">
                    <Icon size={24} strokeWidth={2.2} />
                  </div>
                  <h3 className={styles.cardTitle}>{cat.title}</h3>
                  <Link
                    href={cat.href}
                    className={cat.arrowClass}
                    aria-label={`Learn more about ${cat.title}`}
                  >
                    <ArrowRight size={14} strokeWidth={2.6} />
                  </Link>
                </div>

                {/* Card Description */}
                <p className={styles.cardDesc}>{cat.description}</p>

                {/* Card Image */}
                <div className={styles.cardImageWrap}>
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={styles.cardImg}
                  />
                </div>

                {/* Card Action Button */}
                <Link href={cat.href} className={cat.btnClass}>
                  {cat.btnText}
                  <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* ============================================================
            3. BOTTOM TRUST & TRANSPARENCY CARD
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
