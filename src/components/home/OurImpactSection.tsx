"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Icon, { type IconName } from "@/components/ui/Icon";
import styles from "./ourImpact.module.css";

interface ImpactStat {
  value: number;
  displayValue: string;
  label: string;
  icon: IconName;
}

const impactStats: ImpactStat[] = [
  { value: 100079, displayValue: "1,00,079", label: "Our Members", icon: "usersRound" },
  { value: 200000, displayValue: "2,00,000", label: "Complaints Received", icon: "fileText" },
  { value: 199800, displayValue: "1,99,800", label: "Cases Resolved", icon: "shieldCheck" },
];

const indianFormat = new Intl.NumberFormat("en-IN");

export default function OurImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const numberEls = numberRefs.current;
    const finalize = () => {
      numberEls.forEach((el, i) => {
        if (el) el.textContent = impactStats[i].displayValue;
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finalize();
      section.classList.add(styles.revealed);
      return;
    }

    section.classList.add(styles.armed);
    numberEls.forEach((el) => {
      if (el) el.textContent = "0";
    });

    const runCountUp = () => {
      const duration = 1500;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        numberEls.forEach((el, i) => {
          if (el) el.textContent = indianFormat.format(Math.round(impactStats[i].value * eased));
        });
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          finalize();
        }
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add(styles.revealed);
            runCountUp();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="our-impact-heading">
      <Image
        src="/our-impact-bg.png"
        alt=""
        fill
        sizes="100vw"
        className={styles.bg}
        aria-hidden="true"
      />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.intro}>
          <h2 id="our-impact-heading" className={styles.heading} data-reveal>
            Our Impact
          </h2>
          <p className={styles.tagline} data-reveal style={{ "--reveal-delay": 1 } as React.CSSProperties}>
            Real People. Real Change.
          </p>
          <p className={styles.description} data-reveal style={{ "--reveal-delay": 2 } as React.CSSProperties}>
            Your support helps us reach more people, protect rights and create
            lasting impact.
          </p>

          <ul className={styles.stats} aria-label="HRSJM impact in numbers">
            {impactStats.map((stat, index) => (
              <li
                key={stat.label}
                className={styles.stat}
                data-reveal-item
                style={{ "--stagger": index } as React.CSSProperties}
              >
                <span className={styles.statIcon}>
                  <Icon name={stat.icon} width={13} height={13} />
                </span>
                <span className={styles.statValue} ref={(el) => { numberRefs.current[index] = el; }}>
                  {stat.displayValue}
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure
          className={styles.quote}
          data-reveal
          style={{ "--reveal-delay": 2 } as React.CSSProperties}
        >
          <span className={styles.quoteMark} aria-hidden="true">
            &ldquo;
          </span>
          <blockquote className={styles.quoteText}>
            A fairer society is possible when people stand together.
          </blockquote>
          <span className={styles.quoteLine} aria-hidden="true" />
        </figure>
      </div>
    </section>
  );
}
