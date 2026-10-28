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
  Calendar,
  AlertCircle,
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

  const currentValidity = data.validity || selectedPackage.item.validity || "1 Year";

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.stepHeader}>
        <h2 className={styles.sectionHeading}>Payment Step &amp; Application Review</h2>
        <p className={styles.sectionSubtitle}>
          Review your membership details, confirm validity, and complete payment.
        </p>
      </div>

      {/* Review Box */}
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

      {/* Validity Selection & Confirmation Card (Taken before payment) */}
      <div
        style={{
          background: "#ffffff",
          border: `1.5px solid ${errors.validity ? "#ef4444" : "#e2e8f0"}`,
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
          <div>
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "var(--color-navy)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                margin: 0,
              }}
            >
              <Calendar size={18} style={{ color: "#0a3a6b" }} />
              Membership Validity Period (Required Before Payment)
            </h3>
            <p style={{ fontSize: 12.5, color: "#64748b", margin: "4px 0 0 0" }}>
              Confirm your official membership validity duration before initiating payment.
            </p>
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#0d7a57",
              background: "#dcfce7",
              padding: "4px 10px",
              borderRadius: 20,
            }}
          >
            CONFIRMED: {currentValidity}
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: 12,
            marginTop: 14,
          }}
        >
          {["1 Year", "2 Years", "5 Years", "10 Years"].map((vOption) => {
            const isPackageDefault = selectedPackage.item.validity === vOption;
            const isCurrentSelected = currentValidity === vOption;
            return (
              <div
                key={vOption}
                onClick={() => onChange("validity", vOption)}
                style={{
                  border: `2px solid ${isCurrentSelected ? "#0a3a6b" : "#e2e8f0"}`,
                  borderRadius: 10,
                  padding: "12px 14px",
                  cursor: "pointer",
                  background: isCurrentSelected ? "#f0f7ff" : "#f8fafc",
                  textAlign: "center",
                  transition: "all 140ms ease",
                  position: "relative",
                }}
              >
                {isPackageDefault && (
                  <span
                    style={{
                      position: "absolute",
                      top: -9,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: 9.5,
                      fontWeight: 800,
                      background: "#0a3a6b",
                      color: "#ffffff",
                      padding: "1px 6px",
                      borderRadius: 6,
                      whiteSpace: "nowrap",
                    }}
                  >
                    POST DEFAULT
                  </span>
                )}
                <div style={{ fontSize: 14, fontWeight: 700, color: isCurrentSelected ? "#0a3a6b" : "#334155" }}>
                  {vOption}
                </div>
                <div style={{ fontSize: 11, color: isCurrentSelected ? "#0a3a6b" : "#64748b", marginTop: 2, fontWeight: isCurrentSelected ? 600 : 400 }}>
                  {isCurrentSelected ? "✓ Confirmed" : "Choose"}
                </div>
              </div>
            );
          })}
        </div>

        {errors.validity && (
          <p className={styles.fieldError} style={{ marginTop: 10 }} role="alert">
            <AlertCircle size={13} strokeWidth={2} />
            {errors.validity}
          </p>
        )}
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
          {/* Method 1: Online Payment Gateway (Cashfree - Recommended) */}
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
                data.paymentMode === "online_gateway" ? "#f0f7ff" : "#ffffff",
              boxShadow:
                data.paymentMode === "online_gateway"
                  ? "0 4px 14px rgba(10, 58, 107, 0.12)"
                  : "none",
              transition: "all 160ms ease",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -10,
                right: 12,
                background: "#0d7a57",
                color: "#ffffff",
                fontSize: 10,
                fontWeight: 800,
                padding: "2px 8px",
                borderRadius: 10,
                letterSpacing: 0.4,
              }}
            >
              RECOMMENDED / INSTANT
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <CreditCard size={22} style={{ color: "#0a3a6b" }} />
              <div>
                <strong style={{ fontSize: 14, display: "block", color: "var(--color-navy)" }}>
                  Online Payment Gateway
                </strong>
                <span style={{ fontSize: 12, color: "#64748b" }}>
                  UPI (GPay, PhonePe, QR), Cards, Netbanking
                </span>
              </div>
            </div>
          </div>

          {/* Method 2: Offline UPI / Bank Transfer */}
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
                  Direct Bank Transfer / NEFT
                </strong>
                <span style={{ fontSize: 12, color: "#64748b" }}>
                  Official Trust Account (Manual verification)
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
            <div style={{ fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
              <span>🛡️</span> Cashfree Web Checkout Active:
            </div>
            When you proceed, the secure Cashfree Web Checkout modal will open automatically.
            You can complete your registration fee securely using UPI (QR Code, GPay, PhonePe),
            Debit/Credit Cards, or Netbanking. Your application receipt will be generated instantly.
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
              <Loader2 size={16} className="animate-spin" /> Connecting to Cashfree Gateway...
            </>
          ) : data.paymentMode === "online_gateway" ? (
            <>
              Pay {selectedPackage.item.fees} via Cashfree Gateway <ArrowRight size={17} strokeWidth={2.4} />
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
