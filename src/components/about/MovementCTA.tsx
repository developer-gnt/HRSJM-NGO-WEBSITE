import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./about.module.css";

interface MovementCTAProps {
  onOpenJoin: () => void;
}

export default function MovementCTA({ onOpenJoin }: MovementCTAProps) {
  return (
    <section className={styles.cta}>
      {/* 1. Desktop & tablet (>= 640px): full-width banner with hidden join hotspot */}
      <div className={styles.ctaDesktop}>
        <div className={styles.ctaBannerWrap}>
          <Image
            src="/assets/cta_banner_2x.png"
            alt="Together for a More Just and Equal World - Join hands with HRSJM to create real and lasting change"
            fill
            sizes="100vw"
            className={styles.ctaBannerImg}
          />

          {/* Invisible interactive hotspot aligned with the banner's Join button */}
          <button
            onClick={onOpenJoin}
            type="button"
            aria-label="Join Our Movement"
            title="Join Our Movement"
            className={styles.ctaHotspot}
            style={{
              left: "53.5%",
              top: "61.1%",
              width: "13.0%",
              height: "17.4%",
            }}
          />
        </div>
      </div>

      {/* 2. Mobile (< 640px): readable card with climbers artwork */}
      <div className={styles.ctaMobile}>
        <div className={styles.ctaMobileInner}>
          {/* Headline */}
          <h2 className={styles.ctaMobileTitle}>
            Together <br />
            for a More Just <br />
            and Equal World
          </h2>

          {/* Climbers image */}
          <div className={styles.ctaClimbersWrap}>
            <Image
              src="/assets/cta_climbers_clean.png"
              alt="People helping each other climb a mountain summit in solidarity"
              width={560}
              height={288}
              sizes="280px"
              className={styles.ctaClimbersImg}
            />
          </div>

          {/* Supporting copy */}
          <p className={styles.ctaMobileCopy}>
            Be part of a movement that stands for human rights, dignity and
            social justice. Join hands with HRSJM to create real and lasting
            change.
          </p>

          {/* Action button */}
          <button
            onClick={onOpenJoin}
            type="button"
            className={styles.ctaMobileButton}
          >
            <span>Join Our Movement</span>
            <ArrowRight size={16} />
          </button>

          {/* Handwritten quote */}
          <div className={styles.ctaMobileQuoteWrap}>
            <p className={styles.ctaMobileQuote}>
              “Stronger Communities Brighter Tomorrows.”
            </p>
            <div className={styles.ctaMobileUnderline}>
              <svg
                viewBox="0 0 100 12"
                fill="none"
                style={{ width: "100%", height: "100%" }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6C30 2 70 2 96 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
