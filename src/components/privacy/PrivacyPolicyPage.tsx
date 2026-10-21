import Image from "next/image";
import {
  User,
  FileText,
  CreditCard,
  BarChart3,
  Cookie,
  Settings,
  Heart,
  Mail,
  ShieldCheck,
  Users,
  Eye,
  FileEdit,
  Trash2,
  Shield,
  Sliders,
} from "lucide-react";
import styles from "./privacy.module.css";

const collectedInfo = [
  {
    icon: User,
    title: "Personal Information",
    description:
      "Name, contact details, address, date of birth and other details you provide.",
  },
  {
    icon: FileText,
    title: "Membership Information",
    description:
      "Details submitted during membership registration and related communications.",
  },
  {
    icon: CreditCard,
    title: "Donation Information",
    description:
      "Payment details and transaction information processed through secure payment gateways.",
  },
  {
    icon: BarChart3,
    title: "Usage Information",
    description:
      "Information about how you use our website, features and services.",
  },
  {
    icon: Cookie,
    title: "Cookies & Tracking Data",
    description:
      "Data collected through cookies and similar technologies to enhance your experience.",
  },
];

const usagePurposes = [
  {
    icon: Settings,
    text: "To process membership applications and manage member accounts.",
  },
  {
    icon: Heart,
    text: "To process and record donations and issue acknowledgments.",
  },
  {
    icon: Mail,
    text: "To communicate with you about our programs, events, updates and important information.",
  },
  {
    icon: ShieldCheck,
    text: "To ensure security, prevent fraud and comply with legal obligations.",
  },
  {
    icon: BarChart3,
    text: "To improve our website, services and user experience.",
  },
  {
    icon: Users,
    text: "To support our mission and activities for human rights and social justice.",
  },
];

const userRights = [
  {
    icon: Eye,
    title: "Access",
    description: "Request a copy of your personal information.",
  },
  {
    icon: FileEdit,
    title: "Correct",
    description: "Update or correct inaccurate information.",
  },
  {
    icon: Trash2,
    title: "Delete",
    description: "Request deletion of your personal information where applicable.",
  },
  {
    icon: Shield,
    title: "Restrict",
    description: "Limit or restrict the use of your information where applicable.",
  },
  {
    icon: Sliders,
    title: "Opt-Out",
    description: "Opt out of marketing communications at any time.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      {/* ── 1. Hero Banner: Privacy Policy ─────────────────────────── */}
      <section className={styles.hero} aria-label="Privacy Policy header">
        <div className={styles.heroBgLayer}>
          <Image
            src="/assets/privacy_hero.jpg"
            alt="Hands protecting a glowing digital security shield and padlock"
            fill
            priority
            sizes="100vw"
            className={styles.heroBgImage}
          />
          <div className={styles.heroGradientOverlay} aria-hidden="true" />
        </div>

        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroEyebrowGroup}>
              <span className={styles.heroEyebrow}>LEGAL</span>
              <span className={styles.heroEyebrowUnderline} aria-hidden="true" />
            </div>
            <h1 className={styles.heroHeading}>
              Privacy <span className={styles.heroGold}>Policy</span>
            </h1>
            <p className={styles.heroText}>
              Your privacy is important to us. Learn how we collect, use,
              protect and manage your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Our Commitment to Your Privacy (Two-Column) ─────────── */}
      <section
        className={`${styles.section} ${styles.sectionWhite}`}
        aria-labelledby="commitment-heading"
      >
        <div className={styles.container}>
          <div className={styles.commitmentGrid}>
            <div className={styles.commitmentTextCol}>
              <h2 id="commitment-heading" className={styles.sectionHeading}>
                Our Commitment to Your Privacy
              </h2>
              <div className={styles.sectionUnderline} aria-hidden="true" />
              <p className={styles.commitmentCopy}>
                The Human Rights and Social Justice Mission (HRSJM) is committed
                to protecting your personal information and respecting your
                privacy. This Privacy Policy explains how we collect, use,
                disclose and safeguard your information when you visit our
                website, apply for membership, make donations or engage with our
                programs and services.
              </p>
            </div>

            <div className={styles.commitmentImageCol}>
              <div className={styles.commitmentImageWrap}>
                <Image
                  src="/assets/privacy_laptop.jpg"
                  alt="Laptop showing digital security padlock and online privacy protection overlay"
                  width={640}
                  height={380}
                  sizes="(max-width: 899px) 100vw, 480px"
                  className={styles.commitmentImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Information We Collect (5 Cards Row) ─────────────────── */}
      <section
        className={`${styles.section} ${styles.sectionCream}`}
        aria-labelledby="collect-heading"
      >
        <div className={styles.container}>
          <h2 id="collect-heading" className={styles.sectionHeading}>
            Information We Collect
          </h2>
          <div className={styles.sectionUnderline} aria-hidden="true" />
          <p className={styles.sectionSubtext}>
            We may collect the following types of information to provide and
            improve our services:
          </p>

          <div className={styles.collectGrid}>
            {collectedInfo.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={styles.collectCard}>
                  <div className={styles.collectIconWrap} aria-hidden="true">
                    <Icon size={24} strokeWidth={1.85} />
                  </div>
                  <h3 className={styles.collectTitle}>{item.title}</h3>
                  <p className={styles.collectDesc}>{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. How We Use Your Information (6 Slim Rows in 2 Cols) ──── */}
      <section
        className={`${styles.section} ${styles.sectionWhite}`}
        aria-labelledby="use-heading"
      >
        <div className={styles.container}>
          <h2 id="use-heading" className={styles.sectionHeading}>
            How We Use Your Information
          </h2>
          <div className={styles.sectionUnderline} aria-hidden="true" />
          <p className={styles.sectionSubtext}>
            We use the information we collect for the following purposes:
          </p>

          <div className={styles.useGrid}>
            {usagePurposes.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className={styles.useRow}>
                  <div className={styles.useIconWrap} aria-hidden="true">
                    <Icon size={20} strokeWidth={1.85} />
                  </div>
                  <p className={styles.useText}>{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Your Rights (5 Compact Cards Row) ────────────────────── */}
      <section
        className={`${styles.section} ${styles.sectionCream}`}
        aria-labelledby="rights-heading"
      >
        <div className={styles.container}>
          <h2 id="rights-heading" className={styles.sectionHeading}>
            Your Rights
          </h2>
          <div className={styles.sectionUnderline} aria-hidden="true" />
          <p className={styles.sectionSubtext}>You have the right to:</p>

          <div className={styles.rightsGrid}>
            {userRights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={styles.rightCard}>
                  <div className={styles.rightIconWrap} aria-hidden="true">
                    <Icon size={18} strokeWidth={1.85} />
                  </div>
                  <div className={styles.rightContent}>
                    <h3 className={styles.rightTitle}>{item.title}</h3>
                    <p className={styles.rightDesc}>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
