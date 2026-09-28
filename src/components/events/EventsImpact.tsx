import {
  Award,
  HandHeart,
  MapPin,
  UsersRound,
} from "lucide-react";
import styles from "./events.module.css";

const stats = [
  { icon: HandHeart, value: "200+", label: "Events Organized" },
  { icon: UsersRound, value: "50,000+", label: "People Reached" },
  { icon: MapPin, value: "25+", label: "Cities Across India" },
  { icon: Award, value: "100+", label: "Volunteers Involved" },
];

export default function EventsImpact() {
  return (
    <section className={styles.impactBand} aria-labelledby="events-impact-heading">
      <div className={styles.impactInner}>
        <div className={styles.impactMain}>
          <p className={styles.impactEyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Our Impact Through Events
          </p>
          <h2 id="events-impact-heading" className={styles.impactHeading}>
            Real Activities. Real Change.
          </h2>
          <p className={styles.impactDesc}>
            From awareness drives to legal aid camps, our events create
            lasting impact in communities across India.
          </p>
          <div className={styles.impactStats}>
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className={styles.impactStat}>
                <span className={styles.statIcon}>
                  <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className={styles.statText}>
                  <span className={styles.statValue}>{value}</span>
                  <span className={styles.statLabel}>{label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className={styles.scriptNote} aria-hidden="true">
          HRSJM
          <br />
          Volunteer
          <span className={styles.scriptStroke} />
        </p>
      </div>
    </section>
  );
}