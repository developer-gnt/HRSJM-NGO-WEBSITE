"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Link as LinkIcon,
  Lightbulb,
  ArrowRight,
  Check,
  ChevronRight,
} from "lucide-react";
import type { NewsArticleDetail } from "@/data/newsDetailData";
import { trendingArticles } from "@/data/newsDetailData";
import styles from "./newsArticleDetail.module.css";

// Brand icons as clean inline SVGs
function FacebookIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TwitterIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function WhatsappIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function GoldQuoteIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={(size * 18) / 24} viewBox="0 0 24 18" fill="#f59e0b" style={{ display: "block" }}>
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.324 1.2-4.5 3.3-4.5 5.093.5-.2 1.1-.3 1.7-.3 2.1 0 3.7 1.6 3.7 3.7 0 2.1-1.6 3.7-3.7 3.7-.9 0-1.7-.4-2.544-1.073zm11 0C14.553 16.227 14 15 14 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.324 1.2-4.5 3.3-4.5 5.093.5-.2 1.1-.3 1.7-.3 2.1 0 3.7 1.6 3.7 3.7 0 2.1-1.6 3.7-3.7 3.7-.9 0-1.7-.4-2.544-1.073z" />
    </svg>
  );
}

interface Props {
  data: NewsArticleDetail;
}

export default function NewsArticleDetailView({ data }: Props) {
  const [copied, setCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Smooth scroll handler for TOC items
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Copy link handler
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Social share URLs
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = encodeURIComponent(data.title);
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${shareTitle}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${shareTitle}%20${encodeURIComponent(currentUrl)}`;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail("");
      }, 4000);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* ========================================================= */}
        {/* 1. BREADCRUMBS                                            */}
        {/* ========================================================= */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">
            <ChevronRight size={12} />
          </span>
          <Link href="/news" className={styles.breadcrumbLink}>
            News &amp; Blog
          </Link>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">
            <ChevronRight size={12} />
          </span>
          <span className={styles.breadcrumbLink}>{data.category}</span>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">
            <ChevronRight size={12} />
          </span>
          <span className={styles.breadcrumbCurrent}>{data.title}</span>
        </nav>

        {/* ========================================================= */}
        {/* 2. ARTICLE HEADER                                         */}
        {/* ========================================================= */}
        <header className={styles.articleHeader}>
          <span className={styles.categoryEyebrow}>{data.category}</span>
          <h1 className={styles.articleTitle}>{data.title}</h1>
          <p className={styles.articleSubtitle}>{data.subtitle}</p>

          <div className={styles.metaRow}>
            <div className={styles.metaLeft}>
              <Calendar size={15} className={styles.metaIcon} />
              <span>
                {data.date} &bull; {data.readTime}
              </span>
            </div>

            <div className={styles.shareRow}>
              <span className={styles.shareLabel}>Share:</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className={styles.shareBtn}
                title={copied ? "Link Copied!" : "Copy link"}
                aria-label="Copy article link"
              >
                {copied ? <Check size={14} /> : <LinkIcon size={14} />}
              </button>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
                title="Share on Facebook"
                aria-label="Share on Facebook"
              >
                <FacebookIcon size={14} />
              </a>
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
                title="Share on X (Twitter)"
                aria-label="Share on X"
              >
                <TwitterIcon size={14} />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
                title="Share on LinkedIn"
                aria-label="Share on LinkedIn"
              >
                <LinkedinIcon size={14} />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
                title="Share on WhatsApp"
                aria-label="Share on WhatsApp"
              >
                <WhatsappIcon size={14} />
              </a>
            </div>
          </div>
        </header>

        {/* ========================================================= */}
        {/* 3. MAIN LAYOUT (ARTICLE + STICKY SIDEBAR)                 */}
        {/* ========================================================= */}
        <div className={styles.layoutGrid}>
          {/* Main Column */}
          <main className={styles.mainColumn}>
            {/* Banner Image */}
            <div className={styles.bannerWrapper}>
              <Image
                src={data.bannerImage}
                alt={data.title}
                fill
                priority
                sizes="(max-width: 991px) 100vw, 820px"
                className={styles.bannerImage}
              />
            </div>

            {/* Summary Callout Box */}
            <div className={styles.summaryCallout}>
              <p className={styles.summaryText}>{data.summaryCallout}</p>
            </div>

            {/* Content Sections */}
            {data.sections.map((sec) => (
              <section key={sec.id} id={sec.id} className={styles.articleSection}>
                <h2 className={styles.sectionHeading}>{sec.heading}</h2>

                {sec.paragraphs.map((p, idx) => (
                  <p key={idx} className={styles.paragraph}>
                    {p}
                  </p>
                ))}

                {/* Numbered Steps / Feature List if present */}
                {sec.steps && sec.steps.length > 0 && (
                  <ul className={styles.stepsList}>
                    {sec.steps.map((st) => (
                      <li key={st.number} className={styles.stepItem}>
                        <span className={styles.stepBadge}>{st.number}</span>
                        <p className={styles.stepText}>{st.text}</p>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Testimonial Cards if present */}
                {sec.testimonials && sec.testimonials.length > 0 && (
                  <div className={styles.testimonialsGrid}>
                    {sec.testimonials.map((t, tIdx) => (
                      t.cardPhoto ? (
                        <div key={tIdx} className={styles.storyCard}>
                          <div className={styles.storyCardMedia}>
                            <Image
                              src={t.cardPhoto}
                              alt={t.name}
                              fill
                              sizes="(max-width: 639px) 100vw, 360px"
                              style={{ objectFit: "cover", objectPosition: "center" }}
                            />
                          </div>
                          <div className={styles.storyCardBody}>
                            <div style={{ marginBottom: "8px" }}>
                              <GoldQuoteIcon size={22} />
                            </div>
                            <p className={styles.quoteText}>&ldquo;{t.quote.replace(/^[“”"']+|[“”"']+$/g, "")}&rdquo;</p>
                            <div className={styles.authorMeta}>
                              <span className={styles.authorName}>
                                {t.name}, {t.role}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div key={tIdx} className={styles.testimonialCard}>
                          <div className={styles.testimonialTop}>
                            {t.avatar && (
                              <div className={styles.avatarWrapper}>
                                <Image
                                  src={t.avatar}
                                  alt={t.name}
                                  fill
                                  sizes="52px"
                                  className={styles.avatarImage}
                                />
                              </div>
                            )}
                            <div className={styles.testimonialBody}>
                              <div style={{ marginBottom: "6px" }}>
                                <GoldQuoteIcon size={20} />
                              </div>
                              <p className={styles.quoteText}>&ldquo;{t.quote.replace(/^[“”"']+|[“”"']+$/g, "")}&rdquo;</p>
                              <div className={styles.authorMeta}>
                                <span className={styles.authorName}>
                                  {t.name}, {t.role}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* In-Article Call to Action Banner */}
            <div className={styles.ctaBanner}>
              <div className={styles.ctaLeft}>
                <div className={styles.ctaIconCircle}>
                  <Lightbulb size={24} />
                </div>
                <div>
                  <h3 className={styles.ctaHeading}>{data.cta.heading}</h3>
                  <p className={styles.ctaDesc}>{data.cta.description}</p>
                </div>
              </div>
              <Link href={data.cta.buttonHref} className={styles.ctaButton}>
                {data.cta.buttonText}
                <ArrowRight size={15} />
              </Link>
            </div>
          </main>

          {/* Sticky Sidebar */}
          <aside className={styles.sidebar}>
            {/* Widget 1: In This Article (TOC) */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>In This Article</h3>
              <ul className={styles.tocList}>
                {data.sections.map((sec, idx) => (
                  <li key={sec.id} className={styles.tocItem}>
                    <span className={styles.tocBadge}>{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={styles.tocLink}
                      style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer" }}
                    >
                      {sec.tocTitle}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Widget 2: Trending Articles */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Trending Articles</h3>
              <ul className={styles.trendingList}>
                {trendingArticles.map((art, idx) => (
                  <li key={idx} className={styles.trendingItem}>
                    <Link href={art.href} className={styles.trendingMedia}>
                      <Image
                        src={art.image}
                        alt={art.title}
                        fill
                        sizes="56px"
                        className={styles.trendingImage}
                      />
                    </Link>
                    <Link href={art.href} className={styles.trendingTitle}>
                      {art.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Widget 3: Newsletter Box */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Subscribe to Our Newsletter</h3>
              <p className={styles.newsletterDesc}>
                Get the latest updates, stories and human rights resources delivered to your inbox.
              </p>
              {newsletterSubscribed ? (
                <div
                  style={{
                    padding: "10px 14px",
                    background: "#ecfdf5",
                    color: "#065f46",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className={styles.newsletterInput}
                  />
                  <button type="submit" className={styles.newsletterBtn}>
                    Subscribe
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>

            {/* Widget 4: Inspirational Quote Poster */}
            {data.sidebarQuotePoster?.image && (
              <div className={styles.quotePosterWrapper}>
                <Image
                  src={data.sidebarQuotePoster.image}
                  alt="Inspirational Quote"
                  fill
                  sizes="340px"
                  className={styles.quotePosterImage}
                />
              </div>
            )}
          </aside>
        </div>

        {/* ========================================================= */}
        {/* 4. BOTTOM RELATED ARTICLES                                */}
        {/* ========================================================= */}
        <section className={styles.relatedSection} aria-labelledby="related-heading">
          <div className={styles.relatedHeader}>
            <h2 id="related-heading" className={styles.relatedHeading}>
              Related Articles
            </h2>
            <Link href="/news" className={styles.viewAllLink}>
              View All Articles
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className={styles.relatedGrid}>
            {data.relatedArticles.map((art) => (
              <Link key={art.slug} href={`/news/${art.slug}`} className={styles.relatedCard}>
                <div className={styles.relatedMedia}>
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 991px) 50vw, 380px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.relatedBody}>
                  <span className={styles.relatedCategory}>{art.category}</span>
                  <h3 className={styles.relatedTitle}>{art.title}</h3>
                  <div className={styles.relatedFooter}>
                    <span className={styles.relatedMeta}>
                      {art.date} &bull; {art.readTime}
                    </span>
                    <span className={styles.relatedArrow}>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
