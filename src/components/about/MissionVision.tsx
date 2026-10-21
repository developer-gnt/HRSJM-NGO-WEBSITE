import { Target, Eye } from "lucide-react";
import styles from "./about.module.css";

export default function MissionVision() {
  return (
    <section id="mission-vision" className={styles.missionVision}>
      <div className={styles.container}>
        <div className={styles.mvGrid}>
          {/* Left column */}
          <div className={styles.mvLeft}>
            <span className={styles.mvEyebrow}>Our Mission &amp; Vision</span>

            <h2 className={`${styles.sectionHeading} ${styles.mvTitle}`}>
              Purpose Today. <br />
              A Fairer Tomorrow.
            </h2>

            <p className={styles.mvCopy}>
              We work towards a society where every individual enjoys their
              rights, lives with dignity and has equal opportunities to grow
              and thrive.
            </p>
          </div>

          {/* Right column: two crisp white cards */}
          <div className={styles.mvCards}>
            {/* Mission card */}
            <div className={styles.mvCard}>
              <div>
                <div className={styles.mvCardHead}>
                  <div className={styles.mvIconCircle}>
                    <Target strokeWidth={1.8} />
                  </div>
                  <h3 className={styles.mvCardTitle}>Our Mission</h3>
                </div>
                <div className={styles.mvCardBar} />
                <p className={styles.mvCardText}>
                  To protect and promote human rights through awareness,
                  advocacy, capacity building and community action, creating a
                  just, inclusive and equitable society.
                </p>
              </div>
            </div>

            {/* Vision card */}
            <div className={styles.mvCard}>
              <div>
                <div className={styles.mvCardHead}>
                  <div className={styles.mvIconCircle}>
                    <Eye strokeWidth={1.8} />
                  </div>
                  <h3 className={styles.mvCardTitle}>Our Vision</h3>
                </div>
                <div className={styles.mvCardBar} />
                <p className={styles.mvCardText}>
                  A democratic, peaceful and equal society where every person
                  lives with dignity, has access to justice and can realise
                  their full potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
