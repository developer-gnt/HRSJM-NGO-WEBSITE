"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Home, Printer, FileText } from "lucide-react";
import { launchCashfreeCheckout } from "@/lib/cashfreeCheckout";
import MembershipReceipt from "./MembershipReceipt";
import styles from "./apply.module.css";

interface SuccessModalProps {
  applicationRef: string;
  applicantName: string;
  applicantEmail?: string;
  applicantPhone?: string;
  applicantAddress?: string;
  packageName: string;
  packageFee: string;
  submittedAt: string;
  paymentStatus?: string;
  applicationStatus?: string;
  paymentSessionId?: string;
}

export default function ApplicationSuccessModal({
  applicationRef,
  applicantName,
  applicantEmail,
  applicantPhone,
  applicantAddress,
  packageName,
  packageFee,
  submittedAt,
  paymentStatus = "Confirmed Paid",
  applicationStatus = "Applied (Pending Review)",
  paymentSessionId,
}: SuccessModalProps) {
  const [showReceipt, setShowReceipt] = useState(false);

  const handlePrint = () => {
    setShowReceipt(true);
  };

  const formattedDate = new Date(submittedAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <>
      <div
        className={styles.successOverlay}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
      >
        <div className={styles.successModal}>
          <div className={styles.successIconWrap} aria-hidden="true">
            <Check size={36} strokeWidth={2.6} />
          </div>

          <h3 id="success-title" className={styles.successTitle}>
            Application Submitted!
          </h3>
          <p className={styles.successSubtitle}>
            Thank you for applying to Human Rights &amp; Social Justice Mission.
            Your application has been received and our team will get in touch with
            you soon.
          </p>

          <div className={styles.receiptCard}>
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Application Ref:</span>
              <span className={`${styles.receiptValue} ${styles.receiptRef}`}>
                {applicationRef}
              </span>
            </div>
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Applicant Name:</span>
              <span className={styles.receiptValue}>{applicantName}</span>
            </div>
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Membership Package:</span>
              <span className={styles.receiptValue}>{packageName}</span>
            </div>
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Registration Fee:</span>
              <span className={styles.receiptValue}>{packageFee}</span>
            </div>
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Payment Status:</span>
              <span className={styles.receiptValue} style={{ color: "#166534", fontWeight: 700 }}>
                ✓ {paymentStatus}
              </span>
            </div>
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Application Status:</span>
              <span className={styles.receiptValue} style={{ color: "#d97706", fontWeight: 700 }}>
                {applicationStatus}
              </span>
            </div>
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Submitted On:</span>
              <span className={styles.receiptValue}>{formattedDate}</span>
            </div>
          </div>

          <div className={styles.successActions} style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            <button
              type="button"
              className={styles.btnOutline}
              onClick={handlePrint}
            >
              <Printer size={15} /> Print Receipt
            </button>
            <Link href="/" className={styles.btnGold}>
              <Home size={15} /> Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Official Membership Application Receipt Preview Modal */}
      {showReceipt && (
        <MembershipReceipt
          applicationRef={applicationRef}
          applicantName={applicantName}
          applicantEmail={applicantEmail}
          applicantPhone={applicantPhone}
          applicantAddress={applicantAddress}
          packageName={packageName}
          packageFee={packageFee}
          submittedAt={submittedAt}
          paymentStatus={paymentStatus}
          applicationStatus={applicationStatus}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </>
  );
}
