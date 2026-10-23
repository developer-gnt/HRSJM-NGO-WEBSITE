import Link from "next/link";
import { Target, Eye, ArrowRight } from "lucide-react";
import styles from "./about.module.css";

interface MissionVisionProps {
  visionButtonText?: string;
  visionButtonHref?: string;
  onVisionClick?: () => void;
}

export default function MissionVision({
  visionButtonText = "Learn More",
  visionButtonHref = "/our-vision",
  onVisionClick,
}: MissionVisionProps) {
  return (
    <section id="mission-vision" className={styles.missionVision}>
      {/* Decorative background radial blur */}
      <div className={styles.mvBlob} />

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
                  Our mission is to stand for human rights, work for social justice, raise awareness about
                  violations of fundamental rights, and encourage collective action for the welfare and
                  empowerment of vulnerable and disadvantaged communities.
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
                  Our Vision: A society where every individual enjoys
                  equality, dignity, freedom, justice, and
                  security, irrespective of background or identity.
                </p>
              </div>

              <div className={styles.mvCardCta}>
                {onVisionClick ? (
                  <button
                    type="button"
                    onClick={onVisionClick}
                    className={styles.mvCardButton}
                  >
                    <span>{visionButtonText}</span>
                    <ArrowRight className={styles.mvCardButtonIcon} size={16} />
                  </button>
                ) : (
                  <Link
                    href={visionButtonHref}
                    className={styles.mvCardButton}
                  >
                    <span>{visionButtonText}</span>
                    <ArrowRight className={styles.mvCardButtonIcon} size={16} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
