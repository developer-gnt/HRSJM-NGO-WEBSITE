"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import styles from "./emergency.module.css";

interface EmergencyCase {
  id: string;
  category: string;
  badgeClass: string;
  fillClass: string;
  title: string;
  location: string;
  raised: string;
  goal: string;
  percent: number;
  image: string;
  alt: string;
}

const emergencyCases: EmergencyCase[] = [
  {
    id: "medical-heart-surgery",
    category: "Medical Assistance",
    badgeClass: styles.caseBadgeMedical,
    fillClass: styles.progressBarFillMedical,
    title: "Support for Heart Surgery for a 7-year-old Child",
    location: "Mumbai, Maharashtra",
    raised: "₹ 3,20,000",
    goal: "₹ 5,00,000",
    percent: 64,
    image: "/images/donation/emergency/emergency-medical.jpg",
    alt: "7-year-old child in hospital receiving critical medical care",
  },
  {
    id: "education-school-fees",
    category: "Educational Assistance",
    badgeClass: styles.caseBadgeEducation,
    fillClass: styles.progressBarFillEducation,
    title: "Help for School Fees and Uniforms",
    location: "Nashik, Maharashtra",
    raised: "₹ 45,000",
    goal: "₹ 1,00,000",
    percent: 45,
    image: "/images/donation/emergency/emergency-education.jpg",
    alt: "Young students smiling in school uniforms holding books",
  },
  {
    id: "disaster-flood-relief",
    category: "Disaster Relief",
    badgeClass: styles.caseBadgeDisaster,
    fillClass: styles.progressBarFillDisaster,
    title: "Relief Support for Flood Affected Families",
    location: "Kolhapur, Maharashtra",
    raised: "₹ 2,10,000",
    goal: "₹ 5,00,000",
    percent: 42,
    image: "/images/donation/emergency/emergency-disaster.jpg",
    alt: "Emergency rescue personnel helping flood-hit communities in Kolhapur",
  },
  {
    id: "housing-rebuild-home",
    category: "Housing & Rehabilitation",
    badgeClass: styles.caseBadgeHousing,
    fillClass: styles.progressBarFillHousing,
    title: "Rebuild a Home After Building Collapse",
    location: "Ratnagiri, Maharashtra",
    raised: "₹ 1,80,000",
    goal: "₹ 4,00,000",
    percent: 45,
    image: "/images/donation/emergency/emergency-housing.jpg",
    alt: "House rebuilding after structural damage in Ratnagiri",
  },
];

export default function EmergencyFeaturedCases() {
  return (
    <section className={styles.featuredSection} id="featured-cases" aria-labelledby="featured-heading">
      <div className={styles.container}>
        {/* Header Row */}
        <div className={styles.featuredHeader}>
          <div>
            <div className={styles.featuredEyebrow}>FEATURED EMERGENCY CASES</div>
            <h2 id="featured-heading" className={styles.featuredHeading}>
              Support Real People. Create Real Change.
            </h2>
          </div>
          <Link href="/donation?cause=all#donate" className={styles.viewAllLink}>
            View All Cases
            <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        </div>

        {/* Cases Grid */}
        <div className={styles.casesGrid}>
          {emergencyCases.map((item) => (
            <article key={item.id} className={styles.caseCard}>
              <div className={styles.caseImgWrap}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={styles.caseImg}
                />
              </div>

              <div className={styles.caseBadgeWrap}>
                <span className={item.badgeClass}>{item.category}</span>
              </div>

              <div className={styles.caseCardBody}>
                <h3 className={styles.caseCardTitle}>{item.title}</h3>

                <div className={styles.caseLocation}>
                  <MapPin size={14} strokeWidth={2.4} aria-hidden="true" />
                  <span>{item.location}</span>
                </div>

                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBarHeader}>
                    <span className={styles.progressBarPercent}>{item.percent}%</span>
                  </div>
                  <div className={styles.progressBarTrack} role="progressbar" aria-valuenow={item.percent} aria-valuemin={0} aria-valuemax={100}>
                    <div
                      className={item.fillClass}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>

                <div className={styles.caseStatsRow}>
                  <span>
                    <strong className={styles.amountRaised}>{item.raised}</strong> raised of {item.goal}
                  </span>
                </div>

                <Link
                  href={`/donation?cause=${encodeURIComponent(item.category)}#donate`}
                  className={styles.btnDonateCase}
                >
                  Donate Now
                  <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
