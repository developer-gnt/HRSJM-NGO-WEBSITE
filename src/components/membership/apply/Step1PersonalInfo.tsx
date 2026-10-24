"use client";

import { useRef, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  Camera,
  ChevronDown,
  Mail,
  Phone,
  Trash2,
  User,
  AlertCircle,
  HelpCircle,
  Scale,
} from "lucide-react";
import styles from "./apply.module.css";

export interface Step1Data {
  photoFile: File | null;
  photoPreview: string | null;
  fullName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  priorConviction: "No" | "Yes";
  priorConvictionDetails: string;
}

interface Step1Props {
  data: Step1Data;
  onChange: (field: keyof Step1Data, value: any) => void;
  onNext: () => void;
  errors: Record<string, string>;
}

export default function Step1PersonalInfo({
  data,
  onChange,
  onNext,
  errors,
}: Step1Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPG or PNG).");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Photo file size must not exceed 2MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    onChange("photoFile", file);
    onChange("photoPreview", previewUrl);
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("photoFile", null);
    onChange("photoPreview", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitized = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    onChange("fullName", sanitized);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    onChange("phone", digits);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.stepHeader}>
        <h2 className={styles.sectionHeading}>Personal Information</h2>
        <p className={styles.sectionSubtitle}>
          Please provide your basic details to apply for membership.
        </p>
      </div>

      {/* Profile Photo Upload Box */}
      <div
        className={styles.photoUploadBox}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
        }}
        aria-label="Upload Profile Photo"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={handlePhotoUpload}
        />

        {data.photoPreview ? (
          <div className={styles.photoPreviewWrap}>
            <Image
              src={data.photoPreview}
              alt="Profile photo preview"
              width={54}
              height={54}
              className={styles.photoThumb}
            />
            <div className={styles.photoPreviewInfo}>
              <span className={styles.photoFileName}>
                {data.photoFile?.name || "Profile Photo"}
              </span>
              <span className={styles.photoFileSize}>
                {data.photoFile
                  ? `${(data.photoFile.size / 1024).toFixed(1)} KB`
                  : "Uploaded"}
              </span>
            </div>
            <button
              type="button"
              className={styles.photoRemoveBtn}
              onClick={handleRemovePhoto}
              title="Remove profile photo"
            >
              <Trash2 size={16} /> Remove
            </button>
          </div>
        ) : (
          <div className={styles.photoUploadInner}>
            <div className={styles.photoUploadIcon} aria-hidden="true">
              <Camera size={22} strokeWidth={2} />
            </div>
            <div className={styles.photoUploadText}>
              <span className={styles.photoUploadTitle}>Add Profile Photo</span>
              <span className={styles.photoUploadSub}>JPG, PNG (Max 2MB)</span>
            </div>
          </div>
        )}
      </div>

      {/* Form Fields Grid */}
      <div className={styles.formGrid}>
        {/* Full Name */}
        <div className={styles.formField}>
          <label htmlFor="app-fullname" className={styles.fieldLabel}>
            Full Name <span className={styles.fieldRequired}>*</span>
          </label>
          <div
            className={`${styles.inputWrapper} ${
              errors.fullName ? styles.inputWrapperError : ""
            }`}
          >
            <span className={styles.inputIcon} aria-hidden="true">
              <User size={17} strokeWidth={2} />
            </span>
            <input
              id="app-fullname"
              type="text"
              placeholder="Enter your full name"
              value={data.fullName}
              onChange={handleFullNameChange}
              className={styles.inputField}
              autoComplete="name"
            />
          </div>
          {errors.fullName && (
            <p className={styles.fieldError} role="alert">
              <AlertCircle size={13} strokeWidth={2} />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className={styles.formField}>
          <label htmlFor="app-dob" className={styles.fieldLabel}>
            Date of Birth <span className={styles.fieldRequired}>*</span>
          </label>
          <div
            className={`${styles.inputWrapper} ${
              errors.dob ? styles.inputWrapperError : ""
            }`}
          >
            <span className={styles.inputIcon} aria-hidden="true">
              <Calendar size={17} strokeWidth={2} />
            </span>
            <input
              id="app-dob"
              type="date"
              placeholder="Select date of birth"
              value={data.dob}
              onChange={(e) => onChange("dob", e.target.value)}
              className={styles.inputField}
            />
          </div>
          {errors.dob && (
            <p className={styles.fieldError} role="alert">
              <AlertCircle size={13} strokeWidth={2} />
              {errors.dob}
            </p>
          )}
        </div>

        {/* Gender */}
        <div className={styles.formField}>
          <label htmlFor="app-gender" className={styles.fieldLabel}>
            Gender <span className={styles.fieldRequired}>*</span>
          </label>
          <div
            className={`${styles.inputWrapper} ${
              errors.gender ? styles.inputWrapperError : ""
            }`}
          >
            <span className={styles.inputIcon} aria-hidden="true">
              <User size={17} strokeWidth={2} />
            </span>
            <select
              id="app-gender"
              value={data.gender}
              onChange={(e) => onChange("gender", e.target.value)}
              className={styles.selectField}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            <ChevronDown size={16} className={styles.selectArrow} />
          </div>
          {errors.gender && (
            <p className={styles.fieldError} role="alert">
              <AlertCircle size={13} strokeWidth={2} />
              {errors.gender}
            </p>
          )}
        </div>

        {/* Mobile Number */}
        <div className={styles.formField}>
          <label htmlFor="app-phone" className={styles.fieldLabel}>
            Mobile Number <span className={styles.fieldRequired}>*</span>
          </label>
          <div
            className={`${styles.inputWrapper} ${
              errors.phone ? styles.inputWrapperError : ""
            }`}
          >
            <span className={styles.inputIcon} aria-hidden="true">
              <Phone size={17} strokeWidth={2} />
            </span>
            <span className={styles.phonePrefix}>+91</span>
            <input
              id="app-phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="Enter mobile number"
              value={data.phone}
              onChange={handlePhoneChange}
              className={styles.inputField}
            />
          </div>
          {errors.phone && (
            <p className={styles.fieldError} role="alert">
              <AlertCircle size={13} strokeWidth={2} />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className={`${styles.formField} ${styles.formFieldFull}`}>
          <label htmlFor="app-email" className={styles.fieldLabel}>
            Email Address <span className={styles.fieldRequired}>*</span>
          </label>
          <div
            className={`${styles.inputWrapper} ${
              errors.email ? styles.inputWrapperError : ""
            }`}
          >
            <span className={styles.inputIcon} aria-hidden="true">
              <Mail size={17} strokeWidth={2} />
            </span>
            <input
              id="app-email"
              type="email"
              placeholder="Enter your email address"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
              className={styles.inputField}
              autoComplete="email"
            />
          </div>
          {errors.email && (
            <p className={styles.fieldError} role="alert">
              <AlertCircle size={13} strokeWidth={2} />
              {errors.email}
            </p>
          )}
        </div>

        {/* Additional Question: Prior Conviction or Judicial Punishment */}
        <div className={`${styles.formField} ${styles.formFieldFull}`}>
          <label className={styles.fieldLabel}>
            <Scale size={15} style={{ color: "#d97706" }} />
            Have you ever been convicted, arrested, or penalised by any court of
            law or judicial authority? <span className={styles.fieldRequired}>*</span>
          </label>
          <span className={styles.fieldHelper} style={{ marginBottom: 10 }}>
            <em>(Note: Exact question wording and eligibility guidelines subject to confirmation by HRSJM legal / administrative committee)</em>
          </span>

          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 14 }}>
              <input
                type="radio"
                name="priorConviction"
                value="No"
                checked={data.priorConviction === "No"}
                onChange={() => onChange("priorConviction", "No")}
              />
              <span>No</span>
            </label>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 14 }}>
              <input
                type="radio"
                name="priorConviction"
                value="Yes"
                checked={data.priorConviction === "Yes"}
                onChange={() => onChange("priorConviction", "Yes")}
              />
              <span>Yes</span>
            </label>
          </div>

          {data.priorConviction === "Yes" && (
            <div style={{ marginTop: 12 }}>
              <textarea
                rows={3}
                placeholder="Please provide details (case reference, year, or nature of order)..."
                value={data.priorConvictionDetails}
                onChange={(e) => onChange("priorConvictionDetails", e.target.value)}
                className={styles.inputField}
                style={{
                  border: "1px solid #dce4ec",
                  borderRadius: 8,
                  padding: 10,
                  width: "100%",
                }}
              />
              {errors.priorConvictionDetails && (
                <p className={styles.fieldError} role="alert">
                  <AlertCircle size={13} strokeWidth={2} />
                  {errors.priorConvictionDetails}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Continue Action */}
      <div className={styles.navActions}>
        <button type="submit" className={`${styles.btnGold} ${styles.btnFull}`}>
          Continue <ArrowRight size={17} strokeWidth={2.4} />
        </button>
      </div>
    </form>
  );
}
