"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Quote as QuoteIcon } from "lucide-react";
import { revealDelay, revealStagger } from "@/hooks/useScrollReveal";
import styles from "./news.module.css";

interface TrendingItem {
  title: string;
  href: string;
}

export default function NewsSidebar() {
  const [subscribed, setSubscribed] = useState(false);
  const [trendingList, setTrendingList] = useState<TrendingItem[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function loadTrending() {
      try {
        const res = await fetch("/api/news?status=PUBLISHED&limit=5", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.items) && data.items.length > 0) {
          const mapped = data.items.slice(0, 5).map((item: any) => ({
            title: item.title,
            href: `/news/${item.slug || item.id}`,
          }));
          if (isMounted) setTrendingList(mapped);
        }
      } catch (err) {
        console.warn("Could not load trending news:", err);
      }
    }
    loadTrending();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <aside className={styles.latestSidebar}>
      {trendingList.length > 0 && (
        <div className={styles.trendingCard} data-reveal style={revealDelay(1)}>
          <h3 className={styles.sidebarTitle}>Trending Articles</h3>
          <ol className={styles.trendingList}>
            {trendingList.map((item, index) => (
              <li key={item.title} data-reveal-item style={revealStagger(index)}>
                <Link href={item.href} className={styles.trendingItem}>
                  <span className={styles.trendingNumber} aria-hidden="true">
                    {index + 1}
                  </span>
                  <span className={styles.trendingTitle}>{item.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}

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
          <button
            type="submit"
            className={styles.newsletterSubmit}
            aria-label="Subscribe to newsletter"
          >
            <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </form>
        {subscribed && (
          <p className={styles.newsletterSuccess} role="status">
            Thank you for subscribing!
          </p>
        )}
      </div>

      <div className={styles.quoteCard} data-reveal style={revealDelay(3)}>
        <span className={styles.quoteIcon} aria-hidden="true">
          <QuoteIcon size={24} />
        </span>
        <blockquote className={styles.quoteText}>
          &ldquo;Where, after all, do universal human rights begin? In small
          places, close to home - so close and so small that they cannot be
          seen on any maps of the world.&rdquo;
        </blockquote>
        <cite className={styles.quoteAuthor}>- Eleanor Roosevelt</cite>
      </div>
    </aside>
  );
}
