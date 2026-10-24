"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowRight,
  BookOpen,
  HandCoins,
  Landmark,
  Lock,
  RefreshCw,
  Scale,
  Users,
} from "lucide-react";
import styles from "./donation.module.css";



const amountOptions = [
  { value: 500, label: "₹500", description: "Supports awareness programs" },
  { value: 1000, label: "₹1,000", description: "Helps provide legal guidance" },
  {
    value: 5000,
    label: "₹5,000",
    description: "Supports community development",
    popular: true,
  },
  { value: 10000, label: "₹10,000", description: "Funds advocacy campaigns" },
];

const quickAmounts = [2500, 5000, 25000];

const supportPoints = [
  { icon: Users, text: "Support vulnerable communities" },
  { icon: Scale, text: "Enable legal aid and counselling" },
  { icon: BookOpen, text: "Fund awareness and education programs" },
  { icon: Landmark, text: "Strengthen grassroots initiatives" },
  { icon: RefreshCw, text: "Help create long-term, systemic change" },
];

const paymentMarks = ["UPI", "VISA", "Mastercard", "RuPay"];

const formatINR = (value: number) =>
  `₹${new Intl.NumberFormat("en-IN").format(value)}`;

export default function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(5000);
  const [customValue, setCustomValue] = useState("5000");
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState<{
    donationRef: string;
    amount: number;
    donorName: string;
    cashfreeOrder?: any;
  } | null>(null);
  const [message, setMessage] = useState<{
    type: "error" | "info";
    text: string;
  } | null>(null);
  const customInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#donate") {
      const el = document.getElementById("donate");
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const selectAmount = (value: number) => {
    setSelectedAmount(value);
    setCustomValue(String(value));
    setMessage(null);
  };

  const selectQuickAmount = (value: number) => {
    setSelectedAmount(value);
    setCustomValue(String(value));
    setMessage(null);
  };

  const onCustomChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 9);
    setCustomValue(digits);
    setSelectedAmount(digits ? Number(digits) : null);
    setMessage(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = selectedAmount ?? (customValue ? Number(customValue) : null);
    if (!amount || amount < 10) {
      setMessage({
        type: "error",
        text: "Please choose or enter a valid donation amount (minimum ₹10).",
      });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          donorName: isAnonymous ? "Anonymous Donor" : donorName.trim() || "Kind Supporter",
          donorMobile: donorPhone.trim() || undefined,
          donorEmail: donorEmail.trim() || undefined,
          isAnonymous,
          cause: "Human Rights Protection & Legal Aid",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setMessage({
          type: "error",
          text: data.error || "Failed to process donation. Please try again.",
        });
        return;
      }

      setDonationSuccess({
        donationRef: data.donationRef,
        amount: data.amount,
        donorName: data.donorName,
        cashfreeOrder: data.cashfreeOrder,
      });

      setMessage({
        type: "info",
        text: `Donation registered with backend! Reference ID: ${data.donationRef}. Thank you for standing up for human rights.`,
      });
    } catch (err: any) {
      setMessage({
        type: "error",
        text: "Network error. Unable to connect to backend server. Please retry.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="donate" className={styles.donate} aria-labelledby="donate-heading">
      <div className={styles.container}>
        <div className={styles.donateLayout}>
          <div className={styles.donateIntro}>
            <p className={styles.eyebrowGold}>Why Donate</p>
            <h2 id="donate-heading" className={styles.sectionHeading}>
              Your Support
              <br />
              Creates Change
            </h2>
            <p className={styles.sectionDescription}>
              Every donation directly supports our work in legal aid, awareness,
              education, community development and advocacy. Together, we can
              build a society where everyone&rsquo;s rights are protected and every
              voice is heard.
            </p>
            <ul className={styles.supportList}>
              {supportPoints.map((point) => {
                const PointIcon = point.icon;
                return (
                  <li key={point.text} className={styles.supportItem}>
                    <span className={styles.supportIcon}>
                      <PointIcon
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>
                    <span>{point.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <form
            className={styles.donateCard}
            onSubmit={onSubmit}
            aria-label="Donation form"
          >
            <h3 className={styles.formHeading}>Choose an Amount</h3>
            <p className={styles.formSubheading}>
              Your contribution helps us continue our mission for human rights
              and social justice.
            </p>

            <div className={styles.amountGrid}>
              {amountOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={styles.amountCard}
                  data-selected={selectedAmount === option.value || undefined}
                  aria-pressed={selectedAmount === option.value}
                  onClick={() => selectAmount(option.value)}
                >
                  {option.popular ? (
                    <span className={styles.popularBadge}>Most Popular</span>
                  ) : null}
                  <span className={styles.amountValue}>{option.label}</span>
                  <span className={styles.amountDesc}>{option.description}</span>
                </button>
              ))}
            </div>

            <div className={styles.customRow}>
              <label className={styles.customField}>
                <span className={styles.customIcon}>
                  <HandCoins size={16} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className={styles.customBody}>
                  <span className={styles.customLabel}>Custom Amount</span>
                  <input
                    ref={customInputRef}
                    className={styles.customInput}
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter amount"
                    value={customValue}
                    onChange={onCustomChange}
                    aria-label="Custom amount in rupees"
                  />
                </span>
              </label>

              <div className={styles.quickAmounts}>
                {quickAmounts.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={styles.quickButton}
                    data-selected={selectedAmount === value || undefined}
                    aria-pressed={selectedAmount === value}
                    onClick={() => selectQuickAmount(value)}
                  >
                    {formatINR(value)}
                  </button>
                ))}
              </div>
            </div>

            {/* Donor Information */}
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "var(--color-navy)", marginBottom: "4px" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    placeholder={isAnonymous ? "Anonymous" : "Enter your full name"}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      background: isAnonymous ? "#f1f5f9" : "var(--color-white)",
                      fontSize: "14px",
                      color: "var(--color-navy)",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "var(--color-navy)", marginBottom: "4px" }}>
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="10-digit mobile"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      background: "var(--color-white)",
                      fontSize: "14px",
                      color: "var(--color-navy)",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "var(--color-navy)", marginBottom: "4px" }}>
                  Email Address (for Tax Receipt)
                </label>
                <input
                  type="email"
                  placeholder="Enter email address (optional)"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    background: "var(--color-white)",
                    fontSize: "14px",
                    color: "var(--color-navy)",
                    outline: "none",
                  }}
                />
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", color: "var(--color-text-secondary)" }}>
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  style={{ accentColor: "var(--color-gold)", width: "16px", height: "16px" }}
                />
                Keep my donation anonymous on public recognition lists
              </label>
            </div>

            <button
              type="submit"
              className={styles.donateButton}
              disabled={submitting}
              style={{ opacity: submitting ? 0.75 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
            >
              {submitting ? "Connecting to Gateway..." : "Donate Now"}
              <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
            </button>

            {donationSuccess && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "16px",
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "10px",
                  color: "#166534",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "15px" }}>
                  <span>🛡️</span> Donation Registered with HRSJM!
                </div>
                <div style={{ marginTop: "6px", fontSize: "13px", lineHeight: "1.6" }}>
                  Official Ref: <strong style={{ color: "#14532d" }}>{donationSuccess.donationRef}</strong><br />
                  Amount: <strong>₹{donationSuccess.amount.toLocaleString("en-IN")}</strong><br />
                  Donor: <strong>{donationSuccess.donorName}</strong>
                </div>
              </div>
            )}

            {message ? (
              <p
                className={styles.formMessage}
                data-type={message.type}
                role={message.type === "error" ? "alert" : "status"}
              >
                {message.text}
              </p>
            ) : null}

            <div className={styles.secureRow}>
              <span className={styles.secureText}>
                <Lock size={13} strokeWidth={2} aria-hidden="true" />
                Secure and Trusted Payment
              </span>
              <span className={styles.paymentMarks} aria-label="Accepted payment methods">
                {paymentMarks.map((mark) => (
                  <span key={mark} className={styles.paymentMark} data-mark={mark}>
                    {mark}
                  </span>
                ))}
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
