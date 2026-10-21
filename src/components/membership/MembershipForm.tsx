"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  CircleDot,
  Lock,
  Minus,
  Plus,
  ShieldCheck,
} from "lucide-react";
import styles from "./membership.module.css";

const membershipTypeGroups = [
  {
    group: "General Membership",
    options: ["Individual Member", "Community Member", "Supporting Member"],
  },
  {
    group: "Active Membership",
    options: [
      "District Active Member",
      "State Active Member",
      "District Unit Post",
      "State Unit Post",
    ],
  },
  {
    group: "Letter Pad Post",
    options: [
      "Lion of State",
      "Counselor of State",
      "Ambassador of State",
      "Hon'ble State Director",
    ],
  },
  {
    group: "National Level Post",
    options: [
      "National Legal Council Cell",
      "National Minority Council Cell",
      "National Women Council Cell",
      "National Political Council Cell",
    ],
  },
];

const allMembershipTypes = membershipTypeGroups.flatMap((g) => g.options);

const genderOptions = [
  "Female",
  "Male",
  "Other",
  "Prefer not to say",
];

const indianStates = [
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
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const contributionOptions = [
  "Volunteer",
  "Awareness Activities",
  "Community Work",
  "Events & Activities",
  "Professional Skills",
  "Fundraising Support",
  "Other",
];

const beforeYouJoin = [
  {
    question: "Who can become an HRSJM member?",
    answer:
      "Anyone who supports human rights, equality and social justice can apply — students, professionals, community workers and concerned citizens alike.",
  },
  {
    question: "Is my information kept confidential?",
    answer:
      "Yes. Your details stay confidential and are used only to process your membership and communicate with you.",
  },
  {
    question: "What happens after I submit the form?",
    answer:
      "Our team reviews your application and contacts you with the next steps for confirming your membership.",
  },
  {
    question: "How long does it take to get a response?",
    answer:
      "Most applications are reviewed within a few working days. We reach out using the email or phone number you provide.",
  },
  {
    question: "Can I volunteer without becoming a member?",
    answer:
      "Yes. Volunteering is open to everyone — membership simply gives you a more structured way to participate and contribute.",
  },
];

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  state: string;
  city: string;
  address: string;
  membershipType: string;
  reason: string;
  contributions: string[];
  agreed: boolean;
}

const emptyValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  state: "",
  city: "",
  address: "",
  membershipType: "",
  reason: "",
  contributions: [],
  agreed: false,
};

export default function MembershipForm() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [infoOpen, setInfoOpen] = useState<number | null>(null);

  /* Preselect membership type from URL search params or custom event */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const postParam = params.get("post");
      if (postParam && allMembershipTypes.includes(postParam)) {
        setValues((current) => ({ ...current, membershipType: postParam }));
        setErrors((current) => ({ ...current, membershipType: undefined }));
      }
    }

    const onTypeSelected = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (allMembershipTypes.includes(detail)) {
        setValues((current) => ({ ...current, membershipType: detail }));
        setErrors((current) => ({ ...current, membershipType: undefined }));
      }
    };
    window.addEventListener("hrsjm:membership-type", onTypeSelected);
    return () => {
      window.removeEventListener("hrsjm:membership-type", onTypeSelected);
    };
  }, []);

  const setField = (field: keyof FormValues, value: string | boolean) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const onPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setField("phone", event.target.value.replace(/\D/g, "").slice(0, 10));
  };

  const toggleContribution = (option: string) => {
    setValues((current) => ({
      ...current,
      contributions: current.contributions.includes(option)
        ? current.contributions.filter((item) => item !== option)
        : [...current.contributions, option],
    }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!values.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (values.phone.length < 10) {
      next.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!values.state) next.state = "Please select your state.";
    if (!values.city.trim()) next.city = "Please enter your city.";
    if (!values.membershipType) {
      next.membershipType = "Please choose a membership type.";
    }
    if (!values.agreed) {
      next.agreed = "Please agree to the Membership Terms and Privacy Policy.";
    }
    return next;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setValues(emptyValues);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section
      id="membership-form"
      className={styles.apply}
      aria-labelledby="membership-form-heading"
    >
      <div className={styles.container}>
        <div className={styles.applyLayout}>
          <div className={styles.applyMain}>
            <p className={styles.applyEyebrow}>
              <CircleDot size={15} strokeWidth={2} aria-hidden="true" />
              Join HRSJM
            </p>
            <h2
              id="membership-form-heading"
              className={styles.applyHeading}
            >
              Become a Member
              <br />
              With Us
            </h2>
            <p className={styles.applyIntroText}>
              Fill in your details below and our team will review it and get
              back to you. Your information is confidential and secure.
            </p>

            {submitted ? (
              <div className={styles.successCard} role="status">
                <span className={styles.successIcon}>
                  <Check size={26} strokeWidth={2.4} aria-hidden="true" />
                </span>
                <h3 className={styles.successTitle}>Application Received</h3>
                <p className={styles.successText}>
                  Thank you for your interest in becoming an HRSJM member. Your
                  membership application has been received.
                </p>
                <p className={styles.successNote}>
                  Our team will contact you using the details you provided.
                </p>
                <button
                  type="button"
                  className={styles.successReset}
                  onClick={resetForm}
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form className={styles.formBlock} onSubmit={onSubmit} noValidate>
                <div className={styles.formGrid}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="m-fullName">
                      Full Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="m-fullName"
                      className={styles.input}
                      type="text"
                      placeholder="Enter your full name"
                      value={values.fullName}
                      onChange={(e) => setField("fullName", e.target.value)}
                      aria-required="true"
                      aria-invalid={errors.fullName ? true : undefined}
                    />
                    {errors.fullName ? (
                      <p className={styles.fieldError} role="alert">
                        {errors.fullName}
                      </p>
                    ) : null}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="m-email">
                      Email Address <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="m-email"
                      className={styles.input}
                      type="email"
                      placeholder="Enter your email"
                      value={values.email}
                      onChange={(e) => setField("email", e.target.value)}
                      aria-required="true"
                      aria-invalid={errors.email ? true : undefined}
                    />
                    {errors.email ? (
                      <p className={styles.fieldError} role="alert">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="m-phone">
                      Phone Number <span aria-hidden="true">*</span>
                    </label>
                    <div className={styles.phoneWrap}>
                      <span className={styles.phoneCode}>+91</span>
                      <input
                        id="m-phone"
                        className={styles.input}
                        type="tel"
                        inputMode="numeric"
                        placeholder="Enter your phone number"
                        value={values.phone}
                        onChange={onPhoneChange}
                        aria-required="true"
                        aria-invalid={errors.phone ? true : undefined}
                      />
                    </div>
                    {errors.phone ? (
                      <p className={styles.fieldError} role="alert">
                        {errors.phone}
                      </p>
                    ) : null}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="m-state">
                      State <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="m-state"
                      className={styles.select}
                      value={values.state}
                      onChange={(e) => setField("state", e.target.value)}
                      aria-required="true"
                      aria-invalid={errors.state ? true : undefined}
                    >
                      <option value="">Select your state</option>
                      {indianStates.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.state ? (
                      <p className={styles.fieldError} role="alert">
                        {errors.state}
                      </p>
                    ) : null}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="m-dob">
                      Date of Birth
                    </label>
                    <input
                      id="m-dob"
                      className={styles.input}
                      type="date"
                      value={values.dateOfBirth}
                      onChange={(e) => setField("dateOfBirth", e.target.value)}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="m-gender">
                      Gender
                    </label>
                    <select
                      id="m-gender"
                      className={styles.select}
                      value={values.gender}
                      onChange={(e) => setField("gender", e.target.value)}
                    >
                      <option value="">Select gender</option>
                      {genderOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="m-city">
                      City <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="m-city"
                      className={styles.input}
                      type="text"
                      placeholder="Enter your city"
                      value={values.city}
                      onChange={(e) => setField("city", e.target.value)}
                      aria-required="true"
                      aria-invalid={errors.city ? true : undefined}
                    />
                    {errors.city ? (
                      <p className={styles.fieldError} role="alert">
                        {errors.city}
                      </p>
                    ) : null}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="m-type">
                      Membership Type <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="m-type"
                      className={styles.select}
                      value={values.membershipType}
                      onChange={(e) => setField("membershipType", e.target.value)}
                      aria-required="true"
                      aria-invalid={errors.membershipType ? true : undefined}
                    >
                      <option value="">Select membership type</option>
                      {membershipTypeGroups.map((group) => (
                        <optgroup key={group.group} label={group.group}>
                          {group.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    {errors.membershipType ? (
                      <p className={styles.fieldError} role="alert">
                        {errors.membershipType}
                      </p>
                    ) : null}
                  </div>

                  <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label className={styles.label} htmlFor="m-address">
                      Address
                    </label>
                    <input
                      id="m-address"
                      className={styles.input}
                      type="text"
                      placeholder="Enter your address"
                      value={values.address}
                      onChange={(e) => setField("address", e.target.value)}
                    />
                  </div>

                  <div className={`${styles.field} ${styles.fieldFull}`}>
                    <span className={styles.label} id="m-contributions-label">
                      How would you like to contribute?
                    </span>
                    <div
                      className={styles.chipGrid}
                      role="group"
                      aria-labelledby="m-contributions-label"
                    >
                      {contributionOptions.map((option) => {
                        const checked = values.contributions.includes(option);
                        return (
                          <label key={option} className={styles.chip}>
                            <input
                              type="checkbox"
                              className={styles.chipInput}
                              checked={checked}
                              onChange={() => toggleContribution(option)}
                            />
                            <span className={styles.chipBox} aria-hidden="true">
                              {checked ? (
                                <Check size={12} strokeWidth={3} />
                              ) : null}
                            </span>
                            {option}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label className={styles.label} htmlFor="m-reason">
                      Why would you like to join HRSJM?
                    </label>
                    <textarea
                      id="m-reason"
                      className={styles.textarea}
                      rows={4}
                      placeholder="Tell us briefly what motivates you..."
                      value={values.reason}
                      onChange={(e) => setField("reason", e.target.value)}
                    />
                  </div>

                  <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label className={styles.agreeRow}>
                      <input
                        type="checkbox"
                        className={styles.chipInput}
                        checked={values.agreed}
                        onChange={(e) => setField("agreed", e.target.checked)}
                        aria-required="true"
                        aria-invalid={errors.agreed ? true : undefined}
                      />
                      <span className={styles.chipBox} aria-hidden="true">
                        {values.agreed ? (
                          <Check size={12} strokeWidth={3} />
                        ) : null}
                      </span>
                      <span>
                        I agree to the Membership Terms and Privacy Policy.
                      </span>
                    </label>
                    {errors.agreed ? (
                      <p className={styles.fieldError} role="alert">
                        {errors.agreed}
                      </p>
                    ) : null}
                  </div>
                </div>

                <button type="submit" className={styles.submitButton}>
                  Submit Membership Application
                  <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
                </button>

                <p className={styles.formFootnote}>
                  <Lock size={13} strokeWidth={2} aria-hidden="true" />
                  Your information is confidential and will only be used to
                  provide support.
                </p>
              </form>
            )}
          </div>

          <aside className={styles.applySide}>
            <div className={styles.applyImageWrap}>
              <Image
                src="/membership/membership-form-side.png"
                alt="An HRSJM team member speaking with community members."
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                className={styles.applyImage}
              />
            </div>

            <p className={styles.applySideEyebrow}>
              <CircleDot size={15} strokeWidth={2} aria-hidden="true" />
              Important Information
            </p>
            <h3 className={styles.applySideHeading}>Before You Join</h3>
            <p className={styles.applySideText}>
              Please read the following to help you understand the membership
              process better.
            </p>

            <div className={styles.faqList}>
              {beforeYouJoin.map((item, index) => {
                const isOpen = infoOpen === index;
                return (
                  <div key={item.question} className={styles.faqItem}>
                    <h4>
                      <button
                        type="button"
                        className={styles.faqQuestion}
                        aria-expanded={isOpen}
                        aria-controls={`join-info-panel-${index}`}
                        id={`join-info-button-${index}`}
                        onClick={() => setInfoOpen(isOpen ? null : index)}
                      >
                        <span>{item.question}</span>
                        <span
                          className={styles.faqToggleIcon}
                          aria-hidden="true"
                        >
                          {isOpen ? (
                            <Minus size={16} strokeWidth={2.2} />
                          ) : (
                            <Plus size={16} strokeWidth={2.2} />
                          )}
                        </span>
                      </button>
                    </h4>
                    <div
                      id={`join-info-panel-${index}`}
                      role="region"
                      aria-labelledby={`join-info-button-${index}`}
                      className={styles.faqPanel}
                      data-open={isOpen || undefined}
                    >
                      <div className={styles.faqPanelInner}>
                        <p className={styles.faqAnswer}>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className={styles.applySideFootnote}>
              <ShieldCheck size={14} strokeWidth={2} aria-hidden="true" />
              Every application is reviewed personally by our team.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
