import Image from "next/image";
import { Users, Heart, FileText, Globe } from "lucide-react";
import styles from "./benefits.module.css";

const impactStats = [
  {
    id: "members",
    icon: Users,
    value: "500+",
    label: "Members and Supporters",
  },
  {
    id: "programs",
    icon: Heart,
    value: "100+",
    label: "Awareness Programs",
  },
  {
    id: "initiatives",
    icon: FileText,
    value: "50+",
    label: "Community Initiatives",
  },
  {
    id: "communities",
    icon: Globe,
    value: "Stronger",
    label: "More Inclusive Communities",
  },
];

export default function CommunityImpact() {
  return (
    <section
      className={styles.impactSection}
      aria-labelledby="community-impact-heading"
    >
      <div className={styles.container}>
        {/* Top Part: Text on Left, Soft Blended Photo on Right */}
        <div className={styles.impactTopRow}>
          <div className={styles.impactContent}>
            <div className={styles.eyebrowLine} aria-hidden="true" />
            <p className={styles.impactEyebrow}>THE IMPACT YOU HELP CREATE</p>
            <h2 id="community-impact-heading" className={styles.impactHeading}>
              Stronger Communities.
              <br />
              <span className={styles.impactGold}>Brighter Futures.</span>
            </h2>
            <p className={styles.impactDescription}>
              Your support as a member helps us reach more people, raise
              awareness and work towards a society where human rights, equality
              and social justice are respected for all.
            </p>
          </div>

          <div className={styles.impactImageCard} aria-hidden="true">
            <Image
              src="/benefits/benefits-impact-hands.png"
              alt="Community members raising hands together in solidarity"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className={styles.impactImage}
            />
            <div className={styles.impactImageBlend} />
          </div>
        </div>

        {/* Bottom Part: 4 Impact Indicators Row */}
        <div className={styles.indicatorsRow}>
          {impactStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className={styles.indicatorItem}>
                <div className={styles.indicatorIconRing} aria-hidden="true">
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <div className={styles.indicatorText}>
                  <span className={styles.indicatorValue}>{stat.value}</span>
                  <span className={styles.indicatorLabel}>{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
