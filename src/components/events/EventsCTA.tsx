import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./events.module.css";

export default function EventsCTA() {
  return (
    <section className={styles.eventsCta} aria-labelledby="events-cta-heading">
      <div className={styles.eventsCtaInner}>
        <div className={styles.eventsCtaMain}>
          <p className={styles.eventsCtaEyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Be a Part of the Change
          </p>
          <h2 id="events-cta-heading" className={styles.eventsCtaHeading}>
            Join Our Events.
            <br />
            Create a Stronger Tomorrow.
          </h2>
          <p className={styles.eventsCtaDesc}>
            Participate, volunteer or support our events and activities
            to build a more just, equal and inclusive India.
          </p>
          <div className={styles.eventsCtaAction}>
            <Link href="#upcoming-events" className={styles.btnGold}>
              View Upcoming Events
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <Link href="/membership" className={styles.btnGhost}>
              Join as a Volunteer
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