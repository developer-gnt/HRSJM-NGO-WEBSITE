import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import styles from "./notFound.module.css";

interface QuickCardItem {
  icon: IconName;
  heading: string;
  description: string;
  href: string;
  ariaLabel: string;
}

const quickCards: QuickCardItem[] = [
  {
    icon: "users",
    heading: "Join Membership",
    description: "Be a part of the change.",
    href: "/membership",
    ariaLabel: "Join Membership - Be a part of the change",
  },
  {
    icon: "fileText",
    heading: "File a Complaint",
    description: "Get help. We are with you.",
    href: "/complaint",
    ariaLabel: "File a Complaint - Get help. We are with you",
  },
  {
    icon: "heart",
    heading: "Make a Donation",
    description: "Support justice for all.",
    href: "/donation",
    ariaLabel: "Make a Donation - Support justice for all",
  },
];

export default function NotFoundPage() {
  return (
    <section className={styles.pageWrapper} aria-labelledby="not-found-heading">
      {/* Hero section featuring the 404 artwork as a pure CSS background image */}
      <div className={styles.heroSection}>
        <div className={styles.heroContainer}>
          {/* Left Error Message & CTA Actions */}
          <div className={styles.leftContent}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDash} aria-hidden="true" />
              <span>PAGE NOT FOUND</span>
            </div>

            <h1 id="not-found-heading" className={styles.heading}>
              Oops! This Page
              <br />
              Has <span className={styles.goldText}>Gone Missing.</span>
            </h1>

            <p className={styles.description}>
              The page you&apos;re looking for may have moved or no longer exists.
              Let&apos;s help you find the right path.
            </p>

            <div className={styles.actions}>
              <Link href="/" className={styles.primaryCta} id="cta-back-home">
                <span>Back to Home</span>
                <Icon name="arrow" aria-hidden="true" />
              </Link>
              <Link
                href="/complaint"
                className={styles.secondaryCta}
                id="cta-report-issue"
              >
                <span>Report an Issue</span>
              </Link>
            </div>
          </div>

          {/* On mobile / tablet viewports, this element displays the background image seamlessly below the text */}
          <div
            className={styles.heroVisual}
            role="img"
            aria-label="404 Page Not Found illustration featuring Lady Justice and human rights mission theme"
          />
        </div>
      </div>

      {/* Bottom Quick-Access Cards */}
      <div className={styles.cardsContainer}>
        <nav aria-label="Quick Access" className={styles.cardsSection}>
          <ul className={styles.cardsGrid}>
            {quickCards.map((card) => (
              <li key={card.heading} className={styles.cardItem}>
                <Link
                  href={card.href}
                  className={styles.card}
                  aria-label={card.ariaLabel}
                >
                  <div className={styles.cardContent}>
                    <span className={styles.cardIcon} aria-hidden="true">
                      <Icon name={card.icon} />
                    </span>
                    <div className={styles.cardText}>
                      <span className={styles.cardHeading}>{card.heading}</span>
                      <span className={styles.cardDescription}>
                        {card.description}
                      </span>
                    </div>
                  </div>
                  <span className={styles.cardArrow} aria-hidden="true">
                    <Icon name="arrow" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
