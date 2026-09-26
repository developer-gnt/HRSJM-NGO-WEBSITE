"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Icon, { type IconName } from "@/components/ui/Icon";
import styles from "./exploreRights.module.css";

interface RightArea {
  icon: IconName;
  title: string;
  description: string;
}

const rights: RightArea[] = [
  {
    icon: "users",
    title: "Human Rights",
    description: "Basic rights and freedoms every individual is entitled to.",
  },
  {
    icon: "shieldCheck",
    title: "Fundamental Rights",
    description: "Constitutional rights guaranteed to every citizen of India.",
  },
  {
    icon: "venus",
    title: "Women's Rights",
    description: "Protection, safety, equality and opportunities for women.",
  },
  {
    icon: "baby",
    title: "Children's Rights",
    description: "Care, protection, education and development for every child.",
  },
  {
    icon: "briefcase",
    title: "Labour Rights",
    description: "Fair wages, safe working conditions and social security.",
  },
  {
    icon: "userRoundCheck",
    title: "Senior Citizen Rights",
    description: "Dignity, care and protection for senior citizens.",
  },
  {
    icon: "usersRound",
    title: "Minority Rights",
    description: "Equal rights and protection for minority communities.",
  },
  {
    icon: "graduationCap",
    title: "Right to Education",
    description: "Access to quality education for every child.",
  },
  {
    icon: "fileText",
    title: "Right to Information",
    description: "The right to access information and promote transparency.",
  },
  {
    icon: "megaphone",
    title: "Freedom of Speech",
    description: "The right to express opinions and participate in democracy.",
  },
];

export default function ExploreRightsSection() {
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
      id="explore-rights"
      className={styles.section}
      aria-labelledby="explore-rights-heading"
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Explore Rights
            </p>
            <h2 id="explore-rights-heading" className={styles.heading}>
              Know Your Rights
            </h2>
            <p className={styles.description}>
              Explore key areas of human rights that protect your dignity,
              freedom and equal opportunities.
            </p>
          </div>

          <figure className={styles.quote}>
            <span className={styles.quoteMark} aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className={styles.quoteText}>
              An informed citizen is a
              <br />
              stronger, fairer and more
              <br />
              inclusive community.
            </blockquote>
          </figure>
        </div>

        <ul className={styles.grid}>
          {rights.map((right, index) => (
            <li
              key={right.title}
              className={styles.cell}
              style={{ "--stagger": index } as CSSProperties}
            >
              <article className={styles.card}>
                <span className={styles.iconRing} aria-hidden="true">
                  <Icon name={right.icon} width={20} height={20} />
                </span>
                <h3 className={styles.cardTitle}>{right.title}</h3>
                <p className={styles.cardDesc}>{right.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
