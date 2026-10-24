"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Users, Sprout, Handshake } from "lucide-react";
import styles from "./about.module.css";

const historyCards = [
  {
    id: "established",
    badgeBg: "#062a4f",
    icon: Calendar,
    title: "2012",
    subtitle: "Established",
    cardBg: "#edf6fc",
    borderColor: "rgba(6, 42, 79, 0.08)",
  },
  {
    id: "people-first",
    badgeBg: "#f59e0b",
    icon: Users,
    title: "People First",
    subtitle: "Serving Communities",
    cardBg: "#fef9e8",
    borderColor: "rgba(245, 158, 11, 0.12)",
  },
  {
    id: "growing-impact",
    badgeBg: "#059669",
    icon: Sprout,
    title: "Growing Impact",
    subtitle: "Across Regions",
    cardBg: "#eefbf3",
    borderColor: "rgba(16, 185, 129, 0.12)",
  },
  {
    id: "stronger-together",
    badgeBg: "#7c3aed",
    icon: Handshake,
    title: "Stronger Together",
    subtitle: "For a Fairer Tomorrow",
    cardBg: "#f6effc",
    borderColor: "rgba(124, 58, 237, 0.12)",
  },
];

export default function OurHistory() {
  return (
    <section id="our-history" className={styles.historySection}>
      <div className={styles.container}>
        {/* Top Split Banner: Left Narrative + Right Collage */}
        <div className={styles.historyBanner}>
          {/* Left Column: Eyebrow, Heading, Paragraph, Empty Button */}
          <div className={styles.historyContent}>
            <div className={styles.historyEyebrowWrap}>
              <span className={styles.historyEyebrow}>OUR HISTORY</span>
              <div className={styles.historyEyebrowBar} />
            </div>

            <h2 className={styles.historyTitle}>
              A Journey of Humanity,<br />
              Justice and <span className={styles.historyGoldText}>People</span>
            </h2>

            <p className={styles.historyDescription}>
              The Human Rights &amp; Social Justice Mission (HRSJM) was established
              on <strong>26 November 2012</strong> with a vision to promote
              human rights, fight social injustice and build a society founded
              on equality, peace, brotherhood and mutual respect.
            </p>

            <div className={styles.historyBtnWrap}>
              <Link
                href="/our-history"
                className={styles.historyBtn}
                aria-label="Learn More About Our History"
              >
                <span>Learn More About Our History</span>
                <ArrowRight className={styles.historyBtnIcon} size={16} strokeWidth={2.4} />
              </Link>
            </div>
          </div>

          {/* Right Column: High-Res Artistic Collage matching the exact reference */}
          <div className={styles.historyCollageWrap}>
            <Image
              src="/images/about/history-collage-v2.png"
              alt="HRSJM history journey with youth, Indian tricolor, India Gate, smiling children and community disaster rescue"
              width={1472}
              height={630}
              priority
              className={styles.historyCollageImg}
              sizes="(min-width: 1200px) 720px, (min-width: 1024px) 58vw, 100vw"
            />
          </div>
        </div>

        {/* Bottom Strip: 4 Milestone Metric Cards */}
        <div className={styles.historyCardsGrid}>
          {historyCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={styles.historyCard}
                style={{
                  backgroundColor: card.cardBg,
                  borderColor: card.borderColor,
                }}
              >
                <div
                  className={styles.historyCardBadge}
                  style={{ backgroundColor: card.badgeBg }}
                >
                  <Icon className={styles.historyCardIcon} size={22} strokeWidth={2.2} />
                </div>
                <div className={styles.historyCardText}>
                  <div className={styles.historyCardTitle}>{card.title}</div>
                  <div className={styles.historyCardSubtitle}>{card.subtitle}</div>
                </div>
                {index < historyCards.length - 1 && (
                  <div className={styles.historyCardDivider} aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
