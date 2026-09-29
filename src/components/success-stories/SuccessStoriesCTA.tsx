import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./successStories.module.css";

export default function SuccessStoriesCTA() {
  return (
    <section className={styles.cta} aria-labelledby="success-stories-cta-heading">
      <div className={styles.ctaInner}>
        <p className={styles.ctaEyebrow}>Get Involved</p>
        <h2 id="success-stories-cta-heading" className={styles.ctaHeading}>
          Be Part of the Next Story
        </h2>
        <p className={styles.ctaDesc}>
          Every success story begins with someone choosing to act. Join us or
          support our work to create the next story of change.
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