"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, BookOpen, Sparkles } from "lucide-react";
import styles from "./emergency.module.css";

const hopePills = [
  { label: "Real People", icon: Users },
  { label: "Real Stories", icon: BookOpen },
  { label: "Real Impact", icon: Sparkles },
];

export default function EmergencyHopeBanner() {
  return (
    <section className={styles.hopeBannerSection} aria-label="Be a part of the change">
      <div className={styles.container}>
        <div className={styles.hopeGrid}>
          {/* Left: Clasping Hands Image */}
          <div className={styles.hopeHandsWrap}>
            <Image
              src="/images/donation/emergency/hope-hands-hd.jpg"
              alt="Hands reaching out in support and solidarity"
              fill
              sizes="(max-width: 1024px) 100vw, 320px"
              className={styles.hopeHandsImg}
            />
          </div>

          {/* Center: Hope Copy & CTA */}
          <div className={styles.hopeContent}>
            <span className={styles.hopeEyebrow}>BE A PART OF THE CHANGE</span>
            <h2 className={styles.hopeHeading}>Your Support Brings Hope</h2>
            <p className={styles.hopeText}>
              Join us in helping those who need urgent support. Together we can
              save lives, rebuild homes and create a safer, more equal society.
            </p>
            <div className={styles.hopeBtnRow}>
              <Link href="/donation#donate" className={styles.btnDonatePrimary}>
                Donate Now
                <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
              </Link>
              <Link href="/contact" className={styles.btnRequestHelp}>
                Request Help
                <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right: Trust Badges Column */}
          <div className={styles.hopePillsCol}>
            {hopePills.map((pill) => {
              const Icon = pill.icon;
              return (
                <div key={pill.label} className={styles.hopeTrustPill}>
                  <Icon size={18} strokeWidth={2.2} className={styles.hopeTrustIcon} aria-hidden="true" />
                  <span>{pill.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
