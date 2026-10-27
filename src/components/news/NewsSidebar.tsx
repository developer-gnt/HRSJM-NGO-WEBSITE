"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Quote as QuoteIcon } from "lucide-react";
import { revealDelay, revealStagger } from "@/hooks/useScrollReveal";
import styles from "./news.module.css";

/* Trending + Newsletter sidebar shared by the Latest News section (News &
   Blog page) and the All Articles page, so both stay identical. */
const trending = [
  "New Guidelines on Child Rights Protection",
  "Success Story: Community Support in Action",
  "Women's Rights and Legal Protection in India",
  "HRSJM Support for Community Initiatives",
  "Civic Rights Challenges and Opportunities",
];

export default function NewsSidebar() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <aside className={styles.latestSidebar}>
      <div className={styles.trendingCard} data-reveal style={revealDelay(1)}>
        <h3 className={styles.sidebarTitle}>Trending Articles</h3>
        <ol className={styles.trendingList}>
          {trending.map((title, index) => (
            <li key={title} data-reveal-item style={revealStagger(index)}>
              <Link href="/articles" className={styles.trendingItem}>
                <span className={styles.trendingNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <span className={styles.trendingTitle}>{title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.newsletterCard} data-reveal style={revealDelay(2)}>
        <h3 className={styles.sidebarTitle}>Subscribe to Our Newsletter</h3>
        <p className={styles.newsletterDesc}>
          Get the latest updates, stories and human rights resources
          delivered to your inbox.
        </p>
        <form
          className={styles.newsletterForm}
          onSubmit={(event) => {
            event.preventDefault();
            setSubscribed(true);
          }}
        >
          <label className={styles.visuallyHidden} htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="Enter your email address"
            className={styles.newsletterInput}
          />
          <button type="submit" className={styles.newsletterButton}>
            Subscribe
            <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </form>
        {subscribed && (
          <p className={styles.newsletterThanks} role="status">
            Thank you - you&apos;re on the list.
          </p>
        )}
      </div>

      <p className={styles.sidebarQuote} aria-hidden="true">
        <span className={styles.quoteMark}>
          <QuoteIcon size={30} strokeWidth={0} fill="currentColor" aria-hidden="true" />
        </span>
        Awareness today,
        <br />
        a fairer tomorrow.
        <span className={styles.scriptStroke} />
      </p>
    </aside>
  );
}
