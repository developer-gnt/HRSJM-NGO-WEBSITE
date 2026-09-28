import Image from "next/image";
import { FileCheck2, FileText, Users, UsersRound } from "lucide-react";
import styles from "./donation.module.css";

const stats = [
  { value: "78,777", label: "People Reached", icon: Users },
  { value: "1,57,431", label: "Complaints Supported", icon: FileText },
  { value: "1,57,273", label: "Cases Resolved", icon: FileCheck2 },
  { value: "200+", label: "Communities", icon: UsersRound },
];

export default function ImpactStats() {
  return (
    <section
      id="impact"
      className={styles.stats}
      aria-labelledby="impact-stats-heading"
    >
      <Image
        src="/our-impact-bg.png"
        alt=""
        fill
        sizes="100vw"
        className={styles.statsBg}
        aria-hidden="true"
      />
      <div className={styles.statsScrim} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.statsInner}>
          <h2 id="impact-stats-heading" className={styles.statsHeading}>
            Creating
            <br />
            Measurable Impact
          </h2>

          <ul className={styles.statsList}>
            {stats.map((stat) => {
              const StatIcon = stat.icon;
              return (
                <li key={stat.label} className={styles.stat}>
                  <span className={styles.statIcon}>
                    <StatIcon size={19} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className={styles.statBody}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
