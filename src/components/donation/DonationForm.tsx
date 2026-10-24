"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
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
  const [customValue, setCustomValue] = useState("");
  const [message, setMessage] = useState<{
    type: "error" | "info";
    text: string;
  } | null>(null);
  const customInputRef = useRef<HTMLInputElement>(null);

  const selectAmount = (value: number) => {
    setSelectedAmount(value);
    setMessage(null);
  };

  const selectQuickAmount = (value: number) => {
    setSelectedAmount(value);
    setCustomValue("");
    setMessage(null);
  };

  const onCustomChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 9);
    setCustomValue(digits);
    setSelectedAmount(digits ? Number(digits) : null);
    setMessage(null);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = selectedAmount;
    if (!amount || amount < 10) {
      setMessage({
        type: "error",
        text: "Please choose or enter a valid donation amount (minimum ₹10).",
      });
      return;
    }
    setMessage({
      type: "info",
      text: `Your donation of ${formatINR(
        amount
      )} is ready. Payment integration can be connected here.`,
    });
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

            <button type="submit" className={styles.donateButton}>
              Donate Now
              <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
            </button>

            <p className={styles.policyNotice}>
              Please review our{" "}
              <Link href="/refund-and-cancellation-policy/" className={styles.policyNoticeLink}>
                Refund &amp; Cancellation Policy
              </Link>{" "}
              before completing your payment.
            </p>

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
