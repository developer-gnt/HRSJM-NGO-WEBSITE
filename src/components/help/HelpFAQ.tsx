"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus, Minus, Search, RotateCcw } from "lucide-react";
import { faqCategories, type FaqItem } from "@/components/faqs/faqData";
import styles from "./help.module.css";

interface HelpFAQProps {
  searchQuery: string;
  onClearSearch: () => void;
}

interface DisplayFaqItem extends FaqItem {
  categoryLabel?: string;
}

export default function HelpFAQ({ searchQuery, onClearSearch }: HelpFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  // Get default 7 membership FAQs
  const membershipFaqs = useMemo(() => {
    const memCat = faqCategories.find((cat) => cat.id === "membership");
    return memCat ? memCat.items : [];
  }, []);

  // Filter FAQs when a search query is active
  const filteredFaqs = useMemo<DisplayFaqItem[]>(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return membershipFaqs;
    }

    // Search across all FAQ categories to give comprehensive support results
    const results: DisplayFaqItem[] = [];
    faqCategories.forEach((category) => {
      category.items.forEach((item) => {
        const matchesQuestion = item.question.toLowerCase().includes(q);
        const matchesAnswer = item.answer.toLowerCase().includes(q);
        const matchesCategory =
          category.label.toLowerCase().includes(q) ||
          category.heading.toLowerCase().includes(q);

        if (matchesQuestion || matchesAnswer || matchesCategory) {
          results.push({
            ...item,
            categoryLabel: category.label,
          });
        }
      });
    });

    return results;
  }, [searchQuery, membershipFaqs]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <section
      id="help-faq-section"
      className={styles.faqSection}
      aria-labelledby="help-faq-heading"
    >
      <div className={styles.container}>
        {/* Section Header Row with Heading on Left and Button on Far Right */}
        <div className={styles.faqHeaderRow}>
          <div className={styles.faqHeaderGroup}>
            <span className={styles.faqAccentBar} aria-hidden="true" />
            <p className={styles.faqEyebrow}>FREQUENTLY ASKED QUESTIONS</p>
            <h2 id="help-faq-heading" className={styles.faqTitle}>
              {isSearching ? "Search Results" : "Membership FAQs"}
            </h2>
            <p className={styles.faqDescription}>
              {isSearching
                ? `Showing support articles and questions matching "${searchQuery}".`
                : "Find answers to common questions about becoming an HRSJM member and participating in our work."}
            </p>
          </div>

          <Link href="/faqs" className={styles.viewAllFaqsBtn}>
            View All FAQs
            <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        </div>

        {/* Active Search Status Banner */}
        {isSearching && (
          <div className={styles.searchStatusBanner} role="status">
            <span className={styles.searchStatusText}>
              Found <strong>{filteredFaqs.length}</strong>{" "}
              {filteredFaqs.length === 1 ? "answer" : "answers"} for &ldquo;
              <strong>{searchQuery}</strong>&rdquo;
            </span>
            <button
              type="button"
              onClick={onClearSearch}
              className={styles.clearFilterBtn}
            >
              Clear search &amp; show membership FAQs
            </button>
          </div>
        )}

        {/* 2-Column FAQ Layout: Left card (~28-30%) + Right accordion (~70-72%) */}
        <div className={styles.faqGrid}>
          {/* Left Side: Membership Help Card */}
          <aside className={styles.faqHelpCard} aria-label="Membership Assistance">
            {/* Golden-yellow question-mark illustration */}
            <div className={styles.faqHelpGraphic}>
              <svg
                width="104"
                height="92"
                viewBox="0 0 104 92"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <line
                  x1="52"
                  y1="4"
                  x2="52"
                  y2="11"
                  stroke="#F5B82E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="68"
                  y1="9"
                  x2="63"
                  y2="15"
                  stroke="#F5B82E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="36"
                  y1="9"
                  x2="41"
                  y2="15"
                  stroke="#F5B82E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="25"
                  y1="21"
                  x2="31"
                  y2="24"
                  stroke="#F5B82E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Question bubble shadow */}
                <path
                  d="M54 22C68 22 79 32.5 79 45.5C79 50.8 77.2 55.7 74.1 59.5L76.5 69L66.7 65.2C62.8 67.9 57.8 69.5 52.5 69.5C38.5 69.5 27 59 27 46C27 45.3 27.05 44.7 27.15 44C29.6 44.7 32.3 45 35 45C46 45 55 37 56.7 26.6C55.8 26.4 54.9 26.3 54 26.3V22Z"
                  fill="#F9F1DC"
                />

                {/* Primary bubble */}
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
              Our team is here to guide you. Every step of the way.
            </p>

            <span className={styles.faqHelpAccentLine} aria-hidden="true" />

            <Link href="/contact" className={styles.faqHelpCtaBtn}>
              <span>Talk to our support team</span>
              <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
            </Link>

            {/* Botanical watermark decoration at the bottom */}
            <div className={styles.faqHelpWatermark} aria-hidden="true">
              <svg
                width="220"
                height="150"
                viewBox="0 0 220 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36 75C36 61.2 47.2 50 61 50H85C98.8 50 110 61.2 110 75C110 88.8 98.8 100 85 100H66L46 112V96.8C40 91.2 36 83.6 36 75Z"
                  stroke="#DDAA3A"
                  strokeWidth="1.8"
                  strokeOpacity="0.45"
                />
                <line
                  x1="54"
                  y1="69"
                  x2="84"
                  y2="69"
                  stroke="#DDAA3A"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeOpacity="0.4"
                />
                <line
                  x1="54"
                  y1="80"
                  x2="72"
                  y2="80"
                  stroke="#DDAA3A"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeOpacity="0.4"
                />
                <path
                  d="M130 150C136 115 160 82 200 48"
                  stroke="#DDAA3A"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeOpacity="0.4"
                />
                <path
                  d="M152 108C150 96 160 90 168 93C166 104 159 108 152 108Z"
                  fill="#DDAA3A"
                  fillOpacity="0.25"
                />
                <path
                  d="M172 82C172 70 184 66 190 70C186 80 178 84 172 82Z"
                  fill="#DDAA3A"
                  fillOpacity="0.25"
                />
                <path
                  d="M190 56C192 45 204 43 208 49C201 56 195 58 190 56Z"
                  fill="#DDAA3A"
                  fillOpacity="0.25"
                />
              </svg>
            </div>
          </aside>

          {/* Right Side: FAQ Accordion Column */}
          <div className={styles.faqAccordionColumn}>
            {filteredFaqs.length === 0 ? (
              <div className={styles.noResultsCard}>
                <div className={styles.noResultsIcon}>
                  <Search size={26} strokeWidth={2.2} />
                </div>
                <h3 className={styles.noResultsTitle}>No results found</h3>
                <p className={styles.noResultsDesc}>
                  We couldn&apos;t find any answers matching &ldquo;
                  {searchQuery}&rdquo;. Try another search term or contact our
                  support team directly.
                </p>
                <button
                  type="button"
                  onClick={onClearSearch}
                  className={styles.resetSearchBtn}
                >
                  <RotateCcw size={15} strokeWidth={2.4} />
                  Reset Search
                </button>
              </div>
            ) : (
              <ul className={styles.faqList}>
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  const buttonId = `${baseId}-btn-${index}`;
                  const panelId = `${baseId}-panel-${index}`;

                  return (
                    <li
                      key={faq.question}
                      className={`${styles.faqItem} ${
                        isOpen ? styles.faqItemOpen : ""
                      }`}
                    >
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className={styles.faqQuestionBtn}
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                      >
                        <span className={styles.faqQuestionText}>
                          {faq.categoryLabel && (
                            <span className={styles.faqCategoryBadge}>
                              {faq.categoryLabel}
                            </span>
                          )}
                          {faq.question}
                        </span>

                        <span className={styles.faqIconRing} aria-hidden="true">
                          {isOpen ? (
                            <Minus size={16} strokeWidth={2.5} />
                          ) : (
                            <Plus size={16} strokeWidth={2.5} />
                          )}
                        </span>
                      </button>

                      {isOpen && (
                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          className={styles.faqAnswerPanel}
                        >
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
