import Image from "next/image";
import styles from "./our-vision.module.css";

export default function OurVisionHealTheWorld() {
  return (
    <section className={styles.healSection} aria-labelledby="heal-the-world-title">
      <div className={styles.healSplitGrid}>
        {/* Left Column: Summit photo with Indian national flag */}
        <div className={styles.healImageWrap}>
          <Image
            src="/images/vision/heal-the-world-flag-hd.png"
            alt="Group of young people standing together on a summit holding the Indian national flag at sunrise"
            fill
            sizes="(max-width: 899px) 100vw, 42vw"
            className={styles.healImage}
            quality={95}
          />
        </div>

        {/* Right Column: Narrative + Quote Callout */}
        <div className={styles.healContentWrap}>
          <span className={styles.healEyebrow}>A Brighter Tomorrow</span>

          <h2 id="heal-the-world-title" className={styles.healTitle}>
            Let Us Join Hands
            <br />
            to Heal the World
          </h2>

          <div className={styles.healBodyRow}>
            <div className={styles.healTextStack}>
              <p>
                The future of humanity depends on what we do today. Together, we can build a
                world where people love and respect one another, stand beside those in need,
                protect the vulnerable, and create opportunities for future generations to
                live in peace and harmony.
              </p>

              <p>
                Let us rise above hatred, embrace our shared humanity, and work towards a world
                where{" "}
                <strong className={styles.highlightNavy}>
                  justice, equality, compassion
                </strong>
                , and <strong className={styles.highlightNavy}>dignity</strong> are realities for
                all.
              </p>
            </div>

            <div className={styles.healQuoteBox}>
              <span className={styles.quoteMark} aria-hidden="true">
                “
              </span>
              <p className={styles.healQuoteText}>
                Small actions
                <br />
                create big change.
              </p>
              <div className={styles.healScriptLine} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
