"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { AlertCircle, ArrowRight, CircleCheck, Lock, Plus } from "lucide-react";
import { useScrollReveal, revealDelay, revealStagger } from "@/hooks/useScrollReveal";
import styles from "./complaint.module.css";

const faqItems = [
  {
    question: "What types of complaints can I file?",
    answer:
      "You can file complaints related to human rights violations, discrimination, harassment, denial of legal rights, or any situation requiring legal, social or community support.",
  },
  {
    question: "Is my information kept confidential?",
    answer:
      "Yes. Your information is strictly confidential and is shared only with the team members reviewing your case, solely to provide you with support.",
  },
  {
    question: "What happens after I submit the form?",
    answer:
      "Our team carefully reviews every submission and contacts you with the next steps and the support options available for your situation.",
  },
  {
    question: "How long does it take to get a response?",
    answer:
      "We aim to respond to every complaint as quickly as possible, typically within a few working days of receiving your submission.",
  },
  {
    question: "Can I file a complaint on behalf of someone else?",
    answer:
      "Yes. If someone you know has faced a violation and cannot file themselves, you may file on their behalf. Please describe the situation and your relationship in the form.",
  },
];

export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh",
  "Andaman & Nicobar Islands",
  "Dadra & Nagar Haveli and Daman & Diu",
  "Lakshadweep",
];

const complaintTypes = [
  "Human Rights Violation",
  "Discrimination / Atrocity",
  "Harassment or Threat",
  "Police / Authority Misconduct",
  "Legal Aid — Civil",
  "Legal Aid — Criminal",
  "Women's Rights & Safety",
  "Child Rights & Protection",
  "Caste / Tribal Rights",
  "Labour / Wage Rights",
  "Housing & Land Rights",
  "Education Rights",
  "Other",
];

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  state: string;
  complaintType: string;
  details: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  state?: string;
  complaintType?: string;
  details?: string;
}

const initialValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  state: "",
  complaintType: "",
  details: "",
};

export default function ComplaintForm() {
  const sectionRef = useScrollReveal(styles);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Disallow special characters and numbers: only letters and spaces allowed
    const sanitized = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setValues((prev) => ({ ...prev, fullName: sanitized }));
    if (errors.fullName) {
      setErrors((prev) => ({ ...prev, fullName: undefined }));
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Disallow alphabets/symbols, limit to max 10 digits
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setValues((prev) => ({ ...prev, phone: digits }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleChange = (
    field: keyof FormValues,
    value: string
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    // Full Name: No special characters or numbers allowed, letters and spaces only
    const trimmedName = values.fullName.trim();
    if (!trimmedName) {
      nextErrors.fullName = "Please enter your full name.";
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      nextErrors.fullName = "Full name should only contain letters and spaces (no special characters).";
    } else if (trimmedName.length < 2) {
      nextErrors.fullName = "Full name must be at least 2 characters.";
    }

    // Phone Number: No alphabets allowed, exactly 10 digits
    const phoneDigits = values.phone.trim();
    if (!phoneDigits) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (phoneDigits.length !== 10) {
      nextErrors.phone = "Phone number must be exactly 10 digits.";
    }

    // Email Address: strictly email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const trimmedEmail = values.email.trim();
    if (!trimmedEmail) {
      nextErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(trimmedEmail)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    // State
    if (!values.state) {
      nextErrors.state = "Please select your state.";
    }

    // Complaint Type
    if (!values.complaintType) {
      nextErrors.complaintType = "Please select a complaint type.";
    }

    // Details
    if (!values.details.trim()) {
      nextErrors.details = "Please describe your concern.";
    } else if (values.details.trim().length < 10) {
      nextErrors.details = "Please provide more details (at least 10 characters).";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      setSubmitted(false);
      return;
    }
    setSubmitted(true);
    setValues(initialValues);
    setErrors({});
  };

  return (
    <section id="file-a-complaint" ref={sectionRef} className={styles.fileSection} aria-labelledby="file-heading">
      <div className={styles.fileGrid}>
        <div className={styles.fileFormCol}>
          <p className={styles.fileEyebrow} data-reveal>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            File a Complaint
          </p>
          <h2 id="file-heading" className={styles.fileHeading} data-reveal style={revealDelay(1)}>
            Share Your Concern With Us
          </h2>
          <p className={styles.fileDescription} data-reveal style={revealDelay(2)}>
            Fill out the form below and our team will review it and get back to
            you. Your information is confidential and secure.
          </p>

          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            data-reveal
            style={revealDelay(3)}
          >
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="complaint-name" className={styles.formLabel}>
                  Full Name <span className={styles.formRequired} aria-hidden="true">*</span>
                </label>
                <input
                  id="complaint-name"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={values.fullName}
                  onChange={handleFullNameChange}
                  className={`${styles.formInput} ${errors.fullName ? styles.inputError : ""}`}
                  aria-invalid={errors.fullName ? "true" : undefined}
                />
                {errors.fullName && (
                  <p className={styles.formFieldError} role="alert">
                    <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div className={styles.formField}>
                <label htmlFor="complaint-email" className={styles.formLabel}>
                  Email Address <span className={styles.formRequired} aria-hidden="true">*</span>
                </label>
                <input
                  id="complaint-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`${styles.formInput} ${errors.email ? styles.inputError : ""}`}
                  aria-invalid={errors.email ? "true" : undefined}
                />
                {errors.email && (
                  <p className={styles.formFieldError} role="alert">
                    <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="complaint-phone" className={styles.formLabel}>
                  Phone Number <span className={styles.formRequired} aria-hidden="true">*</span>
                </label>
                <div className={`${styles.formPhone} ${errors.phone ? styles.inputError : ""}`}>
                  <span className={styles.formPhoneCode}>+91</span>
                  <input
                    id="complaint-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    required
                    autoComplete="tel-national"
                    placeholder="Enter your phone number"
                    aria-label="Phone number"
                    maxLength={10}
                    value={values.phone}
                    onChange={handlePhoneChange}
                    className={styles.formInput}
                    aria-invalid={errors.phone ? "true" : undefined}
                  />
                </div>
                {errors.phone && (
                  <p className={styles.formFieldError} role="alert">
                    <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                    {errors.phone}
                  </p>
                )}
              </div>
              <div className={styles.formField}>
                <label htmlFor="complaint-state" className={styles.formLabel}>
                  State <span className={styles.formRequired} aria-hidden="true">*</span>
                </label>
                <select
                  id="complaint-state"
                  name="state"
                  required
                  value={values.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  className={`${styles.formSelect} ${errors.state ? styles.inputError : ""}`}
                  aria-invalid={errors.state ? "true" : undefined}
                >
                  <option value="" disabled>
                    Select your state
                  </option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className={styles.formFieldError} role="alert">
                    <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                    {errors.state}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.formField}>
              <label htmlFor="complaint-type" className={styles.formLabel}>
                Type of Complaint <span className={styles.formRequired} aria-hidden="true">*</span>
              </label>
              <select
                id="complaint-type"
                name="complaintType"
                required
                value={values.complaintType}
                onChange={(e) => handleChange("complaintType", e.target.value)}
                className={`${styles.formSelect} ${errors.complaintType ? styles.inputError : ""}`}
                aria-invalid={errors.complaintType ? "true" : undefined}
              >
                <option value="" disabled>
                  Select complaint type
                </option>
                {complaintTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.complaintType && (
                <p className={styles.formFieldError} role="alert">
                  <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                  {errors.complaintType}
                </p>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="complaint-details" className={styles.formLabel}>
                Describe Your Concern <span className={styles.formRequired} aria-hidden="true">*</span>
              </label>
              <textarea
                id="complaint-details"
                name="details"
                required
                rows={6}
                placeholder="Please provide details about the issue..."
                value={values.details}
                onChange={(e) => handleChange("details", e.target.value)}
                className={`${styles.formTextarea} ${errors.details ? styles.inputError : ""}`}
                aria-invalid={errors.details ? "true" : undefined}
              />
              {errors.details && (
                <p className={styles.formFieldError} role="alert">
                  <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                  {errors.details}
                </p>
              )}
            </div>

            <button type="submit" className={styles.formSubmit}>
              Submit Complaint
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </button>

            {submitted ? (
              <p className={styles.formNote} role="status">
                <CircleCheck size={14} strokeWidth={2} aria-hidden="true" />
                Thank you! Your complaint has been submitted successfully. Our
                team will get back to you soon.
              </p>
            ) : (
              <p className={styles.formNote}>
                <Lock size={13} strokeWidth={2} aria-hidden="true" />
                Your information is confidential and will only be used to provide
                support.
              </p>
            )}
          </form>
        </div>

        <aside className={styles.filePanel} aria-labelledby="before-file-heading">
          <div className={styles.filePanelImage} data-reveal>
            <Image
              src="/images/complaint-before-file.png"
              alt="HRSJM field worker in an outreach vest speaking with community members under the trees"
              fill
              sizes="(max-width: 1023px) 100vw, 40vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>

          <div className={styles.filePanelBody}>
            <p className={styles.fileEyebrow} data-reveal style={revealDelay(2)}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Important Information
            </p>
            <h2 className={styles.filePanelHeading} data-reveal style={revealDelay(3)}>Before You File</h2>
            <p className={styles.filePanelDescription} data-reveal style={revealDelay(4)}>
              Please read the following to help us understand your case better
              and provide the right support.
            </p>

            <ul className={styles.faqList}>
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index;
                const buttonId = `faq-button-${index}`;
                const panelId = `faq-panel-${index}`;
                return (
                  <li key={item.question} className={styles.faqItem} data-reveal-item style={revealStagger(index)}>
                    <button
                      type="button"
                      id={buttonId}
                      className={styles.faqButton}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(index)}
                    >
                      <span className={styles.faqQuestion}>{item.question}</span>
                      <span className={styles.faqIcon} aria-hidden="true">
                        <Plus
                          size={18}
                          strokeWidth={2}
                          style={{
                            transform: isOpen ? "rotate(45deg)" : "none",
                            transition: "transform 200ms ease",
                          }}
                        />
                      </span>
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={styles.faqPanel}
                      hidden={!isOpen}
                    >
                      <p className={styles.faqAnswer}>{item.answer}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}