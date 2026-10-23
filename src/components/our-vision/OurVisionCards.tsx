import { Target, Users } from "lucide-react";
import styles from "./our-vision.module.css";

export default function OurVisionCards() {
  return (
    <section className={styles.cardsSection} aria-label="Our Vision & Our Movement">
      <div className={styles.container}>
        <div className={styles.cardsGrid}>
          {/* Card 1: Our Vision */}
          <div className={styles.pillarCard}>
            <div className={styles.cardHead}>
              <div className={styles.cardIconCircle}>
                <Target size={24} strokeWidth={2} />
              </div>
              <h2 className={styles.cardTitle}>Our Vision</h2>
            </div>

            <div className={styles.cardGoldBar} />

            <p className={styles.cardText}>
              The vision of the <strong>Human Rights &amp; Social Justice Mission</strong> (HRSJM)
              is to transform hatred into <strong>love</strong>, conflict into{" "}
              <strong>understanding</strong>, discrimination into <strong>equality</strong>, and
              division into <strong>unity</strong>. We aspire to build a society and a world where
              every human being can live with <strong>dignity, freedom, peace</strong>, and{" "}
              <strong>mutual respect</strong>.
            </p>
          </div>

          {/* Card 2: Our Movement */}
          <div className={styles.pillarCard}>
            <div className={styles.cardHead}>
              <div className={styles.cardIconCircleNavy}>
                <Users size={24} strokeWidth={2} />
              </div>
              <h2 className={styles.cardTitle}>Our Movement</h2>
            </div>

            <div className={styles.cardGoldBar} />

            <p className={styles.cardText}>
              Our movement stands for <strong>humanity beyond boundaries</strong>, barriers, and
              limitations. We reject hatred, discrimination, and actions that violate human
              dignity, irrespective of race, colour, religion, creed, region, social status,
              culture, beliefs, political views, or nationality. We believe that humanity must
              always remain at the heart of our actions, and that no difference should become a
              reason to deny another person their <strong>fundamental rights</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
