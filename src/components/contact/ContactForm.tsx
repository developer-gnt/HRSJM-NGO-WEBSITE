"use client";

import { useId, useState, type FormEvent } from "react";
import { AlertTriangle, ArrowRight, CircleCheck } from "lucide-react";
import styles from "./contact.module.css";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  agreed: boolean;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  agreed: false,
};

const subjectOptions = [
  "General Enquiry",
  "Human Rights Support",
  "Partnership / Collaboration",
  "Volunteer With Us",
  "Donation",
  "Media / Press",
  "Events & Activities",
  "Other",
];

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your full name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.subject) {
    errors.subject = "Please choose what your message is about.";
  }

  if (!values.message.trim()) {
    errors.message = "Please tell us briefly how we can help.";
  }

  if (!values.agreed) {
    errors.agreed = "Please agree to the Terms & Conditions and Privacy Policy.";
  }

  return errors;
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className={styles.contactSection__error}>
      <AlertTriangle size={13} strokeWidth={2} aria-hidden="true" />
      {message}
    </p>
  );
}

export default function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setValues((current) => ({ ...current, [target.name]: value }));
    setErrors((current) => ({ ...current, [target.name]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    // Client-side validation only; connect a mail/endpoint handler here later.
    setSubmitted(true);
    setValues(initialValues);
  };

  const fieldClassName = (invalid?: boolean) =>
    [styles.contactSection__input, invalid ? styles.contactSection__inputInvalid : ""]
      .filter(Boolean)
      .join(" ");

  return (
    <div className={styles.contactSection__formCard}>
      <h3 className={styles.contactSection__formTitle}>Send Us a Message</h3>
      <p className={styles.contactSection__formDescription}>
        Fill out the form below and our team will get back to you soon.
      </p>

      {submitted && (
        <div className={styles.contactSection__success} role="status">
          <CircleCheck size={20} strokeWidth={2} aria-hidden="true" />
          <p>Thank you. Your message has been received.</p>
        </div>
      )}

      <form className={styles.contactSection__formGrid} onSubmit={handleSubmit} noValidate>
        <div className={styles.contactSection__field}>
          <label htmlFor={`${uid}-name`} className={styles.contactSection__label}>
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            className={fieldClassName(Boolean(errors.name))}
            value={values.name}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
          />
          {errors.name && <FieldError id={`${uid}-name-error`} message={errors.name} />}
        </div>

        <div className={styles.contactSection__field}>
          <label htmlFor={`${uid}-email`} className={styles.contactSection__label}>
            Email Address <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            className={fieldClassName(Boolean(errors.email))}
            value={values.email}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
          />
          {errors.email && <FieldError id={`${uid}-email-error`} message={errors.email} />}
        </div>

        <div className={styles.contactSection__field}>
          <label htmlFor={`${uid}-phone`} className={styles.contactSection__label}>
            Phone Number
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Enter your phone number"
            className={styles.contactSection__input}
            value={values.phone}
            onChange={handleChange}
          />
        </div>

        <div className={styles.contactSection__field}>
          <label htmlFor={`${uid}-subject`} className={styles.contactSection__label}>
            Subject <span aria-hidden="true">*</span>
          </label>
          <select
            id={`${uid}-subject`}
            name="subject"
            className={`${styles.contactSection__input} ${styles.contactSection__select}`}
            value={values.subject}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={errors.subject ? `${uid}-subject-error` : undefined}
          >
            <option value="" disabled>
              Select a subject
            </option>
            {subjectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.subject && <FieldError id={`${uid}-subject-error`} message={errors.subject} />}
        </div>

        <div className={`${styles.contactSection__field} ${styles.contactSection__fieldFull}`}>
          <label htmlFor={`${uid}-message`} className={styles.contactSection__label}>
            Your Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={5}
            placeholder="Tell us how we can help..."
            className={`${styles.contactSection__input} ${styles.contactSection__textarea}`}
            value={values.message}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${uid}-message-error` : undefined}
          />
          {errors.message && (
            <FieldError id={`${uid}-message-error`} message={errors.message} />
          )}
        </div>

        <div className={`${styles.contactSection__field} ${styles.contactSection__fieldFull}`}>
          <div className={styles.contactSection__terms}>
            <input
              id={`${uid}-terms`}
              name="agreed"
              type="checkbox"
              checked={values.agreed}
              onChange={handleChange}
              aria-invalid={errors.agreed ? true : undefined}
              aria-describedby={errors.agreed ? `${uid}-terms-error` : undefined}
            />
            <label htmlFor={`${uid}-terms`}>
              I agree to the <a href="/terms-and-conditions">Terms &amp; Conditions</a> and{" "}
              <a href="/privacy-policy">Privacy Policy</a>.
            </label>
          </div>
          {errors.agreed && <FieldError id={`${uid}-terms-error`} message={errors.agreed} />}
        </div>

        <div className={`${styles.contactSection__field} ${styles.contactSection__fieldFull}`}>
          <button type="submit" className={styles.contactSection__submit}>
            Send Message
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
}