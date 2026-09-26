"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useScrollReveal, revealDelay, revealStagger } from "@/hooks/useScrollReveal";
import styles from "./complaint.module.css";

const supportChannels = [
  {
    icon: Phone,
    title: "Helpline",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    sub: "Mon - Sat, 10:00 AM - 6:00 PM",
  },
  {
    icon: Mail,
    title: "Email Support",
    value: "help@hrsjm.org",
    href: "mailto:help@hrsjm.org",
    sub: "We usually respond within 24\u201348 hours",
  },
  {
    icon: MapPin,
    title: "Office Address",
    value:
      "Sr. Mathuradas Vasani Rd, Chimat Pada, Marol Naka, Andheri East, Mumbai, Maharashtra 400059, India",
    href: "https://www.google.com/maps/search/?api=1&query=Sr.+Mathuradas+Vasani+Rd%2C+Chimat+Pada%2C+Marol+Naka%2C+Andheri+East%2C+Mumbai%2C+Maharashtra+400059",
    sub: null,
  },
];

export default function AdditionalSupport() {
  const sectionRef = useScrollReveal(styles);

  return (
    <section ref={sectionRef} className={styles.supportExtra} aria-labelledby="additional-support-heading">
      <div className={styles.supportInner}>
        <p className={styles.supportEyebrow} data-reveal>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          Other Ways to Get Help
        </p>
        <h2 id="additional-support-heading" className={styles.supportHeading} data-reveal style={revealDelay(1)}>
          Additional Support
        </h2>
        <p className={styles.supportDescription} data-reveal style={revealDelay(2)}>
          You can also reach out to us through the following channels.
        </p>

        <div className={styles.supportExtraGrid}>
          {supportChannels.map(({ icon: Icon, title, value, href, sub }, index) => (
            <article key={title} className={styles.supportExtraCard} data-reveal-item style={revealStagger(index)}>
              <span className={styles.supportExtraIcon}>
                <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div className={styles.supportExtraBody}>
                <h3 className={styles.supportExtraTitle}>{title}</h3>
                {href ? (
                  <a href={href} className={styles.supportExtraValue}>
                    {value}
                  </a>
                ) : (
                  <p className={styles.supportExtraValue}>{value}</p>
                )}
                {sub ? <p className={styles.supportExtraSub}>{sub}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}