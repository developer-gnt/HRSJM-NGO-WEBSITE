"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
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

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  // Full Name: No special characters or numbers, letters and spaces only, min 2 chars
  const trimmedName = values.name.trim();
  if (!trimmedName) {
    errors.name = "Please enter your full name.";
  } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
    errors.name = "Full name can only contain letters and spaces (no special characters or numbers).";
  } else if (trimmedName.length < 2) {
    errors.name = "Full name must be at least 2 characters.";
  }

  // Email Address: strictly email format
  const trimmedEmail = values.email.trim();
  if (!trimmedEmail) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address.";
  }

  // Phone Number: No alphabets allowed, strictly 10 digits
  const trimmedPhone = values.phone.trim();
  if (!trimmedPhone) {
    errors.phone = "Please enter your 10-digit phone number.";
  } else if (trimmedPhone.length !== 10) {
    errors.phone = "Phone number must be exactly 10 digits.";
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
    <p id={id} className={styles.contactSection__error} role="alert">
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

  // Full Name: No special characters or numbers allowed (letters & spaces only)
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = event.target.value.replace(/[^a-zA-Z\s]/g, "");
    setValues((current) => ({ ...current, name: sanitized }));
    if (errors.name) {
      setErrors((current) => ({ ...current, name: undefined }));
    }
  };

  // Phone Number: No alphabets allowed, numbers only, max 10 digits
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 10);
    setValues((current) => ({ ...current, phone: digits }));
    if (errors.phone) {
      setErrors((current) => ({ ...current, phone: undefined }));
    }
  };

  // Email Address
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setValues((current) => ({ ...current, email: val }));
    if (errors.email) {
      setErrors((current) => ({ ...current, email: undefined }));
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setValues((current) => ({ ...current, [target.name]: value }));
    if (errors[target.name as keyof FormValues]) {
      setErrors((current) => ({ ...current, [target.name]: undefined }));
    }
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
        {/* Full Name */}
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
            onChange={handleNameChange}
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
          />
          {errors.name && <FieldError id={`${uid}-name-error`} message={errors.name} />}
        </div>

        {/* Email Address */}
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
            onChange={handleEmailChange}
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
          />
          {errors.email && <FieldError id={`${uid}-email-error`} message={errors.email} />}
        </div>

        {/* Phone Number */}
        <div className={styles.contactSection__field}>
          <label htmlFor={`${uid}-phone`} className={styles.contactSection__label}>
            Phone Number <span aria-hidden="true">*</span>
          </label>
          <div
            className={`${styles.contactPhoneWrap} ${
              errors.phone ? styles.contactPhoneWrapInvalid : ""
            }`}
          >
            <span className={styles.contactPhonePrefix}>+91</span>
            <input
              id={`${uid}-phone`}
              name="phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              autoComplete="tel-national"
              placeholder="Enter 10-digit number"
              className={styles.contactPhoneInput}
              value={values.phone}
              onChange={handlePhoneChange}
              aria-required="true"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
            />
          </div>
          {errors.phone && <FieldError id={`${uid}-phone-error`} message={errors.phone} />}
        </div>

        {/* Subject */}
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

        {/* Your Message */}
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

        {/* Terms & Conditions Checkbox */}
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
              I agree to the <Link href="/terms">Terms &amp; Conditions</Link> and{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </label>
          </div>
          {errors.agreed && <FieldError id={`${uid}-terms-error`} message={errors.agreed} />}
        </div>

        {/* Submit */}
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