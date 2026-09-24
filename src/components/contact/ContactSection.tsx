import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import styles from "./contact.module.css";

interface ContactDetail {
  icon: typeof MapPin;
  title: string;
  lines: string[];
  href?: string;
  hrefLabel?: string;
}

const contactDetails: ContactDetail[] = [
  {
    icon: MapPin,
    title: "Our Office Address",
    lines: [
      "Sr. Mathuradas Vasani Rd, Chimat Pada,",
      "Marol Naka, Andheri East,",
      "Mumbai, Maharashtra - 400059",
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 7021057853"],
    href: "tel:+917021057853",
    hrefLabel: "Call +91 7021057853",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["enquiry@hrsjm.org"],
    href: "mailto:enquiry@hrsjm.org",
    hrefLabel: "Email enquiry@hrsjm.org",
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Monday - Saturday", "9:00 AM - 6:00 PM"],
  },
];

export default function ContactSection() {
  return (
    <section className={styles.contactSection} aria-labelledby="contact-info-heading">
      <div className={styles.contactSection__container}>
        <div className={styles.contactSection__information}>
          <p className={styles.contactSection__eyebrow}>Contact Information</p>
          <h2 id="contact-info-heading" className={styles.contactSection__title}>
            We Would Love
            <br />
            to Hear From You
          </h2>
          <p className={styles.contactSection__description}>
            Whether you have a question, want to support our mission, explore a
            partnership or simply want to learn more &mdash; our doors are
            always open. Let&rsquo;s work together for a fairer, more just and
            equal society.
          </p>

          <ul className={styles.contactSection__details}>
            {contactDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <li key={detail.title} className={styles.contactSection__detail}>
                  <span className={styles.contactSection__detailIcon} aria-hidden="true">
                    <Icon size={23} strokeWidth={2} />
                  </span>
                  <div className={styles.contactSection__detailContent}>
                    <h3 className={styles.contactSection__detailTitle}>{detail.title}</h3>
                    {detail.lines.map((line, index) =>
                      detail.href && index === 0 ? (
                        <p key={line} className={styles.contactSection__detailText}>
                          <a href={detail.href} aria-label={detail.hrefLabel}>
                            {line}
                          </a>
                        </p>
                      ) : (
                        <p key={line} className={styles.contactSection__detailText}>
                          {line}
                        </p>
                      ),
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.contactSection__form}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}