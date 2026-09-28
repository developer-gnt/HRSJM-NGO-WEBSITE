import { ArrowRight, Plus } from "lucide-react";
import testimonialsData from "@/data/testimonials.json";
import TestimonialCard, { type TestimonialItem } from "./TestimonialCard";
import styles from "./events.module.css";

const testimonials: TestimonialItem[] = testimonialsData;

export default function Testimonials() {
  return (
    <section className={styles.testimonials} aria-labelledby="testimonials-heading">
      <div className={styles.sectionInner}>
        <div className={styles.testimonialsHeader}>
          <div>
            <p className={styles.sectionEyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Voices from Our Events
            </p>
            <h2 id="testimonials-heading" className={styles.testimonialsTitle}>
              What People Say
            </h2>
          </div>

          <div className={styles.upcomingControls}>
            <span className={styles.controlCircle} aria-hidden="true">
              <Plus size={15} strokeWidth={2} />
            </span>
            <span className={styles.controlCircle} aria-hidden="true">
              <ArrowRight size={15} strokeWidth={2} />
            </span>
          </div>
        </div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}