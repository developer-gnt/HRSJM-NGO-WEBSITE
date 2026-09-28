import Image from "next/image";
import {
  CalendarDays,
  HandHeart,
  Megaphone,
  Users,
} from "lucide-react";
import styles from "./membership.module.css";

const ways = [
  { title: "Awareness Campaigns", icon: Megaphone },
  { title: "Community Activities", icon: Users },
  { title: "Events & Initiatives", icon: CalendarDays },
  { title: "Volunteer & Skill-Based Support", icon: HandHeart },
];

export default function MembershipMovement() {
  return (
    <section
      className={styles.movement}
      aria-labelledby="membership-movement-heading"
    >
      <div className={styles.movementImageWrap}>
        <Image
          src="/membership/membership-movement.png"
          alt="A person with a backpack looking out over a city at sunset."
          fill
          sizes="(max-width: 1023px) 100vw, 50vw"
          className={styles.movementImage}
        />
      </div>

      <div className={styles.movementContent}>
        <p className={styles.eyebrowGold}>Be Part of the Movement</p>
        <h2
          id="membership-movement-heading"
          className={styles.movementHeading}
        >
          Your Voice.
          <br />
          Your Skills.
          <br />
          Your Contribution.
        </h2>
        <p className={styles.movementDescription}>
          Every member can contribute in different ways. Whether through
          awareness, community participation, skills, volunteering or support,
          every contribution can help create meaningful change.
        </p>

        <ul className={styles.movementGrid}>
          {ways.map((way) => {
            const WayIcon = way.icon;
            return (
              <li key={way.title} className={styles.movementItem}>
                <span className={styles.movementItemIcon}>
                  <WayIcon size={20} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className={styles.movementItemTitle}>{way.title}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
