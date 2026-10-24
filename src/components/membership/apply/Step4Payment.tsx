"use client";

import { type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  QrCode,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import type { UnifiedMembershipPackage } from "../categories/categoriesData";
import styles from "./apply.module.css";

export interface Step4Data {
  paymentMode: "upi_bank" | "online_gateway";
  paymentReference: string;
}

interface Step4Props {
  data: Step4Data;
  onChange: (field: keyof Step4Data, value: string) => void;
  selectedPackage: UnifiedMembershipPackage;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
  errors: Record<string, string>;
}

export default function Step4Payment({
  data,
  onChange,
  selectedPackage,
  applicantName,
  applicantPhone,
  applicantEmail,
  onBack,
  onSubmit,
  submitting,
  errors,
}: Step4Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.stepHeader}>
        <h2 className={styles.sectionHeading}>Payment Step &amp; Application Review</h2>
        <p className={styles.sectionSubtitle}>
          Review your membership registration fee and select your payment method.
        </p>
      </div>

      {/* Review Box */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          padding: 24,
          marginBottom: 24,
        }}
      >
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--color-navy)",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <ShieldCheck size={20} style={{ color: "#0d7a57" }} />
          Application &amp; Fee Summary
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
            fontSize: 13,
            paddingBottom: 16,
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div>
            <span style={{ color: "#64748b", display: "block" }}>Applicant:</span>
            <strong style={{ color: "var(--color-navy)" }}>{applicantName}</strong>
          </div>
          <div>
            <span style={{ color: "#64748b", display: "block" }}>Contact:</span>
            <strong style={{ color: "var(--color-navy)" }}>{applicantPhone}</strong>
          </div>
          <div>
            <span style={{ color: "#64748b", display: "block" }}>Email:</span>
            <strong style={{ color: "var(--color-navy)" }}>{applicantEmail}</strong>
          </div>
          <div>
            <span style={{ color: "#64748b", display: "block" }}>Applying For Post:</span>
            <strong style={{ color: "#0a3a6b" }}>{selectedPackage.item.post}</strong>
          </div>
          <div>
            <span style={{ color: "#64748b", display: "block" }}>Validity:</span>
            <strong>{selectedPackage.item.validity}</strong>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <div>
            <span style={{ fontSize: 13, color: "#64748b" }}>
              Total Applicable Registration Fee:
            </span>
            <div style={{ fontSize: 11.5, color: "#94a3b8" }}>
              (Includes ID card, certificate &amp; official membership kit)
            </div>
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#0d7a57",
            }}
          >
            {selectedPackage.item.fees}
          </div>
        </div>
      </div>

      {/* Payment Mode Selection */}
      <div style={{ marginBottom: 24 }}>
        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "var(--color-navy)",
            marginBottom: 12,
          }}
        >
          Select Payment Method
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >
          {/* Method 1: UPI / Bank Transfer */}
          <div
            onClick={() => onChange("paymentMode", "upi_bank")}
            style={{
              border: `2px solid ${
                data.paymentMode === "upi_bank" ? "#0a3a6b" : "#e2e8f0"
              }`,
              borderRadius: 10,
              padding: 18,
              cursor: "pointer",
              background: data.paymentMode === "upi_bank" ? "#f8fafc" : "#ffffff",
              transition: "all 160ms ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <QrCode size={22} style={{ color: "#0a3a6b" }} />
              <div>
                <strong style={{ fontSize: 14, display: "block", color: "var(--color-navy)" }}>
                  UPI / Bank Transfer
                </strong>
                <span style={{ fontSize: 12, color: "#64748b" }}>
                  Pay via QR code, GPay, PhonePe, or NEFT
                </span>
              </div>
            </div>
          </div>

          {/* Method 2: Online Payment Gateway */}
          <div
            onClick={() => onChange("paymentMode", "online_gateway")}
            style={{
              border: `2px solid ${
                data.paymentMode === "online_gateway" ? "#0a3a6b" : "#e2e8f0"
              }`,
              borderRadius: 10,
              padding: 18,
              cursor: "pointer",
              background:
                data.paymentMode === "online_gateway" ? "#f8fafc" : "#ffffff",
              transition: "all 160ms ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <CreditCard size={22} style={{ color: "#0a3a6b" }} />
              <div>
                <strong style={{ fontSize: 14, display: "block", color: "var(--color-navy)" }}>
                  Online Payment Gateway
                </strong>
                <span style={{ fontSize: 12, color: "#64748b" }}>
                  Debit/Credit Card, Netbanking
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Mode Details */}
        {data.paymentMode === "upi_bank" ? (
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: 10,
              padding: 18,
              marginTop: 16,
              fontSize: 13,
              color: "#166534",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 6 }}>
              Official Trust Payment Account Details:
            </div>
            <div style={{ lineHeight: 1.6 }}>
              • <strong>Account Name:</strong> Human Rights &amp; Social Justice Mission<br />
              • <strong>Bank:</strong> Canara Bank / State Bank of India (Official Trust A/c)<br />
              • <strong>Note:</strong> Please record your Transaction / UTR reference number below after completing transfer.
            </div>

            <div style={{ marginTop: 14 }}>
              <label
                htmlFor="pay-ref"
                style={{
                  display: "block",
                  fontSize: 12.5,
                  fontWeight: 600,
                  marginBottom: 6,
                  color: "#166534",
                }}
              >
                Transaction / UTR Reference ID (Optional or upon transfer):
              </label>
              <input
                id="pay-ref"
                type="text"
                placeholder="e.g. UPI-1234567890 or Bank UTR"
                value={data.paymentReference}
                onChange={(e) => onChange("paymentReference", e.target.value)}
                className={styles.inputField}
                style={{
                  background: "#ffffff",
                  border: "1px solid #86efac",
                  borderRadius: 6,
                  padding: "10px 12px",
                  width: "100%",
                }}
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: 10,
              padding: 18,
              marginTop: 16,
              fontSize: 13,
              color: "#1e40af",
              lineHeight: 1.5,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 4 }}>
              Online Payment Gateway Integration Notice:
            </div>
            Automated online merchant checkout (Razorpay / PayU / Cashfree) will be
            active once the client configures their merchant keys. Submitting your
            application will register your record securely, and you will receive
            payment verification confirmation via email and SMS.
          </div>
        )}
      </div>

      <p
        style={{
          fontSize: 12.5,
          color: "#64748b",
          textAlign: "center",
          margin: "0 0 16px 0",
          lineHeight: 1.5,
        }}
      >
        Please review our{" "}
        <Link
          href="/refund-and-cancellation-policy/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#0a3a6b",
            fontWeight: 600,
            textDecoration: "underline",
          }}
        >
          Refund &amp; Cancellation Policy
        </Link>{" "}
        before completing your payment.
      </p>

      {/* Navigation Actions */}
      <div className={styles.navActions}>
        <button
          type="button"
          className={styles.btnOutline}
          onClick={onBack}
          disabled={submitting}
        >
          <ArrowLeft size={16} strokeWidth={2.4} /> Back to Documents
        </button>
        <button
          type="submit"
          className={styles.btnGold}
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Submitting
              Application...
            </>
          ) : (
            <>
              Confirm &amp; Complete Application <ArrowRight size={17} strokeWidth={2.4} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
