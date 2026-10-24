"use client";

import { Users, Heart, ShieldCheck, FileCheck } from "lucide-react";
import styles from "./emergency.module.css";

const impactStats = [
  {
    number: "2,500+",
    label: "Individuals Supported",
    icon: Users,
  },
  {
    number: "450+",
    label: "Emergency Cases",
    icon: Heart,
  },
  {
    number: "1,200+",
    label: "Donors",
    icon: ShieldCheck,
  },
  {
    number: "100%",
    label: "Transparent Use of Funds",
    icon: FileCheck,
  },
];

export default function EmergencyImpactCounters() {
  return (
    <section className={styles.impactBar} aria-label="Our emergency impact statistics">
      <div className={styles.container}>
        <div className={styles.impactGrid}>
          {impactStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={styles.impactItem}>
                <div className={styles.impactIconWrap} aria-hidden="true">
                  <Icon size={24} strokeWidth={2.3} />
                </div>
                <div className={styles.impactText}>
                  <span className={styles.impactNumber}>{stat.number}</span>
                  <span className={styles.impactLabel}>{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
