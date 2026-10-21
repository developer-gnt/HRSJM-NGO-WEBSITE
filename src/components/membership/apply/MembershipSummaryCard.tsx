"use client";

import { useState } from "react";
import { Award, ChevronDown, Check, X } from "lucide-react";
import {
  getAllMembershipPackages,
  type UnifiedMembershipPackage,
} from "../categories/categoriesData";
import styles from "./apply.module.css";

interface MembershipSummaryCardProps {
  selectedPackage: UnifiedMembershipPackage;
  onSelectPackage: (pkg: UnifiedMembershipPackage) => void;
}

export default function MembershipSummaryCard({
  selectedPackage,
  onSelectPackage,
}: MembershipSummaryCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const allPackages = getAllMembershipPackages();

  const handleChoose = (pkg: UnifiedMembershipPackage) => {
    onSelectPackage(pkg);
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles.summaryCard} aria-label="Selected membership package summary">
        <div className={styles.summaryLeft}>
          <div className={styles.summaryBadgeIcon} aria-hidden="true">
            <Award size={22} strokeWidth={2.2} />
          </div>
          <div className={styles.summaryDetails}>
            <span className={styles.summaryLabel}>APPLYING FOR</span>
            <div className={styles.summaryTitleRow}>
              <h3 className={styles.summaryTitle}>{selectedPackage.item.post}</h3>
              <button
                type="button"
                className={styles.switchPackageBtn}
                onClick={() => setModalOpen(true)}
                title="Change membership package"
              >
                Change <ChevronDown size={11} style={{ display: "inline" }} />
              </button>
            </div>
            <span className={styles.summaryMeta}>
              {selectedPackage.item.qualification} • {selectedPackage.item.validity} Duration
            </span>
          </div>
        </div>

        <div className={styles.summaryRight}>
          <div className={styles.feeBadge}>
            <span className={styles.feeAmount}>{selectedPackage.item.fees}</span>
            <span className={styles.feeLabel}>Reg. Fee</span>
          </div>
        </div>
      </div>

      {/* Package Switcher Modal */}
      {modalOpen && (
        <div
          className={styles.successOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="switch-package-title"
          onClick={() => setModalOpen(false)}
        >
          <div
            className={styles.packageModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h4 id="switch-package-title" className={styles.packageModalTitle}>
                  Select Membership Package
                </h4>
                <p className={styles.packageModalSub}>
                  Choose the post and tier you wish to apply for
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.packageOptionsList}>
              {allPackages.map((pkg) => {
                const isSelected = pkg.item.post === selectedPackage.item.post;
                return (
                  <div
                    key={pkg.item.post}
                    className={`${styles.packageOptionItem} ${
                      isSelected ? styles.packageOptionSelected : ""
                    }`}
                    onClick={() => handleChoose(pkg)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleChoose(pkg);
                    }}
                  >
                    <div>
                      <div className={styles.packageOptionName}>
                        {pkg.item.post}{" "}
                        {isSelected && (
                          <Check
                            size={14}
                            style={{ display: "inline", color: "#16a34a", verticalAlign: "middle" }}
                          />
                        )}
                      </div>
                      <div className={styles.packageOptionMeta}>
                        {pkg.category.title} • {pkg.item.qualification} • {pkg.item.validity}
                      </div>
                    </div>
                    <div className={styles.packageOptionFee}>{pkg.item.fees}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
