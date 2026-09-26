"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Icon, { type IconName } from "@/components/ui/Icon";
import styles from "./rights-impact.module.css";

interface ImpactStat {
  icon: IconName;
  value: string;
  label: string;
}

const impactStats: ImpactStat[] = [
  { icon: "users", value: "78,777+", label: "People Reached" },
  { icon: "scale", value: "1,57,431", label: "Legal Queries Supported" },
  { icon: "megaphone", value: "200+", label: "Awareness Programs" },
  { icon: "location", value: "25+", label: "States Across India" },
];

export default function RightsImpact() {
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
      id="our-impact"
      className={styles.section}
      aria-labelledby="our-impact-heading"
    >
      <Image
        src="/rights-impact-bg.png"
        alt=""
        fill
        sizes="100vw"
        className={styles.bg}
        aria-hidden="true"
      />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          Our Impact
        </p>
        <h2 id="our-impact-heading" className={styles.heading}>
          Rights Awareness
          <br />
          Creating Real Change
        </h2>
        <p className={styles.description}>
          Through awareness and education, we empower individuals and
          communities to stand up for their rights and build a more equal
          society.
        </p>

        <ul
          className={styles.stats}
          aria-label="Rights awareness impact in numbers"
        >
          {impactStats.map((stat, index) => (
            <li
              key={stat.label}
              className={styles.stat}
              style={{ "--stagger": index } as CSSProperties}
            >
              <span className={styles.statIcon} aria-hidden="true">
                <Icon name={stat.icon} width={18} height={18} strokeWidth={1.8} />
              </span>
              <span className={styles.statCopy}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
