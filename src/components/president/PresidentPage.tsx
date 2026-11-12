import React from "react";
import Icon, { type IconName } from "@/components/ui/Icon";
import styles from "./president.module.css";

const WHATSAPP_PHONE = "917021057853";
const WHATSAPP_DEFAULT_MESSAGE =
  "Hello HRSJM Team, I am interested in becoming a District / State President. Please share the eligibility criteria, appointment process, and next steps.";

export const WHATSAPP_ENQUIRY_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  WHATSAPP_DEFAULT_MESSAGE
)}`;

interface StepItem {
  step: number;
  icon: IconName | "network";
  title: string;
  description: string;
}

const appointmentSteps: StepItem[] = [
  {
    step: 1,
    icon: "users",
    title: "Form a 25-Member District / State Unit",
    description:
      "Form a team of 25 members for your respective district or state under the banner of HRSJM.",
  },
  {
    step: 2,
    icon: "network",
    title: "Constitute the Organisational Team",
    description:
      "The proposed unit shall consist of the following 25 positions.",
  },
  {
    step: 3,
    icon: "fileText",
    title: "Submit Your Proposal",
    description:
      "Submit the proposed team's details to the HRSJM National Administration Office for review and verification.",
  },
  {
    step: 4,
    icon: "shieldCheck",
    title: "Obtain Official Approval",
    description:
      "Appointments are subject to verification and approval by the competent HRSJM National Body.",
  },
];

interface PositionItem {
  number: number;
  title: string;
  note?: string;
}

const positionsColumn1: PositionItem[] = [
  { number: 1, title: "President" },
  { number: 2, title: "Executive President" },
  { number: 3, title: "Deputy Executive President" },
  { number: 4, title: "Vice President" },
  { number: 5, title: "Deputy Vice President" },
  { number: 6, title: "Chief Secretary" },
  { number: 7, title: "Deputy Chief Secretary" },
  { number: 8, title: "Joint Secretary" },
  { number: 9, title: "Chief Observer" },
];

const positionsColumn2: PositionItem[] = [
  { number: 10, title: "Deputy Chief Observer" },
  { number: 11, title: "Chief Reporting Officer" },
  { number: 12, title: "Deputy Reporting Officer" },
  { number: 13, title: "Chief Coordinator" },
  { number: 14, title: "Deputy Chief Coordinator" },
  {
    number: 15,
    title: "Minority Welfare Secretary",
    note: "Reserved for a minority-community representative",
  },
  {
    number: 16,
    title: "Women Empowerment Secretary",
    note: "Reserved for a female candidate",
  },
  { number: 17, title: "Social Welfare Secretary" },
];

const positionsColumn3: PositionItem[] = [
  { number: 18, title: "Consumer Welfare Secretary" },
  { number: 19, title: "Human Welfare Secretary" },
  { number: 20, title: "Administrative Secretary" },
  { number: 21, title: "Deputy Administrative Secretary" },
  { number: 22, title: "Information Secretary" },
  { number: 23, title: "Organising Secretary" },
  {
    number: 24,
    title: "Legal Advisor",
    note: "Reserved for a qualified Advocate",
  },
  { number: 25, title: "Deputy Legal Advisor" },
];

interface ExpectationItem {
  icon: IconName | "handshake";
  heading: string;
  description: string;
}

const expectations: ExpectationItem[] = [
  {
    icon: "users",
    heading: "Build a Strong Team",
    description: "Form and guide a dedicated 25-member unit.",
  },
  {
    icon: "handshake",
    heading: "Serve Your Community",
    description: "Work for human rights, social justice and public welfare.",
  },
  {
    icon: "shieldCheck",
    heading: "Promote Organisational Values",
    description: "Uphold the mission and principles of HRSJM.",
  },
  {
    icon: "megaphone",
    heading: "Drive Awareness",
    description:
      "Create awareness about rights, justice and dignity at the grassroots level.",
  },
  {
    icon: "chartNoAxesCombined",
    heading: "Work Collaboratively",
    description:
      "Coordinate with the National Body and other units for greater impact.",
  },
];

function RenderIcon({ name }: { name: IconName | "network" | "handshake" }) {
  if (name === "network") {
    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="9" y="2" width="6" height="5" rx="1" />
        <rect x="2" y="17" width="6" height="5" rx="1" />
        <rect x="16" y="17" width="6" height="5" rx="1" />
        <path d="M12 7v5" />
        <path d="M5 12h14" />
        <path d="M5 12v5" />
        <path d="M19 12v5" />
      </svg>
    );
  }

  if (name === "handshake") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2.6-2.6" />
        <path d="m18 10 1.8-1.8a2.5 2.5 0 0 0 0-3.5 2.5 2.5 0 0 0-3.5 0L14.5 6.5" />
        <path d="m2 14 6 6" />
        <path d="M3 8a2.5 2.5 0 0 1 3.5 0L9 10.5" />
        <path d="m7 12 5-5" />
      </svg>
    );
  }

  return <Icon name={name} />;
}

export default function PresidentPage() {
  return (
    <article className={styles.page}>
      {/* 1. Leadership Hero Banner */}
      <section className={styles.heroBanner} aria-label="Leadership Hero Banner">
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>LEADERSHIP FOR A JUST SOCIETY</p>
            <h1 className={styles.heroHeading}>
              How to Become a
              <br />
              <span className={styles.goldText}>District / State President</span>
            </h1>
            <p className={styles.heroTagline}>
              Take Leadership. Build Your Team. Serve Humanity. Fight for Justice
              and Dignity.
            </p>
          </div>
        </div>
        <div
          className={styles.heroVisualMobile}
          role="img"
          aria-label="Human rights leadership illustration with civic assembly and unity"
        />
      </section>

      {/* 2. Leadership Introduction Section */}
      <section
        className={styles.introSection}
        aria-labelledby="intro-movement-heading"
      >
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <div className={styles.introLeft}>
              <h2 id="intro-movement-heading" className={styles.sectionHeading}>
                Join the Leadership Movement
              </h2>
              <div className={styles.goldUnderline} aria-hidden="true" />
              <p className={styles.introBody}>
                The Human Rights & Social Justice Mission (HRSJM) invites
                dedicated, responsible, and socially committed individuals to
                take leadership roles as District President or State President
                and strengthen the organisation&apos;s mission of promoting human
                rights, social justice, equality, and public welfare.
              </p>
            </div>

            <div className={styles.enquiryCard}>
              <div className={styles.enquiryCardIcon} aria-hidden="true">
                <Icon name="users" />
              </div>
              <h3 className={styles.enquiryCardHeading}>Be a Leader for Change</h3>
              <p className={styles.enquiryCardText}>
                Work at the grassroots, build a strong team, and contribute to a
                more just, equal and dignified society.
              </p>
              <a
                href={WHATSAPP_ENQUIRY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.enquiryButton}
                aria-label="Enquiry about becoming a District or State President via WhatsApp"
              >
                <span>Enquiry</span>
                <Icon name="arrow" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Eligibility and Appointment Process */}
      <section
        className={styles.processSection}
        aria-labelledby="process-heading"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <h2 id="process-heading" className={styles.sectionHeading}>
              Eligibility and Appointment Process
            </h2>
            <div className={styles.goldUnderline} aria-hidden="true" />
            <p className={styles.sectionDescription}>
              To become a District President or State President, an interested
              candidate must demonstrate leadership ability, commitment to public
              service, and the capacity to build a strong organisational team.
            </p>
          </div>

          <div className={styles.processGrid}>
            {appointmentSteps.map((step, index) => (
              <div key={step.step} className={styles.processCardWrapper}>
                <div className={styles.processCard}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNumber} aria-label={`Step ${step.step}`}>
                      {step.step}
                    </span>
                    <span className={styles.stepIcon} aria-hidden="true">
                      <RenderIcon name={step.icon} />
                    </span>
                  </div>
                  <h3 className={styles.processCardTitle}>{step.title}</h3>
                  <p className={styles.processCardDesc}>{step.description}</p>
                </div>
                {index < appointmentSteps.length - 1 && (
                  <div className={styles.processConnector} aria-hidden="true">
                    <Icon name="arrow" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Proposed 25 Positions in District / State Unit */}
      <section
        className={styles.positionsSection}
        aria-labelledby="positions-heading"
      >
        <div className={styles.container}>
          <div className={styles.positionsPanel}>
            <div className={styles.positionsHeader}>
              <h2 id="positions-heading" className={styles.positionsHeading}>
                Proposed <span className={styles.goldText}>25 Positions</span> in
                District / State Unit
              </h2>
            </div>

            <div className={styles.positionsBody}>
              {/* Column 1: Positions 1 to 9 */}
              <div className={styles.positionsColumn}>
                {positionsColumn1.map((pos) => (
                  <div key={pos.number} className={styles.positionItem}>
                    <span className={styles.positionBadge}>{pos.number}</span>
                    <div className={styles.positionInfo}>
                      <span className={styles.positionName}>{pos.title}</span>
                      {pos.note && (
                        <span className={styles.positionNote}>
                          ({pos.note})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 2: Positions 10 to 17 */}
              <div className={styles.positionsColumn}>
                {positionsColumn2.map((pos) => (
                  <div key={pos.number} className={styles.positionItem}>
                    <span className={styles.positionBadge}>{pos.number}</span>
                    <div className={styles.positionInfo}>
                      <span className={styles.positionName}>{pos.title}</span>
                      {pos.note && (
                        <span className={styles.positionNote}>
                          ({pos.note})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 3: Positions 18 to 25 */}
              <div className={styles.positionsColumn}>
                {positionsColumn3.map((pos) => (
                  <div key={pos.number} className={styles.positionItem}>
                    <span className={styles.positionBadge}>{pos.number}</span>
                    <div className={styles.positionInfo}>
                      <span className={styles.positionName}>{pos.title}</span>
                      {pos.note && (
                        <span className={styles.positionNote}>
                          ({pos.note})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Expectations from District / State Presidents */}
      <section
        className={styles.expectationsSection}
        aria-labelledby="expectations-heading"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <h2 id="expectations-heading" className={styles.sectionHeading}>
              Our Expectations from District / State Presidents
            </h2>
            <div className={styles.goldUnderline} aria-hidden="true" />
          </div>

          <div className={styles.expectationsGrid}>
            {expectations.map((item) => (
              <div key={item.heading} className={styles.expectationCard}>
                <div className={styles.expectationIcon} aria-hidden="true">
                  <RenderIcon name={item.icon} />
                </div>
                <h3 className={styles.expectationHeading}>{item.heading}</h3>
                <p className={styles.expectationDesc}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Final Leadership Enquiry Banner */}
      <section className={styles.finalCtaSection} aria-label="Final Enquiry">
        <div className={styles.container}>
          <div className={styles.finalCtaBanner}>
            <div className={styles.finalCtaContent}>
              <h2 className={styles.finalCtaHeading}>Ready to Take the Next Step?</h2>
              <p className={styles.finalCtaText}>
                Join hands with HRSJM and lead change in your district or state.
              </p>
            </div>
            <a
              href={WHATSAPP_ENQUIRY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.finalCtaButton}
              aria-label="Enquiry about becoming a District or State President via WhatsApp"
            >
              <span>Enquiry</span>
              <Icon name="arrow" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
