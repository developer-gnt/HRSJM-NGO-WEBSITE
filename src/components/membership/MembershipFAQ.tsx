"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus } from "lucide-react";
import styles from "./membership.module.css";

const faqs = [
  {
    question: "Who can become an HRSJM member?",
    answer:
      "Anyone who supports human rights, equality and social justice can apply. Members come from all backgrounds - students, professionals, community workers and concerned citizens.",
  },
  {
    question: "What are the benefits of membership?",
    answer:
      "Members connect with a like-minded community, take part in awareness activities, events and initiatives, contribute their skills, and stay informed about HRSJM's work.",
  },
  {
    question: "How do I apply for membership?",
    answer:
      "Choose a membership option, complete the application form on this page and submit it. Our team reviews every application and will contact you about the next steps.",
  },
  {
    question: "Can I participate in HRSJM activities?",
    answer:
      "Yes. Members are invited to participate in awareness campaigns, community activities, events and initiatives according to their interest and availability.",
  },
  {
    question: "Can I volunteer without becoming a member?",
    answer:
      "Yes, volunteering is open to everyone. Membership simply deepens your connection with HRSJM and gives you a more structured way to participate and contribute.",
  },
  {
    question: "How will I know if my membership application is accepted?",
    answer:
      "Our team personally reviews each application and will contact you using the email address or phone number you provided once it has been processed.",
  },
  {
    question: "Can I update my membership information?",
    answer:
      "Yes. If your details change, contact us and we will update your membership information so our records stay current.",
  },
];

export default function MembershipFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={styles.faq} aria-labelledby="membership-faq-heading">
      <div className={styles.container}>
        {/* Top Header Row with Heading Group on Left and Button on Far Right */}
        <div className={styles.faqHeaderRow}>
          <div className={styles.faqHeaderGroup}>
            <span className={styles.faqAccentBar} aria-hidden="true" />
            <p className={styles.faqEyebrow}>Frequently Asked Questions</p>
            <h2 id="membership-faq-heading" className={styles.faqTitle}>
              Membership FAQs
            </h2>
            <p className={styles.faqDescription}>
              Find answers to common questions about becoming an HRSJM member and
              participating in our work.
            </p>
          </div>

          <Link href="/faqs" className={styles.faqViewAllBtn}>
            View All FAQs
            <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        </div>

        {/* 2-Column Grid: Left Side Card + Right Accordion */}
        <div className={styles.faqGrid}>
          {/* Left Side Card: Need help with membership? */}
          <div className={styles.faqHelpCard}>
            <div className={styles.faqHelpGraphic}>
              <svg
                width="104"
                height="92"
                viewBox="0 0 104 92"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <line x1="52" y1="4" x2="52" y2="11" stroke="#F5B82E" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="68" y1="9" x2="63" y2="15" stroke="#F5B82E" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="36" y1="9" x2="41" y2="15" stroke="#F5B82E" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="25" y1="21" x2="31" y2="24" stroke="#F5B82E" strokeWidth="2.5" strokeLinecap="round" />

                <path
                  d="M54 22C68 22 79 32.5 79 45.5C79 50.8 77.2 55.7 74.1 59.5L76.5 69L66.7 65.2C62.8 67.9 57.8 69.5 52.5 69.5C38.5 69.5 27 59 27 46C27 45.3 27.05 44.7 27.15 44C29.6 44.7 32.3 45 35 45C46 45 55 37 56.7 26.6C55.8 26.4 54.9 26.3 54 26.3V22Z"
                  fill="#F9F1DC"
                />

                <path
                  d="M14 42C14 28.2 24.7 17 38 17C51.3 17 62 28.2 62 42C62 55.8 51.3 67 38 67C33.2 67 28.8 65.6 25 63.2L15 67L17.7 57.8C14.7 53.3 13 47.9 13 42H14Z"
                  fill="#F5B82E"
                />

                <text
                  x="38"
                  y="50"
                  fontFamily="Georgia, serif"
                  fontSize="30"
                  fontWeight="bold"
                  fill="#062A4F"
                  textAnchor="middle"
                >
                  ?
                </text>
              </svg>
            </div>

            <h3 className={styles.faqHelpTitle}>
              Need help with
              <br />
              membership?
            </h3>

            <p className={styles.faqHelpText}>
              Our team is here to guide you.
            </p>

            <span className={styles.faqHelpAccent} aria-hidden="true" />

            <div className={styles.faqHelpWatermark} aria-hidden="true">
              <svg width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M36 75C36 61.2 47.2 50 61 50H85C98.8 50 110 61.2 110 75C110 88.8 98.8 100 85 100H66L46 112V96.8C40 91.2 36 83.6 36 75Z"
                  stroke="#DDAA3A"
                  strokeWidth="1.8"
                  strokeOpacity="0.45"
                />
                <line x1="54" y1="69" x2="84" y2="69" stroke="#DDAA3A" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.4" />
                <line x1="54" y1="80" x2="72" y2="80" stroke="#DDAA3A" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.4" />

                <path
                  d="M86 98C89.5 98 93 96.8 96 95.5L114 104V92.5C120.5 87 125 79.2 125 71.5C125 64.8 121.8 58.5 116.5 54"
                  stroke="#DDAA3A"
                  strokeWidth="1.8"
                  strokeOpacity="0.38"
                />
                <circle cx="95" cy="76" r="1.6" fill="#DDAA3A" fillOpacity="0.45" />
                <circle cx="104" cy="76" r="1.6" fill="#DDAA3A" fillOpacity="0.45" />
                <circle cx="113" cy="76" r="1.6" fill="#DDAA3A" fillOpacity="0.45" />

                <path
                  d="M130 150C136 115 160 82 200 48"
                  stroke="#DDAA3A"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeOpacity="0.4"
                />
                <path d="M152 108C150 96 160 90 168 93C166 104 159 108 152 108Z" fill="#DDAA3A" fillOpacity="0.25" />
                <path d="M172 82C172 70 184 66 190 70C186 80 178 84 172 82Z" fill="#DDAA3A" fillOpacity="0.25" />
                <path d="M190 56C192 45 204 43 208 49C201 56 195 58 190 56Z" fill="#DDAA3A" fillOpacity="0.25" />
                <path d="M140 125C132 118 135 107 144 107C146 116 144 123 140 125Z" fill="#DDAA3A" fillOpacity="0.25" />
              </svg>
            </div>
          </div>

          {/* Right Cards List */}
          <div className={styles.faqCardsList}>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`${styles.faqCard} ${isOpen ? styles.faqCardOpen : ""}`}
                >
                  <button
                    type="button"
                    className={styles.faqCardButton}
                    aria-expanded={isOpen}
                    aria-controls={`membership-faq-panel-${index}`}
                    id={`membership-faq-button-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className={styles.faqCardQuestion}>{faq.question}</span>
                    <span className={styles.faqCardIcon} aria-hidden="true">
                      {isOpen ? (
                        <Minus size={20} strokeWidth={2.4} />
                      ) : (
                        <Plus size={20} strokeWidth={2.4} />
                      )}
                    </span>
                  </button>

                  <div
                    id={`membership-faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`membership-faq-button-${index}`}
                    className={styles.faqCardPanel}
                    data-open={isOpen || undefined}
                  >
                    <div className={styles.faqCardPanelInner}>
                      <p className={styles.faqCardAnswer}>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
