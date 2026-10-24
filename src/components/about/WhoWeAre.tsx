"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { subNavItems } from "./aboutData";
import styles from "./about.module.css";

interface WhoWeAreProps {
  onOpenStory?: () => void;
}

export default function WhoWeAre({ onOpenStory }: WhoWeAreProps) {
  const [activeSection, setActiveSection] = useState<string>("who-we-are");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of subNavItems) {
        const el = document.getElementById(item.targetId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 20;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <section id="who-we-are" className={styles.whoWeAre}>
      {/* Integrated top sub-navigation bar */}
      <div className={`${styles.container} ${styles.subNavWrap}`}>
        <div className={styles.subNavRow}>
          {/* Breadcrumb left */}
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator} aria-hidden="true">
              <ChevronRight className={styles.breadcrumbChevron} size={13} strokeWidth={2.2} />
            </span>
            <span className={styles.breadcrumbCurrent} aria-current="page">
              About HRSJM
            </span>
          </nav>

          {/* Sub navigation — scrollable on mobile */}
          <nav
            aria-label="Section Navigation"
            className={`${styles.subNav} ${styles.noScrollbar}`}
          >
            {subNavItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.targetId)}
                  className={`${styles.subNavButton} ${isActive ? styles.subNavButtonActive : ""
                    }`}
                >
                  {item.label}
                  {isActive && <span className={styles.subNavActiveBar} />}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Delicate tree watermark in upper right background */}
      <div className={styles.treeWatermark}>
        <svg
          viewBox="0 0 400 600"
          style={{ width: "100%", height: "100%", fill: "#062A4F" }}
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M200 600 V320 M200 480 Q140 430 110 390 Q170 380 200 420 M200 440 Q260 390 290 350 Q230 340 200 380 M200 360 Q130 290 90 240 Q160 230 200 290 M200 320 Q270 250 310 200 Q240 190 200 250 M200 260 Q160 180 140 120 Q190 130 200 190 M200 220 Q240 140 260 80 Q210 90 200 160 M200 160 V50"
            stroke="#062A4F"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="150" cy="180" r="70" opacity="0.3" />
          <circle cx="250" cy="170" r="80" opacity="0.3" />
          <circle cx="200" cy="100" r="90" opacity="0.3" />
          <circle cx="120" cy="270" r="60" opacity="0.25" />
          <circle cx="280" cy="260" r="65" opacity="0.25" />
        </svg>
      </div>

      {/* Main two-column editorial content */}
      <div className={`${styles.container} ${styles.whoContent}`}>
        <div className={styles.whoGrid}>
          {/* Left column: narrative & CTA */}
          <div className={styles.whoLeft}>
            <span className={styles.whoEyebrow}>Who We Are</span>

            <h2 className={styles.sectionHeading}>
              A Democratic Network <br />
              Working for Human Rights
            </h2>

            <div className={styles.whoCopy}>
              <p>
                Human Rights and Social Justice Mission (HRSJM) is a democratic regional network with broad
                memebership base of individual commited to addressing human right issues and promoting
                social justice act regional,national, and community levels.
              </p>
              <p>
                HRSJM strives to uphold the principles of Peace, Democracy, Secularism, Equality, Human
                Dignity, and Human Security. We believe in empowering people to express their identities,
                realize their aspirations, and participate meaningfully in building a just, inclusive, and
                peaceful society.
              </p>
            </div>

            <div className={styles.whoCtaWrap}>
              <Link href="/what-hrsjm-does" className={styles.storyButton}>
                <span>Our Story</span>
                <ArrowRight className={styles.storyButtonIcon} size={16} />
              </Link>
            </div>
          </div>

          {/* Right column: exact collage with handwritten script */}
          <div className={styles.whoRight}>
            {/* Subtle flying dove watermark */}
            <div className={styles.doveWatermark}>
              <svg
                viewBox="0 0 100 100"
                style={{ width: "100%", height: "100%", fill: "#062A4F" }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 50 C25 35 45 25 60 20 C75 15 85 20 80 30 C75 40 60 45 50 48 C65 52 80 62 82 72 C75 75 60 68 45 58 C35 62 25 60 20 50 Z" />
              </svg>
            </div>

            {/* Collage image container */}
            <div className={styles.collageWrap}>
              <Image
                src="/assets/who_we_are_exact_collage.png"
                alt="HRSJM community assembly and human rights activism collage"
                width={410}
                height={270}
                sizes="(min-width: 1024px) 583px, 92vw"
                className={styles.collageImg}
              />
            </div>

            {/* Handwritten quote treatment on the right */}
            <div className={styles.whoQuote}>
              <div className={styles.whoQuoteInner}>
                <span className={styles.whoQuoteMark}>“</span>

                <p className={styles.whoQuoteText}>
                  People <br />
                  &nbsp;&nbsp;Rights <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;Justice <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Change.
                  <span className={styles.whoQuoteEnd}>”</span>
                </p>

                <div className={styles.whoQuoteUnderline}>
                  <svg
                    viewBox="0 0 120 16"
                    fill="none"
                    style={{ width: "100%", height: "100%" }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6C40 2 80 2 116 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14 12C46 8 86 8 110 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
