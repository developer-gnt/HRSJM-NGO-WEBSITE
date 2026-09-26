import Image from "next/image";
import styles from "./about.module.css";

export default function AboutHero() {
  return (
    <section className={styles.hero}>
      {/* Full-width background image with crowd & hopeful girl */}
      <div className={styles.heroBg}>
        <Image
          src="/assets/hero_bg.jpg"
          alt="Indian community citizens and hopeful young girl looking up to a fairer future"
          fill
          priority
          sizes="100vw"
          className={styles.heroImg}
        />

        {/* Deep navy monochromatic overlay across crowd */}
        <div className={styles.heroOverlayMultiply} />

        {/* Left dark gradient overlay for optimal text readability */}
        <div className={styles.heroOverlayLeft} />

        {/* Far right soft vignette for handwritten quote clarity */}
        <div className={styles.heroOverlayRight} />

        {/* Top and bottom subtle shadows */}
        <div className={styles.heroOverlayTop} />
        <div className={styles.heroOverlayBottom} />
      </div>

      {/* Gold & ochre paint splatter accents beneath the girl's collar/shoulder */}
      <div className={styles.heroSplatter}>
        <svg
          viewBox="0 0 200 100"
          style={{ width: "100%", height: "100%", fill: "#D9A928", opacity: 0.9 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 70 Q60 20 110 40 Q160 30 180 75 Q150 110 80 95 Q30 90 20 70 Z" opacity="0.85" />
          <circle cx="170" cy="40" r="6" />
          <circle cx="185" cy="55" r="4" />
          <circle cx="150" cy="15" r="5" />
          <circle cx="35" cy="40" r="5" />
          <circle cx="10" cy="65" r="4" />
          <path d="M70 30 Q85 10 95 25 Z" opacity="0.9" />
        </svg>
      </div>

      {/* Main content layout */}
      <div className={`${styles.container} ${styles.heroContent}`}>
        <div className={styles.heroGrid}>
          {/* Left column: headline & supporting copy */}
          <div className={styles.heroLeft}>
            <div className={styles.heroEyebrow}>
              <span>About HRSJM</span>
            </div>

            <h1 className={styles.heroTitle}>
              A Fairer Society <br />
              <span className={styles.heroTitleAccent}>for Every One</span>
            </h1>

            <p className={styles.heroCopy}>
              We stand for human rights, dignity, equality and peace. We work
              with communities to create awareness, empower individuals and
              build a more just and equal society.
            </p>
          </div>

          {/* Center space for girl's hopeful expression */}
          <div className={styles.heroSpacer} />

          {/* Far right column: handwritten quote treatment */}
          <div className={styles.heroQuoteCol}>
            <div className={styles.heroQuote}>
              <span className={styles.heroQuoteMark}>“</span>

              <p className={styles.heroQuoteText}>
                Rights <br />
                create hope. <br />
                People create <br />
                change.<span className={styles.heroQuoteEnd}>”</span>
              </p>

              <div className={styles.heroQuoteUnderline}>
                <svg
                  viewBox="0 0 120 12"
                  fill="none"
                  style={{ width: "100%", height: "100%" }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 10C40 7 85 4 116 2"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
