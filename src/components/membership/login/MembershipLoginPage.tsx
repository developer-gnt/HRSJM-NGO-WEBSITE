"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  KeyRound,
  Lock,
  Phone,
  Shield,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import styles from "./login.module.css";

export default function MembershipLoginPage() {
  const [membershipId, setMembershipId] = useState("");
  const [verificationMethod, setVerificationMethod] = useState<"otp" | "password">("otp");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [memberData, setMemberData] = useState<any | null>(null);

  const handleSendOtpOrLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatusMessage(null);

    if (!membershipId.trim()) {
      setError("Please enter your Membership ID or Application Reference.");
      return;
    }

    if (verificationMethod === "otp" && !mobile.trim()) {
      setError("Please enter your registered 10-digit mobile number.");
      return;
    }

    if (verificationMethod === "password" && !password.trim()) {
      setError("Please enter your account password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/membership/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          membershipId,
          verificationMethod,
          mobile,
          otp: otpSent ? otp : undefined,
          password: verificationMethod === "password" ? password : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Authentication failed. Please verify your details.");
        return;
      }

      if (data.otpSent) {
        setOtpSent(true);
        setStatusMessage(data.message);
      } else if (data.authenticated) {
        setMemberData(data);
        setStatusMessage("Member authenticated successfully.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error connecting to verification service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero} aria-labelledby="login-heading">
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
                Member Login
              </span>
            </nav>

            <div className={styles.heroContent}>
              <p className={styles.heroEyebrow}>
                <span className={styles.heroEyebrowSquare} aria-hidden="true" />
                MEMBERS PORTAL
              </p>
              <h1 id="login-heading" className={styles.heroHeading}>
                Member <span className={styles.heroHeadingGold}>Login</span>
              </h1>
              <p className={styles.heroDescription}>
                Access your HRSJM membership credentials, view your digital
                identity card, renewal dates, and official notices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Login Card */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.cardContainer}>
            <div className={styles.loginHeader}>
              <div className={styles.shieldIconWrap}>
                <ShieldCheck size={28} strokeWidth={2.2} />
              </div>
              <h2 className={styles.loginTitle}>Secure Member Verification</h2>
              <p className={styles.loginSubtitle}>
                Protected access using your Membership ID and two-factor verification
              </p>
            </div>

            <div className={styles.securityNotice}>
              <Shield size={18} strokeWidth={2.2} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong>Notice:</strong> For data confidentiality, member records
                require dual verification. Do not share your Membership ID or OTP
                with anyone.
              </div>
            </div>

            {memberData ? (
              <div className={styles.portalCard}>
                <div className={styles.portalCardHeader}>
                  <CheckCircle2 size={20} />
                  <span>Membership Record Verified</span>
                </div>
                <div className={styles.portalDetailRow}>
                  <span className={styles.portalDetailLabel}>Member Name:</span>
                  <span className={styles.portalDetailValue}>
                    {memberData.memberName}
                  </span>
                </div>
                <div className={styles.portalDetailRow}>
                  <span className={styles.portalDetailLabel}>Membership ID:</span>
                  <span className={styles.portalDetailValue}>
                    {memberData.membershipId}
                  </span>
                </div>
                <div className={styles.portalDetailRow}>
                  <span className={styles.portalDetailLabel}>Post / Tier:</span>
                  <span className={styles.portalDetailValue}>
                    {memberData.packageName}
                  </span>
                </div>
                <div className={styles.portalDetailRow}>
                  <span className={styles.portalDetailLabel}>Status:</span>
                  <span className={styles.portalDetailValue}>
                    {memberData.status.toUpperCase()}
                  </span>
                </div>

                <div style={{ marginTop: 20, textAlign: "center" }}>
                  <Link href="/membership/renew" className={styles.btnGold}>
                    Check Renewal Options
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendOtpOrLogin} noValidate>
                {/* Membership ID */}
                <div className={styles.formField}>
                  <label htmlFor="login-membership-id" className={styles.fieldLabel}>
                    Membership ID / Application Ref <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>
                      <KeyRound size={17} strokeWidth={2} />
                    </span>
                    <input
                      id="login-membership-id"
                      type="text"
                      placeholder="e.g. HRSJM-2024-XXXXXX or Member ID"
                      value={membershipId}
                      onChange={(e) => setMembershipId(e.target.value)}
                      className={styles.inputField}
                      autoCapitalize="characters"
                    />
                  </div>
                </div>

                {/* Verification Method Tabs */}
                <div className={styles.methodSelector}>
                  <button
                    type="button"
                    className={`${styles.methodBtn} ${
                      verificationMethod === "otp" ? styles.methodBtnActive : ""
                    }`}
                    onClick={() => {
                      setVerificationMethod("otp");
                      setOtpSent(false);
                      setError(null);
                    }}
                  >
                    <Phone size={15} /> Mobile OTP
                  </button>
                  <button
                    type="button"
                    className={`${styles.methodBtn} ${
                      verificationMethod === "password" ? styles.methodBtnActive : ""
                    }`}
                    onClick={() => {
                      setVerificationMethod("password");
                      setOtpSent(false);
                      setError(null);
                    }}
                  >
                    <Lock size={15} /> Password
                  </button>
                </div>

                {/* OTP Method */}
                {verificationMethod === "otp" && (
                  <>
                    <div className={styles.formField}>
                      <label htmlFor="login-mobile" className={styles.fieldLabel}>
                        Registered Mobile Number <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <div className={styles.inputWrapper}>
                        <span className={styles.inputIcon}>
                          <Phone size={17} strokeWidth={2} />
                        </span>
                        <input
                          id="login-mobile"
                          type="tel"
                          maxLength={10}
                          placeholder="10-digit registered number"
                          value={mobile}
                          onChange={(e) =>
                            setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                          }
                          className={styles.inputField}
                          disabled={otpSent}
                        />
                      </div>
                    </div>

                    {otpSent && (
                      <div className={styles.formField}>
                        <label htmlFor="login-otp" className={styles.fieldLabel}>
                          Enter 6-Digit OTP <span style={{ color: "#dc2626" }}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <span className={styles.inputIcon}>
                            <ShieldCheck size={17} strokeWidth={2} />
                          </span>
                          <input
                            id="login-otp"
                            type="text"
                            maxLength={6}
                            placeholder="Enter 6-digit OTP (Test OTP: 123456)"
                            value={otp}
                            onChange={(e) =>
                              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                            }
                            className={styles.inputField}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Password Method */}
                {verificationMethod === "password" && (
                  <div className={styles.formField}>
                    <label htmlFor="login-password" className={styles.fieldLabel}>
                      Member Password <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                      <span className={styles.inputIcon}>
                        <Lock size={17} strokeWidth={2} />
                      </span>
                      <input
                        id="login-password"
                        type="password"
                        placeholder="Enter your account password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.inputField}
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <div className={styles.fieldError}>
                    <AlertCircle size={14} />
                    <span>{error}</span>
                  </div>
                )}

                {statusMessage && !error && (
                  <div
                    style={{
                      fontSize: 12.5,
                      color: "#166534",
                      background: "#f0fdf4",
                      padding: "8px 12px",
                      borderRadius: 6,
                      marginBottom: 16,
                    }}
                  >
                    {statusMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className={styles.btnGold}
                  disabled={loading}
                  style={{ marginTop: 12 }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Verifying...
                    </>
                  ) : verificationMethod === "otp" && !otpSent ? (
                    <>
                      Send Verification Code <ArrowRight size={16} />
                    </>
                  ) : (
                    <>
                      Verify &amp; Login <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}

            <div className={styles.loginFooter}>
              <span>Not a member yet?</span>
              <Link href="/membership/apply">Apply for Membership</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
