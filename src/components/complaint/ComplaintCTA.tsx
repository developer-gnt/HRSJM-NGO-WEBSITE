"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollReveal, revealDelay } from "@/hooks/useScrollReveal";
import styles from "./complaint.module.css";

export default function ComplaintCTA() {
  const sectionRef = useScrollReveal(styles);

  return (
    <section ref={sectionRef} className={styles.cta} aria-labelledby="cta-heading">
      <div className={styles.ctaInner}>
        <p className={styles.ctaScript} data-reveal aria-hidden="true">
          Small actions
          <br />
          create big change.
          <span className={styles.ctaScriptStroke} />
        </p>

        <div className={styles.ctaContent}>
          <p className={styles.ctaEyebrow} data-reveal>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Stand With Us
          </p>
          <h2 id="cta-heading" className={styles.ctaHeading} data-reveal style={revealDelay(1)}>
            Help Us Reach More People
          </h2>
          <p className={styles.ctaDescription} data-reveal style={revealDelay(2)}>
            Your support helps us provide legal aid, counselling, and
            community assistance to those in need.
          </p>
          <div className={styles.ctaActions} data-reveal style={revealDelay(3)}>
            <Link href="/donation" className={styles.btnGold}>
              Donate Now
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <Link href="/membership" className={styles.btnGhost}>
              Join Our Movement
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}