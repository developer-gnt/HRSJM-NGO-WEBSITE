"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import {
  X,
  MapPin,
  ShieldCheck,
  Heart,
  Users,
  AlertCircle,
  Loader2,
  Lock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { launchCashfreeCheckout } from "@/lib/cashfreeCheckout";
import type { EmergencyCaseRecord } from "@/app/api/donation/causes/route";
import styles from "./emergency.module.css";

interface EmergencyCaseModalProps {
  emergencyCase: EmergencyCaseRecord | null;
  onClose: () => void;
}

const quickAmounts = [500, 1000, 2500, 5000, 10000];

const formatINR = (val: number) =>
  `₹${new Intl.NumberFormat("en-IN").format(Math.max(0, val))}`;

export default function EmergencyCaseModal({
  emergencyCase,
  onClose,
}: EmergencyCaseModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>("1000");
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!emergencyCase) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [emergencyCase, onClose]);

  if (!emergencyCase) return null;

  const percent = Math.min(
    100,
    Math.max(0, Math.round((emergencyCase.raised / (emergencyCase.goal || 1)) * 100))
  );

  const handleAmountSelect = (val: number) => {
    setSelectedAmount(val);
    setCustomAmount(String(val));
    setErrorMessage(null);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, "").slice(0, 8);
    setCustomAmount(clean);
    setSelectedAmount(clean ? Number(clean) : 0);
    setErrorMessage(null);
  };

  const handleDonateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const finalAmount = selectedAmount || Number(customAmount);
    if (!finalAmount || finalAmount < 10) {
      setErrorMessage("Please enter a donation amount of at least ₹10.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const resolvedName = isAnonymous
      ? "Anonymous Donor"
      : donorName.trim() || "Kind Supporter";

    const specificCause = `Emergency Case [${emergencyCase.category}]: ${emergencyCase.beneficiaryName} - ${emergencyCase.title}`;

    try {
      const res = await fetch("/api/donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          donorName: resolvedName,
          donorMobile: donorPhone.trim() || undefined,
          donorEmail: donorEmail.trim() || undefined,
          isAnonymous,
          cause: specificCause,
          remark: `Website Emergency Case Donation - Beneficiary: ${emergencyCase.beneficiaryName} (${emergencyCase.id})`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Failed to initiate payment. Please retry.");
        setIsSubmitting(false);
        return;
      }

      if (data.cashfreeOrder?.payment_session_id) {
        await launchCashfreeCheckout({
          paymentSessionId: data.cashfreeOrder.payment_session_id,
          redirectTarget: "_modal",
        });
      } else {
        setErrorMessage("Payment session could not be established. Please retry.");
        setIsSubmitting(false);
      }
    } catch (err: unknown) {
      console.error("Donation submission error:", err);
      const errMsg = err instanceof Error ? err.message : "Failed to reach payment gateway. Please check connection.";
      setErrorMessage(errMsg);
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-modal-title"
      onClick={onClose}
    >
      <div
        className={styles.modalCard}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderTags}>
            <span className={styles.modalCategoryBadge}>
              {emergencyCase.category}
            </span>
            <span
              className={`${styles.modalUrgencyBadge} ${
                emergencyCase.urgency === "Urgent"
                  ? styles.badgeUrgent
                  : emergencyCase.urgency === "High Priority"
                  ? styles.badgeHighPriority
                  : styles.badgeModerate
              }`}
            >
              {emergencyCase.urgency}
            </span>
            <span className={styles.modalVerifiedBadge}>
              <ShieldCheck size={14} aria-hidden="true" />
              Verified by HRSJM
            </span>
          </div>

          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close case details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className={styles.modalBody}>
          {/* Top Banner with Image and Beneficiary info */}
          <div className={styles.modalHeroGrid}>
            <div className={styles.modalImgWrap}>
              <Image
                src={emergencyCase.image}
                alt={emergencyCase.alt || emergencyCase.beneficiaryName}
                fill
                sizes="(max-width: 640px) 100vw, 320px"
                className={styles.modalImg}
              />
            </div>

            <div className={styles.modalHeroInfo}>
              <div className={styles.modalLocationRow}>
                <MapPin size={15} className={styles.modalPinIcon} aria-hidden="true" />
                <span>{emergencyCase.location}</span>
              </div>

              <h2 id="case-modal-title" className={styles.modalBeneficiaryName}>
                {emergencyCase.beneficiaryName}
              </h2>

              <p className={styles.modalTitleText}>{emergencyCase.title}</p>

              {emergencyCase.hospitalOrDetails && (
                <div className={styles.modalHospitalBadge}>
                  <CheckCircle2 size={14} color="#059669" aria-hidden="true" />
                  <span>Facility / Center: {emergencyCase.hospitalOrDetails}</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress Card */}
          <div className={styles.modalProgressBox}>
            <div className={styles.modalProgressHeader}>
              <div>
                <span className={styles.modalRaisedAmount}>
                  {formatINR(emergencyCase.raised)}
                </span>
                <span className={styles.modalGoalSub}> raised of {formatINR(emergencyCase.goal)}</span>
              </div>
              <span className={styles.modalPercentBadge}>{percent}% Funded</span>
            </div>

            <div
              className={styles.modalProgressTrack}
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={styles.modalProgressFill}
                style={{
                  width: `${percent}%`,
                  background:
                    emergencyCase.urgency === "Urgent"
                      ? "linear-gradient(90deg, #dc2626 0%, #ef4444 100%)"
                      : emergencyCase.urgency === "High Priority"
                      ? "linear-gradient(90deg, #ea580c 0%, #f97316 100%)"
                      : "linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)",
                }}
              />
            </div>

            <div className={styles.modalProgressFooter}>
              <span>
                <Users size={13} style={{ display: "inline", marginRight: "4px" }} />
                {emergencyCase.donorCount} verified donors have contributed
              </span>
              <span>Need remaining: {formatINR(Math.max(0, emergencyCase.goal - emergencyCase.raised))}</span>
            </div>
          </div>

          {/* Detailed Story Section */}
          <div className={styles.modalStorySection}>
            <h3 className={styles.modalSectionTitle}>Case Background &amp; Urgent Need</h3>
            <p className={styles.modalStoryText}>{emergencyCase.description}</p>
            <p className={styles.modalTransparencyNote}>
              <ShieldCheck size={16} color="#0b2345" aria-hidden="true" />
              100% of your contribution to this case is disbursed directly to medical institutions, educational bodies, or verified relief vendors under the oversight of HRSJM social justice officers.
            </p>
          </div>

          {/* Direct Donation Form */}
          <form onSubmit={handleDonateSubmit} className={styles.modalDonationForm}>
            <h3 className={styles.modalSectionTitle}>Direct Support for {emergencyCase.beneficiaryName}</h3>

            <div className={styles.modalAmountPills}>
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleAmountSelect(amt)}
                  className={`${styles.modalPillBtn} ${
                    selectedAmount === amt ? styles.modalPillActive : ""
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <div className={styles.modalInputGroup}>
              <label htmlFor="custom-amount-input" className={styles.modalInputLabel}>
                Or enter custom amount (₹)
              </label>
              <input
                id="custom-amount-input"
                type="text"
                inputMode="numeric"
                value={customAmount}
                onChange={handleCustomChange}
                placeholder="Enter amount"
                className={styles.modalInputField}
              />
            </div>

            <div className={styles.modalTwoColGrid}>
              <div className={styles.modalInputGroup}>
                <label htmlFor="donor-name-input" className={styles.modalInputLabel}>
                  Full Name
                </label>
                <input
                  id="donor-name-input"
                  type="text"
                  disabled={isAnonymous}
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder={isAnonymous ? "Anonymous" : "Your name"}
                  className={styles.modalInputField}
                />
              </div>

              <div className={styles.modalInputGroup}>
                <label htmlFor="donor-phone-input" className={styles.modalInputLabel}>
                  Mobile Number
                </label>
                <input
                  id="donor-phone-input"
                  type="tel"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  placeholder="10-digit mobile"
                  className={styles.modalInputField}
                />
              </div>
            </div>

            <div className={styles.modalInputGroup}>
              <label htmlFor="donor-email-input" className={styles.modalInputLabel}>
                Email Address (For Tax Exemption Receipt)
              </label>
              <input
                id="donor-email-input"
                type="email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                placeholder="name@example.com"
                className={styles.modalInputField}
              />
            </div>

            <label className={styles.modalCheckboxLabel}>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              <span>Keep my name anonymous on the public supporters list</span>
            </label>

            {errorMessage && (
              <div className={styles.modalErrorBox} role="alert">
                <AlertCircle size={16} aria-hidden="true" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.modalSubmitBtn}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className={styles.spinIcon} aria-hidden="true" />
                  Initiating Payment Gateway...
                </>
              ) : (
                <>
                  <Heart size={18} fill="#0b2345" color="#0b2345" aria-hidden="true" />
                  Donate {formatINR(selectedAmount || Number(customAmount) || 0)} Now
                  <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
                </>
              )}
            </button>

            <div className={styles.modalSecurityFooter}>
              <Lock size={13} aria-hidden="true" />
              <span>Secured by 256-bit SSL encryption · Cashfree Payments · 80G Tax Deductible</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
