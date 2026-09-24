import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./contact.module.css";

export default function ContactCTA() {
  return (
    <section className={styles.contactCta} aria-labelledby="contact-cta-heading">
      <div className={styles.contactCta__container}>
        <div className={styles.contactCta__heading}>
          <h2 id="contact-cta-heading" className={styles.contactCta__title}>
            Together
            <br />
            for a More Just
            <br />
            and Equal World
          </h2>
        </div>

        <div className={styles.contactCta__content}>
          <p className={styles.contactCta__description}>
            Be part of a movement that stands for human rights, dignity and
            social justice. Join hands with HRSJM to create real and lasting
            change.
          </p>
          <Link href="/join-us" className={styles.contactCta__button}>
            Join Our Movement
            <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.contactCta__quote}>
          <p className={styles.contactCta__quoteText}>
            <span className={styles.contactCta__quoteMark} aria-hidden="true">
              &ldquo;
            </span>
            Stronger
            <br />
            Communities
            <br />
            Brighter
            <br />
            Tomorrows.
            <span className={styles.contactCta__quoteMarkEnd} aria-hidden="true">
              &rdquo;
            </span>
          </p>
          <span className={styles.contactCta__quoteStroke} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}