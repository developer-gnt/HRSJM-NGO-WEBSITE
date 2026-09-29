"use client";

import { useState, useId } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { faqCategories } from "./faqData";
import styles from "./faqs.module.css";

export default function FAQPage() {
  const uid = useId();
  const [openId, setOpenId] = useState<string | null>(
    `${faqCategories[0].id}-0`
  );

  function toggle(catId: string, index: number) {
    const id = `${catId}-${index}`;
    setOpenId((current) => (current === id ? null : id));
  }

  function scrollToSection(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const target = document.getElementById(
      event.currentTarget.getAttribute("href")!.slice(1)
    );
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className={styles.page}>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-label="FAQ page header">
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>Support & Information</p>
          <h1 className={styles.heroHeading}>
            Frequently Asked{" "}
            <span className={styles.heroGold}>Questions</span>
          </h1>
          <p className={styles.heroDescription}>
            Find clear answers about HRSJM, your rights, membership, getting
            help and making a donation. Can&apos;t find what you need?{" "}
            <Link href="/contact" className={styles.heroContactLink}>
              Contact us
            </Link>
            .
          </p>

          {/* Category pills — quick navigation to each FAQ group */}
          <ul className={styles.statList} aria-label="FAQ categories overview">
            {faqCategories.map((cat, index) => (
              <li key={cat.id}>
                <a
                  href={`#faq-${cat.id}`}
                  className={styles.statPill}
                  onClick={scrollToSection}
                >
                  <span className={styles.statCount}>{index + 1}</span>
                  <span className={styles.statLabel}>{cat.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Body — full-width FAQ content ──────────────────────────── */}
      <section className={styles.body} aria-label="FAQ categories and answers">
        <div className={styles.bodyInner}>
          {faqCategories.map((cat) => (
            <div
              key={cat.id}
              id={`faq-${cat.id}`}
              className={styles.panel}
              role="region"
              aria-labelledby={`${uid}-heading-${cat.id}`}
            >
              {/* Panel header */}
              <header className={styles.panelHeader}>
                <p className={styles.panelEyebrow}>{cat.eyebrow}</p>
                <h2
                  id={`${uid}-heading-${cat.id}`}
                  className={styles.panelHeading}
                >
                  {cat.heading}
                </h2>
                <p className={styles.panelDescription}>{cat.description}</p>
              </header>

              {/* Accordion */}
              <ul className={styles.accordionList}>
                {cat.items.map((item, index) => {
                  const isOpen = openId === `${cat.id}-${index}`;
                  const btnId = `${uid}-q-${cat.id}-${index}`;
                  const panelId = `${uid}-a-${cat.id}-${index}`;
                  return (
                    <li key={item.question} className={styles.accordionItem}>
                      <h3 className={styles.accordionHeading}>
                        <button
                          type="button"
                          id={btnId}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          className={`${styles.accordionTrigger}${isOpen ? ` ${styles.accordionTriggerOpen}` : ""}`}
                          onClick={() => toggle(cat.id, index)}
                        >
                          <span className={styles.accordionNumber}>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className={styles.accordionQuestion}>
                            {item.question}
                          </span>
                          <span
                            className={styles.accordionIcon}
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
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        className={`${styles.accordionPanel}${isOpen ? ` ${styles.accordionPanelOpen}` : ""}`}
                      >
                        <div className={styles.accordionPanelInner}>
                          <p className={styles.accordionAnswer}>
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────────────── */}
      <section className={styles.cta} aria-label="Get more help">
        <div className={styles.ctaInner}>
          <p className={styles.ctaEyebrow}>We are here for you</p>
          <h2 className={styles.ctaHeading}>
            Didn&apos;t find your answer?
          </h2>
          <p className={styles.ctaText}>
            Reach out to our team. We are committed to helping every person
            understand their rights and access the support they deserve.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Contact Us
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <Link href="/complaint" className={styles.ctaSecondary}>
              File a Complaint
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}