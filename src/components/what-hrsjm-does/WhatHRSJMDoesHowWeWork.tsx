"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import styles from "./what-hrsjm-does.module.css";

interface WorkStep {
  number: string;
  title: string;
  description: string;
}

const workSteps: WorkStep[] = [
  {
    number: "01",
    title: "Listen",
    description: "Understand local needs and challenges.",
  },
  {
    number: "02",
    title: "Collaborate",
    description: "Work with communities and partners.",
  },
  {
    number: "03",
    title: "Implement",
    description: "Design and execute targeted programs.",
  },
  {
    number: "04",
    title: "Empower",
    description: "Build capacity for long-term change.",
  },
  {
    number: "05",
    title: "Sustain",
    description: "Ensure continued impact and growth.",
  },
];

export default function WhatHRSJMDoesHowWeWork() {
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
      id="how-we-work"
      className={styles.howWeWork}
      aria-labelledby="how-we-work-heading"
    >
      <div className={styles.howWeWorkInner}>
        <div className={styles.howWeWorkIntro}>
          <p className={styles.howWeWorkEyebrow}>
            <span className={styles.howWeWorkEyebrowDot} aria-hidden="true" />
            How We Work
          </p>

          <h2 id="how-we-work-heading" className={styles.howWeWorkHeading}>
            A People-Centred
            <span className={styles.howWeWorkHeadingLine}>Approach</span>
          </h2>

          <p className={styles.howWeWorkDescription}>
            We believe in working with communities, not just for them. Our
            approach is rooted in participation, collaboration and long-term
            empowerment.
          </p>
        </div>

        <div className={styles.howWeWorkMedia}>
          <Image
            src="/WHD-HowWeWork/center-image.png"
            alt="Field coordinator smiling while reviewing notes with a group of children during a community visit"
            width={1536}
            height={1024}
            sizes="(max-width: 1023px) 62vw, 30vw"
            className={styles.howWeWorkImage}
            priority={false}
          />
        </div>

        <ol className={styles.howWeWorkSteps} aria-label="Our five-step working process">
          {workSteps.map((step, index) => (
            <li
              key={step.number}
              className={styles.howWeWorkStep}
              style={{ "--stagger": index } as CSSProperties}
            >
              <span className={styles.howWeWorkStepNumber} aria-hidden="true">
                {step.number}
              </span>
              <div className={styles.howWeWorkStepBody}>
                <h3 className={styles.howWeWorkStepTitle}>{step.title}</h3>
                <p className={styles.howWeWorkStepDesc}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
