import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleDot } from "lucide-react";
import styles from "./donation.module.css";

export default function DonationCTA() {
  return (
    <section className={styles.cta} aria-labelledby="donation-cta-heading">
      <Image
        src="/donation/donation-cta.png"
        alt=""
        fill
        sizes="100vw"
        className={styles.ctaImage}
        aria-hidden="true"
      />
      <div className={styles.ctaScrim} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaContent}>
            <p className={styles.ctaEyebrow}>
              <CircleDot size={15} strokeWidth={2} aria-hidden="true" />
              Be a Part of the Change
            </p>
            <h2 id="donation-cta-heading" className={styles.ctaHeading}>
              Together for a More Just Tomorrow
            </h2>
            <p className={styles.ctaDescription}>
              Your support helps us reach more people, protect rights and
              create positive change.
            </p>
            <div className={styles.ctaActions}>
              <a href="#donate" className={styles.btnGold}>
                Donate Now
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </a>
              <Link href="/membership" className={styles.btnOutline}>
                Join Our Movement
              </Link>
            </div>
          </div>

          <p className={styles.ctaScript} aria-hidden="true">
            Small actions
            <br />
            create big change.
            <span className={styles.ctaScriptLine} />
          </p>
        </div>
      </div>
    </section>
  );
}
