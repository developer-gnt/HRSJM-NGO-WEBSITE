"use client";

import { useState } from "react";
import { X, Check, Shield } from "lucide-react";
import styles from "./about.module.css";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [role, setRole] = useState<"volunteer" | "member" | "advocate">(
    "member"
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
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
            onClick={onClose}
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
          <form onSubmit={handleSubmit} className={styles.joinForm}>
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
                  Full Name
                </label>
                <input
                  id="join-name"
                  type="text"
                  required
                  placeholder="e.g. Sunil Vishwakarma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.joinInput}
                />
              </div>

              <div className={styles.joinFieldRow}>
                <div>
                  <label
                    className={styles.joinFieldLabel}
                    htmlFor="join-phone"
                  >
                    Phone / WhatsApp
                  </label>
                  <input
                    id="join-phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={styles.joinInput}
                  />
                </div>
                <div>
                  <label className={styles.joinFieldLabel} htmlFor="join-city">
                    City / State
                  </label>
                  <input
                    id="join-city"
                    type="text"
                    required
                    placeholder="e.g. Mumbai, Maharashtra"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={styles.joinInput}
                  />
                </div>
              </div>

              <div>
                <label className={styles.joinFieldLabel} htmlFor="join-email">
                  Email Address
                </label>
                <input
                  id="join-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.joinInput}
                />
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
              <button type="button" onClick={onClose} className={styles.joinCancel}>
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
