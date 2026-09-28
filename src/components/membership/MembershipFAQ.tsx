"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import styles from "./membership.module.css";

const faqs = [
  {
    question: "Who can become an HRSJM member?",
    answer:
      "Anyone who supports human rights, equality and social justice can apply. Members come from all backgrounds — students, professionals, community workers and concerned citizens.",
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
    <section
      className={styles.faq}
      aria-labelledby="membership-faq-heading"
    >
      <div className={styles.container}>
        <div className={styles.faqLayout}>
          <div className={styles.faqIntro}>
            <p className={styles.eyebrowNeutral}>
              Frequently Asked Questions
            </p>
            <h2 id="membership-faq-heading" className={styles.sectionHeading}>
              Membership FAQs
            </h2>
            <p className={styles.sectionDescription}>
              Find answers to common questions about becoming an HRSJM member
              and participating in our work.
            </p>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} className={styles.faqItem}>
                  <h3>
                    <button
                      type="button"
                      className={styles.faqQuestion}
                      aria-expanded={isOpen}
                      aria-controls={`membership-faq-panel-${index}`}
                      id={`membership-faq-button-${index}`}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span>{faq.question}</span>
                      <span
                        className={styles.faqToggleIcon}
                        aria-hidden="true"
                      >
                        {isOpen ? (
                          <Minus size={17} strokeWidth={2.2} />
                        ) : (
                          <Plus size={17} strokeWidth={2.2} />
                        )}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`membership-faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`membership-faq-button-${index}`}
                    className={styles.faqPanel}
                    data-open={isOpen || undefined}
                  >
                    <div className={styles.faqPanelInner}>
                      <p className={styles.faqAnswer}>{faq.answer}</p>
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
