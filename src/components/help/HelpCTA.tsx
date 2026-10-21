import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./help.module.css";

export default function HelpCTA() {
  return (
    <section className={styles.ctaSection} aria-labelledby="help-cta-heading">
      {/* Background Graphic & Scrim */}
      <div className={styles.ctaBg} aria-hidden="true">
        <Image
          src="/images/contact/contact-cta.jpg"
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
            <div className={styles.ctaEyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              <span>STILL HAVE QUESTIONS?</span>
            </div>

            <h2 id="help-cta-heading" className={styles.ctaHeading}>
              We&apos;re Here to Help
            </h2>

            <p className={styles.ctaDescription}>
              If you couldn&apos;t find what you&apos;re looking for, feel free
              to reach out. Our team is happy to assist you.
            </p>
          </div>

          {/* Right Action */}
          <Link href="/contact" className={styles.ctaButton}>
            <span>Contact Us</span>
            <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
