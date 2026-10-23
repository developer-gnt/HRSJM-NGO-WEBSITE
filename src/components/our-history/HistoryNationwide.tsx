"use client";

import Image from "next/image";
import { Users } from "lucide-react";
import styles from "./our-history.module.css";

export default function HistoryNationwide() {
  return (
    <section className={styles.nationwideSection}>
      <div className={styles.container}>
        <div className={styles.nationwideGrid}>
          {/* Left: Narrative */}
          <div className={styles.nationwideContent}>
            <div className={styles.sectionEyebrowRow}>
              <Users className={styles.eyebrowIcon} size={20} strokeWidth={2.4} />
              <span className={styles.sectionEyebrowText}>
                FROM A VISION TO A NATIONWIDE MISSION
              </span>
            </div>

            <h2 className={styles.sectionHeading}>
              Growing Together for a Fairer India
            </h2>

            <p className={styles.bodyCopy}>
              What began as a commitment to humanity has developed into an organisational
              network working to promote human rights and social justice at regional and
              national levels. In all over India HRSJM continues to encourage citizens,
              social workers, activists and volunteers to participate in constructive social
              change.
            </p>

            <p className={styles.bodyCopy}>
              Our journey is not measured merely by the passage of time, but by our continued
              commitment to standing with the disadvantaged, amplifying the voices of those
              who are unheard and encouraging responsible action against injustice.
            </p>
          </div>

          {/* Right: Map with Grassroots People Montage in HD */}
          <div className={styles.nationwideMapWrap}>
            <Image
              src="/images/about/our-history/nationwide-map-hd.jpg"
              alt="India map montage of HRSJM social workers, volunteers and citizens united for human rights"
              width={1500}
              height={700}
              quality={95}
              className={styles.nationwideMapImg}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className={styles.nationwideQuote}>
              People United for a Fairer, More Inclusive India.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
