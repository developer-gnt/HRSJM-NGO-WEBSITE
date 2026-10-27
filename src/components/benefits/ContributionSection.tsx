import Image from "next/image";
import { Check } from "lucide-react";
import styles from "./benefits.module.css";

const contributionPoints = [
  "Support advocacy and community programs",
  "Collaborate with a network of committed individuals",
  "Help raise awareness about important human rights issues",
  "Be part of a transparent and people-driven organization",
];

export default function ContributionSection() {
  return (
    <section
      className={styles.contributionSection}
      aria-labelledby="contribution-heading"
    >
      <div className={styles.container}>
        <div className={styles.contributionGrid}>
          {/* Left Column: Awareness Gathering Photograph */}
          <div className={styles.contributionImageCard}>
            <Image
              src="/benefits/benefits-contribution.png"
              alt="Community awareness session with speaker wearing Together for Human Rights shirt"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className={styles.contributionImage}
            />
          </div>

          {/* Right Column: Heading, Text & 4 Checkpoints */}
          <div className={styles.contributionContent}>
            <div className={styles.eyebrowLine} aria-hidden="true" />
            <p className={styles.contributionEyebrow}>
              A MEANINGFUL WAY TO CONTRIBUTE
            </p>
            <h2 id="contribution-heading" className={styles.contributionHeading}>
              More Than Individual Benefits
            </h2>
            <p className={styles.contributionText}>
              Membership is more than access to opportunities - it&apos;s a way
              to actively support a cause, stand in solidarity with communities
              and help build a fairer, more just society.
            </p>

            <ul className={styles.contributionList}>
              {contributionPoints.map((point) => (
                <li key={point} className={styles.contributionListItem}>
                  <span className={styles.checkCircle} aria-hidden="true">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
