"use client";

import { Playfair_Display } from "next/font/google";
import HistoryHero from "./HistoryHero";
import HistoryBeginning from "./HistoryBeginning";
import HistoryNationwide from "./HistoryNationwide";
import HistoryJourneyService from "./HistoryJourneyService";
import HistoryPhilosophy from "./HistoryPhilosophy";
import HistoryFutureVision from "./HistoryFutureVision";
import HistoryCta from "./HistoryCta";
import styles from "./our-history.module.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export default function OurHistoryPage() {
  return (
    <main className={`${styles.page} ${playfair.variable}`}>
      {/* 1. Hero with Breadcrumb & Artwork */}
      <HistoryHero />

      {/* 2. Our Beginning: Sprout & Founding Purpose */}
      <HistoryBeginning />

      {/* 3. From a Vision to a Nationwide Mission: India Map Montage */}
      <HistoryNationwide />

      {/* 4. Our Journey of Service: 7 Pastel Cards */}
      <HistoryJourneyService />

      {/* 5. Our Philosophy: No Expectation - Only Contribution (Navy) */}
      <HistoryPhilosophy />

      {/* 6. Our Vision for the Future: Summit Sunrise */}
      <HistoryFutureVision />

      {/* 7. Movement CTA: History is Created by People */}
      <HistoryCta />
    </main>
  );
}
