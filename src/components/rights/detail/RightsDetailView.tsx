"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  Scale,
  Scroll,
  Gavel,
  BookOpen,
  HelpCircle,
  ChevronRight,
  ArrowRight,
  Shield,
  Heart,
  Users,
  Briefcase,
  GraduationCap,
  Home,
  MessageSquare,
  Sun,
  Clock,
  Landmark,
  Building2,
  X
} from "lucide-react";
import type { RightsCategoryDetail } from "@/data/rightsDetailData";
import styles from "./rightsDetail.module.css";

interface Props {
  data: RightsCategoryDetail;
  isHomeSection?: boolean;
  selectedSlug?: string;
  onSelectCategory?: (slug: string) => void;
  categoryList?: Array<{ slug: string; title: string }>;
}

export default function RightsDetailView({
  data,
  isHomeSection = false,
  selectedSlug,
  onSelectCategory,
  categoryList = [],
}: Props) {
  const [activeTab, setActiveTab] = useState("overview");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [expandedLawIndex, setExpandedLawIndex] = useState<number | null>(null);
  const [showFullOverviewModal, setShowFullOverviewModal] = useState(false);
  const [showAllLawsModal, setShowAllLawsModal] = useState(false);

  const prefix = isHomeSection ? "kyr-home-" : "";

  // Smooth scroll handler for section navigation tabs
  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(`${prefix}${sectionId}`);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Scrollspy to automatically highlight active tab as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "key-rights", "important-laws", "cases-examples", "resources", "faqs"];
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(`${prefix}${sections[i]}`);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveTab(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefix]);

  // Icon helper mapping
  const renderCardIcon = (iconName: string) => {
    switch (iconName) {
      case "heart":
        return <Heart className="w-5 h-5" />;
      case "users":
      case "usersRound":
        return <Users className="w-5 h-5" />;
      case "shield":
      case "shieldCheck":
        return <Shield className="w-5 h-5" />;
      case "message":
      case "megaphone":
        return <MessageSquare className="w-5 h-5" />;
      case "sun":
      case "namaste":
        return <Sun className="w-5 h-5" />;
      case "briefcase":
        return <Briefcase className="w-5 h-5" />;
      case "graduationCap":
        return <GraduationCap className="w-5 h-5" />;
      case "home":
        return <Home className="w-5 h-5" />;
      case "landmark":
        return <Landmark className="w-5 h-5" />;
      case "clock":
        return <Clock className="w-5 h-5" />;
      case "building2":
        return <Building2 className="w-5 h-5" />;
      case "gavel":
        return <Gavel className="w-5 h-5" />;
      default:
        return <Scale className="w-5 h-5" />;
    }
  };

  return (
    <article className={styles.detailPage}>


      {/* ================================================================= */}
      {/* ================================================================= */}
      {/* 1. HERO BANNER                                                    */}
      {/* ================================================================= */}
      <header
        className={`${styles.hero} ${data.heroBgImage ? styles.heroWithBg : ""}`}
        style={data.heroBgImage ? { backgroundImage: `url(${data.heroBgImage})` } : undefined}
        aria-label={`${data.title} Banner`}
      >
        <div className={styles.heroInner}>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <Link href="/rights">
              Know Your <span className={styles.breadcrumbGold}>Rights</span>
            </Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span className={styles.breadcrumbCurrent}>{data.title}</span>
          </nav>

          <div className={data.heroBgImage ? styles.heroGridWithBg : styles.heroGrid}>
            {/* Left Copy */}
            <div className={data.heroBgImage ? styles.heroCopyWithBg : styles.heroCopy}>
              <h1 className={styles.heroTitle}>
                {data.prefixWord && <span>{data.prefixWord} </span>}
                <span className={styles.goldHighlight}>{data.highlightWord}</span>
              </h1>
              <p className={styles.heroSubtitle}>{data.heroSubtitle}</p>
              <button
                type="button"
                onClick={() => scrollToSection("overview")}
                className={`${styles.heroBtn} ${data.heroBgImage ? styles.heroBtnPill : ""}`}
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {/* Right Visual Box (only shown for non-panoramic background layouts) */}
            {!data.heroBgImage && (
              <div className={styles.heroVisualWrapper}>
                <div className={styles.heroVisualAura} aria-hidden="true" />
                <div className={styles.heroImageFrame}>
                  <Image
                    src={data.heroImage}
                    alt={`${data.title} Illustration`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 540px"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================================================================= */}
      {/* 2. SECTION NAVIGATION TABS                                        */}
      {/* ================================================================= */}
      <nav className={styles.navStripContainer} aria-label="Page Sections Navigation">
        <div className={styles.navStripInner}>
          <div className={styles.navBar} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "overview"}
              onClick={() => scrollToSection("overview")}
              className={`${styles.navTab} ${activeTab === "overview" ? styles.navTabActive : ""}`}
            >
              <FileText className={`w-4 h-4 ${styles.navIcon}`} />
              Overview
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "key-rights"}
              onClick={() => scrollToSection("key-rights")}
              className={`${styles.navTab} ${activeTab === "key-rights" ? styles.navTabActive : ""}`}
            >
              <Scale className={`w-4 h-4 ${styles.navIcon}`} />
              {data.keyRights.isArticleStyle ? "Types of Fundamental Rights" : "Key Rights"}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "important-laws"}
              onClick={() => scrollToSection("important-laws")}
              className={`${styles.navTab} ${activeTab === "important-laws" ? styles.navTabActive : ""}`}
            >
              <Scroll className={`w-4 h-4 ${styles.navIcon}`} />
              {data.keyRights.isArticleStyle ? "Important Articles" : "Important Laws"}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "cases-examples"}
              onClick={() => scrollToSection("cases-examples")}
              className={`${styles.navTab} ${activeTab === "cases-examples" ? styles.navTabActive : ""}`}
            >
              <Gavel className={`w-4 h-4 ${styles.navIcon}`} />
              Cases &amp; Examples
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "resources"}
              onClick={() => scrollToSection("resources")}
              className={`${styles.navTab} ${activeTab === "resources" ? styles.navTabActive : ""}`}
            >
              <BookOpen className={`w-4 h-4 ${styles.navIcon}`} />
              Resources
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "faqs"}
              onClick={() => scrollToSection("faqs")}
              className={`${styles.navTab} ${activeTab === "faqs" ? styles.navTabActive : ""}`}
            >
              <HelpCircle className={`w-4 h-4 ${styles.navIcon}`} />
              FAQs
            </button>
          </div>
        </div>
      </nav>

      {/* ================================================================= */}
      {/* 3. SECTION: OVERVIEW                                              */}
      {/* ================================================================= */}
      <section id={`${prefix}overview`} className={`${styles.sectionWrap} ${styles.bgCream}`}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            OVERVIEW
          </p>
          <h2 className={styles.sectionHeading}>
            <span className={styles.headingAccentText}>{data.overview.heading}</span>
          </h2>

          <div className={styles.overviewGrid}>
            {/* Left Column: Text & CTA */}
            <div className={styles.overviewText}>
              <p>{data.overview.description1}</p>
              {!data.heroBgImage && data.overview.description2 && (
                <p>{data.overview.description2}</p>
              )}
              <div className={styles.overviewCta}>
                <button
                  type="button"
                  onClick={() => setShowFullOverviewModal(true)}
                  className={styles.goldSolidBtn}
                >
                  Read Full Overview
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            {/* Center Column: Artistic Collage Image */}
            <div className={styles.overviewImageFrame}>
              <Image
                src={data.overview.image}
                alt="Diverse Indian citizens united for rights"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>

            {/* Right Column: Stylized Pull Quote */}
            <div className={styles.quoteBox}>
              <span className={styles.quoteMark} aria-hidden="true">&ldquo;</span>
              <p className={styles.quoteText}>
                {data.overview.quote.replace(/[“”"]/g, "")}
              </p>
              <span className={styles.quoteUnderline} />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. SECTION: KEY RIGHTS                                            */}
      {/* ================================================================= */}
      <section id={`${prefix}key-rights`} className={`${styles.sectionWrap} ${styles.bgWhite}`}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            {data.keyRights.eyebrow}
          </p>
          <h2 className={styles.sectionHeading}>{data.keyRights.heading}</h2>

          <div className={styles.keyRightsSplit}>
            {/* Left: Cards Grid */}
            {data.keyRights.isArticleStyle ? (
              <div className={styles.articleRightsGrid}>
                {data.keyRights.items.map((item) => (
                  <div key={item.title} className={styles.articleCard}>
                    <div className={styles.articleIconCircle}>
                      {renderCardIcon(item.icon)}
                    </div>
                    <div className={styles.articleContent}>
                      <div className={styles.articleHeaderRow}>
                        <h3 className={styles.articleTitle}>{item.title}</h3>
                        {item.subtitle && (
                          <span className={styles.articleBadge}>{item.subtitle}</span>
                        )}
                      </div>
                      <p className={styles.articleDesc}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.rightsGrid}>
                {data.keyRights.items.map((item) => (
                  <div key={item.title} className={styles.rightCard}>
                    <div className={styles.cardIconCircle}>
                      {renderCardIcon(item.icon)}
                    </div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    {item.description && (
                      <p className={styles.cardDesc}>{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Right: Deep Navy Feature Quote Card */}
            <div
              className={`${styles.featureQuoteCard} ${
                data.keyRights.quoteCard?.image ? styles.featureQuoteCardWithImg : ""
              }`}
            >
              {data.keyRights.quoteCard?.image ? (
                <div className={styles.featureQuoteImgWrapper}>
                  <Image
                    src={data.keyRights.quoteCard.image}
                    alt={`${data.title} Feature Quote`}
                    fill
                    className={styles.featureQuoteImg}
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                </div>
              ) : (
                <>
                  <div className={styles.featureEmblem} aria-hidden="true">
                    <Scale className="w-16 h-16 mx-auto stroke-1" />
                  </div>
                  <p className={styles.featureQuoteText}>
                    {data.keyRights.quoteCard.quote}
                  </p>
                  <p className={styles.featureQuoteSource}>
                    {data.keyRights.quoteCard.source}
                  </p>
                  <div className={styles.featureDivider} aria-hidden="true" />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. SECTION: IMPORTANT LAWS & DOCUMENTS                            */}
      {/* ================================================================= */}
      <section id={`${prefix}important-laws`} className={`${styles.sectionWrap} ${styles.bgCream}`}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            {data.laws.eyebrow}
          </p>
          <h2 className={styles.sectionHeading}>{data.laws.heading}</h2>

          <div className={styles.lawsGrid}>
            {/* Left: Law List */}
            <div className={styles.lawList}>
              {data.laws.items.map((law, index) => {
                const isExpanded = expandedLawIndex === index;
                return (
                  <div
                    key={law.title}
                    className={`${styles.lawItem} ${isExpanded ? styles.lawItemActive : ""}`}
                    onClick={() => setExpandedLawIndex(isExpanded ? null : index)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setExpandedLawIndex(isExpanded ? null : index);
                      }
                    }}
                  >
                    <div className={styles.lawItemHeader}>
                      <div className={styles.lawItemTitleRow}>
                        <FileText className={`w-5 h-5 ${styles.lawIcon}`} />
                        <div>
                          <h3 className={styles.lawItemTitle}>{law.title}</h3>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 ${styles.lawChevron} ${isExpanded ? "rotate-90 text-navy" : ""}`}
                      />
                    </div>

                    {isExpanded && (
                      <div className={styles.lawItemDetails}>
                        <p>{law.description}</p>
                        {law.keyProvisions && law.keyProvisions.length > 0 && (
                          <ul>
                            {law.keyProvisions.map((provision, pIdx) => (
                              <li key={pIdx}>{provision}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              <div style={{ marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setShowAllLawsModal(true)}
                  className={styles.goldSolidBtn}
                >
                  View All Laws &amp; Documents
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Center: Image (Lady Justice / Supreme Court) */}
            <div className={styles.lawsCenterImageFrame}>
              <Image
                src={data.laws.centerImage}
                alt="Law and Justice Visual"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>

            {/* Right: Side Commitment / Related Topics Card */}
            <div className={styles.sideCommitmentCard}>
              <h3 className={styles.sideCardTitle}>{data.laws.sideCard.title}</h3>
              <p className={styles.sideCardDesc}>{data.laws.sideCard.description}</p>

              <ul className={styles.sideCardList}>
                {data.laws.sideCard.items.map((item, idx) => (
                  <li key={idx} className={styles.sideCardListItem}>
                    <div className={styles.sideCardIcon}>
                      {renderCardIcon(item.icon)}
                    </div>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. SECTION: LANDMARK CASES & EXAMPLES                             */}
      {/* ================================================================= */}
      <section id={`${prefix}cases-examples`} className={`${styles.sectionWrap} ${styles.bgWhite}`}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            {data.cases.eyebrow}
          </p>
          <h2 className={styles.sectionHeading}>{data.cases.heading}</h2>

          <div className={styles.casesGrid}>
            {data.cases.items.map((item) => (
              <div key={item.caseName} className={styles.caseCard}>
                <div>
                  <div className={styles.caseMetaRow}>
                    <span className={styles.caseCourtBadge}>{item.court}</span>
                    <span className={styles.caseYearBadge}>{item.year}</span>
                  </div>
                  <h3 className={styles.caseTitle}>{item.caseName}</h3>
                  <p className={styles.caseSummary}>{item.summary}</p>
                </div>

                <div className={styles.caseImpactBox}>
                  <span className={styles.caseImpactLabel}>Legal Precedent &amp; Impact</span>
                  <p>{item.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 7. SECTION: FAQS & HELPFUL RESOURCES                              */}
      {/* ================================================================= */}
      <section id={`${prefix}faqs`} className={`${styles.sectionWrap} ${styles.bgCream}`}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            {data.faqsSection.eyebrow}
          </p>
          <h2 className={styles.sectionHeading}>{data.faqsSection.heading}</h2>

          <div className={styles.faqResourcesGrid}>
            {/* Left: FAQs Accordion */}
            <div className={styles.faqAccordion}>
              {data.faqsSection.items.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={faq.question}
                    className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
                  >
                    <button
                      type="button"
                      className={styles.faqTrigger}
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <div className={styles.faqQuestionRow}>
                        <span className={styles.faqQuestionIcon}>?</span>
                        <span className={styles.faqQuestionText}>{faq.question}</span>
                      </div>
                      <ChevronRight
                        className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ""}`}
                      />
                    </button>

                    {isOpen && (
                      <div className={styles.faqAnswerPanel}>
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Center: Image with Quote Overlay */}
            <div className={styles.faqCenterVisualFrame}>
              <Image
                src={data.faqsSection.centerImage}
                alt="Unity and Rights Advocacy"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
              />
              <div className={styles.faqCenterOverlay}>
                <p className={styles.faqCenterQuote}>
                  {data.faqsSection.centerQuote}
                </p>
              </div>
            </div>

            {/* Right: Resources Box */}
            <div id={`${prefix}resources`} className={styles.resourcesCard}>
              <h3 className={styles.sideCardTitle}>
                {data.faqsSection.resources.title}
              </h3>
              <ul className={styles.resourcesList}>
                {data.faqsSection.resources.items.map((res, idx) => (
                  <li key={idx} className={styles.resourceListItem}>
                    <BookOpen className={`w-4 h-4 ${styles.resourceIcon}`} />
                    <span>{res.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 8. CALL TO ACTION BANNER                                          */}
      {/* ================================================================= */}
      <section className={styles.ctaBanner} aria-label="Action Banner">
        <div className={styles.ctaBg}>
          <Image
            src="/rights-final-cta-bg.png"
            alt=""
            fill
            sizes="100vw"
          />
        </div>

        <div className={styles.ctaInner}>
          <h2 className={styles.ctaHeading}>{data.cta.heading}</h2>
          <p className={styles.ctaDesc}>{data.cta.description}</p>

          <div className={styles.ctaActions}>
            <Link href="/membership" className={styles.ctaBtnGold}>
              Join HRSJM
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/donation" className={styles.ctaBtnOutline}>
              Make a Donation
            </Link>
            <Link href="/complaint" className={styles.ctaBtnOutline}>
              File a Complaint
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* MODAL: FULL OVERVIEW                                              */}
      {/* ================================================================= */}
      {showFullOverviewModal && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setShowFullOverviewModal(false)}
        >
          <div
            className={styles.modalBox}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setShowFullOverviewModal(false)}
              aria-label="Close Overview Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              DETAILED PERSPECTIVE
            </p>
            <h3 className={styles.sectionHeading} style={{ fontSize: "28px" }}>
              {data.overview.heading}
            </h3>

            <div style={{ color: "var(--color-text-secondary)", lineHeight: 1.7, fontSize: "15px" }}>
              <p style={{ marginBottom: "16px" }}>{data.overview.description1}</p>
              <p style={{ marginBottom: "20px" }}>{data.overview.description2}</p>

              <h4 style={{ color: "var(--color-navy-dark)", fontWeight: 700, margin: "16px 0 10px" }}>
                Key Constitutional &amp; Societal Pillars:
              </h4>
              <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {data.overview.extendedPoints.map((pt, pIdx) => (
                  <li key={pIdx}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL: ALL LAWS & DOCUMENTS                                       */}
      {/* ================================================================= */}
      {showAllLawsModal && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setShowAllLawsModal(false)}
        >
          <div
            className={styles.modalBox}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setShowAllLawsModal(false)}
              aria-label="Close Laws Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              LEGAL COMPENDIUM
            </p>
            <h3 className={styles.sectionHeading} style={{ fontSize: "28px" }}>
              {data.laws.heading}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {data.laws.items.map((law) => (
                <div
                  key={law.title}
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    background: "rgba(247, 244, 236, 0.7)",
                    border: "1px solid var(--color-border)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                    <h4 style={{ color: "var(--color-navy-dark)", fontWeight: 700, fontSize: "16px" }}>
                      {law.title}
                    </h4>
                    {law.badge && (
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-gold-dark)", background: "rgba(250, 210, 92, 0.2)", padding: "2px 8px", borderRadius: "4px" }}>
                        {law.badge}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-secondary)", marginBottom: "8px" }}>
                    {law.description}
                  </p>
                  {law.keyProvisions && (
                    <ul style={{ fontSize: "13px", color: "#102a43", paddingLeft: "18px" }}>
                      {law.keyProvisions.map((pr, idx) => (
                        <li key={idx} style={{ marginBottom: "3px" }}>{pr}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
