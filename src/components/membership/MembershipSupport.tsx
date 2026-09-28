import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import styles from "./membership.module.css";

/* Contact values mirror src/config/footer.ts (placeholders there — update
   both when real details are connected). */
const channels = [
  {
    title: "Helpline",
    lines: ["+91 98765 43210", "Mon - Sat, 10:00 AM - 6:00 PM"],
    icon: Phone,
    href: "tel:+919876543210",
    linkLabel: "Call our helpline",
  },
  {
    title: "Email Support",
    lines: ["help@hrsjm.org", "We usually respond within 24 - 48 hours"],
    icon: Mail,
    href: "mailto:help@hrsjm.org",
    linkLabel: "Email our support team",
  },
  {
    title: "Office Address",
    lines: [
      "Sir Mathuradas Vasanji Rd,",
      "Chimatpada, Marol Naka, Andheri East,",
      "Mumbai, Maharashtra 400059, India",
    ],
    icon: MapPin,
    href: "https://www.google.com/maps/search/?api=1&query=Human+Rights+and+Social+Justice+Mission+Marol+Naka+Andheri+East+Mumbai+400059",
    linkLabel: "Get directions to the office",
  },
];

export default function MembershipSupport() {
  return (
    <section
      className={styles.support}
      aria-labelledby="membership-support-heading"
    >
      <div className={styles.container}>
        <div className={styles.supportHead}>
          <div>
            <p className={styles.supportEyebrow}>
              <span className={styles.supportEyebrowDot} aria-hidden="true" />
              Other Ways to Get Help
            </p>
            <h2
              id="membership-support-heading"
              className={styles.supportHeading}
            >
              Additional Support
            </h2>
            <p className={styles.supportDescription}>
              You can also reach out to us through the following channels.
            </p>
          </div>
        </div>

        <ul className={styles.supportGrid}>
          {channels.map((channel) => {
            const ChannelIcon = channel.icon;
            return (
              <li key={channel.title} className={styles.supportCard}>
                <span className={styles.supportIcon}>
                  <ChannelIcon
                    size={20}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>
                <div className={styles.supportBody}>
                  <h3 className={styles.supportTitle}>{channel.title}</h3>
                  {channel.lines.map((line) => (
                    <p key={line} className={styles.supportLine}>
                      {line}
                    </p>
                  ))}
                  <Link
                    href={channel.href}
                    className={styles.supportLink}
                    aria-label={channel.linkLabel}
                  >
                    <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
