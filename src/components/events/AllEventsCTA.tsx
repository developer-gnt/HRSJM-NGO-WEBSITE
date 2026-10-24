import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./allEvents.module.css";

export default function AllEventsCTA() {
  return (
    <section className={styles.eventsCta} aria-labelledby="all-events-cta-heading">
      <div className={styles.eventsCtaInner}>
        <div className={styles.eventsCtaMain}>
          <p className={styles.eventsCtaEyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Be a Part of the Change
          </p>
          <h2 id="all-events-cta-heading" className={styles.eventsCtaHeading}>
            Join Our Events.
            <br />
            Create a Stronger Tomorrow.
          </h2>
          <p className={styles.eventsCtaDesc}>
            Participate, volunteer or support our events and community initiatives
            to build a more just, equal and inclusive India.
          </p>
          <div className={styles.eventsCtaAction}>
            <Link href="/membership" className={styles.btnGold}>
              Join Our Movement
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <Link href="/donation" className={styles.btnGhost}>
              Support Our Work
            </Link>
          </div>
        </div>

        <p className={styles.ctaScriptNote} aria-hidden="true">
          Small
          <br />
          Actions
          <br />
          Create
          <br />
          Big Change.
          <span className={styles.scriptStroke} />
        </p>
      </div>
    </section>
  );
}