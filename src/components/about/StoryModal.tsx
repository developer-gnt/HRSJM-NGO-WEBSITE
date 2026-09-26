"use client";

import { X, Scale, Users, BookOpen } from "lucide-react";
import styles from "./about.module.css";

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenJoin: () => void;
}

export default function StoryModal({
  isOpen,
  onClose,
  onOpenJoin,
}: StoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalPanel} ${styles.modalPanelWide}`}>
        {/* Header banner */}
        <div className={styles.modalHeader}>
          <button
            onClick={onClose}
            aria-label="Close story"
            className={styles.modalClose}
          >
            <X className={styles.modalCloseIcon} />
          </button>

          <span className={styles.modalEyebrow}>Our Genesis &amp; Journey</span>
          <h3 className={styles.modalTitle}>The Story Behind HRSJM</h3>
          <p className={styles.modalSub}>
            From a localized legal grievance clinic to a nationwide democratic
            human rights coalition.
          </p>
        </div>

        {/* Scrollable story content */}
        <div className={styles.storyContent}>
          <div className={styles.storyQuote}>
            “We founded HRSJM not merely as an organization, but as a living
            instrument of constitutional defense for people who have been
            historically denied their dignity.”
          </div>

          <div className={styles.storySection}>
            <h4 className={styles.storySectionTitle}>1. Grassroots Origins</h4>
            <p>
              HRSJM (Human Rights &amp; Social Justice Mission) was founded by
              legal advocates, grassroots educators, and civil rights workers
              in response to widespread gaps in access to legal justice.
              Recognizing that fundamental rights enshrined in the
              Constitution often remain inaccessible to underprivileged
              communities, the mission began by organizing free community
              legal camps across Maharashtra and neighboring regions.
            </p>
          </div>

          <div className={styles.storySection}>
            <h4 className={styles.storySectionTitle}>
              2. Expanding National Coalitions
            </h4>
            <p>
              Over the years, HRSJM evolved into a democratic regional network
              comprising legal professionals, youth leaders, retired jurists,
              and community workers. The organization established specialized
              wings for labor rights, women’s security, child education, and
              anti-discrimination legal advocacy.
            </p>
          </div>

          <div className={styles.storyCards}>
            <div className={styles.storyMiniCard}>
              <Scale strokeWidth={1.8} />
              <h5 className={styles.storyMiniTitle}>Constitutional Rights</h5>
              <p className={styles.storyMiniText}>
                Ensuring direct legal protection &amp; state accountability.
              </p>
            </div>
            <div className={styles.storyMiniCard}>
              <Users strokeWidth={1.8} />
              <h5 className={styles.storyMiniTitle}>People’s Collectives</h5>
              <p className={styles.storyMiniText}>
                Strengthening local committees to defend community welfare.
              </p>
            </div>
            <div className={styles.storyMiniCard}>
              <BookOpen strokeWidth={1.8} />
              <h5 className={styles.storyMiniTitle}>Civic Education</h5>
              <p className={styles.storyMiniText}>
                Conducting ‘Know Your Rights’ literacy modules nationwide.
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className={styles.storyFooter}>
          <span className={styles.storyFooterNote}>
            Human Rights &amp; Social Justice Mission · Registered Non-Profit
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenJoin();
            }}
            className={styles.storyFooterButton}
          >
            Join Our Movement →
          </button>
        </div>
      </div>
    </div>
  );
}
