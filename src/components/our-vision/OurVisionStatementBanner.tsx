import { Lightbulb, Users } from "lucide-react";
import styles from "./our-vision.module.css";

export default function OurVisionStatementBanner() {
  return (
    <section className={styles.navyBanner} aria-label="Our Guiding Principle">
      <div className={styles.container}>
        <div className={styles.navyBannerGrid}>
          {/* Left Block */}
          <div className={styles.navyLeftBlock}>
            <div className={styles.navyIconCircle}>
              <Lightbulb size={26} strokeWidth={2} />
            </div>

            <div className={styles.navyLeftText}>
              <span className={styles.navyEyebrow}>Our Vision for a Better World</span>
              <p className={styles.navyStatements}>
                A World Without Hatred.
                <br />
                A Society Without Discrimination.
                <br />
                A Future Built on <strong>Peace and Justice</strong>.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className={styles.navyDivider} aria-hidden="true" />

          {/* Right Block */}
          <div className={styles.navyRightBlock}>
            <div className={styles.navyIconCircle}>
              <Users size={26} strokeWidth={2} />
            </div>

            <div className={styles.navyRightText}>
              <span className={styles.navyRightLabel}>Our Guiding Principle:</span>
              <p className={styles.navyRightHeadline}>Humanity First.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
