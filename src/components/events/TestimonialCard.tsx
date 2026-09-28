import { Quote } from "lucide-react";
import styles from "./events.module.css";

export type TestimonialItem = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

export default function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
  return (
    <article className={styles.testimonialCard}>
      <span className={styles.quoteIcon} aria-hidden="true">
        <Quote size={15} strokeWidth={2} />
      </span>
      <p className={styles.testimonialQuote}>{testimonial.quote}</p>
      <div className={styles.testimonialMeta}>
        <span className={styles.testimonialName}>{testimonial.name}</span>
        <span className={styles.testimonialRole}>{testimonial.role}</span>
      </div>
    </article>
  );
}