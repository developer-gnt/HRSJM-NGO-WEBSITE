import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { valuesList, leadershipMembers } from "./aboutData";
import type { LeadershipMember } from "./aboutData";
import AboutAimsSection from "./AboutAimsSection";
import styles from "./about.module.css";

interface ValuesAndLeadershipProps {
  onSelectMember: (member: LeadershipMember) => void;
  onOpenAllLeadership: () => void;
}

// Duotone (navy + gold) line-art icons matching the reference style
const ValueDuotoneIcon = ({ name }: { name: string }) => {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    xmlns: "http://www.w3.org/2000/svg",
  };

  switch (name) {
    case "peace":
      return (
        <svg {...common}>
          <path
            d="M12 28C10 24 10 18 16 14C22 10 30 12 36 8C34 14 36 20 40 24C34 26 28 26 22 32C18 36 14 38 10 38C12 34 12 30 12 28Z"
            stroke="#062A4F"
          />
          <path d="M18 20C16 16 14 12 8 10" stroke="#D9A928" strokeWidth="2" />
          <circle cx="28" cy="16" r="1.5" fill="#D9A928" />
          <path d="M12 12C14 14 15 16 15 18" stroke="#D9A928" strokeWidth="1.5" />
        </svg>
      );
    case "democracy":
      return (
        <svg {...common}>
          <circle cx="24" cy="13" r="4.5" stroke="#D9A928" />
          <path
            d="M16 32V28C16 24.5 19.5 22.5 24 22.5C28.5 22.5 32 24.5 32 28V32"
            stroke="#D9A928"
          />
          <circle cx="11" cy="17" r="3.5" stroke="#062A4F" />
          <path d="M6 32V29.5C6 27 8.5 25.5 12 25.5" stroke="#062A4F" />
          <circle cx="37" cy="17" r="3.5" stroke="#062A4F" />
          <path d="M42 32V29.5C42 27 39.5 25.5 36 25.5" stroke="#062A4F" />
        </svg>
      );
    case "secularism":
      return (
        <svg {...common}>
          <path
            d="M14 26C14 20 18 16 24 16C30 16 34 20 34 26"
            stroke="#062A4F"
          />
          <path
            d="M18 28C16 32 14 36 10 37C14 41 20 40 24 36C28 40 34 41 38 37C34 36 32 32 30 28"
            stroke="#062A4F"
          />
          <circle cx="24" cy="24" r="3" stroke="#D9A928" fill="#FAF7F0" />
          <path d="M24 10V14" stroke="#D9A928" strokeWidth="2" />
          <path d="M21 12H27" stroke="#D9A928" strokeWidth="1.5" />
        </svg>
      );
    case "human-security":
      return (
        <svg {...common}>
          <path
            d="M24 7L38 13V24C38 33 24 41 24 41C24 41 10 33 10 24V13L24 7Z"
            stroke="#D9A928"
            strokeWidth="2"
          />
          <circle cx="24" cy="19" r="3.5" stroke="#062A4F" />
          <path d="M17 31C17 27 20 25 24 25C28 25 31 27 31 31" stroke="#062A4F" />
        </svg>
      );
    case "social-development":
      return (
        <svg {...common}>
          <circle cx="24" cy="12" r="3.5" stroke="#D9A928" />
          <circle cx="14" cy="19" r="3" stroke="#D9A928" />
          <circle cx="34" cy="19" r="3" stroke="#D9A928" />
          <path d="M18 36C18 30 21 27 24 27C27 27 30 30 30 36" stroke="#062A4F" />
          <path d="M9 37C9 33 12 30 15 30" stroke="#062A4F" />
          <path d="M39 37C39 33 36 30 33 30" stroke="#062A4F" />
        </svg>
      );
    case "political-development":
      return (
        <svg {...common}>
          <path d="M24 8L9 16V19H39V16L24 8Z" stroke="#D9A928" strokeWidth="2" />
          <path d="M24 11V14" stroke="#D9A928" />
          <line x1="13" y1="19" x2="13" y2="33" stroke="#062A4F" strokeWidth="2" />
          <line x1="20" y1="19" x2="20" y2="33" stroke="#062A4F" strokeWidth="2" />
          <line x1="28" y1="19" x2="28" y2="33" stroke="#062A4F" strokeWidth="2" />
          <line x1="35" y1="19" x2="35" y2="33" stroke="#062A4F" strokeWidth="2" />
          <path d="M7 33H41V37H7V33Z" stroke="#062A4F" />
        </svg>
      );
    case "economic-development":
      return (
        <svg {...common}>
          <line x1="8" y1="39" x2="40" y2="39" stroke="#062A4F" strokeWidth="2" />
          <rect x="12" y="27" width="5" height="12" rx="1" stroke="#062A4F" />
          <rect x="21" y="20" width="5" height="19" rx="1" stroke="#062A4F" />
          <rect x="30" y="13" width="5" height="26" rx="1" stroke="#062A4F" />
          <path d="M12 22L21 14L28 18L37 9" stroke="#D9A928" strokeWidth="2" />
          <polyline points="32,9 37,9 37,14" stroke="#D9A928" strokeWidth="2" />
        </svg>
      );
    case "cultural-development":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="15" stroke="#D9A928" strokeWidth="1.8" />
          <circle cx="24" cy="24" r="6" stroke="#D9A928" />
          <path d="M24 9V18" stroke="#062A4F" />
          <path d="M24 30V39" stroke="#062A4F" />
          <path d="M9 24H18" stroke="#062A4F" />
          <path d="M30 24H39" stroke="#062A4F" />
          <circle cx="24" cy="24" r="1.5" fill="#D9A928" />
        </svg>
      );
    case "equality":
      return (
        <svg {...common}>
          <line x1="24" y1="10" x2="24" y2="37" stroke="#D9A928" strokeWidth="2" />
          <line x1="16" y1="37" x2="32" y2="37" stroke="#D9A928" strokeWidth="2.5" />
          <line x1="12" y1="16" x2="36" y2="16" stroke="#D9A928" strokeWidth="2" />
          <circle cx="24" cy="10" r="2" fill="#D9A928" />
          <line x1="12" y1="16" x2="8" y2="24" stroke="#062A4F" strokeWidth="1.2" />
          <line x1="12" y1="16" x2="16" y2="24" stroke="#062A4F" strokeWidth="1.2" />
          <path d="M6 24C6 27 18 27 18 24Z" stroke="#062A4F" fill="#062A4F" fillOpacity="0.1" />
          <line x1="36" y1="16" x2="32" y2="24" stroke="#062A4F" strokeWidth="1.2" />
          <line x1="36" y1="16" x2="40" y2="24" stroke="#062A4F" strokeWidth="1.2" />
          <path d="M30 24C30 27 42 27 42 24Z" stroke="#062A4F" fill="#062A4F" fillOpacity="0.1" />
        </svg>
      );
    case "dignity":
    default:
      return (
        <svg {...common}>
          <path
            d="M12 36C12 31 16 27 24 27C32 27 36 31 36 36"
            stroke="#D9A928"
            strokeWidth="2"
          />
          <circle cx="24" cy="15" r="4.5" stroke="#062A4F" />
          <path d="M14 11L17 14" stroke="#062A4F" />
          <path d="M34 11L31 14" stroke="#062A4F" />
          <path d="M24 6V9" stroke="#062A4F" />
        </svg>
      );
  }
};

export default function ValuesAndLeadership({
  onSelectMember,
  onOpenAllLeadership,
}: ValuesAndLeadershipProps) {
  return (
    <div id="our-beliefs">
      {/* Section 1: Our Values & Principles */}
      <section id="values-principles" className={styles.values}>
        <div className={styles.container}>
          <div className={styles.valuesGrid}>
            {/* Left column */}
            <div className={styles.valuesLeft}>
              <span className={styles.valuesEyebrow}>
                Our Values &amp; Principles
              </span>

              <h2 className={styles.sectionHeading}>What We Believe In</h2>

              <p className={styles.valuesCopy}>
                We respect and promote pluralism, recognizing the diverse social, political, economic, and
                cultural identities of different communities, including ethnic, linguistic, religious, and other
                groups. We encourage mutual respect, equal opportunities, peaceful coexistence, and
                constructive dialogue among all sections of society.
              </p>
            </div>

            {/* Right column: icon grid of white cards */}
            <div className={styles.valuesRight}>
              <div className={styles.valuesCardGrid}>
                {valuesList.map((val) => (
                  <div key={val.id} className={styles.valueCard}>
                    <div className={styles.valueCardIcon}>
                      <ValueDuotoneIcon name={val.iconName} />
                    </div>
                    <span className={styles.valueCardLabel}>{val.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aims & Objectives Section */}
      <AboutAimsSection />

      {/* Section 2: Our Leadership */}
      <section id="leadership" className={styles.leadership}>
        <div className={styles.container}>
          <div className={styles.leadGrid}>
            {/* Left column */}
            <div className={styles.leadLeft}>
              <span className={styles.leadEyebrow}>Our Leadership</span>

              <h2 className={styles.sectionHeading}>
                Guided by People <br />
                Who Care
              </h2>

              <p className={styles.leadCopy}>
                HRSJM is led by a group of committed individuals who bring
                experience, integrity and a deep belief in human rights and
                social justice.
              </p>

              <div className={styles.leadCtaWrap}>
                <button
                  onClick={onOpenAllLeadership}
                  className={styles.leadOutlineButton}
                >
                  <span>Meet Our Leadership</span>
                  <ArrowRight className={styles.leadOutlineButtonIcon} size={16} />
                </button>
              </div>
            </div>

            {/* Right column: 4 leadership cards */}
            <div className={styles.leadRight}>
              <div className={styles.leadCardGrid}>
                {leadershipMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => onSelectMember(member)}
                    className={styles.leaderCard}
                  >
                    {/* Portrait photo */}
                    <div className={styles.leaderPortrait}>
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className={styles.leaderImg}
                      />
                    </div>

                    {/* Content */}
                    <div className={styles.leaderBody}>
                      <p className={styles.leaderCategory}>{member.designation}</p>
                      <h3 className={styles.leaderName}>{member.name}</h3>

                      <p className={styles.leaderQuote}>
                        “{member.quote}”
                      </p>

                      <div className={styles.leaderFooter}>
                        <span className={styles.leaderMeta}>View Profile</span>
                        <span className={styles.leaderArrow} aria-hidden="true">
                          <ArrowRight size={15} strokeWidth={2.2} />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
