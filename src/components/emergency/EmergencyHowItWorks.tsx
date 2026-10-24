"use client";

import { FileText, Search, Check, Users, Heart, ArrowRight } from "lucide-react";
import styles from "./emergency.module.css";

const steps = [
  {
    number: "1",
    title: "1. Submit Request",
    desc: "Fill the form with details and documents.",
    icon: FileText,
    badgeClass: styles.stepBadgeBlue,
  },
  {
    number: "2",
    title: "2. Verification",
    desc: "Our team verifies the need and documents.",
    icon: Search,
    badgeClass: styles.stepBadgeGold,
  },
  {
    number: "3",
    title: "3. Approval",
    desc: "Valid cases are approved and prepared for support.",
    icon: Check,
    badgeClass: styles.stepBadgeGreen,
  },
  {
    number: "4",
    title: "4. Public Campaign",
    desc: "The verified case is published for donations.",
    icon: Users,
    badgeClass: styles.stepBadgeSky,
  },
  {
    number: "5",
    title: "5. Updates & Closure",
    desc: "We share progress and ensure proper use of funds.",
    icon: Heart,
    badgeClass: styles.stepBadgePurple,
  },
];

export default function EmergencyHowItWorks() {
  return (
    <section className={styles.worksSection} aria-labelledby="works-heading">
      <div className={styles.container}>
        <div className={styles.worksHeader}>
          <div className={styles.worksEyebrowBar} aria-hidden="true" />
          <h2 id="works-heading" className={styles.worksEyebrow}>
            HOW EMERGENCY ASSISTANCE WORKS
          </h2>
        </div>

        <div className={styles.worksGrid}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.number} style={{ display: "contents" }}>
                <div className={styles.stepCard}>
                  <div className={step.badgeClass} aria-hidden="true">
                    <Icon size={24} strokeWidth={2.4} />
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>

                {!isLast && (
                  <div className={styles.stepArrow} aria-hidden="true">
                    <ArrowRight size={22} strokeWidth={2} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
