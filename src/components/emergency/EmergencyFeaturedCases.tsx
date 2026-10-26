"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, UserCheck } from "lucide-react";
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
  seeker?: string;
}

const defaultEmergencyCases: EmergencyCase[] = [
  {
    id: "medical-emergency-fund",
    category: "Medical Assistance",
    badgeClass: styles.caseBadgeMedical,
    fillClass: styles.progressBarFillMedical,
    title: "Critical Medical Care & Emergency Surgery Support",
    location: "National Emergency Aid",
    raised: "₹ 0",
    goal: "₹ 5,00,000",
    percent: 0,
    image: "/images/donation/emergency/emergency-medical.jpg",
    alt: "Medical assistance fund for life-saving critical care",
    seeker: "HRSJM Medical Emergency Fund",
  },
  {
    id: "education-support-fund",
    category: "Educational Assistance",
    badgeClass: styles.caseBadgeEducation,
    fillClass: styles.progressBarFillEducation,
    title: "Education Sponsorship & Schooling Support",
    location: "Underprivileged Students Mission",
    raised: "₹ 0",
    goal: "₹ 5,00,000",
    percent: 0,
    image: "/images/donation/emergency/emergency-education.jpg",
    alt: "Students receiving educational sponsorship and supplies",
    seeker: "HRSJM Educational Support Fund",
  },
  {
    id: "disaster-relief-fund",
    category: "Disaster Relief",
    badgeClass: styles.caseBadgeDisaster,
    fillClass: styles.progressBarFillDisaster,
    title: "Disaster Relief & Affected Family Rehabilitation",
    location: "Disaster Response Units",
    raised: "₹ 0",
    goal: "₹ 5,00,000",
    percent: 0,
    image: "/images/donation/emergency/emergency-disaster.jpg",
    alt: "Emergency disaster relief and victim rehabilitation",
    seeker: "HRSJM Disaster Relief Fund",
  },
  {
    id: "housing-rehab-fund",
    category: "Housing & Rehabilitation",
    badgeClass: styles.caseBadgeHousing,
    fillClass: styles.progressBarFillHousing,
    title: "Shelter Rebuilding & Citizen Rehabilitation",
    location: "Vulnerable Communities Aid",
    raised: "₹ 0",
    goal: "₹ 5,00,000",
    percent: 0,
    image: "/images/donation/emergency/emergency-housing.jpg",
    alt: "Housing damage assistance and family rehabilitation",
    seeker: "HRSJM Housing Assistance Fund",
  },
];

export default function EmergencyFeaturedCases() {
  const [cases, setCases] = useState<EmergencyCase[]>(defaultEmergencyCases);

  useEffect(() => {
    fetch("/api/donation/causes")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.items) && data.items.length > 0) {
          const updated = defaultEmergencyCases.map((defCase) => {
            const dbMatch = data.items.find(
              (item: any) =>
                item.reason?.toLowerCase() === defCase.category.toLowerCase() ||
                item.reason?.toLowerCase().includes(defCase.category.toLowerCase())
            );
            if (dbMatch) {
              const goalNum = Number(dbMatch.requested_amount) || 500000;
              const raisedNum = Number(dbMatch.raised_amount) || 0;
              const pct = goalNum > 0 ? Math.min(100, Math.round((raisedNum / goalNum) * 100)) : 0;
              return {
                ...defCase,
                title: dbMatch.description || defCase.title,
                seeker: dbMatch.full_name || defCase.seeker,
                goal: `₹ ${new Intl.NumberFormat("en-IN").format(goalNum)}`,
                raised: `₹ ${new Intl.NumberFormat("en-IN").format(raisedNum)}`,
                percent: pct > 0 ? pct : defCase.percent,
              };
            }
            return defCase;
          });
          setCases(updated);
        }
      })
      .catch((err) => console.warn("Could not load dynamic cases:", err));
  }, []);

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
          <Link href="/donation#donate" className={styles.viewAllLink}>
            View All Cases
            <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        </div>

        {/* Cases Grid */}
        <div className={styles.casesGrid}>
          {cases.map((item) => {
            const fullCauseParam = `${item.category}: ${item.title}${item.seeker ? ` (${item.seeker})` : ""}`;
            return (
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

                  <div className={styles.caseLocation} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <MapPin size={14} strokeWidth={2.4} aria-hidden="true" />
                      <span>{item.location}</span>
                    </div>
                    {item.seeker && (
                      <div style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#065f46", fontWeight: 700, background: "#ecfdf5", padding: "1px 6px", borderRadius: "4px" }}>
                        <UserCheck size={12} />
                        <span>Seeker: {item.seeker}</span>
                      </div>
                    )}
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
                    href={`/donation?cause=${encodeURIComponent(fullCauseParam)}#donate`}
                    className={styles.btnDonateCase}
                  >
                    Donate Now
                    <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

