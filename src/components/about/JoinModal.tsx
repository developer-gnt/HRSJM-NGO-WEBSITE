"use client";

import { useState } from "react";
import { X, Check, Shield, AlertCircle } from "lucide-react";
import styles from "./about.module.css";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
}

export default function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [role, setRole] = useState<"volunteer" | "member" | "advocate">(
    "member"
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  // Full Name: No special characters or numbers, letters and spaces only
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setName(sanitized);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  // Phone Number: No alphabets allowed, numbers only, max 10 digits
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(digits);
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  // Email Address
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  // City / State
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    if (errors.city) {
      setErrors((prev) => ({ ...prev, city: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name: Letters and spaces only, minimum 2 characters
    const trimmedName = name.trim();
    if (!trimmedName) {
      newErrors.name = "Please enter your full name.";
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      newErrors.name = "Full name should only contain letters and spaces (no special characters).";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Full name must be at least 2 characters.";
    }

    // Phone Number: Fixed +91 prefix, strictly 10 digits
    const trimmedPhone = phone.trim();
    if (!trimmedPhone) {
      newErrors.phone = "Please enter your phone number.";
    } else if (trimmedPhone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    // Email Address: strictly email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // City / State
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      newErrors.city = "Please enter your city and state.";
    } else if (trimmedCity.length < 2) {
      newErrors.city = "City/State must be at least 2 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setPhone("");
      setEmail("");
      setCity("");
      setErrors({});
      onClose();
    }, 2500);
  };

  const roleTabs = [
    { value: "member" as const, label: "General Member" },
    { value: "volunteer" as const, label: "Volunteer" },
    { value: "advocate" as const, label: "Legal Advocate" },
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalPanel} ${styles.modalPanelNarrow}`}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <button
            onClick={handleClose}
            aria-label="Close join form"
            className={styles.modalClose}
          >
            <X className={styles.modalCloseIcon} />
          </button>

          <span className={styles.modalEyebrow}>Membership &amp; Solidarity</span>
          <h3 className={styles.modalTitle}>Join Hands with HRSJM</h3>
          <p className={styles.modalSub}>
            Become a part of our democratic network advocating for human
            rights, equality, and dignity.
          </p>
        </div>

        {submitted ? (
          <div className={styles.joinSuccess}>
            <div className={styles.joinSuccessCircle}>
              <Check strokeWidth={2} />
            </div>
            <h4 className={styles.joinSuccessTitle}>
              Welcome to the Movement
            </h4>
            <p className={styles.joinSuccessText}>
              Your registration has been received by the HRSJM National
              Secretariat. Our regional coordinator will contact you shortly
              with your membership details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.joinForm} noValidate>
            {/* Role tabs */}
            <div>
              <label className={styles.joinRoleLabel}>Join As</label>
              <div className={styles.joinRoleTabs}>
                {roleTabs.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setRole(tab.value)}
                    className={`${styles.joinRoleTab} ${
                      role === tab.value ? styles.joinRoleTabActive : ""
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className={styles.joinFields}>
              <div>
                <label className={styles.joinFieldLabel} htmlFor="join-name">
                  Full Name <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  id="join-name"
                  type="text"
                  placeholder="e.g. Sunil Vishwakarma"
                  value={name}
                  onChange={handleNameChange}
                  className={`${styles.joinInput} ${errors.name ? styles.inputError : ""}`}
                  aria-invalid={errors.name ? "true" : undefined}
                />
                {errors.name && (
                  <p className={styles.fieldError} role="alert">
                    <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className={styles.joinFieldRow}>
                <div>
                  <label
                    className={styles.joinFieldLabel}
                    htmlFor="join-phone"
                  >
                    Phone / WhatsApp <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <div className={`${styles.joinPhoneWrap} ${errors.phone ? styles.inputError : ""}`}>
                    <span className={styles.joinPhonePrefix}>+91</span>
                    <input
                      id="join-phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="98765 43210"
                      value={phone}
                      onChange={handlePhoneChange}
                      className={styles.joinPhoneInput}
                      aria-label="10-digit mobile number"
                      aria-invalid={errors.phone ? "true" : undefined}
                    />
                  </div>
                  {errors.phone && (
                    <p className={styles.fieldError} role="alert">
                      <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label className={styles.joinFieldLabel} htmlFor="join-city">
                    City / State <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <input
                    id="join-city"
                    type="text"
                    placeholder="e.g. Mumbai, Maharashtra"
                    value={city}
                    onChange={handleCityChange}
                    className={`${styles.joinInput} ${errors.city ? styles.inputError : ""}`}
                    aria-invalid={errors.city ? "true" : undefined}
                  />
                  {errors.city && (
                    <p className={styles.fieldError} role="alert">
                      <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                      {errors.city}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className={styles.joinFieldLabel} htmlFor="join-email">
                  Email Address <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  id="join-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  className={`${styles.joinInput} ${errors.email ? styles.inputError : ""}`}
                  aria-invalid={errors.email ? "true" : undefined}
                />
                {errors.email && (
                  <p className={styles.fieldError} role="alert">
                    <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Note */}
            <div className={styles.joinNote}>
              <Shield strokeWidth={1.8} />
              <span>
                Membership commits to the constitutional and secular values of
                HRSJM.
              </span>
            </div>

            {/* Submit */}
            <div className={styles.joinActions}>
              <button type="button" onClick={handleClose} className={styles.joinCancel}>
                Cancel
              </button>
              <button type="submit" className={styles.joinSubmit}>
                Submit Application →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
