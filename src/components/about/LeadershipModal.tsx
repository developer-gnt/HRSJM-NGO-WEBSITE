"use client";

import Image from "next/image";
import { X, ShieldCheck, MapPin, Award, Building2, UserCheck } from "lucide-react";
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
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-leader-name"
    >
      <div
        className={`${styles.modalPanel} ${styles.modalPanelNarrow}`}
        onClick={(e) => e.stopPropagation()}
      >
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
              HRSJM National Governing Body
            </span>
            <h3 id="modal-leader-name" className={styles.leadModalName}>{member.name}</h3>
            <p className={styles.leadModalDesignation}>{member.designation}</p>
          </div>
        </div>

        {/* Verified Profile Details Body */}
        <div className={styles.leadModalBody}>
          <div className={styles.leadModalInfoList}>
            <div className={styles.leadModalInfoItem}>
              <div className={styles.leadModalInfoIconWrap}>
                <Building2 size={16} />
              </div>
              <div>
                <span className={styles.leadModalInfoLabel}>Designation</span>
                <p className={styles.leadModalInfoVal}>{member.designation}</p>
              </div>
            </div>

            {member.qualification && (
              <div className={styles.leadModalInfoItem}>
                <div className={styles.leadModalInfoIconWrap}>
                  <Award size={16} />
                </div>
                <div>
                  <span className={styles.leadModalInfoLabel}>Academic &amp; Professional Details</span>
                  <p className={styles.leadModalInfoVal}>{member.qualification}</p>
                </div>
              </div>
            )}

            {member.location && (
              <div className={styles.leadModalInfoItem}>
                <div className={styles.leadModalInfoIconWrap}>
                  <MapPin size={16} />
                </div>
                <div>
                  <span className={styles.leadModalInfoLabel}>Location / Jurisdiction</span>
                  <p className={styles.leadModalInfoVal}>{member.location}</p>
                </div>
              </div>
            )}

            <div className={styles.leadModalInfoItem}>
              <div className={styles.leadModalInfoIconWrap}>
                <UserCheck size={16} />
              </div>
              <div>
                <span className={styles.leadModalInfoLabel}>Organizational Standing</span>
                <p className={styles.leadModalInfoVal}>
                  {member.role ? `${member.role} &bull; National Governing Body` : "National Governing Body Member"}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.leadModalMeta}>
            <span className={styles.leadModalVerified}>
              <ShieldCheck size={16} strokeWidth={2.2} />
              Verified Official Profile &bull; hrsjm.org
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
