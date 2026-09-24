"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import Icon, { type IconName } from "@/components/ui/Icon";
import styles from "./about.module.css";

interface Principle {
  label: string;
  icon: IconName;
}

const principles: Principle[] = [
  { label: "Peace", icon: "badge" },
  { label: "Democracy", icon: "landmark" },
  // { label: "Secularism", icon: "scale" },
  { label: "Human Security", icon: "shieldCheck" },
  { label: "Pluralism", icon: "usersRound" },
  { label: "Social Development", icon: "users" },
  { label: "Political Development", icon: "building2" },
  { label: "Economic Development", icon: "chartNoAxesCombined" },
  { label: "Cultural Development", icon: "bookOpen" },
];

const principleColumns = [principles.slice(0, 4), principles.slice(4)];

export default function AboutSection() {
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
      id="about"
      aria-labelledby="about-heading"
      className={styles.section}
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.intro}>
            <p className={styles.eyebrow} style={revealDelay(0)} data-reveal="">
              About HRSJM
            </p>
            <h2
              id="about-heading"
              className={styles.heading}
              style={revealDelay(1)}
              data-reveal=""
            >
              A Democratic Network
              <br />
              Working for Human Rights
            </h2>
            <p
              className={styles.description}
              style={revealDelay(2)}
              data-reveal=""
            >
              Human Rights &amp; Social Justice Mission (HRSJM) is a democratic
              regional network committed to human rights at national and
              regional levels. We work for democracy, peace, secularism, human
              security, social justice, dignity and equality.
            </p>
            <a
              href="#about"
              className={styles.cta}
              style={revealDelay(3)}
              data-reveal-fade=""
            >
              Learn More About HRSJM
              <Icon name="arrow" width={16} height={16} />
            </a>
          </div>

          <div className={styles.collage} data-reveal-scale="">
            <Image
              src="/center-image.png"
              alt="Documentary collage of HRSJM's work: portraits of determination, community meetings, peaceful protests, education and children playing, framed by navy and gold paint strokes"
              width={1369}
              height={1149}
              sizes="(max-width: 639px) 82vw, (max-width: 1023px) 44vw, 23vw"
              className={styles.collageImage}
            />
          </div>

          <div
            className={styles.principles}
            aria-label="HRSJM guiding principles"
          >
            {principleColumns.map((column, columnIndex) => (
              <ul key={columnIndex} className={styles.principleColumn}>
                {column.map((principle, index) => (
                  <li
                    key={principle.label}
                    className={styles.principle}
                    style={
                      {
                        "--stagger": String(columnIndex * 4 + index),
                      } as CSSProperties
                    }
                    data-reveal-item=""
                  >
                    <span className={styles.principleIcon} aria-hidden="true">
                      <Icon name={principle.icon} width={16} height={16} />
                    </span>
                    <span className={styles.principleLabel}>
                      {principle.label}
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          <figure className={styles.quote} data-reveal="">
            <span className={styles.quoteMark} aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className={styles.quoteText}>
              &ldquo;Together,
              <br />
              we can build
              <br />
              a more just
              <br />
              and equal world.&rdquo;
            </blockquote>
            <span className={styles.quoteStroke} aria-hidden="true" />
          </figure>
        </div>
      </div>
    </section>
  );
}
