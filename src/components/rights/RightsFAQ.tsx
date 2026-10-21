"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import styles from "./RightsFAQ.module.css";

interface FaqItem {
  icon: IconName;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    icon: "scale",
    question: "What are fundamental rights?",
    answer:
      "Fundamental rights are the basic freedoms and protections every person is entitled to — equality, dignity, freedom of expression and protection from discrimination. They are guaranteed by the Constitution and cannot be taken away arbitrarily.",
  },
  {
    icon: "fileText",
    question: "How can I file a complaint if my rights are violated?",
    answer:
      "You can approach the police, the State or National Human Rights Commission, or reach out to HRSJM directly. Our team helps you document what happened, understand the right legal route and connect with the support you need.",
  },
  {
    icon: "hand",
    question: "Where can I get free legal aid?",
    answer:
      "Free legal aid is available through the District Legal Services Authority (DLSA) in every district, and through organisations like HRSJM. If you cannot afford a lawyer, you are entitled to free legal assistance under the Legal Services Authorities Act.",
  },
  {
    icon: "baby",
    question: "Are children's rights different from adult rights?",
    answer:
      "Children enjoy all fundamental rights, plus special protections under laws such as the POCSO Act and the ban on child labour. These extra safeguards recognise that children need care, education and protection from exploitation.",
  },
  {
    icon: "landmark",
    question: "How does the Right to Information (RTI) work?",
    answer:
      "Any citizen can file a simple RTI application with a public authority, asking for information a government department holds. The department must respond within 30 days, making RTI a powerful tool for transparency and accountability.",
  },
];

export default function RightsFAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add(styles.revealed);
      return;
    }

    section.classList.add(styles.armed);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add(styles.revealed);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faqs"
      className={styles.section}
      aria-labelledby="rights-faq-heading"
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Frequently Asked Questions
          </p>
          <h2 id="rights-faq-heading" className={styles.heading}>
            Know Your Rights — FAQs
          </h2>
          <p className={styles.description}>
            Find answers to common questions about human rights, legal
            protections and how to seek support.
          </p>
          <Link href="/faqs" className={styles.primaryBtn}>
            View All FAQs
            <span className={styles.primaryBtnIcon}>
              <Icon name="arrow" width={17} height={17} strokeWidth={2} />
            </span>
          </Link>
        </div>

        <ul className={styles.list}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <li
                key={faq.question}
                className={styles.item}
                style={{ "--stagger": index } as CSSProperties}
              >
                <h3 className={styles.questionHeading}>
                  <button
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className={styles.itemIcon} aria-hidden="true">
                      <Icon name={faq.icon} width={16} height={16} />
                    </span>
                    <span className={styles.questionText}>{faq.question}</span>
                    <span
                      className={`${styles.plus}${isOpen ? ` ${styles.plusOpen}` : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-label={faq.question}
                  className={`${styles.panel}${isOpen ? ` ${styles.panelOpen}` : ""}`}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.answer}>{faq.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
