"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import styles from "./what-hrsjm-does.module.css";

export default function WhatHRSJMDoesFinalCta() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add(styles.revealed);
      return;
    }

    section.classList.add(styles.armed);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add(styles.revealed);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="join"
      className={styles.finalCta}
      aria-labelledby="final-cta-heading"
    >
      <div className={styles.finalCtaBg} aria-hidden="true">
        <Image
          src="/WHD-FinalCta/final-cta-bg.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.finalCtaImg}
        />
        <div className={styles.finalCtaScrim} />
      </div>
      <div className={styles.finalCtaInner}>
        <div className={styles.finalCtaContent}>
          <p className={styles.finalCtaEyebrow}>
            <span className={styles.finalCtaEyebrowDot} aria-hidden="true" />
            Be a Part of the Change
          </p>
          <h2 id="final-cta-heading" className={styles.finalCtaHeading}>
            Together for a
            <span className={styles.finalCtaHeadingLine}>
              More Just Tomorrow
            </span>
          </h2>
          <p className={styles.finalCtaDescription}>
            Your support helps us reach more people, protect rights and create
            lasting impact.
          </p>
          <div className={styles.finalCtaActions}>
            <Link href="/donation" className={styles.primaryBtn}>
              Make a Donation
              <span className={styles.primaryBtnIcon} aria-hidden="true">
                <Icon name="arrow" width={17} height={17} strokeWidth={2} />
              </span>
            </Link>
            <Link href="/membership" className={styles.secondaryBtn}>
              <span className={styles.finalCtaSecondaryIcon} aria-hidden="true">
                <Icon name="arrow" width={17} height={17} strokeWidth={2} />
              </span>
              Join Our Movement
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.finalCtaScript} aria-hidden="true">
        <p className={styles.finalCtaScriptText}>
          Small actions create{" "}
          <br />
          big change.
        </p>
      </div>
    </section>
  );
}
