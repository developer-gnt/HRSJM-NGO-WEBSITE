"use client";

import { useState } from "react";
import HelpHero from "./HelpHero";
import HelpTopics from "./HelpTopics";
import HelpFAQ from "./HelpFAQ";
import HelpCTA from "./HelpCTA";
import styles from "./help.module.css";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToFaqs = () => {
    // Smooth scroll down to the FAQ section to display matching answers
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const section = document.getElementById("help-faq-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim().length > 0) {
      scrollToFaqs();
    }
  };

  const handleSuggestionClick = (topic: string) => {
    setSearchQuery(topic);
    scrollToFaqs();
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <main className={styles.helpPage}>
      {/* 1. Help Centre Hero with functional search */}
      <HelpHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onClearSearch={handleClearSearch}
        onSuggestionClick={handleSuggestionClick}
      />

      {/* 2. Help Topics category cards */}
      <HelpTopics />

      {/* 3. Membership FAQs with help card & single-open accordion */}
      <HelpFAQ
        searchQuery={searchQuery}
        onClearSearch={handleClearSearch}
      />

      {/* 4. Contact Support CTA */}
      <HelpCTA />
    </main>
  );
}
