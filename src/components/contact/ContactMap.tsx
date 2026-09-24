import styles from "./contact.module.css";

const mapEmbedUrl =
  "https://www.google.com/maps?q=" +
  encodeURIComponent("HRSJM, Marol Naka, Andheri East, Mumbai, Maharashtra") +
  "&output=embed";

export default function ContactMap() {
  return (
    <section className={styles.contactMap} aria-labelledby="contact-map-heading">
      <h2 id="contact-map-heading" className={styles.contactMap__srOnly}>
        HRSJM office location on Google Maps
      </h2>
      <div className={styles.contactMap__container}>
        <div className={styles.contactMap__frame}>
          <iframe
            className={styles.contactMap__iframe}
            src={mapEmbedUrl}
            title="HRSJM office location on Google Maps"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}