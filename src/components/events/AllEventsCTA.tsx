import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./allEvents.module.css";

export default function AllEventsCTA() {
  return (
    <section className={styles.cta} aria-labelledby="all-events-cta-heading">
      <div className={styles.ctaInner}>
        <p className={styles.ctaEyebrow}>
          Get Involved
        </p>
        <h2 id="all-events-cta-heading" className={styles.ctaHeading}>
          Be Part of the Change
        </h2>
        <p className={styles.ctaDesc}>
          Join our events, programs and community initiatives.
        </p>
        <div className={styles.ctaAction}>
          <Link href="/membership" className={styles.btnGold}>
            Join Our Movement
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </Link>
          <Link href="/donation" className={styles.btnGhost}>
            Support Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}