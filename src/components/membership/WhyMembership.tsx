import {
  HeartHandshake,
  Megaphone,
  Scale,
  Users,
} from "lucide-react";
import styles from "./membership.module.css";

const reasons = [
  {
    title: "Support Human Rights",
    description:
      "Help strengthen awareness and support for people whose rights need protection.",
    icon: Scale,
  },
  {
    title: "Build Stronger Communities",
    description: "Support grassroots initiatives and community development.",
    icon: Users,
  },
  {
    title: "Spread Awareness",
    description:
      "Help create awareness about rights, equality and social justice.",
    icon: Megaphone,
  },
  {
    title: "Be Part of Change",
    description:
      "Become part of a community working toward a fairer and more inclusive society.",
    icon: HeartHandshake,
  },
];

export default function WhyMembership() {
  return (
    <section
      id="why-membership"
      className={styles.why}
      aria-labelledby="why-membership-heading"
    >
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrowGold}>Why Membership Matters</p>
            <h2 id="why-membership-heading" className={styles.sectionHeading}>
              Your Membership
              <br />
              Creates Real Impact
            </h2>
          </div>
          <p className={styles.sectionDescription}>
            Membership is more than joining an organisation. It is an
            opportunity to stand with people, support meaningful work and
            contribute to stronger communities.
          </p>
        </div>

        <ul className={styles.whyGrid}>
          {reasons.map((reason) => {
            const ReasonIcon = reason.icon;
            return (
              <li key={reason.title} className={styles.whyCard}>
                <span className={styles.whyIcon}>
                  <ReasonIcon size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className={styles.whyTitle}>{reason.title}</h3>
                <p className={styles.whyDescription}>{reason.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
