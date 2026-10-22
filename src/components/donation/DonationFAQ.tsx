"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus } from "lucide-react";
import styles from "./donation.module.css";

const faqs = [
  {
    question: "How is my donation used?",
    answer:
      "Your donation is used to support legal aid, awareness programs, community initiatives, research and advocacy work. We ensure transparent and responsible use of all funds.",
  },
  {
    question: "Is my donation secure?",
    answer:
      "Yes. Donations are processed through secure and trusted payment channels, and your personal information is handled responsibly and is never shared.",
  },
  {
    question: "Can I donate monthly?",
    answer:
      "Yes. Choose the Monthly option in the donation form and your contribution will continue supporting our work every month. You can change or stop it at any time.",
  },
  {
    question: "Do you provide tax benefits?",
    answer:
      "Donations to HRSJM may be eligible for tax exemption under applicable Indian regulations. A receipt is issued for every contribution.",
  },
  {
    question: "Can I donate from outside India?",
    answer:
      "Yes. We welcome support from across the world and accept international donations through our secure online payment options.",
  },
];

export default function DonationFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={styles.faq} aria-labelledby="faq-heading">
      <div className={styles.container}>
        <div className={styles.faqLayout}>
          <div className={styles.faqIntro}>
            <p className={styles.eyebrowNeutral}>Frequently Asked Questions</p>
            <h2 id="faq-heading" className={styles.sectionHeading}>
              About Donations
            </h2>
            <p className={styles.sectionDescription}>
              Find answers to common questions about how your donation helps
              and how it is used.
            </p>
            <Link href="/faqs" className={styles.faqViewAll}>
              View All FAQs
              <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
            </Link>
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
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-button-${index}`}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span>{faq.question}</span>
                      <span className={styles.faqToggleIcon} aria-hidden="true">
                        {isOpen ? (
                          <Minus size={17} strokeWidth={2.2} />
                        ) : (
                          <Plus size={17} strokeWidth={2.2} />
                        )}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
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
