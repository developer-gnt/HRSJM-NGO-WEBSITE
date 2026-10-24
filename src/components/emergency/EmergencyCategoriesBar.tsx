"use client";

import Link from "next/link";
import { HeartPulse, GraduationCap, CloudLightning, Home, ArrowRight } from "lucide-react";
import styles from "./emergency.module.css";

const categories = [
  {
    title: "Medical Assistance",
    sub: "Emergency treatment and surgeries",
    icon: HeartPulse,
    cardClass: styles.pillMedical,
    iconClass: styles.pillIconMedical,
    href: "#medical-cases",
  },
  {
    title: "Educational Assistance",
    sub: "School fees, admission, uniforms and learning support",
    icon: GraduationCap,
    cardClass: styles.pillEducation,
    iconClass: styles.pillIconEducation,
    href: "#education-cases",
  },
  {
    title: "Disaster Relief",
    sub: "Support during floods, storms, fires and natural disasters",
    icon: CloudLightning,
    cardClass: styles.pillDisaster,
    iconClass: styles.pillIconDisaster,
    href: "#disaster-cases",
  },
  {
    title: "Housing & Rehabilitation",
    sub: "Rebuilding homes and supporting affected families",
    icon: Home,
    cardClass: styles.pillHousing,
    iconClass: styles.pillIconHousing,
    href: "#housing-cases",
  },
];

export default function EmergencyCategoriesBar() {
  return (
    <section className={styles.categoriesBarSection} aria-label="Emergency categories navigation">
      <div className={styles.container}>
        <div className={styles.categoriesGrid}>
          {categories.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.href} className={`${styles.categoryPillCard} ${item.cardClass}`}>
                <div className={`${styles.pillIconWrap} ${item.iconClass}`} aria-hidden="true">
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <div className={styles.pillInfo}>
                  <h3 className={styles.pillTitle}>{item.title}</h3>
                  <p className={styles.pillSub}>{item.sub}</p>
                </div>
                <ArrowRight size={16} strokeWidth={2.4} className={styles.pillArrow} aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
