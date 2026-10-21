import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./benefits.module.css";

export default function BenefitsCTA() {
  return (
    <section className={styles.ctaSection} aria-labelledby="benefits-cta-heading">
      {/* Background Crowd Image & Gradient Scrim */}
      <div className={styles.ctaBg} aria-hidden="true">
        <Image
          src="/membership/membership-cta.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.ctaImg}
        />
        <div className={styles.ctaScrim} />
      </div>

      <div className={styles.container}>
        <div className={styles.ctaInner}>
          {/* Left Content */}
          <div className={styles.ctaContent}>
            <div className={styles.eyebrowLine} aria-hidden="true" />
            <p className={styles.ctaEyebrow}>READY TO MAKE A DIFFERENCE?</p>
            <h2 id="benefits-cta-heading" className={styles.ctaHeading}>
              Join HRSJM Today
            </h2>
            <p className={styles.ctaDescription}>
              Become a member and stand with us for human rights, equality and
              social justice.
            </p>
          </div>

          {/* Right Action Button */}
          <Link href="/membership/categories" className={styles.btnGold}>
            <span>Become a Member</span>
            <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
