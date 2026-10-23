import styles from "./our-vision.module.css";

export default function OurVisionQuoteBanner() {
  return (
    <section className={styles.scenicQuoteSection} aria-label="Aspiration Quote">
      <div className={styles.container}>
        <p className={styles.scenicQuote}>
          “Let us join hands to make this world a better place
          <br />
          for ourselves, our children, and generations to come.”
        </p>
      </div>
    </section>
  );
}
