"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollReveal, revealDelay } from "@/hooks/useScrollReveal";
import styles from "./news.module.css";

export default function NewsCTA() {
  const sectionRef = useScrollReveal(styles);

  return (
    <section ref={sectionRef} className={styles.cta} aria-labelledby="news-cta-heading">
      <div className={styles.ctaInner}>
        <div className={styles.ctaMain}>
          <p className={styles.ctaEyebrow} data-reveal>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Stay Informed. Stay Involved.
          </p>
          <h2 id="news-cta-heading" className={styles.ctaHeading} data-reveal style={revealDelay(1)}>
            Be a Part of the Movement
          </h2>
          <p className={styles.ctaDesc} data-reveal style={revealDelay(2)}>
            Read, share and support our work for human rights, dignity and
            equality.
          </p>
          <div className={styles.ctaActions} data-reveal style={revealDelay(3)}>
            <Link href="/donation" className={styles.btnGold}>
              Donate Now
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <Link href="/membership" className={styles.btnGhost}>
              Join Our Movement
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <p className={styles.ctaQuote} aria-hidden="true">
          People.
          <br />
          Rights.
          <br />
          Equality.
          <br />
          Together.
          <span className={styles.scriptStroke} />
        </p>
      </div>
    </section>
  );
}
