"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import {
  ArrowRight,
  Quote as QuoteIcon,
} from "lucide-react";
import { useScrollReveal, revealDelay, revealStagger } from "@/hooks/useScrollReveal";
import styles from "./news.module.css";

interface Article {
  image: string;
  alt: string;
  category: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  imagePosition?: string;
}

const articles: Article[] = [
  {
    image: "/images/story-6.png",
    alt: "Village elder in Maharashtra looking hopefully into the distance",
    category: "Legal Insights",
    title: "Understanding Your Right to Information (RTI)",
    description:
      "A practical guide to filing RTI applications and using transparency as a tool for everyday accountability.",
    date: "Sep 20, 2025",
    readTime: "6 min read",
  },
  {
    image: "/images/story-2.png",
    alt: "A young student attending class in a government school",
    category: "Success Stories",
    title: "How a Small Step in Education Changed a Community",
    description:
      "How a small initiative in education brought lasting change to a village community.",
    date: "Sep 19, 2025",
    readTime: "6 min read",
  },
  {
    image: "/images/story-3.png",
    alt: "A woman wearing a traditional headscarf in her neighbourhood",
    category: "Women's Rights",
    title: "Women's Rights: Progress and the Road Ahead",
    description:
      "Key legal protections, challenges and how we can build safer communities.",
    date: "Sep 18, 2025",
    readTime: "7 min read",
  },
  {
    image: "/images/story-1.png",
    alt: "Community members gathered together in an urban settlement",
    category: "Events & Activities",
    title: "HRSJM Community Outreach Program in Maharashtra",
    description:
      "An overview of our recent awareness drive and community support program.",
    date: "Sep 14, 2025",
    readTime: "4 min read",
  },
  {
    image: "/images/story-5.png",
    alt: "A smiling child in a classroom full of students",
    category: "Children's Rights",
    title: "Child Rights: Building a Safer and Brighter Future",
    description:
      "Why child protection matters and what can be done at the local level.",
    date: "Sep 13, 2025",
    readTime: "6 min read",
  },
  {
    image: "/images/news-hero-bg.png",
    imagePosition: "center 72%",
    alt: "Newspaper front page reading Human Rights — A Stronger India",
    category: "Media Coverage",
    title: "HRSJM in the News: Recent Media Highlights",
    description:
      "Coverage of our latest initiatives, events and campaigns across India.",
    date: "Sep 12, 2025",
    readTime: "3 min read",
  },
];

const trending = [
  "New Guidelines on Child Rights Protection",
  "Success Story: Community Support in Action",
  "Women's Rights and Legal Protection in India",
  "HRSJM Support for Community Initiatives",
  "Civic Rights Challenges and Opportunities",
];

export default function LatestNews() {
  const sectionRef = useScrollReveal(styles);
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section ref={sectionRef} className={styles.latest} aria-labelledby="latest-heading">
      <div className={styles.sectionInner}>
        <div className={styles.latestGrid}>
          <div className={styles.latestMain}>
            <div className={styles.latestHeader} data-reveal>
              <div>
                <p className={styles.sectionEyebrow}>
                  <span className={styles.eyebrowDot} aria-hidden="true" />
                  Latest Articles
                </p>
                <h2 id="latest-heading" className={styles.sectionTitle}>
                  Latest News &amp; Updates
                </h2>
              </div>
              <Link href="#latest-news" className={styles.viewAll}>
                View All Articles
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
              </Link>
            </div>

            <div className={styles.articleGrid}>
              {articles.map(
                ({ image, alt, category, title, description, date, readTime, imagePosition }, index) => (
                  <article
                    key={title}
                    className={styles.articleCard}
                    data-reveal-item
                    style={revealStagger(index)}
                  >
                    <Link href="#latest-news" className={styles.articleMedia} tabIndex={-1} aria-hidden="true">
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 340px"
                        style={{
                          objectFit: "cover",
                          ...(imagePosition ? { objectPosition: imagePosition } : {}),
                        }}
                      />
                    </Link>

                    <div className={styles.articleBody}>
                      <p className={styles.articleCategory}>{category}</p>
                      <h3 className={styles.articleTitle}>
                        <Link href="#latest-news">{title}</Link>
                      </h3>
                      <p className={styles.articleDesc}>{description}</p>
                      <div className={styles.articleFooter}>
                        <span className={styles.articleMeta}>
                          {date} &bull; {readTime}
                        </span>
                        <span className={styles.articleArrow}>
                          <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          </div>

          <aside className={styles.latestSidebar}>
            <div className={styles.trendingCard} data-reveal style={revealDelay(1)}>
              <h3 className={styles.sidebarTitle}>Trending Articles</h3>
              <ol className={styles.trendingList}>
                {trending.map((title, index) => (
                  <li key={title} data-reveal-item style={revealStagger(index)}>
                    <Link href="#latest-news" className={styles.trendingItem}>
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
                  Thank you — you&apos;re on the list.
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
        </div>
      </div>
    </section>
  );
}
