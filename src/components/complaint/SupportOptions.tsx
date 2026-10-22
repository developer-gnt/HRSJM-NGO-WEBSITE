"use client";

import { FileText, Scale, ShieldCheck, Users } from "lucide-react";
import { useScrollReveal, revealDelay, revealStagger } from "@/hooks/useScrollReveal";
import styles from "./complaint.module.css";

const supportCards = [
  {
    icon: Scale,
    title: "Legal Assistance",
    text: "Guidance and support for human rights violations, legal rights and documentation.",
  },
  {
    icon: Users,
    title: "Counselling & Support",
    text: "Emotional and social support for individuals and families in distress.",
  },
  {
    icon: FileText,
    title: "Case Review",
    text: "We review your complaint and guide you on possible actions.",
  },
  {
    icon: ShieldCheck,
    title: "Referral & Follow-up",
    text: "Connect with trusted partners, NGOs and legal networks for further support.",
  },
];

export default function SupportOptions() {
  const sectionRef = useScrollReveal(styles);

  return (
    <section id="how-we-can-help" ref={sectionRef} className={styles.support} aria-labelledby="support-heading">
      <div className={styles.supportInner}>
        <div className={styles.supportHeader}>
          <div className={styles.supportIntro}>
            <p className={styles.supportEyebrow} data-reveal>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Our Support
            </p>
            <h2 id="support-heading" className={styles.supportHeading} data-reveal style={revealDelay(1)}>
              How We Can Help
            </h2>
            <p className={styles.supportDescription} data-reveal style={revealDelay(2)}>
              We provide support across various areas related to human rights,
              legal aid, and community assistance.
            </p>
          </div>

          <div className={styles.supportQuote} data-reveal style={revealDelay(3)}>
            <span className={styles.supportQuoteMark} aria-hidden="true">
              &ldquo;
            </span>
            <p className={styles.supportQuoteText}>
              Justice begins with
              <br />
              someone listening.
            </p>
            <span className={styles.supportQuoteStroke} aria-hidden="true" />
          </div>
        </div>

        <div className={styles.supportGrid}>
          {supportCards.map(({ icon: Icon, title, text }, index) => (
            <article
              key={title}
              className={styles.supportCard}
              data-reveal-item
              style={revealStagger(index)}
            >
              <span className={styles.supportCardIcon}>
                <Icon size={28} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3 className={styles.supportCardTitle}>{title}</h3>
              <p className={styles.supportCardText}>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}