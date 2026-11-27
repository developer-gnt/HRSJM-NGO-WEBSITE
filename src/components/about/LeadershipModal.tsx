"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Building2, Award, MapPin, Briefcase, Target, Users } from "lucide-react";
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
  useEffect(() => {
    if (!member) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [member, onClose]);

  if (!member) return null;

  const experience =
    member.experience ||
    (member.role?.toLowerCase().includes("president")
      ? "Human Rights Leadership, Administration & Governance"
      : member.role?.toLowerCase().includes("legal") || member.designation.toLowerCase().includes("legal")
      ? "Judicial Advocacy, Statutory Compliance & Human Rights Defense"
      : "Organizational Leadership, Social Welfare & Governance");

  const focusAreas =
    member.focusAreas ||
    (member.role?.toLowerCase().includes("president")
      ? "Human Rights Protection, Social Justice, Policy Advocacy, National Coordination, Member Welfare"
      : member.role?.toLowerCase().includes("legal") || member.designation.toLowerCase().includes("legal")
      ? "Civil Liberties, Public Interest Litigation, Legal Aid Clinics, Fundamental Rights"
      : "Community Development, Public Grievance Resolution, Human Rights Advocacy");

  const aboutText =
    member.bio ||
    `${member.name} serves as the ${member.designation} of HRSJM, leading the organization's initiatives for the promotion and protection of human rights across India.`;

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-leader-name"
    >
      <div
        className={`${styles.modalPanel} ${styles.modalPanelTwoCol}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Column: Portrait, Identity & Gradient */}
        <div className={styles.leadModalHero}>
          <Image
            src={member.image}
            alt={member.name}
            fill
            priority
            quality={95}
            sizes="(max-width: 768px) 100vw, 380px"
            className={styles.leadModalHeroImg}
          />
          <div className={styles.leadModalHeroShade} />

          {/* Decorative Gold Wave in bottom corner */}
          <svg
            className={styles.leadModalWave}
            viewBox="0 0 160 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M0 50 C 40 20, 80 75, 160 30"
              stroke="#fad25c"
              strokeWidth="1.2"
              strokeOpacity="0.45"
            />
            <path
              d="M0 65 C 45 35, 95 85, 160 42"
              stroke="#fad25c"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
            <path
              d="M0 78 C 50 48, 110 90, 160 55"
              stroke="#fad25c"
              strokeWidth="0.8"
              strokeOpacity="0.18"
            />
          </svg>

          {/* Leader Title & Caption at Bottom of Left Column */}
          <div className={styles.leadModalHeroCaption}>
            <span className={styles.leadModalEyebrow}>
              HRSJM NATIONAL GOVERNING BODY
            </span>
            <h3 id="modal-leader-name" className={styles.leadModalHeroName}>
              {member.name}
            </h3>
            <p className={styles.leadModalHeroDesignation}>
              {member.designation}
            </p>
            <div className={styles.leadModalGoldBar} />
          </div>
        </div>

        {/* Right Column: Detailed Info Cards & Close Profile Action */}
        <div className={styles.leadModalContent}>
          {/* Top-Right Circular Close (X) Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className={styles.leadModalClose}
          >
            <X size={18} strokeWidth={2.4} />
          </button>

          <div className={styles.leadModalScrollArea}>
            <div className={styles.leadModalCardList}>
              {/* 1. DESIGNATION */}
              <div className={styles.leadInfoCard}>
                <div className={styles.leadInfoIconWrap}>
                  <Building2 size={17} />
                </div>
                <div className={styles.leadInfoText}>
                  <span className={styles.leadInfoLabel}>Designation</span>
                  <p className={styles.leadInfoVal}>{member.designation}</p>
                </div>
              </div>

              {/* 2. ACADEMIC & PROFESSIONAL DETAILS */}
              {member.qualification && (
                <div className={styles.leadInfoCard}>
                  <div className={styles.leadInfoIconWrap}>
                    <Award size={17} />
                  </div>
                  <div className={styles.leadInfoText}>
                    <span className={styles.leadInfoLabel}>
                      Academic &amp; Professional Details
                    </span>
                    <p className={styles.leadInfoVal}>{member.qualification}</p>
                  </div>
                </div>
              )}

              {/* 3. LOCATION / JURISDICTION */}
              {member.location && (
                <div className={styles.leadInfoCard}>
                  <div className={styles.leadInfoIconWrap}>
                    <MapPin size={17} />
                  </div>
                  <div className={styles.leadInfoText}>
                    <span className={styles.leadInfoLabel}>
                      Location / Jurisdiction
                    </span>
                    <p className={styles.leadInfoVal}>{member.location}</p>
                  </div>
                </div>
              )}

              {/* 4. PROFESSIONAL EXPERIENCE */}
              <div className={styles.leadInfoCard}>
                <div className={styles.leadInfoIconWrap}>
                  <Briefcase size={17} />
                </div>
                <div className={styles.leadInfoText}>
                  <span className={styles.leadInfoLabel}>
                    Professional Experience
                  </span>
                  <p className={styles.leadInfoVal}>{experience}</p>
                </div>
              </div>

              {/* 5. KEY AREAS OF FOCUS */}
              <div className={styles.leadInfoCard}>
                <div className={styles.leadInfoIconWrap}>
                  <Target size={17} />
                </div>
                <div className={styles.leadInfoText}>
                  <span className={styles.leadInfoLabel}>Key Areas of Focus</span>
                  <p className={styles.leadInfoVal}>{focusAreas}</p>
                </div>
              </div>

              {/* 6. ABOUT */}
              <div className={styles.leadInfoCard}>
                <div className={styles.leadInfoIconWrap}>
                  <Users size={17} />
                </div>
                <div className={styles.leadInfoText}>
                  <span className={styles.leadInfoLabel}>About</span>
                  <p className={styles.leadInfoVal}>{aboutText}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer (Fixed & Always Visible) */}
          <div className={styles.leadModalFooterRow}>
            <button
              type="button"
              onClick={onClose}
              className={styles.leadModalCloseProfileBtn}
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
