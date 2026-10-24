"use client";

import Image from "next/image";
import { Lightbulb } from "lucide-react";
import styles from "./our-history.module.css";

export default function HistoryPhilosophy() {
  return (
    <section
      className={styles.philosophySection}
      aria-labelledby="philosophy-heading"
    >
      {/* 1. Left Hands Photo with subtle gradient dissolve into navy */}
      <div className={styles.philosophyPhotoWrap} aria-hidden="true">
        <Image
          src="/images/about/our-history/philosophy-hands-clean-hd.jpg"
          alt="Hands joined together in solidarity and dedication"
          fill
          quality={96}
          sizes="(max-width: 1024px) 100vw, 420px"
          className={styles.philosophyPhoto}
        />
        <div className={styles.philosophyPhotoFade} />
      </div>

      {/* 2. Interactive Real HTML Content Layer */}
      <div className={styles.container}>
        <div className={styles.philosophyGrid}>
          {/* Desktop Spacer to offset content past the hands photo */}
          <div className={styles.philosophyPhotoSpacer} aria-hidden="true" />

          {/* Center Column: Text Content */}
          <div className={styles.philosophyContentCol}>
            <div className={styles.philosophyHeaderRow}>
              <div className={styles.philosophyIconWrap}>
                <Lightbulb
                  className={styles.philosophyIcon}
                  size={32}
                  strokeWidth={2.4}
                />
              </div>
              <div className={styles.philosophyTitleBlock}>
                <div className={styles.philosophyEyebrow}>OUR PHILOSOPHY</div>
                <h2
                  id="philosophy-heading"
                  className={styles.philosophyHeading}
                >
                  No Expectation – Only Contribution
                </h2>
              </div>
            </div>

            <div className={styles.philosophyBody}>
              <p>
                HRSJM believes that meaningful social change requires dedication,
                courage, compassion and collective responsibility. We do not
                believe that humanity should be restricted by political
                affiliations, social divisions or personal interests.
              </p>
              <p>
                Our mission is to encourage people to contribute their time,
                knowledge, skills and efforts towards the welfare of society. We
                uphold a non-partisan approach and work towards a common goal:
                a more just, peaceful and inclusive India.
              </p>
            </div>
          </div>

          {/* Right Column: Floating Signature Motto with Gold Underline */}
          <div className={styles.philosophyQuoteCol}>
            <div className={styles.philosophyMottoBox}>
              <p className={styles.philosophyMottoText}>
                Humanity<br />
                Above All<br />
                Differences.
              </p>
              <div className={styles.philosophyGoldLine}>
                <svg
                  viewBox="0 0 130 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.goldLineSvg}
                  aria-hidden="true"
                >
                  <path
                    d="M3 8.5C32 4.5 78 3 127 2"
                    stroke="#F8BE28"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
