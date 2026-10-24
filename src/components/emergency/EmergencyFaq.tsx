"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus, Minus } from "lucide-react";
import styles from "./emergency.module.css";

interface FaqItem {
  question: string;
  answer: string;
}

const faqList: FaqItem[] = [
  {
    question: "Who can request emergency assistance?",
    answer:
      "Any individual, family, or community facing critical emergency situations such as life-threatening illness, unaffordable school fees, natural calamities (floods, fires, storms), or sudden house collapse can apply for emergency assistance through our verification desk.",
  },
  {
    question: "What types of emergencies are supported?",
    answer:
      "We primarily support four core categories: 1) Urgent Medical Assistance (operations, cancer therapy, critical hospital admissions), 2) Educational Assistance (school fees, college admissions, uniforms), 3) Disaster Relief (floods, fires, earthquakes, cyclones), and 4) Housing & Rehabilitation (shelter reconstruction for vulnerable families).",
  },
  {
    question: "How are cases verified?",
    answer:
      "Every request undergoes a multi-layer verification process. Our local volunteers and field officers inspect original medical records, hospital bills, school fee structures, government disaster assessments, and income certificates. Only genuine cases with verifiable documentation are approved and listed for public fundraising.",
  },
  {
    question: "How is the donated money used?",
    answer:
      "100% of the funds raised for a specific emergency case are disbursed directly to verified hospitals, vendors, schools, or directly toward the relief work. Donors receive transparent utilization reports, receipt acknowledgments, and periodic recovery updates.",
  },
  {
    question: "Can I request help from outside India?",
    answer:
      "Currently, our field operations, direct hospital tie-ups, and volunteer ground teams operate primarily across India. However, international individuals and diaspora can donate toward any verified emergency case from anywhere in the world.",
  },
];

export default function EmergencyFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.faqSection} aria-labelledby="faq-heading">
      <div className={styles.container}>
        <div className={styles.faqGrid}>
          {/* Left: Intro */}
          <div className={styles.faqIntro}>
            <span className={styles.faqEyebrow}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 id="faq-heading" className={styles.faqHeading}>
              About Emergency Assistance
            </h2>
            <p className={styles.faqDesc}>
              Find answers to common questions about emergency donation and how the process works.
            </p>
            <Link href="/faq" className={styles.btnViewFaqs}>
              View All FAQs
              <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
            </Link>
          </div>

          {/* Right: Accordion */}
          <div className={styles.faqAccordion}>
            {faqList.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.question}
                  className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className={styles.faqQuestionBtn}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <span className={styles.faqToggleIcon} aria-hidden="true">
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className={styles.faqAnswer}>
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
