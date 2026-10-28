"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HeartPulse,
  GraduationCap,
  CloudLightning,
  Home,
  Utensils,
  ArrowRight,
  CheckCircle2,
  Users,
  Heart,
  Handshake,
  X,
  Lock,
  Loader2,
  UserCheck,
} from "lucide-react";
import { launchCashfreeCheckout } from "@/lib/cashfreeCheckout";
import styles from "./donation.module.css";

interface CategorySelectionItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  activeCount: number;
}

const emergencySelectionCategories: CategorySelectionItem[] = [
  {
    id: "medical",
    title: "Medical Assistance",
    description: "Support for hospitalization, major operations and emergency medical needs.",
    icon: HeartPulse,
    activeCount: 12,
  },
  {
    id: "education",
    title: "Educational Assistance",
    description: "Help for school fees, college admissions, uniforms, books and learning needs.",
    icon: GraduationCap,
    activeCount: 8,
  },
  {
    id: "disaster",
    title: "Disaster Relief",
    description: "Emergency support during floods, storms, heavy rainfall, fires and other natural disasters.",
    icon: CloudLightning,
    activeCount: 15,
  },
  {
    id: "housing",
    title: "Housing & Rehabilitation",
    description: "Assistance for house damage, building collapse and rehabilitation of affected families.",
    icon: Home,
    activeCount: 10,
  },
  {
    id: "food",
    title: "Food & Essentials",
    description: "Support for food, clean water, daily essentials and basic survival needs.",
    icon: Utensils,
    activeCount: 18,
  },
  {
    id: "women-child",
    title: "Women & Child Support",
    description: "Assistance for women in crisis, child welfare, safety, education and rehabilitation.",
    icon: Users,
    activeCount: 14,
  },
];

interface CauseStats {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  themeClass: string;
  btnClass: string;
  iconWrapClass: string;
  arrowClass: string;
  icon: any;
  btnText: string;
  accentColor: string;
  badgeBg?: string;
  badgeBorder?: string;
  gradient?: string;
  goal: number;
  raised: number;
  donorCount: number;
  seekerName: string;
  seekerStory: string;
}

const initialEmergencyCategories: CauseStats[] = [
  {
    id: "medical",
    category: "Medical Assistance",
    title: "Medical Assistance",
    description:
      "Support for hospitalisation, major operations, critical illnesses and emergency medical treatment.",
    image: "/images/donation/emergency/emergency-medical.jpg",
    alt: "Medical assistance fund for life-saving critical care",
    themeClass: styles.cardMedical,
    btnClass: styles.btnCardMedical,
    iconWrapClass: styles.iconWrapMedical,
    arrowClass: styles.arrowCircleMedical,
    icon: HeartPulse,
    btnText: "Donate to Medical",
    accentColor: "#dc2626",
    badgeBg: "#fef2f2",
    badgeBorder: "#fecaca",
    gradient: "linear-gradient(90deg, #dc2626 0%, #ef4444 100%)",
    goal: 500000,
    raised: 0,
    donorCount: 0,
    seekerName: "HRSJM Medical Emergency Fund",
    seekerStory: "Emergency critical medical care and surgery aid for underprivileged citizens",
  },
  {
    id: "education",
    category: "Educational Assistance",
    title: "Educational Assistance",
    description:
      "Help for school fees, college admissions, uniforms, books, stationery and other learning needs.",
    image: "/images/donation/emergency/emergency-education.jpg",
    alt: "Students receiving educational sponsorship and supplies",
    themeClass: styles.cardEducation,
    btnClass: styles.btnCardEducation,
    iconWrapClass: styles.iconWrapEducation,
    arrowClass: styles.arrowCircleEducation,
    icon: GraduationCap,
    btnText: "Donate to Education",
    accentColor: "#2563eb",
    badgeBg: "#eff6ff",
    badgeBorder: "#dbeafe",
    gradient: "linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)",
    goal: 500000,
    raised: 0,
    donorCount: 0,
    seekerName: "HRSJM Educational Support Fund",
    seekerStory: "Sponsorship for fees, uniforms, and educational supplies for underprivileged students",
  },
  {
    id: "disaster",
    category: "Disaster Relief",
    title: "Disaster Relief",
    description:
      "Emergency support during floods, storms, heavy rainfall, fires and other natural or accidental disasters.",
    image: "/images/donation/emergency/emergency-disaster.jpg",
    alt: "Emergency disaster relief and victim rehabilitation",
    themeClass: styles.cardDisaster,
    btnClass: styles.btnCardDisaster,
    iconWrapClass: styles.iconWrapDisaster,
    arrowClass: styles.arrowCircleDisaster,
    icon: CloudLightning,
    btnText: "Donate to Disaster Relief",
    accentColor: "#d97706",
    badgeBg: "#fffbeb",
    badgeBorder: "#fde68a",
    gradient: "linear-gradient(90deg, #d97706 0%, #f59e0b 100%)",
    goal: 500000,
    raised: 0,
    donorCount: 0,
    seekerName: "HRSJM Disaster Relief Fund",
    seekerStory: "Emergency food kits, clean water, and rehabilitation for disaster-hit communities",
  },
  {
    id: "housing",
    category: "Housing & Rehabilitation",
    title: "Housing & Rehabilitation",
    description:
      "Assistance for house damage, building collapse and rehabilitation of affected families.",
    image: "/images/donation/emergency/emergency-housing.jpg",
    alt: "Housing damage assistance and family rehabilitation",
    themeClass: styles.cardHousing,
    btnClass: styles.btnCardHousing,
    iconWrapClass: styles.iconWrapHousing,
    arrowClass: styles.arrowCircleHousing,
    icon: Home,
    btnText: "Donate to Housing",
    accentColor: "#059669",
    badgeBg: "#ecfdf5",
    badgeBorder: "#a7f3d0",
    gradient: "linear-gradient(90deg, #059669 0%, #10b981 100%)",
    goal: 500000,
    raised: 0,
    donorCount: 0,
    seekerName: "HRSJM Housing Assistance Fund",
    seekerStory: "Shelter rebuilding and rehabilitation assistance for displaced and vulnerable families",
  },
];

const trustPillars = [
  {
    title: "Verified Cases",
    description: "Only genuine and verified requests",
    icon: CheckCircle2,
    badgeClass: styles.trustBadgeNavy,
  },
  {
    title: "Transparent Use",
    description: "Funds used only for intended purpose",
    icon: Users,
    badgeClass: styles.trustBadgeGold,
  },
  {
    title: "Real People",
    description: "Support individuals and families in need",
    icon: Heart,
    badgeClass: styles.trustBadgeBlue,
  },
  {
    title: "Stronger Communities",
    description: "Helping build a safer and more inclusive society",
    icon: Handshake,
    badgeClass: styles.trustBadgeAmber,
  },
];

const quickPills = [500, 1000, 2500, 5000, 10000];

const formatINR = (val: number) =>
  `₹${new Intl.NumberFormat("en-IN").format(Math.max(0, val))}`;

export default function EmergencyDonationSection() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("medical");
  const [categories, setCategories] = useState<CauseStats[]>(initialEmergencyCategories);
  const [activeModalCause, setActiveModalCause] = useState<CauseStats | null>(null);

  // Modal Form State
  const [modalAmount, setModalAmount] = useState<number>(1000);
  const [modalCustomAmount, setModalCustomAmount] = useState<string>("1000");
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. Fetch live database values from backend for each cause
  useEffect(() => {
    fetch("/api/donation/causes")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.items) && data.items.length > 0) {
          setCategories((prev) =>
            prev.map((cat) => {
              const dbItem = data.items.find(
                (item: any) =>
                  item.reason?.toLowerCase() === cat.category.toLowerCase() ||
                  item.reason?.toLowerCase().includes(cat.category.toLowerCase()) ||
                  cat.category.toLowerCase().includes(item.reason?.toLowerCase() || "")
              );
              if (dbItem) {
                const goalNum = Number(dbItem.requested_amount) || cat.goal;
                const dbRaised = Number(dbItem.raised_amount) || 0;
                return {
                  ...cat,
                  goal: goalNum,
                  raised: dbRaised > 0 ? dbRaised : cat.raised,
                  donorCount: Number(dbItem.donor_count) || cat.donorCount,
                  seekerName: dbItem.full_name || cat.seekerName,
                  seekerStory: dbItem.description || cat.seekerStory,
                };
              }
              return cat;
            })
          );
        }
      })
      .catch((err) => console.warn("Could not sync live causes from backend:", err));
  }, []);

  const openDonateModal = (cause: CauseStats) => {
    setActiveModalCause(cause);
    setModalAmount(1000);
    setModalCustomAmount("1000");
    setErrorMessage(null);
  };

  const closeDonateModal = () => {
    setActiveModalCause(null);
    setErrorMessage(null);
    setIsSubmitting(false);
  };

  const handleAmountSelect = (val: number) => {
    setModalAmount(val);
    setModalCustomAmount(String(val));
    setErrorMessage(null);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, "").slice(0, 8);
    setModalCustomAmount(clean);
    setModalAmount(clean ? Number(clean) : 0);
    setErrorMessage(null);
  };

  const handleModalDonate = async (e: FormEvent) => {
    e.preventDefault();
    if (!activeModalCause) return;

    const finalAmount = modalAmount || Number(modalCustomAmount);
    if (!finalAmount || finalAmount < 10) {
      setErrorMessage("Please enter a valid donation amount of at least ₹10.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const resolvedName = isAnonymous
      ? "Anonymous Donation from Website"
      : donorName.trim() || "Anonymous Donation from Website";

    const specificCause = `${activeModalCause.title}: ${activeModalCause.seekerStory} (Seeker: ${activeModalCause.seekerName})`;

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
          remark: `Donation from Website - ${activeModalCause.title}`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Failed to process donation. Please retry.");
        setIsSubmitting(false);
        return;
      }

      if (data.cashfreeOrder?.payment_session_id) {
        await launchCashfreeCheckout({
          paymentSessionId: data.cashfreeOrder.payment_session_id,
          redirectTarget: "_modal",
        });
      } else {
        setErrorMessage("Payment session could not be created. Please try again.");
        setIsSubmitting(false);
      }
    } catch (err: any) {
      console.error("Cause donation error:", err);
      setErrorMessage(err?.message || "Failed to initiate Cashfree payment gateway.");
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="emergency-support"
      className={styles.emergencySection}
      aria-labelledby="emergency-heading"
    >
      <div className={styles.container}>
        {/* ============================================================
            1. TOP HERO: Urgent Support for Real Needs
            ============================================================ */}
        <div className={styles.emergencyHeroGrid}>
          {/* Left Column: Heading & Text */}
          <div className={styles.emergencyHeroContent}>
            <div className={styles.emergencyEyebrowWrap}>
              <span className={styles.emergencyEyebrowBar} aria-hidden="true" />
              <span className={styles.emergencyEyebrow}>
                EMERGENCY &amp; HUMANITARIAN ASSISTANCE
              </span>
            </div>

            <h2 id="emergency-heading" className={styles.emergencyMainHeading}>
              Urgent Support<br />
              for <span className={styles.emergencyGoldText}>Real Needs</span>
            </h2>

            <p className={styles.emergencyDescription}>
              Your contribution can provide life-saving medical care, educational
              support, disaster relief and help families rebuild their homes.
              Together, we can stand with vulnerable communities in their most
              difficult times.
            </p>

            <Link href="/donation/emergency" className={styles.btnExploreEmergency}>
              Explore Emergency Cases
              <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
            </Link>
          </div>

          {/* Right Column: Montage Artwork */}
          <div className={styles.emergencyHeroMedia}>
            <div className={styles.emergencyMontageImageWrap}>
              <Image
                src="/images/donation/emergency/emergency-montage-hd.jpg"
                alt="Urgent Support for Real Needs - Humanitarian assistance montage showing medical care, education, flood rescue and child hope"
                fill
                quality={96}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={styles.emergencyMontageImg}
                priority
              />
            </div>
          </div>
        </div>

        {/* ============================================================
            2. CATEGORY SELECTION: 6 Clean Cards matching Image 1
            ============================================================ */}
        <div className={styles.categorySelectSection}>
          <div className={styles.headingGoldBar} aria-hidden="true" />
          <h2 className={styles.categorySelectTitle}>Select a Category</h2>
          <p className={styles.categorySelectSubtitle}>
            Choose a category to view and support active cases.
          </p>

          <div id="emergency-categories" className={styles.emergencyCategoriesGrid}>
            {emergencySelectionCategories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategoryId === cat.id;

              return (
                <Link
                  key={cat.id}
                  href={`/donation/emergency?category=${cat.id}#explore-categories`}
                  scroll={false}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`${styles.categoryCard} ${
                    isSelected ? styles.categoryCardActive : ""
                  }`}
                >
                  <div className={styles.catIconWrap} aria-hidden="true">
                    <Icon size={24} strokeWidth={2.2} />
                  </div>

                  <h3 className={styles.catTitle}>{cat.title}</h3>
                  <p className={styles.catDescription}>{cat.description}</p>

                  <div className={styles.catBottomRow}>
                    <span className={styles.catActiveCount}>
                      {cat.activeCount} active cases
                    </span>
                    <span className={styles.catArrowCircle} aria-hidden="true">
                      <ArrowRight size={14} strokeWidth={2.6} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ============================================================
            3. BOTTOM TRUST & TRANSPARENCY CARD
            ============================================================ */}
        <div className={styles.emergencyTrustCard}>
          <div className={styles.emergencyTrustGrid}>
            {trustPillars.map((pillar) => {
              const PillarIcon = pillar.icon;
              return (
                <div key={pillar.title} className={styles.trustItem}>
                  <div className={pillar.badgeClass} aria-hidden="true">
                    <PillarIcon size={24} strokeWidth={2.4} />
                  </div>
                  <div className={styles.trustText}>
                    <h4 className={styles.trustTitle}>{pillar.title}</h4>
                    <p className={styles.trustDesc}>{pillar.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================
          4. DEDICATED SEPARATE CAUSE PAYMENT MODAL (CASHFREE INTEGRATED)
          ============================================================ */}
      {activeModalCause && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(6, 42, 79, 0.65)",
            backdropFilter: "blur(5px)",
            display: "grid",
            placeItems: "center",
            padding: "16px",
          }}
          onClick={closeDonateModal}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              background: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
              overflow: "hidden",
              border: "1px solid #e2e8f0",
              animation: "fadeIn 200ms ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #0b2545 0%, #133a6b 100%)",
                color: "#ffffff",
                padding: "20px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span
                    style={{
                      background: "rgba(250, 210, 92, 0.2)",
                      color: "#ffd97e",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {activeModalCause.category.toUpperCase()}
                  </span>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)" }}>
                    Verified Seeker Need
                  </span>
                </div>
                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#ffffff" }}>
                  {activeModalCause.title}
                </h3>
                <p style={{ margin: "4px 0 0 0", fontSize: "12.5px", color: "rgba(255,255,255,0.85)" }}>
                  Beneficiary: <strong>{activeModalCause.seekerName}</strong> · {activeModalCause.seekerStory}
                </p>
              </div>

              <button
                type="button"
                onClick={closeDonateModal}
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
                aria-label="Close donation modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleModalDonate} style={{ padding: "20px 24px" }}>
              {/* Progress Bar Summary in Modal */}
              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  marginBottom: "20px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", fontWeight: 700, color: "#0f172a" }}>
                  <span>Raised: {formatINR(activeModalCause.raised)}</span>
                  <span>Goal: {formatINR(activeModalCause.goal)}</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "6px",
                    background: "#e2e8f0",
                    borderRadius: "999px",
                    overflow: "hidden",
                    margin: "8px 0 4px",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.min(100, Math.round((activeModalCause.raised / (activeModalCause.goal || 1)) * 100))}%`,
                      height: "100%",
                      background: activeModalCause.gradient || activeModalCause.accentColor,
                    }}
                  />
                </div>
              </div>

              {/* Amount Selection */}
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                Select Donation Amount
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", marginBottom: "12px" }}>
                {quickPills.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleAmountSelect(val)}
                    style={{
                      padding: "8px 4px",
                      borderRadius: "8px",
                      border: modalAmount === val ? `2px solid ${activeModalCause.accentColor}` : "1px solid #cbd5e1",
                      background: modalAmount === val ? (activeModalCause.badgeBg || "#fef3c7") : "#ffffff",
                      color: modalAmount === val ? activeModalCause.accentColor : "#1e293b",
                      fontWeight: 700,
                      fontSize: "13px",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    ₹{val}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div style={{ marginBottom: "18px" }}>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Or enter custom amount in ₹"
                  value={modalCustomAmount}
                  onChange={handleCustomChange}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "14px",
                    color: "#0f172a",
                    fontWeight: 600,
                    outline: "none",
                  }}
                />
              </div>

              {/* Donor Inputs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    placeholder={isAnonymous ? "Anonymous" : "Your name"}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "13px",
                      background: isAnonymous ? "#f1f5f9" : "#ffffff",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "13px",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>
                  Email Address (For Tax Receipt)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "13px",
                  }}
                />
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px", color: "#475569", marginBottom: "18px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                Keep donation anonymous on public lists
              </label>

              {errorMessage && (
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "8px",
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    color: "#b91c1c",
                    fontSize: "12.5px",
                    marginBottom: "16px",
                  }}
                >
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  minHeight: "48px",
                  borderRadius: "8px",
                  background: "linear-gradient(100deg, #b88916 0%, #ffd97e 100%)",
                  color: "#0b2545",
                  fontSize: "15px",
                  fontWeight: 800,
                  border: "none",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 6px 18px rgba(184, 137, 22, 0.35)",
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Connecting to Cashfree...
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Donate {formatINR(modalAmount || 0)} with Cashfree Secure Checkout
                  </>
                )}
              </button>

              <div style={{ textAlign: "center", marginTop: "12px", fontSize: "11px", color: "#64748b" }}>
                🔒 256-Bit SSL Encrypted · Instant 80G Receipt Voucher Generated
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
