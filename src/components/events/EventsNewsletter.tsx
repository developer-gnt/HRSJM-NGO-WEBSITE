"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import styles from "./events.module.css";

export default function EventsNewsletter() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section id="events-newsletter" className={styles.newsletter} aria-labelledby="events-newsletter-heading">
      <div className={styles.newsletterInner}>
        <div className={styles.newsletterIcon} aria-hidden="true">
          <Mail size={26} strokeWidth={1.8} />
        </div>

        <div className={styles.newsletterMain}>
          <h2 id="events-newsletter-heading" className={styles.newsletterHeading}>
            Stay Updated on Upcoming Events
          </h2>
          <p className={styles.newsletterSub}>
            Get the latest information about our events, drives and activities
            directly in your inbox.
          </p>
        </div>

        {subscribed ? (
          <p className={styles.newsletterThanks} role="status">
            Thank you for subscribing! You will hear from us soon.
          </p>
        ) : (
          <form
            className={styles.newsletterForm}
            onSubmit={async (event) => {
              event.preventDefault();
              const form = event.currentTarget;
              const emailInput = form.elements.namedItem("email") as HTMLInputElement;
              const emailVal = emailInput?.value?.trim();
              if (emailVal) {
                setSubscribed(true);
                try {
                  await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      formName: "Event Enquiry & Newsletter",
                      name: "Event Updates Subscriber",
                      email: emailVal,
                      subject: "Event Enquiry & Updates Subscription",
                      message: "Citizen subscribed to receive notifications regarding HRSJM events, legal awareness camps, and community drives.",
                    }),
                  });
                } catch (e) {
                  console.warn("Newsletter subscription notification failed:", e);
                }
              }
            }}
          >
            <label htmlFor="events-newsletter-email" className={styles.newsletterLabel}>
              Email address
            </label>
            <input
              id="events-newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-label="Email address"
              placeholder="Enter your email address"
              className={styles.newsletterInput}
            />
            <button type="submit" className={styles.newsletterButton}>
              Subscribe
              <Send size={15} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}