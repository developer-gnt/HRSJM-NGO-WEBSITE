"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import styles from "./our-history.module.css";

export default function HistoryHero() {
  return (
    <section className={styles.heroSection} aria-label="Our History">
      {/* 1. Full-Width Panoramic High-Definition Background Image */}
      <div className={styles.heroBgWrap} aria-hidden="true">
        <Image
          src="/images/about/our-history/history-hero-clean-splatter-hd.jpg"
          alt="HRSJM History Background - Youth facing India Gate with waving national flag and Lady Justice"
          fill
          priority
          quality={100}
          sizes="100vw"
          className={styles.heroBgImg}
        />
        {/* Subtle responsive gradient overlay for pristine text contrast */}
        <div className={styles.heroGradientOverlay} />
      </div>

      {/* 2. Interactive Real HTML Content Layer */}
      <div className={styles.heroContentWrapper}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            {/* Left Column: Fixed, Crisp, Beautiful Typography */}
            <div className={styles.heroLeftCol}>
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className={styles.heroBreadcrumb}>
                <Link href="/" className={styles.breadcrumbLink}>
                  Home
                </Link>
                <ChevronRight className={styles.breadcrumbSep} size={13} strokeWidth={2.4} />
                <Link href="/about" className={styles.breadcrumbLink}>
                  About HRSJM
                </Link>
                <ChevronRight className={styles.breadcrumbSep} size={13} strokeWidth={2.4} />
                <span className={styles.breadcrumbCurrent}>Our History</span>
              </nav>

              {/* Eyebrow */}
              <div className={styles.heroEyebrowWrap}>
                <span className={styles.heroEyebrow}>OUR HISTORY</span>
                <div className={styles.heroEyebrowBar} />
              </div>

              {/* Grand Main Heading */}
              <h1 className={styles.heroHeading}>
                Human Rights &amp;<br />
                Social Justice Mission<br />
                <span className={styles.goldText}>(HRSJM)</span>
              </h1>

              {/* Subheading Block */}
              <div className={styles.heroSubBlock}>
                <div className={styles.heroSubEstablished}>
                  Established on 26 November 2012
                </div>
                <div className={styles.heroSubTagline}>
                  Serving Humanity Through Justice, Equality and Dignity
                </div>
              </div>

              {/* Editorial Slogan Callout */}
              <p className={styles.heroSlogan}>
                From a vision of humanity to a growing movement for justice — our journey continues.
              </p>
            </div>

            {/* Right Column: Floating Signature Motto over the Sky */}
            <div className={styles.heroRightCol}>
              <div className={styles.heroSkyMotto}>
                <p className={styles.heroSkyMottoText}>
                  Justice.<br />
                  Equality.<br />
                  Dignity.<br />
                  <span className={styles.heroSkyMottoSub}>
                    For a Better<br />
                    Tomorrow.
                  </span>
                </p>
                <div className={styles.heroTricolorLine}>
                  <svg
                    viewBox="0 0 140 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.tricolorSvg}
                    aria-hidden="true"
                  >
                    {/* Saffron Top Stroke */}
                    <path
                      d="M2 11C35 6 85 4 136 2"
                      stroke="#FF9933"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    {/* White / Light Middle Accent */}
                    <path
                      d="M8 13.5C40 8.5 88 6.5 130 4.5"
                      stroke="#FFFFFF"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    {/* India Green Bottom Stroke */}
                    <path
                      d="M5 15.5C38 10.5 90 8.5 138 6.5"
                      stroke="#138808"
                      strokeWidth="3.2"
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
