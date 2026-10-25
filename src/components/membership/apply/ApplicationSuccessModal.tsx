import Link from "next/link";
import { Check, CreditCard, Home, Printer } from "lucide-react";
import { launchCashfreeCheckout } from "@/lib/cashfreeCheckout";
import styles from "./apply.module.css";

interface SuccessModalProps {
  applicationRef: string;
  applicantName: string;
  packageName: string;
  packageFee: string;
  submittedAt: string;
  paymentSessionId?: string;
}

export default function ApplicationSuccessModal({
  applicationRef,
  applicantName,
  packageName,
  packageFee,
  submittedAt,
  paymentSessionId,
}: SuccessModalProps) {
  const handlePrint = () => {
    window.print();
  };

  const handlePayOnline = async () => {
    if (!paymentSessionId) return;
    try {
      await launchCashfreeCheckout({
        paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (err) {
      console.error("Cashfree checkout trigger failed:", err);
    }
  };

  const formattedDate = new Date(submittedAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
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
              ✓ Confirmed Paid
            </span>
          </div>
          <div className={styles.receiptRow}>
            <span className={styles.receiptLabel}>Application Status:</span>
            <span className={styles.receiptValue} style={{ color: "#d97706", fontWeight: 700 }}>
              Applied (Pending Review)
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
  );
}
