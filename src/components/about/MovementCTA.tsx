import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./about.module.css";

interface MovementCTAProps {
  onOpenJoin: () => void;
}

export default function MovementCTA({ onOpenJoin }: MovementCTAProps) {
  return (
    <section className={styles.cta} aria-label="Join our movement">
      <div className={styles.ctaBanner}>
        {/* Background layer: panoramic mountain landscape with soft atmospheric overlays */}
        <div className={styles.ctaBgLayer}>
          <Image
            src="/assets/about_cta_panoramic.png"
            alt="Group of people helping one another climb a rocky mountain summit in solidarity"
            fill
            priority
            sizes="100vw"
            className={styles.ctaBgImage}
          />
          <div className={styles.ctaGradOverlayLeft} aria-hidden="true" />
          <div className={styles.ctaGradOverlayRight} aria-hidden="true" />
          <div className={styles.ctaGradOverlaySubtle} aria-hidden="true" />
        </div>

        {/* Panoramic Content Grid (Headline, Mountain Center, Message + CTA, Quote) */}
        <div className={styles.ctaContainer}>
          {/* 1. Left Section – Main Heading */}
          <div className={styles.ctaColLeft}>
            <h2 className={styles.ctaHeadline}>
              Together<br />
              for a More Just<br />
              and Equal World
            </h2>
          </div>

          {/* 2. Center Section – Panoramic climbers window / Mobile cropped image */}
          <div className={styles.ctaColCenter}>
            <div className={styles.ctaMobileImageWrap}>
              <Image
                src="/assets/about_cta_panoramic.png"
                alt="People helping each other climb a mountain summit in solidarity"
                width={720}
                height={315}
                sizes="(max-width: 767px) 92vw, 420px"
                className={styles.ctaMobileImage}
              />
            </div>
          </div>

          {/* 3. Center-Right Section – Supporting Message & CTA button */}
          <div className={styles.ctaColMessage}>
            <p className={styles.ctaParagraph}>
              Be part of a movement that stands for human rights, dignity and
              social justice. Join hands with HRSJM to create real and lasting
              change.
            </p>
            <button
              onClick={onOpenJoin}
              type="button"
              className={styles.ctaButton}
              aria-label="Join Our Movement"
            >
              <span>Join Our Movement</span>
              <ArrowRight
                size={16}
                strokeWidth={2.4}
                className={styles.ctaButtonArrow}
              />
            </button>
          </div>

          {/* 4. Right Section – Inspirational Quote */}
          <div className={styles.ctaColQuote}>
            <div className={styles.ctaQuoteBox}>
              <span className={styles.quoteMarkOpen} aria-hidden="true">
                “
              </span>
              <blockquote className={styles.quoteText}>
                Stronger<br />
                Communities,<br />
                Brighter<br />
                Tomorrows.
              </blockquote>
              <span className={styles.quoteMarkClose} aria-hidden="true">
                ”
              </span>
              <div className={styles.quoteUnderlineWrap} aria-hidden="true">
                <svg
                  viewBox="0 0 140 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.quoteUnderlineSvg}
                >
                  <path
                    d="M4 9C40 3 96 3 136 7"
                    stroke="#d9a928"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
