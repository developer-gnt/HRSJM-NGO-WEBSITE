import Image from "next/image";
import {
  Target,
  Users,
  Network,
  FileText,
  ShieldCheck,
  Scale,
  UsersRound,
  Handshake,
  Sprout,
  Download,
  Info,
} from "lucide-react";
import styles from "./constitution.module.css";

const keyAreas = [
  {
    icon: Target,
    title: "Vision & Objectives",
    description: "Our mission, goals and long-term commitment to society.",
  },
  {
    icon: Users,
    title: "Membership",
    description: "Categories, eligibility and roles of members in the mission.",
  },
  {
    icon: Network,
    title: "Governance Structure",
    description:
      "Organizational setup, roles, responsibilities and decision-making process.",
  },
  {
    icon: FileText,
    title: "Rules & Regulations",
    description:
      "Guidelines for smooth functioning and disciplinary framework.",
  },
  {
    icon: ShieldCheck,
    title: "Rights & Responsibilities",
    description:
      "Commitments of the mission and its members towards human rights and social justice.",
  },
];

const corePrinciples = [
  {
    icon: Scale,
    title: "Justice",
    description: "Ensuring equal rights and fair opportunities for all.",
  },
  {
    icon: UsersRound,
    title: "Equality",
    description: "Promoting an inclusive society without discrimination.",
  },
  {
    icon: Handshake,
    title: "Human Dignity",
    description:
      "Respecting and protecting the rights and dignity of every individual.",
  },
  {
    icon: Sprout,
    title: "Social Harmony",
    description:
      "Building stronger communities through compassion and cooperation.",
  },
];

export default function ConstitutionPage() {
  return (
    <div className={styles.page}>
      {/* ── 1. Hero Banner: Our Constitution ────────────────────────── */}
      <section className={styles.hero} aria-label="Our Constitution banner">
        <div className={styles.heroBgLayer}>
          <Image
            src="/assets/constitution_hero.png"
            alt="Constitution of India book with judicial gavel and Indian tricolour"
            fill
            priority
            sizes="100vw"
            className={styles.heroBgImage}
          />
          <div className={styles.heroGradientOverlay} aria-hidden="true" />
        </div>

        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>ABOUT HRSJM</span>
            <h1 className={styles.heroHeading}>
              Our <span className={styles.heroGold}>Constitution</span>
            </h1>
            <p className={styles.heroText}>
              A guiding framework for a just, equal and compassionate society.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Foundation for a Fairer Society (Two-Column) ──────────── */}
      <section
        className={`${styles.section} ${styles.sectionWhite}`}
        aria-labelledby="foundation-heading"
      >
        <div className={styles.container}>
          <div className={styles.foundationGrid}>
            <div className={styles.foundationTextCol}>
              <h2 id="foundation-heading" className={styles.sectionHeading}>
                Foundation for a Fairer Society
              </h2>
              <div className={styles.sectionUnderline} aria-hidden="true" />
              <p className={styles.foundationCopy}>
                The Constitution of the Human Rights and Social Justice Mission
                (HRSJM) serves as the foundational document that defines our
                vision, objectives, governance structure, membership framework
                and the guiding principles that shape our work. It reflects our
                unwavering commitment to protect human rights, promote social
                justice and build a more inclusive and equitable society for all.
              </p>
            </div>

            <div className={styles.foundationImageCol}>
              <div className={styles.foundationImageWrap}>
                <Image
                  src="/assets/constitution_lady_justice.png"
                  alt="Dignified statue of Lady Justice holding the balanced scales of justice"
                  width={640}
                  height={420}
                  sizes="(max-width: 899px) 100vw, 480px"
                  className={styles.foundationImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Key Areas Covered in Our Constitution (5 Cards Row) ──── */}
      <section
        className={`${styles.section} ${styles.sectionCream}`}
        aria-labelledby="key-areas-heading"
      >
        <div className={styles.container}>
          <h2 id="key-areas-heading" className={styles.sectionHeading}>
            Key Areas Covered in Our Constitution
          </h2>
          <div className={styles.sectionUnderline} aria-hidden="true" />

          <div className={styles.keyAreasGrid}>
            {keyAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div key={area.title} className={styles.keyAreaCard}>
                  <div className={styles.keyAreaIconWrap} aria-hidden="true">
                    <Icon size={25} strokeWidth={1.85} />
                  </div>
                  <h3 className={styles.keyAreaTitle}>{area.title}</h3>
                  <p className={styles.keyAreaDesc}>{area.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Read Our Constitution (Document Section) ─────────────── */}
      <section
        className={`${styles.section} ${styles.sectionWhite}`}
        aria-labelledby="read-doc-heading"
      >
        <div className={styles.container}>
          <div className={styles.readDocGrid}>
            <div className={styles.readDocImageCol}>
              <div className={styles.readDocImageWrap}>
                <Image
                  src="/assets/constitution_book.png"
                  alt="Official Constitution of India book with the Indian flag and Parliament House in the background"
                  width={580}
                  height={450}
                  sizes="(max-width: 899px) 100vw, 440px"
                  className={styles.readDocImage}
                />
              </div>
            </div>

            <div className={styles.readDocContent}>
              <h2 id="read-doc-heading" className={styles.sectionHeading}>
                Read Our Constitution
              </h2>
              <div className={styles.sectionUnderline} aria-hidden="true" />

              <p className={styles.readDocCopy}>
                Our Constitution provides a clear framework for our principles,
                functions and governance, ensuring transparency, accountability
                and effective implementation of our mission. You can read or
                download the complete document below.
              </p>

              <div className={styles.readDocActions}>
                <a
                  href="/docs/HRSJM_Constitution.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnPrimary}
                  aria-label="View Constitution in PDF format in a new browser tab"
                >
                  <FileText size={17} strokeWidth={2.2} />
                  <span>View Constitution (PDF) →</span>
                </a>

                <a
                  href="/docs/HRSJM_Constitution.pdf"
                  download="HRSJM_Constitution.pdf"
                  className={styles.btnSecondary}
                  aria-label="Download Constitution PDF document"
                >
                  <Download size={17} strokeWidth={2.2} />
                  <span>Download PDF →</span>
                </a>
              </div>

              <div className={styles.infoStrip} role="note">
                <Info size={17} strokeWidth={2} aria-hidden="true" />
                <span>
                  The document is available in PDF format. Make sure you have a
                  PDF reader to open it.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Our Core Principles (4 Cards Row) ────────────────────── */}
      <section
        className={`${styles.section} ${styles.sectionCream}`}
        aria-labelledby="principles-heading"
      >
        <div className={styles.container}>
          <h2 id="principles-heading" className={styles.sectionHeading}>
            Our Core Principles
          </h2>
          <div className={styles.sectionUnderline} aria-hidden="true" />

          <div className={styles.principlesGrid}>
            {corePrinciples.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={styles.principleCard}>
                  <div
                    className={styles.principleIconWrap}
                    aria-hidden="true"
                  >
                    <Icon size={24} strokeWidth={1.85} />
                  </div>
                  <div className={styles.principleContent}>
                    <h3 className={styles.principleTitle}>{item.title}</h3>
                    <p className={styles.principleDesc}>{item.description}</p>
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
