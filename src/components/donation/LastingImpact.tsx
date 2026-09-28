import Image from "next/image";
import {
  GraduationCap,
  HeartHandshake,
  Scale,
  Sprout,
} from "lucide-react";
import styles from "./donation.module.css";

const features = [
  {
    title: "Educate",
    description: "Build awareness in communities",
    icon: GraduationCap,
  },
  {
    title: "Empower",
    description: "Create opportunities for marginalized groups",
    icon: HeartHandshake,
  },
  {
    title: "Protect",
    description: "Defend human rights and provide legal aid",
    icon: Scale,
  },
  {
    title: "Sustain",
    description: "Enable long-term community development",
    icon: Sprout,
  },
];

export default function LastingImpact() {
  return (
    <section
      className={styles.lasting}
      aria-labelledby="lasting-impact-heading"
    >
      <div className={styles.lastingImageWrap} aria-hidden="true">
        <Image
          src="/donation/donation-lasting-impact.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.lastingImage}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.lastingInner}>
          <div className={styles.lastingContent}>
            <p className={styles.eyebrowNeutral}>Build a Better Tomorrow</p>
            <h2 id="lasting-impact-heading" className={styles.lastingHeading}>
              Make a Lasting Impact
            </h2>
            <p className={styles.lastingDescription}>
              Your generosity helps us reach more people, protect rights and
              create sustainable change. Together, we can build a more just,
              equal and compassionate society.
            </p>

            <ul className={styles.featureList}>
              {features.map((feature) => {
                const FeatureIcon = feature.icon;
                return (
                  <li key={feature.title} className={styles.featureItem}>
                    <span className={styles.featureIcon}>
                      <FeatureIcon
                        size={20}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
