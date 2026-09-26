"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import styles from "./RightsFinalCTA.module.css";

export default function RightsFinalCTA() {
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
      aria-labelledby="rights-final-cta-heading"
    >
      <div className={styles.bg} aria-hidden="true">
        <Image
          src="/rights-final-cta-bg.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.bgImg}
        />
        <div className={styles.scrim} />
      </div>

      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          Be Aware. Support Others.
        </p>
        <h2 id="rights-final-cta-heading" className={styles.heading}>
          Together for a Fairer Tomorrow
        </h2>
        <p className={styles.description}>
          Learn about your rights, share this information with your community,
          and help build a more just and equal society.
        </p>
        <div className={styles.actions}>
          <Link href="#explore-rights" className={styles.primaryBtn}>
            Explore Your Rights
            <span className={styles.primaryBtnIcon}>
              <Icon name="arrow" width={17} height={17} strokeWidth={2} />
            </span>
          </Link>
          <Link href="/join-us" className={styles.secondaryBtn}>
            Join Our Movement
          </Link>
        </div>
      </div>
    </section>
  );
}
