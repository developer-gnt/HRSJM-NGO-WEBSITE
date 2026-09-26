"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import styles from "./what-hrsjm-does.module.css";

interface ImpactStat {
  icon: IconName;
  value: string;
  label: string;
}

const impactStats: ImpactStat[] = [
  { icon: "users", value: "78,777+", label: "People Reached" },
  { icon: "phone", value: "1,57,431", label: "Complaints Supported" },
  { icon: "scale", value: "1,57,273", label: "Cases Resolved" },
  { icon: "location", value: "200+", label: "Communities" },
];

export default function WhatHRSJMDoesImpact() {
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
      id="impact"
      className={styles.impact}
      aria-labelledby="impact-heading"
    >
      <div className={styles.impactBg} aria-hidden="true">
        <Image
          src="/WHD-Impact/impact-bg.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.impactImg}
        />
        <div className={styles.impactScrim} />
      </div>

      <div className={styles.impactInner}>
        <div className={styles.impactIntro}>
          <p className={styles.impactEyebrow}>
            <span className={styles.impactEyebrowDot} aria-hidden="true" />
            Our Impact
          </p>

          <h2 id="impact-heading" className={styles.impactHeading}>
            Creating Measurable
            <span className={styles.impactHeadingHighlight}>Change</span>
          </h2>

          <p className={styles.impactDescription}>
            Through collective action and community support, we have been able
            to create meaningful impact across multiple regions.
          </p>

          <Link href="/about" className={styles.impactCta}>
            View Our Impact
            <span className={styles.impactCtaIcon} aria-hidden="true">
              <Icon name="arrow" width={17} height={17} strokeWidth={2} />
            </span>
          </Link>
        </div>

        <div className={styles.impactPanel}>
          <ul className={styles.impactStats} aria-label="Our impact in numbers">
            {impactStats.map((stat, index) => (
              <li
                key={stat.label}
                className={styles.impactStat}
                style={{ "--stagger": index } as CSSProperties}
              >
                <span className={styles.impactStatIcon} aria-hidden="true">
                  <Icon name={stat.icon} width={26} height={26} />
                </span>
                <span className={styles.impactStatNumber}>{stat.value}</span>
                <span className={styles.impactStatLabel}>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
