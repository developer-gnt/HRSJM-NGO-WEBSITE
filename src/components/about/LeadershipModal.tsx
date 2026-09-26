"use client";

import Image from "next/image";
import { X, Quote, Shield, Mail } from "lucide-react";
import type { LeadershipMember } from "./aboutData";
import styles from "./about.module.css";

interface LeadershipModalProps {
  member: LeadershipMember | null;
  onClose: () => void;
}

export default function LeadershipModal({
  member,
  onClose,
}: LeadershipModalProps) {
  if (!member) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalPanel} ${styles.modalPanelNarrow}`}>
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close profile"
          className={styles.leadModalClose}
        >
          <X size={20} />
        </button>

        {/* Top portrait & header */}
        <div className={styles.leadModalHeader}>
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="512px"
            className={styles.leadModalImg}
          />
          <div className={styles.leadModalShade} />

          <div className={styles.leadModalCaption}>
            <span className={styles.modalEyebrow}>
              {member.specialization || "HRSJM National Leadership"}
            </span>
            <h3 className={styles.leadModalName}>{member.name}</h3>
            <p className={styles.leadModalDesignation}>{member.designation}</p>
          </div>
        </div>

        {/* Bio content */}
        <div className={styles.leadModalBody}>
          {/* Quote */}
          <div className={styles.leadModalQuote}>
            <Quote strokeWidth={1.8} />
            <p className={styles.leadModalQuoteText}>“{member.quote}”</p>
          </div>

          <p className={styles.leadModalBio}>{member.bio}</p>

          <div className={styles.leadModalMeta}>
            <span className={styles.leadModalVerified}>
              <Shield strokeWidth={1.8} />
              Verified HRSJM Executive Council
            </span>
            <span className={styles.leadModalEmail}>
              <Mail strokeWidth={1.8} />
              leadership@hrsjm.org
            </span>
          </div>
        </div>

        {/* Modal bottom */}
        <div className={styles.leadModalFooter}>
          <button onClick={onClose} className={styles.leadModalCloseBtn}>
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
