"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, X, Users, ArrowRight } from "lucide-react";
import styles from "./help.module.css";

interface HelpHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e?: React.FormEvent) => void;
  onClearSearch: () => void;
  onSuggestionClick: (topic: string) => void;
}

const popularTopics = [
  "Membership",
  "Volunteering",
  "Human Rights",
  "Complaint Process",
  "Donations",
];

export default function HelpHero({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onClearSearch,
  onSuggestionClick,
}: HelpHeroProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(e);
  };

  return (
    <section className={styles.hero} aria-labelledby="help-hero-heading">
      {/* Background Image & Scrim */}
      <div className={styles.heroBg} aria-hidden="true">
        <Image
          src="/images/contact-hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroImg}
        />
        <div className={styles.heroScrim} />
        <div className={styles.heroGlow} />
      </div>

      <div className={styles.container}>
        <div className={styles.heroInner}>
          {/* Left Column: Breadcrumb, Eyebrow, Heading, Search */}
          <div className={styles.heroContent}>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
              <Link href="/" className={styles.breadcrumbLink}>
                Home
              </Link>
              <span className={styles.breadcrumbSeparator} aria-hidden="true">
                &gt;
              </span>
              <span className={styles.breadcrumbCurrent} aria-current="page">
                Help Centre
              </span>
            </nav>

            {/* Eyebrow */}
            <div className={styles.heroEyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              <span>HELP CENTRE</span>
            </div>

            {/* Main Heading */}
            <h1 id="help-hero-heading" className={styles.heroHeading}>
              How can we <span className={styles.heroGold}>help you?</span>
            </h1>

            {/* Supporting Text */}
            <p className={styles.heroDescription}>
              Find answers, guides and resources to make your HRSJM membership
              journey simple and meaningful.
            </p>

            {/* Functional Search Bar */}
            <form
              role="search"
              onSubmit={handleSubmit}
              className={styles.searchForm}
            >
              <Search
                size={20}
                strokeWidth={2.4}
                className={styles.searchIcon}
                aria-hidden="true"
              />

              <input
                id="help-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search for questions, guides or topics..."
                className={styles.searchInput}
                aria-label="Search for questions, guides or topics"
                autoComplete="off"
              />

              {searchQuery.trim().length > 0 && (
                <button
                  type="button"
                  onClick={onClearSearch}
                  className={styles.searchClearBtn}
                  aria-label="Clear search input"
                >
                  <X size={15} strokeWidth={2.5} />
                </button>
              )}

              <button type="submit" className={styles.searchSubmitBtn}>
                Search
              </button>
            </form>

            {/* Quick Suggestions / Popular Topics */}
            <div className={styles.searchSuggestions}>
              <span>Popular searches:</span>
              {popularTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => onSuggestionClick(topic)}
                  className={styles.suggestionTag}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Blended Solidarity Imagery Card */}
          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.heroVisualCard}>
              <Image
                src="/images/contact-hero-bg.jpg"
                alt="HRSJM community hands joined together in solidarity"
                width={540}
                height={380}
                priority
                className={styles.heroVisualImg}
              />
              <div className={styles.heroVisualOverlay} />
              <div className={styles.heroVisualBadge}>
                <div className={styles.heroBadgeIcon}>
                  <Users size={18} strokeWidth={2.4} />
                </div>
                <div className={styles.heroBadgeText}>
                  HRSJM Support Community
                  <span>Standing united for justice and human dignity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
