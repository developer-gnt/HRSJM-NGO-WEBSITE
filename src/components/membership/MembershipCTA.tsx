import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleDot } from "lucide-react";
import styles from "./membership.module.css";

export default function MembershipCTA() {
  return (
    <section className={styles.cta} aria-labelledby="membership-cta-heading">
      <Image
        src="/membership/membership-cta.png"
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
              Be Part of the Change
            </p>
            <h2 id="membership-cta-heading" className={styles.ctaHeading}>
              <span>Stand With Us.</span>
              <span className={styles.ctaHeadingGold}>
                Create a Better Tomorrow.
              </span>
            </h2>
            <p className={styles.ctaDescription}>
              Your voice, participation and support can help us reach more
              people, strengthen communities and work toward a more just
              society.
            </p>
            <div className={styles.ctaActions}>
              <a href="#membership-form" className={styles.btnGold}>
                Become a Member
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </a>
              <Link href="/contact" className={styles.btnOutline}>
                Contact Us
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
