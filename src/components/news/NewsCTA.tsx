"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollReveal, revealDelay } from "@/hooks/useScrollReveal";
import styles from "./news.module.css";

export default function NewsCTA() {
  const sectionRef = useScrollReveal(styles);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="news-cta-heading"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundImage:
          "linear-gradient(90deg, rgba(3, 29, 56, 0.88) 0%, rgba(3, 29, 56, 0.76) 36%, rgba(3, 29, 56, 0.3) 62%, rgba(3, 29, 56, 0.12) 100%), url('/images/news-cta-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          width: "min(100%, var(--container))",
          margin: "0 auto",
          padding: "0 clamp(24px, 3.1vw, 48px)",
          minHeight: "290px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1.4fr)",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <div
          style={{
            maxWidth: "520px",
            padding: "32px 0",
            position: "relative",
            zIndex: 1,
          }}
        >
          <p
            data-reveal
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              color: "#ffffff",
              fontSize: "11.5px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "10px",
                height: "10px",
                display: "inline-block",
                border: "2px solid #fad25c",
                borderRadius: "50%",
              }}
            />
            STAY INFORMED. STAY INVOLVED.
          </p>

          <h2
            id="news-cta-heading"
            data-reveal
            style={{
              marginTop: "12px",
              color: "#ffffff",
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(34px, 3vw, 52px)",
              fontWeight: "var(--type-display-weight)",
              lineHeight: 1.08,
            }}
          >
            Be a Part of the Movement
          </h2>

          <p
            data-reveal
            style={{
              maxWidth: "420px",
              marginTop: "12px",
              color: "rgba(255,255,255,0.86)",
              fontSize: "var(--type-body-small)",
              lineHeight: 1.6,
            }}
          >
            Read, share and support our work for human rights, dignity and equality.
          </p>

          <div
            data-reveal
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "14px",
              marginTop: "22px",
            }}
          >
            <Link
              href="/donation"
              className={styles.btnGold}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                minHeight: "44px",
                padding: "12px 22px",
                borderRadius: "6px",
                background: "#FAD25C",
                color: "#062F50",
                fontSize: "13.5px",
                fontWeight: 700,
                lineHeight: 1,
                whiteSpace: "nowrap",
                border: "none",
              }}
            >
              Donate Now
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </Link>

            <Link
              href="/membership"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "44px",
                padding: "12px 22px",
                border: "1px solid rgba(255,255,255,0.56)",
                borderRadius: "6px",
                background: "rgba(3, 29, 56, 0.34)",
                color: "#ffffff",
                fontSize: "13.5px",
                fontWeight: 600,
                lineHeight: 1,
                whiteSpace: "nowrap",
                transition: "background-color 200ms ease, border-color 200ms ease",
              }}
            >
              Join Our Movement
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            minHeight: "210px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "rgba(255,255,255,0.8)",
              fontFamily: "var(--font-script), 'Segoe Script', cursive",
              fontSize: "clamp(23px, 2.1vw, 30px)",
              lineHeight: 1.2,
              letterSpacing: "0.02em",
              textShadow: "0 1px 12px rgba(3, 29, 56, 0.28)",
            }}
          >
            <span>People.</span>
            <span>Rights.</span>
            <span>Equality.</span>
            <span>Together.</span>
            <span
              style={{
                display: "block",
                width: "58px",
                height: "3px",
                marginTop: "8px",
                borderRadius: "2px",
                background: "#FAD25C",
                transform: "rotate(-2deg)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
