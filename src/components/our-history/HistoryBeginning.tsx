"use client";

import Image from "next/image";
import { Sprout } from "lucide-react";
import styles from "./our-history.module.css";

export default function HistoryBeginning() {
  return (
    <section className={styles.beginningSection}>
      <div className={styles.container}>
        <div className={styles.beginningGrid}>
          {/* Left: Growing Sprout in Hands in HD */}
          <div className={styles.beginningImgWrap}>
            <Image
              src="/images/about/our-history/beginning-sprout-hd.jpg"
              alt="Hands cradling a growing sprout in fertile soil"
              width={800}
              height={560}
              quality={95}
              className={styles.beginningImg}
              sizes="(min-width: 1024px) 280px, (min-width: 768px) 240px, 100vw"
            />
          </div>

          {/* Right: Narrative */}
          <div className={styles.beginningContent}>
            <div className={styles.sectionEyebrowRow}>
              <Sprout className={styles.eyebrowIcon} size={20} strokeWidth={2.4} />
              <span className={styles.sectionEyebrowText}>OUR BEGINNING</span>
            </div>

            <h2 className={styles.sectionHeading}>
              A Vision for a More Just and Equal Society
            </h2>

            <p className={styles.bodyCopy}>
              The Human Rights &amp; Social Justice Mission (HRSJM) was established on{" "}
              <strong>26 November 2012</strong> with a clear purpose: to promote
              human rights, fight social injustice, protect human dignity and help build
              a society founded on <strong>equality</strong>, peace, brotherhood and
              mutual respect.
            </p>

            <p className={styles.bodyCopy}>
              From the beginning, our mission has been guided by the belief that every
              human being deserves dignity, equal opportunities, freedom and justice,
              regardless of caste, religion, gender, language, region, social status or
              background.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
