"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronRight,
  HelpCircle,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";
import styles from "./renew.module.css";

interface RenewalTier {
  id: string;
  name: string;
  amount: string;
  period: string;
  description: string;
  isPopular?: boolean;
  features: string[];
}

const renewalTiers: RenewalTier[] = [
  {
    id: "tier-500",
    name: "Tier 1 Renewal",
    amount: "₹500",
    period: "/ year",
    description: "Standard active annual renewal for registered members and state coordinators.",
    isPopular: true,
    features: [
      "Digital ID Card Renewal",
      "Valid for 1 Year",
      "Voting & Assembly Rights",
      "Mission Certificate Renewal",
    ],
  },
  {
    id: "tier-400",
    name: "Tier 2 Renewal",
    amount: "₹400",
    period: "/ year",
    description: "Community & district active member annual renewal option.",
    features: [
      "Digital ID Card Renewal",
      "Valid for 1 Year",
      "Local Unit Participation",
      "Event Access",
    ],
  },
  {
    id: "tier-300",
    name: "Tier 3 Renewal",
    amount: "₹300",
    period: "/ year",
    description: "Concessionary renewal tier for student and grassroots community workers.",
    features: [
      "Digital ID Card Renewal",
      "Valid for 1 Year",
      "Grassroots Volunteer Status",
      "Newsletter & Bulletins",
    ],
  },
  {
    id: "tier-free",
    name: "Honorary Renewal",
    amount: "Free",
    period: "Renewal (₹0)",
    description: "Special exemption tier for designated honorary patrons and life coordinators.",
    features: [
      "Exempt from Annual Fees",
      "Subject to Committee Approval",
      "Honorary Active Status",
      "Direct Board Liaison",
    ],
  },
];

export default function MembershipRenewPage() {
  const [memberIdQuery, setMemberIdQuery] = useState("");
  const [lookupResult, setLookupResult] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string>("tier-500");

  const handleLookup = (e: FormEvent) => {
    e.preventDefault();
    if (!memberIdQuery.trim()) return;

    setLookupResult(
      `Lookup initiated for ${memberIdQuery.trim().toUpperCase()}. Official membership records database verification is pending client credentials. Please contact the membership administration desk with this ID to complete verification.`
    );
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero} aria-labelledby="renew-heading">
        <Image
          src="/membership/membership-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroBg}
        />
        <div className={styles.heroGradient} aria-hidden="true" />

        <div className={styles.container}>
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" />
              <Link href="/membership">Membership</Link>
              <ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" />
              <span className={styles.breadcrumbCurrent} aria-current="page">
                Renew Membership
              </span>
            </nav>

            <div className={styles.heroContent}>
              <p className={styles.heroEyebrow}>
                <span className={styles.heroEyebrowSquare} aria-hidden="true" />
                MEMBERSHIP RENEWAL
              </p>
              <h1 id="renew-heading" className={styles.heroHeading}>
                Renew Your <span className={styles.heroHeadingGold}>Membership</span>
              </h1>
              <p className={styles.heroDescription}>
                Maintain your active membership status, renew your official ID
                card, and continue supporting the struggle for human rights and
                social justice across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Select Your Renewal Option</h2>
            <p className={styles.sectionSubtitle}>
              HRSJM offers tiered annual renewal options based on member
              category and designation. Select the tier applicable to your post.
            </p>
          </div>

          {/* Lapsed Renewal Clarification Notice */}
          <div className={styles.noticeBox} role="alert">
            <AlertTriangle size={24} className={styles.noticeIcon} />
            <div>
              <h3 className={styles.noticeTitle}>
                Notice Regarding Lapsed-Renewal Balance Rules &amp; Tier Eligibility
              </h3>
              <p className={styles.noticeText}>
                Renewal tier assignment and any lapsed-renewal arrears or balance
                calculations are subject to official eligibility confirmation by
                the HRSJM governing body. If your membership validity has expired
                by more than 90 days, please check your record below or contact the
                central administrative desk to confirm your exact renewal fee.
              </p>
            </div>
          </div>

          {/* Renewal Tiers Grid */}
          <div className={styles.tiersGrid}>
            {renewalTiers.map((tier) => {
              const isSelected = selectedTier === tier.id;
              return (
                <div
                  key={tier.id}
                  className={`${styles.tierCard} ${
                    tier.isPopular ? styles.tierCardPopular : ""
                  }`}
                >
                  {tier.isPopular && (
                    <span className={styles.popularBadge}>Most Common</span>
                  )}
                  <div className={styles.tierHeader}>
                    <h3 className={styles.tierName}>{tier.name}</h3>
                    <div className={styles.tierFeeRow}>
                      <span className={styles.tierAmount}>{tier.amount}</span>
                      <span className={styles.tierPeriod}>{tier.period}</span>
                    </div>
                  </div>

                  <p className={styles.tierDescription}>{tier.description}</p>

                  <ul className={styles.tierFeatures}>
                    {tier.features.map((feat) => (
                      <li key={feat} className={styles.tierFeatureItem}>
                        <Check size={14} className={styles.checkIcon} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`${styles.tierBtn} ${
                      isSelected ? styles.tierBtnActive : ""
                    }`}
                    onClick={() => setSelectedTier(tier.id)}
                  >
                    {isSelected ? "Selected Tier" : "Select Tier"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Member ID Lookup */}
          <div className={styles.lookupCard}>
            <h3 className={styles.lookupTitle}>Verify Member Status for Renewal</h3>
            <p className={styles.lookupSubtitle}>
              Enter your Membership ID or registered mobile number to check
              applicable renewal dues and lapsed validity balance.
            </p>

            <form onSubmit={handleLookup}>
              <div className={styles.lookupInputGroup}>
                <input
                  type="text"
                  placeholder="Enter Membership ID (e.g. HRSJM-2024-XXXXXX)"
                  value={memberIdQuery}
                  onChange={(e) => setMemberIdQuery(e.target.value)}
                  className={styles.lookupInput}
                />
                <button type="submit" className={styles.btnGold}>
                  <Search size={16} /> Check Status
                </button>
              </div>
            </form>

            {lookupResult && (
              <div
                style={{
                  marginTop: 18,
                  padding: 14,
                  borderRadius: 8,
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  color: "#166534",
                  fontSize: 13,
                  lineHeight: 1.45,
                }}
              >
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <ShieldCheck size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>{lookupResult}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
