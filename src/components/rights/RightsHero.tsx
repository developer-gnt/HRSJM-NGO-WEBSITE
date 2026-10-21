"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, type MouseEvent, type CSSProperties } from "react";
import Icon, { type IconName } from "@/components/ui/Icon";
import styles from "./rights.module.css";

interface FeatureItem {
  icon: IconName;
  title: string;
  sub: string;
}

const features: FeatureItem[] = [
  { icon: "bookOpen", title: "Learn", sub: "Your Rights" },
  { icon: "fileText", title: "Understand", sub: "Real Situations" },
  { icon: "hand", title: "Know How", sub: "to Get Help" },
  { icon: "shieldCheck", title: "Build a Safer", sub: "Community" },
];

export default function RightsHero() {
  const handleScrollTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.location.hash !== `#${id}`) {
        window.history.pushState(null, "", `#${id}`);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="rights-hero-heading">
      <div className={styles.heroBg} aria-hidden="true">
        <Image
          src="/rights-hero-bg.png"
          alt=""
          fill
          preload
          sizes="100vw"
          quality={90}
          className={styles.heroImg}
        />
        <div className={styles.heroScrim} />
        <div className={styles.heroShade} />
      </div>

      <div className={styles.heroInner}>
        <nav aria-label="Breadcrumb">
          <ol className={styles.breadcrumbList}>
            <li>
              <Link href="/" className={styles.breadcrumbLink}>
                Home
              </Link>
            </li>
            <li className={styles.breadcrumbSeparator} aria-hidden="true">
              <Icon name="chevronRight" width={12} height={12} strokeWidth={2} />
            </li>
            <li>
              <span className={styles.breadcrumbCurrent} aria-current="page">
                Know Your Rights
              </span>
            </li>
          </ol>
        </nav>

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Know Your Rights
          </p>

          <h1 id="rights-hero-heading" className={styles.heading}>
            Rights Create
            <span className={styles.headingGold}>
              Stronger Communities.
            </span>
          </h1>

          <p className={styles.description}>
            Awareness empowers people to stand up for their rights, seek
            justice and build a more equal and inclusive society.
          </p>

          <div className={styles.actions}>
            <a
              href="#explore-rights"
              onClick={(e) => handleScrollTo(e, "explore-rights")}
              className={styles.primaryBtn}
            >
              Explore Your Rights
              <span className={styles.primaryBtnIcon}>
                <Icon name="arrow" width={17} height={17} strokeWidth={2} />
              </span>
            </a>
            <a
              href="#featured-video"
              onClick={(e) => handleScrollTo(e, "featured-video")}
              className={styles.secondaryBtn}
            >
              <span className={styles.playBadge}>
                <Icon name="play" width={11} height={11} />
              </span>
              Watch Video
            </a>
          </div>
        </div>

        <div className={styles.heroNote}>
          <div className={styles.heroNoteInner}>
            <p className={styles.heroNoteText}>
              Awareness.
              <br />
              Rights.
              <br />
              Action.
              <br />
              A Fairer
              <br />
              Tomorrow.
            </p>
            <svg
              viewBox="0 0 120 12"
              fill="none"
              className={styles.heroNoteUnderline}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 10C40 7 85 4 116 2"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.featureStrip}>
        <ul className={styles.featureList}>
          {features.map((feature, index) => (
            <li
              key={feature.title}
              className={styles.featureItem}
              style={{ "--stagger": index } as CSSProperties}
            >
              <span className={styles.featureIcon}>
                <Icon name={feature.icon} width={22} height={22} />
              </span>
              <span>
                <span className={styles.featureTitle}>{feature.title}</span>
                <span className={styles.featureSub}>{feature.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
