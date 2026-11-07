"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  Award,
  Check,
  ChevronRight,
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
    id: "tier-1st-year",
    name: "1st Year Renewal",
    amount: "₹500",
    period: "/ 1st year",
    description: "Official renewal fee is equal for all registered members for their 1st year.",
    isPopular: true,
    features: [
      "Renew Invalid ID & Fresh ID Card",
      "Valid for 1 Full Year",
      "Official Member Assembly Rights",
      "Mission Certificate Renewal",
    ],
  },
  {
    id: "tier-2nd-year",
    name: "2nd Year Renewal",
    amount: "₹400",
    period: "/ 2nd year",
    description: "Concessionary fee for existing members completing their 2nd consecutive year.",
    features: [
      "Renew Invalid ID & Fresh ID Card",
      "Valid for 1 Year Extension",
      "Local & State Unit Participation",
      "Event & Assembly Access",
    ],
  },
  {
    id: "tier-3rd-year",
    name: "3rd Year Renewal",
    amount: "₹300",
    period: "/ 3rd year+",
    description: "Continuing loyalty rate of ₹300 for 3rd year and all subsequent renewal years.",
    features: [
      "Renew Invalid ID & Fresh ID Card",
      "Valid for 1 Year Extension",
      "Senior Volunteer Active Status",
      "Continuous Concessionary Rate",
    ],
  },
  {
    id: "tier-free",
    name: "Free Renewal Plan",
    amount: "Free",
    period: "Renewal (₹0)",
    description: "Special incentive plan: Earn 1 to 5 years free renewal by introducing new members!",
    features: [
      "100% Fee Exemption (₹0)",
      "1 to 5 Years Free Extension",
      "New Fresh ID Card Issued Every Time",
      "Process Anytime — No Waiting Needed",
    ],
  },
];

const referralTiers = [
  {
    category: "District Unit",
    referralRequired: "1 Person in District Unit",
    qualification: "10th Pass (10 TH)",
    reward: "1 Year",
    highlight: "1 Year Free Renewal",
  },
  {
    category: "State Unit",
    referralRequired: "1 Person in State Unit",
    qualification: "10th Pass (10 TH)",
    reward: "2 Years",
    highlight: "2 Years Free Renewal",
  },
  {
    category: "Lion, Counselor or Ambassador of State",
    referralRequired: "1 Person in (Lion, Counselor or Ambassador of State)",
    qualification: "12th Pass (12 TH)",
    reward: "3 Years",
    highlight: "3 Years Free Renewal",
  },
  {
    category: "Hon'ble State Director",
    referralRequired: "1 Person in Hon'ble State Director",
    qualification: "Graduates",
    reward: "4 Years",
    highlight: "4 Years Free Renewal",
  },
  {
    category: "National Council Cell",
    subCategory: "(Lawyers, Women or Minority)",
    referralRequired: "1 Person in National Council Cell",
    qualification: "Graduates",
    reward: "5 Years",
    highlight: "5 Years Free Renewal",
  },
];

export default function MembershipRenewPage() {
  const [selectedTier, setSelectedTier] = useState<string>("tier-1st-year");

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
                MEMBERSHIP RENEWAL &amp; FREE EXTENSION
              </p>
              <h1 id="renew-heading" className={styles.heroHeading}>
                Renew Your <span className={styles.heroHeadingGold}>Membership</span>
              </h1>
              <p className={styles.heroDescription}>
                Renew your invalid ID card, get a fresh official ID, and continue
                supporting the fight for human rights and social justice. Renewal fee
                is equal for all members, or earn up to 5 years free renewal by introducing new members!
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
              HRSJM renewal fee is equal for all members: 1st Year is ₹500, 2nd Year is ₹400,
              and 3rd Year onwards is ₹300. You can also qualify for 100% Free Renewal through referrals!
            </p>
          </div>

          {/* Lapsed Renewal Clarification Notice */}
          <div className={styles.noticeBox} role="alert">
            <AlertTriangle size={24} className={styles.noticeIcon} />
            <div>
              <h3 className={styles.noticeTitle}>
                Official Notice: Equal Renewal Fee &amp; Free Renewal Policy
              </h3>
              <p className={styles.noticeText}>
                Renewal fee is uniform for all existing members: <strong>1st Year: ₹500</strong>,{" "}
                <strong>2nd Year: ₹400</strong>, and <strong>3rd Year &amp; beyond: ₹300</strong>.
                Additionally, members can process renewal anytime without waiting for their expiry
                date by referring new candidates into official district, state, or national units.
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
                    {isSelected ? "Selected Option" : "Select Option"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Free Renewal by Referral Feature Section */}
          <section className={styles.freeRenewalSection} aria-labelledby="free-renewal-title">
            <div className={styles.freeRenewalBadge}>
              <Award size={15} /> Good News — Free Renewal Scheme
            </div>
            <h2 id="free-renewal-title" className={styles.freeRenewalHeading}>
              Renew Your Invalid ID &amp; Get Fresh ID Card{" "}
              <span className={styles.freeRenewalHeadingGold}>100% Free!</span>
            </h2>
            <p className={styles.freeRenewalSubheading}>
              Dear Member, you are welcome to renew for free! Introduce or refer new applicants
              to join HRSJM. Each time your referred applicant’s membership application is approved,
              your official membership renewal period is extended by 1 to 5 years and a fresh ID card
              is issued to you.
            </p>

            {/* 5 Referral Tiers Cards */}
            <div className={styles.freeTiersGrid}>
              {referralTiers.map((item, idx) => (
                <div key={item.category} className={styles.freeTierCard}>
                  <span className={styles.freeTierBadge}>Tier 0{idx + 1}</span>
                  <h3 className={styles.freeTierName}>
                    {item.category}
                    {item.subCategory && (
                      <span style={{ display: "block", fontSize: 11.5, color: "#94a3b8", fontWeight: 500 }}>
                        {item.subCategory}
                      </span>
                    )}
                  </h3>

                  <div className={styles.freeTierQualification}>
                    <span>Required Qualification:</span>
                    <span className={styles.freeTierQualTag}>{item.qualification}</span>
                  </div>

                  <div className={styles.freeTierReward}>
                    <span className={styles.freeTierYears}>{item.reward}</span>
                    <span className={styles.freeTierLabel}>Free Renewal</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Note for Free Renewal Policy */}
            <div className={styles.policyBox}>
              <h3 className={styles.policyTitle}>
                <Award size={18} /> Important Notes for Free Renewal Policy
              </h3>
              <ul className={styles.policyList}>
                <li className={styles.policyItem}>
                  <span className={styles.policyNumber}>1</span>
                  <div>
                    <strong>Process Anytime:</strong> There is no need to wait for your renewal period
                    to arrive. Free renewal can be processed anytime through member referrals.
                  </div>
                </li>
                <li className={styles.policyItem}>
                  <span className={styles.policyNumber}>2</span>
                  <div>
                    <strong>Unique 6-Digit Referral Code:</strong> All verified members receive their
                    exclusive 6-digit referral code in their dashboard. When new members apply using your
                    code, your ID is linked to theirs.
                  </div>
                </li>
                <li className={styles.policyItem}>
                  <span className={styles.policyNumber}>3</span>
                  <div>
                    <strong>Automatic Extension:</strong> As soon as the referred applicant’s membership
                    is approved by the governing body, your renewal period is automatically extended.
                  </div>
                </li>
                <li className={styles.policyItem}>
                  <span className={styles.policyNumber}>4</span>
                  <div>
                    <strong>Multiple Referrals &amp; Fresh ID:</strong> If you introduce new members
                    multiple times within a year, you receive a free renewal each time, and an updated ID
                    will be issued every time!
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <p
            style={{
              fontSize: 13,
              color: "#64748b",
              textAlign: "center",
              margin: "32px auto 0",
              maxWidth: 600,
            }}
          >
            Please review our{" "}
            <Link
              href="/refund-and-cancellation-policy/"
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
        </div>
      </main>
    </div>
  );
}
