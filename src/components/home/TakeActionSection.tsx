"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./takeAction.module.css";

interface Action {
  label: string;
  href: string;
  variant: "primary" | "outline";
}

const actions: Action[] = [
  { label: "I Want To Become A member", href: "/membership", variant: "primary" },
  { label: "Make a Donation", href: "/donation", variant: "outline" },
  { label: "File a Complaint", href: "/complaint", variant: "outline" },
];

export default function TakeActionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add(styles.revealed);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add(styles.revealed);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="take-action-heading"
    >
      <span className={styles.bgWrap} aria-hidden="true">
        <Image
          src="/images/take-action-bg.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.bg}
        />
      </span>
      <span className={styles.veil} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.content}>
            <p
              className={styles.eyebrow}
              data-reveal-item
              style={{ "--stagger": 0 } as React.CSSProperties}
            >
              Because Rights Matter
            </p>
            <h2
              id="take-action-heading"
              className={styles.heading}
              data-reveal-item
              style={{ "--stagger": 1 } as React.CSSProperties}
            >
              Take Action for a Better Tomorrow
            </h2>
            <p
              className={styles.description}
              data-reveal-item
              style={{ "--stagger": 2 } as React.CSSProperties}
            >
              Join us, support our work, or seek help.
              <br />
              Every action counts in building a fairer and more equal society.
            </p>
          </div>

          <figure
            className={styles.quote}
            data-reveal-item
            style={{ "--stagger": 7 } as React.CSSProperties}
          >
            <blockquote className={styles.quoteText}>
              Small actions
              <br />
              create big change.
            </blockquote>
            <svg
              className={styles.quoteUnderline}
              viewBox="0 0 48 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 6.5C10 3.2 19 8.2 28 5.4C35.2 3.3 41.5 5.4 46 3.4"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            </svg>
          </figure>

          <div className={styles.actions}>
            {actions.map((action, i) => (
              <Link
                key={action.label}
                href={action.href}
                className={
                  action.variant === "primary" ? styles.primary : styles.outline
                }
                data-reveal-item
                style={{ "--stagger": 3 + i } as React.CSSProperties}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
