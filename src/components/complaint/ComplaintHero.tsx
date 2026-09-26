"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, Heart, Lock, ShieldCheck, Users } from "lucide-react";
import { useScrollReveal, revealDelay, revealStagger } from "@/hooks/useScrollReveal";
import styles from "./complaint.module.css";

const highlights = [
  { icon: Lock, label: ["Confidential", "& Safe"] },
  { icon: Users, label: ["Support from", "Experts"] },
  { icon: ShieldCheck, label: ["Guidance at", "Every Step"] },
  { icon: Heart, label: ["People-Centred", "Approach"] },
];

export default function ComplaintHero() {
  const sectionRef = useScrollReveal(styles);

  return (
    <section ref={sectionRef} className={styles.hero} aria-labelledby="complaint-hero-heading">
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb" data-reveal>
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <ChevronRight size={13} strokeWidth={2} className={styles.breadcrumbSeparator} aria-hidden="true" />
          <span className={styles.breadcrumbCurrent} aria-current="page">
            Complaint / Get Help
          </span>
        </nav>

        <div className={styles.heroMain}>
          <p className={styles.eyebrow} data-reveal style={revealDelay(1)}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Complaint / Get Help
          </p>
          <h1 id="complaint-hero-heading" className={styles.heading} data-reveal style={revealDelay(2)}>
            Raise a Concern.
            <span className={styles.headingGold}>Get Support.</span>
          </h1>
          <p className={styles.description} data-reveal style={revealDelay(3)}>
            If you or someone you know has faced a human rights violation or
            needs legal, social or community support, we are here to help. Your
            voice matters, and we will stand with you.
          </p>
          <div className={styles.actions} data-reveal style={revealDelay(4)}>
            <Link href="#file-a-complaint" className={styles.btnGold}>
              File a Complaint
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <Link href="#how-we-can-help" className={styles.btnGhost}>
              Explore Support Options
            </Link>
          </div>
        </div>

        <ul className={styles.highlights}>
          {highlights.map(({ icon: Icon, label }, index) => (
            <li
              key={label.join(" ")}
              className={styles.highlight}
              data-reveal-item
              style={revealStagger(index + 5)}
            >
              <span className={styles.highlightIcon}>
                <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className={styles.highlightText}>
                {label[0]}
                <br />
                {label[1]}
              </span>
            </li>
          ))}
        </ul>

        <p className={styles.scriptNote} aria-hidden="true">
          Your
          <br />
          Voice
          <br />
          Matters.
          <span className={styles.scriptStroke} />
        </p>
      </div>
    </section>
  );
}
