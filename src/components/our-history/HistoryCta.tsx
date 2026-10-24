"use client";

import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import styles from "./our-history.module.css";

export default function HistoryCta() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.ctaGrid}>
          {/* Left: Icon Badge */}
          <div className={styles.ctaIconWrap}>
            <Users size={32} strokeWidth={2.2} />
          </div>

          {/* Center-Left: Narrative */}
          <div className={styles.ctaContent}>
            <span className={styles.ctaEyebrow}>BE A PART OF OUR JOURNEY</span>
            <h2 className={styles.ctaTitle}>History is Created by People.</h2>
            <p className={styles.ctaSubtitle}>
              Join the Human Rights &amp; Social Justice Mission (HRSJM) as a
              member, activist or volunteer. Help raise awareness, support people
              in need and contribute towards a better tomorrow.
            </p>
          </div>

          {/* Center-Right: Action Buttons */}
          <div className={styles.ctaButtons}>
            <Link href="/membership" className={styles.ctaPrimaryBtn}>
              <span>Join HRSJM</span>
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
            <Link href="/contact" className={styles.ctaSecondaryBtn}>
              Contact Us
            </Link>
          </div>

          {/* Right: Signature Cursive Motto */}
          <div className={styles.ctaQuoteCallout}>
            Stand for<br />
            Human Rights<br />
            &amp; Work for<br />
            Social Justice.
          </div>
        </div>
      </div>
    </section>
  );
}
