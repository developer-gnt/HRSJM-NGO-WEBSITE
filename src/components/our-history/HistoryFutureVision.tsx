"use client";

import Image from "next/image";
import { Target } from "lucide-react";
import styles from "./our-history.module.css";

export default function HistoryFutureVision() {
  return (
    <section
      className={styles.futureVisionSection}
      aria-labelledby="future-vision-heading"
    >
      {/* 1. Right Mountain Sunrise Photo with soft gradient dissolve */}
      <div className={styles.futureVisionPhotoWrap} aria-hidden="true">
        <Image
          src="/images/about/our-history/future-mountain-clean-hd.jpg"
          alt="Youth standing atop mountain summit looking towards the golden sunrise"
          fill
          quality={96}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={styles.futureVisionPhoto}
        />
        <div className={styles.futureVisionPhotoFade} />
      </div>

      {/* 2. Interactive Real HTML Content Layer */}
      <div className={styles.container}>
        <div className={styles.futureVisionGrid}>
          {/* Left Column: Text Content */}
          <div className={styles.futureVisionContentCol}>
            <div className={styles.futureVisionHeaderRow}>
              <div className={styles.futureVisionIconWrap}>
                <Target
                  className={styles.futureVisionIcon}
                  size={32}
                  strokeWidth={2.4}
                />
              </div>
              <div className={styles.futureVisionTitleBlock}>
                <div className={styles.futureVisionEyebrow}>
                  OUR VISION FOR THE FUTURE
                </div>
                <h2
                  id="future-vision-heading"
                  className={styles.futureVisionHeading}
                >
                  A More Just, Peaceful and Inclusive Tomorrow
                </h2>
              </div>
            </div>

            <div className={styles.futureVisionBody}>
              <p>
                As we continue our journey, our vision remains clear: a world where
                hatred gives way to love, discrimination gives way to equality,
                conflict gives way to understanding, and injustice gives way to
                justice.
              </p>
              <p>
                We aspire to strengthen our network, expand human rights awareness,
                encourage responsible citizen participation and support constructive
                initiatives that uphold dignity and equality for all.
              </p>
              <p className={styles.futureVisionCallout}>
                The journey that began in February 2012 continues with renewed
                determination and an enduring belief in the power of humanity.
              </p>
            </div>
          </div>

          {/* Right Column: Floating Signature Motto over the Mountain Sky */}
          <div className={styles.futureVisionQuoteCol}>
            <div className={styles.futureVisionMottoBox}>
              <p className={styles.futureVisionMottoText}>
                Together<br />
                for a Brighter<br />
                Tomorrow.
              </p>
              <div className={styles.futureVisionTricolorLine}>
                <svg
                  viewBox="0 0 140 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.futureTricolorSvg}
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
    </section>
  );
}
