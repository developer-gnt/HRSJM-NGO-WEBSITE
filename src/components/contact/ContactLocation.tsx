import { MapPinned, TrainFront } from "lucide-react";
import styles from "./contact.module.css";

interface LocationCard {
  icon: typeof TrainFront;
  title: string;
  lines: string[];
}

const locationCards: LocationCard[] = [
  {
    icon: TrainFront,
    title: "Nearest Railway Station",
    lines: ["Andheri (E) - 2.5 km", "Approximately 10 mins by car"],
  },
  {
    icon: MapPinned,
    title: "Nearest Landmark",
    lines: ["Marol Naka, Andheri East", "Mumbai, Maharashtra - 400059"],
  },
];

export default function ContactLocation() {
  return (
    <section
      className={styles.contactLocation}
      aria-labelledby="location-heading"
    >
      <div className={styles.contactLocation__container}>
        <div className={styles.contactLocation__content}>
          <p className={styles.contactLocation__eyebrow}>Our Location</p>
          <span className={styles.contactLocation__accent} aria-hidden="true" />
          <h2 id="location-heading" className={styles.contactLocation__title}>
            Find Us Here
          </h2>
          <p className={styles.contactLocation__description}>
            Visit our office or get directions using the map below. We welcome
            individuals, organisations and communities to connect with us.
          </p>
        </div>

        <div className={styles.contactLocation__cards}>
          {locationCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className={styles.contactLocation__card}>
                <span className={styles.contactLocation__icon} aria-hidden="true">
                  <Icon size={22} strokeWidth={2} />
                </span>
                <div className={styles.contactLocation__cardContent}>
                  <h3 className={styles.contactLocation__cardTitle}>{card.title}</h3>
                  {card.lines.map((line) => (
                    <p key={line} className={styles.contactLocation__cardText}>
                      {line}
                    </p>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}