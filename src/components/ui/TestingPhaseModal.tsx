"use client";

import React, { useEffect, useState } from "react";
import { testingNoticeConfig } from "@/config/testingNotice";
import styles from "./testingModal.module.css";

export default function TestingPhaseModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    if (!testingNoticeConfig.enabled) {
      return;
    }

    if (testingNoticeConfig.displayFrequency === "session") {
      const alreadyAccepted = sessionStorage.getItem("hrsjm_testing_acknowledged");
      if (!alreadyAccepted) {
        setIsOpen(true);
      }
    } else {
      // "always": shows on every visit
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Lock background scrolling while modal is open
    const originalBodyOverflow = document.body.style.overflow;
    const originalDocOverflow = document.documentElement.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Compensate for disappearing scrollbar to avoid layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalDocOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  const handleContinue = () => {
    if (testingNoticeConfig.displayFrequency === "session") {
      sessionStorage.setItem("hrsjm_testing_acknowledged", "true");
    }
    setIsOpen(false);
  };

  // Prevent hydration mismatch or when modal shouldn't render
  if (!mounted || !isOpen || !testingNoticeConfig.enabled) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="testing-modal-title"
      aria-describedby="testing-modal-desc"
    >
      <div className={styles.modalCard}>
        {/* Banner SVG Illustration matching brand navy and gold theme */}
        <div className={styles.bannerWrapper}>
          <svg
            className={styles.bannerSvg}
            viewBox="0 0 540 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Browser Window Base */}
            <rect
              x="30"
              y="16"
              width="480"
              height="250"
              rx="16"
              fill="#FFFFFF"
              stroke="#E5E0D5"
              strokeWidth="2"
            />

            {/* Browser Header Bar in Brand Navy */}
            <path
              d="M30 32C30 23.1634 37.1634 16 46 16H494C502.837 16 510 23.1634 510 32V64H30V32Z"
              fill="#062A4F"
            />

            {/* Window Dots: Red, Brand Gold, Green */}
            <circle cx="56" cy="40" r="7" fill="#EF4444" />
            <circle cx="76" cy="40" r="7" fill="#FAD25C" />
            <circle cx="96" cy="40" r="7" fill="#10B981" />

            {/* Browser Address Bar */}
            <rect
              x="120"
              y="28"
              width="366"
              height="24"
              rx="12"
              fill="#133A63"
            />

            {/* Left Content Placeholder Wireframe Bars */}
            <rect x="70" y="92" width="120" height="34" rx="4" fill="#CBD5E1" />
            <rect x="70" y="142" width="120" height="34" rx="4" fill="#CBD5E1" />
            <rect x="70" y="192" width="120" height="34" rx="4" fill="#CBD5E1" />
            <rect x="70" y="238" width="56" height="32" rx="4" fill="#CBD5E1" />
            <rect x="134" y="238" width="56" height="32" rx="4" fill="#CBD5E1" />

            {/* Center subtle layout divider */}
            <line x1="225" y1="64" x2="225" y2="266" stroke="#F1F5F9" strokeWidth="2" />

            {/* Right side: Globe Icon in Royal Navy with Gold Grid Lines */}
            <circle cx="370" cy="120" r="82" fill="#0C457E" />
            {/* Globe Latitudes & Longitudes */}
            <ellipse
              cx="370"
              cy="120"
              rx="46"
              ry="82"
              fill="none"
              stroke="#FAD25C"
              strokeWidth="3.5"
              strokeOpacity="0.85"
            />
            <ellipse
              cx="370"
              cy="120"
              rx="82"
              ry="46"
              fill="none"
              stroke="#FAD25C"
              strokeWidth="3.5"
              strokeOpacity="0.85"
            />
            <line
              x1="288"
              y1="120"
              x2="452"
              y2="120"
              stroke="#FAD25C"
              strokeWidth="3.5"
              strokeOpacity="0.85"
            />
            <line
              x1="370"
              y1="38"
              x2="370"
              y2="202"
              stroke="#FAD25C"
              strokeWidth="3.5"
              strokeOpacity="0.85"
            />

            {/* Crossed Tools: Screwdriver (Gold handle with Navy grip) */}
            <g transform="translate(390, 200) rotate(-45)">
              {/* Screwdriver Shaft & Tip */}
              <rect x="-14" y="-120" width="28" height="110" rx="3" fill="#E2E8F0" />
              <polygon points="-10,-120 10,-120 7,-142 -7,-142" fill="#94A3B8" />
              {/* Screwdriver Handle in Brand Gold */}
              <rect x="-18" y="-10" width="36" height="85" rx="8" fill="#FAD25C" />
              {/* Grip ridges in Navy */}
              <rect x="-14" y="8" width="28" height="6" rx="3" fill="#062A4F" />
              <rect x="-14" y="24" width="28" height="6" rx="3" fill="#062A4F" />
              <rect x="-14" y="40" width="28" height="6" rx="3" fill="#062A4F" />
            </g>

            {/* Crossed Tools: Wrench (Brand Deep Navy) */}
            <g transform="translate(340, 210) rotate(45)">
              {/* Wrench Handle */}
              <rect x="-16" y="-30" width="32" height="150" rx="8" fill="#062A4F" />
              {/* Wrench Jaw Base */}
              <circle cx="0" cy="-30" r="38" fill="#062A4F" />
              {/* Wrench Open Jaw Cutout */}
              <polygon points="-15,-68 15,-68 15,-30 0,-18 -15,-30" fill="#FFFFFF" />
            </g>
          </svg>
        </div>

        {/* Modal Text Content */}
        <div className={styles.contentWrapper}>
          <span className={styles.badge}>{testingNoticeConfig.badge}</span>
          <h2 id="testing-modal-title" className={styles.title}>
            {testingNoticeConfig.title}
          </h2>
          <p className={styles.subtitle}>{testingNoticeConfig.subtitle}</p>
          <p id="testing-modal-desc" className={styles.description}>
            {testingNoticeConfig.description}
          </p>

          {/* Action Button */}
          <div className={styles.actionGroup}>
            <button
              type="button"
              className={styles.continueButton}
              onClick={handleContinue}
              autoFocus
            >
              {testingNoticeConfig.continueButtonText || "Okay, I understood"}
            </button>
          </div>

          <p className={styles.footerText}>{testingNoticeConfig.footerText}</p>
        </div>
      </div>
    </div>
  );
}
