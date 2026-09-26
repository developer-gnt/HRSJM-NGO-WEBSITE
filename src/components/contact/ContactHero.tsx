import styles from "./contact.module.css";

export default function ContactHero() {
  return (
    <section className={styles.hero} aria-labelledby="contact-hero-heading">
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Contact Us</p>
          <h1 id="contact-hero-heading" className={styles.heading}>
            Get In Touch
            <span className={styles.headingGold}>
              Let&rsquo;s Create a Fairer
              <br />
              and More Equal Society
            </span>
          </h1>
          <p className={styles.description}>
            We are here to listen, support and collaborate. Reach out to learn
            more about our work, partnership opportunities or how you can make
            a difference.
          </p>
        </div>
      </div>
    </section>
  );
}