"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import styles from "./what-hrsjm-does.module.css";

interface ApproachPillar {
  icon: IconName;
  title: string;
  description: string;
}

const pillars: ApproachPillar[] = [
  { icon: "bookOpen", title: "Awareness", description: "Educating communities" },
  { icon: "hand", title: "Support", description: "Helping individuals in need" },
  { icon: "megaphone", title: "Advocacy", description: "Engaging with systems & policy" },
  { icon: "usersRound", title: "Empowerment", description: "Building stronger communities" },
];

export default function WhatHRSJMDoesApproach() {
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
      id="approach"
      className={styles.approach}
      aria-labelledby="approach-heading"
    >
      <div className={styles.approachInner}>
        <div className={styles.approachIntro}>
          <p className={styles.approachEyebrow}>
            <span className={styles.approachEyebrowDot} aria-hidden="true" />
            Our Approach
          </p>

          <h2 id="approach-heading" className={styles.approachHeading}>
            Awareness.
            <span className={styles.approachHeadingLine}>
              Action. Lasting Change.
            </span>
          </h2>

          <p className={styles.approachDescription}>
            We combine community engagement, legal support, training, advocacy
            and collaboration to address human rights issues at both the
            grassroots and policy levels.
          </p>

          <Link href="/about" className={styles.approachCta}>
            Learn About Our Approach
            <span className={styles.approachCtaIcon}>
              <Icon name="arrow" width={17} height={17} strokeWidth={2} />
            </span>
          </Link>
        </div>

        <div className={styles.approachDivider} aria-hidden="true" />

        <ul className={styles.approachList}>
          {pillars.map((pillar, index) => (
            <li
              key={pillar.title}
              className={styles.approachItem}
              style={{ "--stagger": index } as CSSProperties}
            >
              <span className={styles.approachIconRing} aria-hidden="true">
                <Icon name={pillar.icon} width={26} height={26} />
              </span>
              <h3 className={styles.approachItemTitle}>{pillar.title}</h3>
              <p className={styles.approachItemDesc}>{pillar.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
