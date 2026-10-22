import Image from "next/image";
import {
  Globe,
  User,
  Users,
  FileText,
  Lock,
  Shield,
  AlertCircle,
} from "lucide-react";
import styles from "./terms.module.css";

const keyTerms = [
  {
    icon: Globe,
    title: "Use of Website",
    description:
      "The content on this website is for general information and lawful use only.",
  },
  {
    icon: User,
    title: "Membership",
    description:
      "Membership is subject to eligibility criteria and approval by HRSJM.",
  },
  {
    icon: Users,
    title: "Donations",
    description:
      "Donations are voluntary and non-refundable unless specified otherwise.",
  },
  {
    icon: FileText,
    title: "Intellectual Property",
    description:
      "All content, logos and materials on this website are the property of HRSJM.",
  },
];

const userResponsibilities = [
  {
    icon: User,
    text: "Provide accurate and complete information.",
  },
  {
    icon: Lock,
    text: "Not engage in any activity that may harm or disrupt the website or our services.",
  },
  {
    icon: Shield,
    text: "Use the website for lawful purposes only.",
  },
  {
    icon: FileText,
    text: "Not misuse, copy or distribute our content without prior permission.",
  },
  {
    icon: Users,
    text: "Respect the rights and dignity of others.",
  },
  {
    icon: AlertCircle,
    text: "Comply with all applicable laws and regulations.",
  },
];

export default function TermsPage() {
  return (
    <div className={styles.page}>
      {/* ── 1. Hero Banner: Terms & Conditions ─────────────────────── */}
      <section className={styles.hero} aria-label="Terms and Conditions header">
        <div className={styles.heroBgLayer}>
          <Image
            src="/assets/terms_hero.png"
            alt="Wooden judge's gavel and golden scales of justice on polished mahogany table"
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
              Terms &amp; <span className={styles.heroGold}>Conditions</span>
            </h1>
            <p className={styles.heroText}>
              Please read these terms and conditions carefully before using our
              website or accessing our services.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Introduction (Two-Column) ────────────────────────────── */}
      <section
        className={`${styles.section} ${styles.sectionWhite}`}
        aria-labelledby="intro-heading"
      >
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <div className={styles.introTextCol}>
              <h2 id="intro-heading" className={styles.sectionHeading}>
                Introduction
              </h2>
              <div className={styles.sectionUnderline} aria-hidden="true" />
              <p className={styles.introCopy}>
                Welcome to the website of the Human Rights and Social Justice
                Mission (HRSJM). By accessing or using our website, services or
                programs, you agree to be bound by these Terms and Conditions.
                Please read them carefully.
              </p>
            </div>

            <div className={styles.introImageCol}>
              <div className={styles.introImageWrap}>
                <Image
                  src="/assets/terms_document.png"
                  alt="Printed Terms and Conditions legal document with pen on a desk"
                  width={640}
                  height={380}
                  sizes="(max-width: 899px) 100vw, 480px"
                  className={styles.introImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Key Terms (4 Cards Row) ──────────────────────────────── */}
      <section
        className={`${styles.section} ${styles.sectionCream}`}
        aria-labelledby="key-terms-heading"
      >
        <div className={styles.container}>
          <h2 id="key-terms-heading" className={styles.sectionHeading}>
            Key Terms
          </h2>
          <div className={styles.sectionUnderline} aria-hidden="true" />
          <p className={styles.sectionSubtext}>
            These terms govern your use of our website and services:
          </p>

          <div className={styles.keyTermsGrid}>
            {keyTerms.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={styles.keyTermCard}>
                  <div className={styles.keyTermIconWrap} aria-hidden="true">
                    <Icon size={24} strokeWidth={1.85} />
                  </div>
                  <h3 className={styles.keyTermTitle}>{item.title}</h3>
                  <p className={styles.keyTermDesc}>{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. User Responsibilities (6 Slim Rows in 2 Columns) ─────── */}
      <section
        className={`${styles.section} ${styles.sectionWhite}`}
        aria-labelledby="responsibilities-heading"
      >
        <div className={styles.container}>
          <h2 id="responsibilities-heading" className={styles.sectionHeading}>
            User Responsibilities
          </h2>
          <div className={styles.sectionUnderline} aria-hidden="true" />
          <p className={styles.sectionSubtext}>
            When using our website, you agree to:
          </p>

          <div className={styles.responsibilitiesGrid}>
            {userResponsibilities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className={styles.responsibilityRow}>
                  <div
                    className={styles.responsibilityIconWrap}
                    aria-hidden="true"
                  >
                    <Icon size={20} strokeWidth={1.85} />
                  </div>
                  <p className={styles.responsibilityText}>{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Limitation of Liability (Two-Column) ─────────────────── */}
      <section
        className={`${styles.section} ${styles.sectionCream}`}
        aria-labelledby="liability-heading"
      >
        <div className={styles.container}>
          <div className={styles.liabilityGrid}>
            <div className={styles.liabilityTextCol}>
              <h2 id="liability-heading" className={styles.sectionHeading}>
                Limitation of Liability
              </h2>
              <div className={styles.sectionUnderline} aria-hidden="true" />
              <p className={styles.liabilityCopy}>
                HRSJM shall not be liable for any direct, indirect, incidental
                or consequential damages arising from the use of our website or
                services. We do not guarantee uninterrupted or error-free access
                to our website.
              </p>
            </div>

            <div className={styles.liabilityImageCol}>
              <div className={styles.liabilityImageWrap}>
                <Image
                  src="/assets/terms_liability.png"
                  alt="Professional legal concept showing interaction with digital justice and scales of law interface"
                  width={640}
                  height={420}
                  sizes="(max-width: 899px) 100vw, 480px"
                  className={styles.liabilityImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
