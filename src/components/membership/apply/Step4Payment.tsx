"use client";

import { type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  ShieldCheck,
  Loader2,
  Lock,
} from "lucide-react";
import type { UnifiedMembershipPackage } from "../categories/categoriesData";
import styles from "./apply.module.css";

export interface Step4Data {
  paymentMode: "upi_bank" | "online_gateway";
  paymentReference: string;
  validity: string;
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

  // Statutory membership validity auto-fetched from selected category/database
  const currentValidity =
    data.validity || selectedPackage?.item?.validity || "1 Year";

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.stepHeader}>
        <h2 className={styles.sectionHeading}>Payment Step &amp; Application Review</h2>
        <p className={styles.sectionSubtitle}>
          Review your membership details and proceed to secure online payment.
        </p>
      </div>

      {/* Review & Fee Summary Box */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          padding: 24,
          marginBottom: 20,
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
            <span style={{ color: "#64748b", display: "block" }}>Membership Validity:</span>
            <strong style={{ color: "#0d7a57" }}>{currentValidity}</strong>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 16,
            flexWrap: "wrap",
            gap: 12,
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
              fontSize: 28,
              fontWeight: 800,
              color: "#0d7a57",
            }}
          >
            {selectedPackage.item.fees}
          </div>
        </div>
      </div>

      {/* Cashfree Payment Gateway Card */}
      <div
        style={{
          background: "#f0f7ff",
          border: "1.5px solid #bfdbfe",
          borderRadius: 12,
          padding: 22,
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#0a3a6b",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <CreditCard size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 6,
              }}
            >
              <strong style={{ fontSize: 15, color: "#0a3a6b" }}>
                Online Payment via Cashfree Gateway
              </strong>
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  background: "#dcfce7",
                  color: "#166534",
                  padding: "2px 8px",
                  borderRadius: 12,
                }}
              >
                INSTANT VERIFICATION
              </span>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "#334155",
                margin: "0 0 12px 0",
                lineHeight: 1.5,
              }}
            >
              Click below to proceed to the secure Cashfree checkout. You can complete
              your registration fee instantly using <strong>UPI (GPay, PhonePe, Paytm, QR Code)</strong>,{" "}
              <strong>Debit/Credit Cards</strong>, or <strong>Netbanking</strong>. Your official
              application receipt is issued immediately upon successful payment.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontSize: 12,
                color: "#64748b",
                flexWrap: "wrap",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Lock size={13} style={{ color: "#0d7a57" }} /> 256-Bit Bank Grade Security
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <ShieldCheck size={14} style={{ color: "#0d7a57" }} /> Zero Processing Surcharge
              </span>
            </div>
          </div>
        </div>
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
              <Loader2 size={16} className="animate-spin" /> Connecting to Cashfree Gateway...
            </>
          ) : (
            <>
              Pay {selectedPackage.item.fees} via Cashfree Gateway <ArrowRight size={17} strokeWidth={2.4} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
