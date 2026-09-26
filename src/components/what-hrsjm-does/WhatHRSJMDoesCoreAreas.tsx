"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Icon, { type IconName } from "@/components/ui/Icon";
import styles from "./what-hrsjm-does.module.css";

interface CoreArea {
  icon: IconName;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const coreAreas: CoreArea[] = [
  {
    icon: "scale",
    title: "Legal Aid & Support",
    description: "Providing legal guidance and support to individuals and communities.",
    image: "/WHD-Cards/card-1.png",
    alt: "Wooden gavel on a desk representing legal aid and support",
  },
  {
    icon: "bookOpen",
    title: "Awareness & Education",
    description: "Conducting workshops, campaigns and training programs.",
    image: "/WHD-Cards/card-2.png",
    alt: "Schoolchildren taking part in an awareness and education session",
  },
  {
    icon: "usersRound",
    title: "Community Development",
    description: "Strengthening communities through collaboration and local initiatives.",
    image: "/WHD-Cards/card-3.png",
    alt: "Community members gathered for a local development meeting",
  },
  {
    icon: "fileText",
    title: "Research & Policy",
    description: "Researching key issues and advocating for policy change.",
    image: "/WHD-Cards/card-4.png",
    alt: "Notes and writing during research and policy work",
  },
  {
    icon: "megaphone",
    title: "Advocacy & Campaigns",
    description: "Raising voices for justice through campaigns and public engagement.",
    image: "/WHD-Cards/card-5.png",
    alt: "Protesters raising a justice banner during an advocacy campaign",
  },
  {
    icon: "shieldCheck",
    title: "Crisis Support",
    description: "Immediate assistance for human rights violations and vulnerable individuals.",
    image: "/WHD-Cards/card-6.png",
    alt: "Hands joined together in support during a crisis",
  },
];

export default function WhatHRSJMDoesCoreAreas() {
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
      id="core-areas"
      className={styles.coreAreas}
      aria-labelledby="core-areas-heading"
    >
      <div className={styles.coreAreasInner}>
        <div className={styles.coreAreasHeader}>
          <div className={styles.coreAreasIntro}>
            <p className={styles.coreAreasEyebrow}>
              <span className={styles.coreAreasEyebrowDot} aria-hidden="true" />
              Our Core Areas
            </p>

            <h2 id="core-areas-heading" className={styles.coreAreasHeading}>
              Key Areas
              <span className={styles.coreAreasHeadingLine}>of Our Work</span>
            </h2>
          </div>

          <p className={styles.coreAreasDescription}>
            We focus on multiple areas to create a more just, equal and
            inclusive society. Each area is designed to address real
            challenges faced by communities across India.
          </p>
        </div>

        <ul className={styles.coreAreasGrid} aria-label="Key areas of our work">
          {coreAreas.map((area, index) => (
            <li
              key={area.title}
              className={styles.coreCard}
              style={{ "--stagger": index } as CSSProperties}
            >
              <div className={styles.coreCardInner}>
                <div className={styles.coreCardMedia}>
                  <Image
                    src={area.image}
                    alt={area.alt}
                    fill
                    sizes="(max-width: 639px) 87vw, (max-width: 1023px) 42vw, 30vw"
                    className={styles.coreCardImage}
                  />
                </div>

                <div className={styles.coreCardBody}>
                  <span className={styles.coreCardIcon} aria-hidden="true">
                    <Icon name={area.icon} width={22} height={22} />
                  </span>

                  <div className={styles.coreCardText}>
                    <h3 className={styles.coreCardTitle}>{area.title}</h3>
                    <p className={styles.coreCardDesc}>{area.description}</p>
                  </div>

                  <span className={styles.coreCardArrow} aria-hidden="true">
                    <Icon name="arrow" width={17} height={17} />
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
