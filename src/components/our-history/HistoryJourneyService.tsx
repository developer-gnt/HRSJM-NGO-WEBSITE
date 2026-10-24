"use client";

import {
  Cog,
  Scale,
  FileText,
  Users,
  HeartHandshake,
  BookOpen,
  HelpingHand,
  Sprout,
} from "lucide-react";
import styles from "./our-history.module.css";

const serviceCards = [
  {
    id: "human-rights",
    title: "Human Rights Awareness",
    description:
      "Educating citizens about human rights, constitutional values, fundamental rights and civil liberties.",
    icon: Scale,
    iconColor: "#0284c7",
    cardBg: "#f0f7fe",
    borderColor: "rgba(2, 132, 199, 0.18)",
  },
  {
    id: "justice-grievance",
    title: "Justice and Grievance Support",
    description:
      "Helping people understand complaint procedures and approach the appropriate authorities when they face injustice.",
    icon: FileText,
    iconColor: "#16a34a",
    cardBg: "#f0fdf4",
    borderColor: "rgba(22, 163, 74, 0.18)",
  },
  {
    id: "women-child",
    title: "Women and Child Protection",
    description:
      "Promoting dignity, safety, equality and awareness of legal protections.",
    icon: Users,
    iconColor: "#ea580c",
    cardBg: "#fff7ed",
    borderColor: "rgba(234, 88, 12, 0.18)",
  },
  {
    id: "minority-senior",
    title: "Minority and Senior Citizen Welfare",
    description:
      "Supporting inclusion, equal treatment and respect for vulnerable communities.",
    icon: HeartHandshake,
    iconColor: "#9333ea",
    cardBg: "#faf5ff",
    borderColor: "rgba(147, 51, 234, 0.18)",
  },
  {
    id: "education-awareness",
    title: "Education and Public Awareness",
    description:
      "Encouraging legal literacy, social responsibility and informed citizenship.",
    icon: BookOpen,
    iconColor: "#0d9488",
    cardBg: "#f0fdfa",
    borderColor: "rgba(13, 148, 136, 0.18)",
  },
  {
    id: "community-welfare",
    title: "Community Welfare and Humanitarian Service",
    description:
      "Participating in welfare activities, relief initiatives and programmes that respond to community needs.",
    icon: HelpingHand,
    iconColor: "#ca8a04",
    cardBg: "#fefce8",
    borderColor: "rgba(202, 138, 4, 0.18)",
  },
  {
    id: "peace-harmony",
    title: "Peace and Social Harmony",
    description:
      "Promoting unity, brotherhood, tolerance and respect among people from different backgrounds.",
    icon: Sprout,
    iconColor: "#059669",
    cardBg: "#f0fdf4",
    borderColor: "rgba(5, 150, 105, 0.18)",
  },
];

export default function HistoryJourneyService() {
  return (
    <section className={styles.serviceSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.serviceHeader}>
          <div className={styles.sectionEyebrowRow}>
            <Cog className={styles.eyebrowIcon} size={20} strokeWidth={2.4} />
            <span className={styles.sectionEyebrowText}>
              OUR JOURNEY OF SERVICE
            </span>
          </div>

          <p className={styles.serviceSubtitle}>
            Over the years, HRSJM has focused on initiatives that promote
            awareness, community welfare and access to justice, including:
          </p>
        </div>

        {/* 7 Pastel Service Cards Grid */}
        <div className={styles.serviceGrid}>
          {serviceCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={styles.serviceCard}
                style={{
                  backgroundColor: card.cardBg,
                  borderColor: card.borderColor,
                }}
              >
                <div
                  className={styles.serviceCardIconWrap}
                  style={{ color: card.iconColor }}
                >
                  <Icon size={30} strokeWidth={2} />
                </div>
                <h3 className={styles.serviceCardTitle}>{card.title}</h3>
                <p className={styles.serviceCardText}>{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
