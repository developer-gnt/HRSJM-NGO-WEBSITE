"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import styles from "./whatWeDo.module.css";

interface WorkCard {
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

const workCards: WorkCard[] = [
  {
    title: "Human Rights",
    subtitle: "Monitoring & Advocacy",
    image: "/card-1.png",
    alt: "HRSJM volunteers supporting community members and documenting human rights concerns",
  },
  {
    title: "Legal Awareness",
    subtitle: "& Policy Support",
    image: "/card-2.png",
    alt: "Community legal awareness session explaining rights and entitlements",
  },
  {
    title: "Community",
    subtitle: "Organising",
    image: "/card-3.png",
    alt: "Neighbours gathering outdoors to organise a local community initiative",
  },
  {
    title: "Training & Leadership",
    subtitle: "Development",
    image: "/card-4.png",
    alt: "Participants collaborating during an HRSJM leadership training workshop",
  },
];

const workAreas = [
  "Legal Aid & Support",
  "Awareness & Education",
  "Community Development",
  "Research & Policy",
  "Advocacy & Campaigns",
  "Crisis Support",
];

export default function WhatWeDoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    node.classList.add(styles.armed);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.classList.add(styles.revealed);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const revealDelay = (steps: number): CSSProperties =>
    ({ "--reveal-delay": `${steps * 90}ms` }) as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
      className={styles.section}
    >
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <h2
              id="what-we-do-heading"
              className={styles.heading}
              style={revealDelay(0)}
              data-reveal=""
            >
              What HRSJM
              <br />
              Does
            </h2>
            <p
              className={styles.description}
              style={revealDelay(1)}
              data-reveal=""
            >
              We work through awareness, advocacy, training, community
              organising and support to create lasting change.
            </p>
            <Link
              href="/what-hrsjm-does"
              className={styles.cta}
              style={revealDelay(2)}
              data-reveal-fade=""
            >
              Explore Our Work
              <Icon name="arrow" width={16} height={16} />
            </Link>
          </div>

          <ul className={styles.cards} aria-label="HRSJM work areas">
            {workCards.map((card, index) => (
              <li key={card.title} className={styles.cardCell}>
                <Link
                  href="/what-hrsjm-does"
                  className={styles.card}
                  style={{ "--stagger": index } as CSSProperties}
                  data-reveal-item=""
                >
                  <span className={styles.cardImageWrap}>
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 639px) 86vw, (max-width: 1023px) 44vw, 17vw"
                      className={styles.cardImage}
                    />
                  </span>
                  <span className={styles.cardBody}>
                    <span className={styles.cardTitle}>{card.title}</span>
                    <span className={styles.cardSubtitle}>{card.subtitle}</span>
                    <span className={styles.cardArrow} aria-hidden="true">
                      <Icon name="arrow" width={15} height={15} />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={styles.workAreas}
            aria-label="Our work areas"
            style={revealDelay(3)}
            data-reveal=""
          >
            <h3 className={styles.workAreasTitle}>Our Work Areas</h3>
            <ul className={styles.workAreasList}>
              {workAreas.map((area) => (
                <li key={area} className={styles.workArea}>
                  <span className={styles.workAreaMarker} aria-hidden="true">
                    <Icon name="arrow" width={12} height={12} />
                  </span>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
