"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import styles from "./exploreRights.module.css";

interface RightArea {
  icon: IconName;
  title: string;
  description: string;
  href: string;
}

const rights: RightArea[] = [
  {
    icon: "users",
    title: "Human Rights",
    description: "Inherent rights, dignity and universal freedoms every individual is entitled to.",
    href: "/rights/human-rights",
  },
  {
    icon: "scale",
    title: "Civil Rights",
    description: "Equal treatment, civic protections and non-discrimination under the law.",
    href: "/rights/civil-rights",
  },
  {
    icon: "shieldCheck",
    title: "Fundamental Rights",
    description: "Six constitutional rights guaranteed to every citizen under Part III of the Constitution.",
    href: "/rights/fundamental-rights",
  },
  {
    icon: "venus",
    title: "Women's Rights",
    description: "Protection, safety, equal pay, domestic safeguards and empowerment for women.",
    href: "/rights/womens-rights",
  },
  {
    icon: "baby",
    title: "Children's Rights",
    description: "Care, protection, education, nutrition and eradication of child labour.",
    href: "/rights/childrens-rights",
  },
  {
    icon: "briefcase",
    title: "Labour Rights",
    description: "Fair wages, workplace safety, social security and dignity for workers.",
    href: "/rights/labour-rights",
  },
  {
    icon: "userRoundCheck",
    title: "Senior Citizen Rights",
    description: "Dignity, maintenance, priority healthcare and legal care for our elders.",
    href: "/rights/senior-citizen-rights",
  },
  {
    icon: "usersRound",
    title: "Minority Rights",
    description: "Protection of culture, language, religious freedom and educational autonomy.",
    href: "/rights/minority-rights",
  },
  {
    icon: "graduationCap",
    title: "Right to Education",
    description: "Universal access to free, compulsory quality schooling under Article 21A.",
    href: "/rights/right-to-education",
  },
  {
    icon: "fileText",
    title: "Right to Information",
    description: "Citizen empowerment to inspect public records and demand accountability.",
    href: "/rights/right-to-information",
  },
  {
    icon: "megaphone",
    title: "Freedom of Speech",
    description: "The right to hold opinions, express ideas, debate and peacefully dissent.",
    href: "/rights/freedom-of-speech",
  },
  {
    icon: "hand",
    title: "Civil Liberties",
    description: "Personal autonomy, privacy, freedom of peaceful assembly and due process.",
    href: "/rights/civil-liberties",
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
      { threshold: 0.15 }
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
              freedom and equal opportunities — click any category to view its comprehensive guide.
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
              <Link
                href={right.href}
                className={styles.card}
                title={`Explore ${right.title} Details`}
              >
                <span className={styles.iconRing} aria-hidden="true">
                  <Icon name={right.icon} width={20} height={20} />
                </span>
                <h3 className={styles.cardTitle}>{right.title}</h3>
                <p className={styles.cardDesc}>{right.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
