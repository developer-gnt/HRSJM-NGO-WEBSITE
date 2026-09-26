"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import styles from "./kyr.module.css";

const rights: { label: string; icon: IconName; href: string }[] = [
  { label: "Human Rights", icon: "usersRound", href: "/rights/human-rights" },
  { label: "Civil Rights", icon: "scale", href: "/rights/civil-rights" },
  { label: "Fundamental Rights", icon: "shieldCheck", href: "/rights/fundamental-rights" },
  { label: "Women's Rights", icon: "venus", href: "/rights/womens-rights" },
  { label: "Children's Rights", icon: "baby", href: "/rights/childrens-rights" },
  { label: "Labour Rights", icon: "briefcase", href: "/rights/labour-rights" },
  { label: "Senior Citizen Rights", icon: "userRoundCheck", href: "/rights/senior-citizen-rights" },
  { label: "Minority Rights", icon: "users", href: "/rights/minority-rights" },
  { label: "Right to Education", icon: "graduationCap", href: "/rights/right-to-education" },
  { label: "Right to Information", icon: "fileText", href: "/rights/right-to-information" },
  { label: "Freedom of Speech", icon: "megaphone", href: "/rights/freedom-of-speech" },
  { label: "Civil Liberties", icon: "hand", href: "/rights/civil-liberties" },
];

export default function KnowYourRightsSection() {
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
      className={styles.section}
      aria-labelledby="kyr-heading"
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id="kyr-heading" className={styles.heading}>
            Know Your
            <br />
            Rights
          </h2>
          <p className={styles.tagline}>
            Awareness is the first step to justice. Explore the rights that
            protect you.
          </p>
          <Link href="/rights" className={styles.cta}>
            Explore All Rights
            <Icon name="arrow" width={16} height={16} />
          </Link>
        </div>

        <ul className={styles.grid}>
          {rights.map((right, index) => (
            <li key={right.label} className={styles.cell}>
              <Link
                href={right.href}
                className={styles.card}
                style={{ "--stagger": index } as React.CSSProperties}
              >
                <span className={styles.iconRing}>
                  <Icon name={right.icon} width={19} height={19} />
                </span>
                <span className={styles.label}>{right.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
