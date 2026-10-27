"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CircleCheck,
  CheckCircle2,
  Lock,
  Plus,
  Upload,
  Trash2,
  Printer,
  Heart,
  UserPlus,
  FileText,
  ShieldCheck,
  Building2,
  X,
  Check,
  Copy,
} from "lucide-react";
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
  "Legal Aid - Civil",
  "Legal Aid - Criminal",
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
  policeStation: string;
  complaintType: string;
  details: string;
  aadhaarFile: File | null;
  aadhaarFileName: string;
  aadhaarFileUri: string | null;
  handwrittenFile: File | null;
  handwrittenFileName: string;
  handwrittenFileUri: string | null;
  reportedToOtherDept: boolean;
  otherDeptName: string;
  otherDeptFile: File | null;
  otherDeptFileName: string;
  otherDeptFileUri: string | null;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeDeclaration: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  state?: string;
  policeStation?: string;
  complaintType?: string;
  details?: string;
  aadhaarFile?: string;
  handwrittenFile?: string;
  otherDeptName?: string;
  agreeTerms?: string;
  agreePrivacy?: string;
  agreeDeclaration?: string;
  [key: string]: string | undefined;
}

const initialValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  state: "",
  policeStation: "",
  complaintType: "",
  details: "",
  aadhaarFile: null,
  aadhaarFileName: "",
  aadhaarFileUri: null,
  handwrittenFile: null,
  handwrittenFileName: "",
  handwrittenFileUri: null,
  reportedToOtherDept: false,
  otherDeptName: "",
  otherDeptFile: null,
  otherDeptFileName: "",
  otherDeptFileUri: null,
  agreeTerms: false,
  agreePrivacy: false,
  agreeDeclaration: false,
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

    // Nearby Police Station
    if (!values.policeStation.trim()) {
      nextErrors.policeStation = "Please enter nearby police station.";
    } else if (values.policeStation.trim().length < 3) {
      nextErrors.policeStation = "Police station name must be at least 3 characters.";
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

    // Aadhaar Card Upload (Required)
    if (!values.aadhaarFile && !values.aadhaarFileName) {
      nextErrors.aadhaarFile = "Please upload your Aadhaar card for citizen identification and verification.";
    }

    // Handwritten Complaint Upload (Required)
    if (!values.handwrittenFile && !values.handwrittenFileName) {
      nextErrors.handwrittenFile = "Please upload a clear copy of your signed handwritten complaint.";
    }

    // Reported to Other Department
    if (values.reportedToOtherDept && !values.otherDeptName.trim()) {
      nextErrors.otherDeptName = "Please specify the department or authority name where previously reported.";
    }

    // Consents & Declaration
    if (!values.agreeTerms) {
      nextErrors.agreeTerms = "Please agree to the Terms & Conditions.";
    }
    if (!values.agreePrivacy) {
      nextErrors.agreePrivacy = "Please accept the Privacy Policy.";
    }
    if (!values.agreeDeclaration) {
      nextErrors.agreeDeclaration = "Please confirm the declaration of truthfulness.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const aadhaarInputRef = useRef<HTMLInputElement>(null);
  const handwrittenInputRef = useRef<HTMLInputElement>(null);
  const otherDeptInputRef = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [complaintRef, setComplaintRef] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Acknowledgement Modal State
  const [ackModalOpen, setAckModalOpen] = useState(false);
  const [ackData, setAckData] = useState<{
    complaintRef: string;
    fullName: string;
    phone: string;
    email?: string;
    state: string;
    policeStation: string;
    complaintType: string;
    aadhaarFileName: string;
    handwrittenFileName: string;
    reportedToOtherDept: boolean;
    otherDeptName?: string;
    otherDeptFileName?: string;
    submittedAt: string;
  } | null>(null);

  // Quick Donation Options (up to 500)
  const [donateAmount, setDonateAmount] = useState<number>(250);
  const [customDonateAmount, setCustomDonateAmount] = useState<string>("250");
  const [copiedRef, setCopiedRef] = useState(false);

  // Stop background scrolling when acknowledgement modal is open
  useEffect(() => {
    if (ackModalOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [ackModalOpen]);

  const handleFileUpload = (
    fieldPrefix: "aadhaar" | "handwritten" | "otherDept",
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit. Please upload a smaller file.");
      return;
    }

    const validTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];
    if (
      !validTypes.includes(file.type) &&
      !file.name.match(/\.(pdf|jpg|jpeg|png)$/i)
    ) {
      alert("Please upload a valid file format (PDF, JPG, or PNG).");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setValues((prev) => ({
        ...prev,
        [`${fieldPrefix}File`]: file,
        [`${fieldPrefix}FileName`]: file.name,
        [`${fieldPrefix}FileUri`]: dataUrl,
      }));
      setErrors((prev) => ({
        ...prev,
        [`${fieldPrefix}File`]: undefined,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = (
    fieldPrefix: "aadhaar" | "handwritten" | "otherDept",
    e?: React.MouseEvent
  ) => {
    e?.stopPropagation();
    setValues((prev) => ({
      ...prev,
      [`${fieldPrefix}File`]: null,
      [`${fieldPrefix}FileName`]: "",
      [`${fieldPrefix}FileUri`]: null,
    }));
    if (fieldPrefix === "aadhaar" && aadhaarInputRef.current) aadhaarInputRef.current.value = "";
    if (fieldPrefix === "handwritten" && handwrittenInputRef.current) handwrittenInputRef.current.value = "";
    if (fieldPrefix === "otherDept" && otherDeptInputRef.current) otherDeptInputRef.current.value = "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      setSubmitted(false);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        state: values.state,
        policeStation: values.policeStation.trim(),
        complaintType: values.complaintType,
        details: values.details.trim(),
        aadhaarFileName: values.aadhaarFileName,
        aadhaarFileUri: values.aadhaarFileUri,
        handwrittenFileName: values.handwrittenFileName,
        handwrittenFileUri: values.handwrittenFileUri,
        reportedToOtherDept: values.reportedToOtherDept,
        otherDeptName: values.otherDeptName.trim() || undefined,
        otherDeptFileName: values.otherDeptFileName || undefined,
        otherDeptFileUri: values.otherDeptFileUri || undefined,
      };

      const res = await fetch("/api/complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitError(data.error || "Failed to submit complaint. Please retry.");
        return;
      }
      setSubmitted(true);
      setComplaintRef(data.complaintRef);
      setAckData({
        complaintRef: data.complaintRef,
        fullName: values.fullName.trim(),
        phone: values.phone.trim(),
        email: values.email?.trim() || undefined,
        state: values.state,
        policeStation: values.policeStation.trim(),
        complaintType: values.complaintType,
        aadhaarFileName: values.aadhaarFileName,
        handwrittenFileName: values.handwrittenFileName,
        reportedToOtherDept: values.reportedToOtherDept,
        otherDeptName: values.otherDeptName.trim() || undefined,
        otherDeptFileName: values.otherDeptFileName || undefined,
        submittedAt: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      setAckModalOpen(true);
      setValues(initialValues);
      setErrors({});
    } catch (err: any) {
      setSubmitError("Network error. Unable to connect to server. Please try again.");
    } finally {
      setSubmitting(false);
    }
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

            <div className={styles.formRow}>
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
                <label htmlFor="complaint-police-station" className={styles.formLabel}>
                  Nearby Police Station <span className={styles.formRequired} aria-hidden="true">*</span>
                </label>
                <input
                  id="complaint-police-station"
                  name="policeStation"
                  type="text"
                  required
                  placeholder="Enter nearby police station"
                  value={values.policeStation}
                  onChange={(e) => handleChange("policeStation", e.target.value)}
                  className={`${styles.formInput} ${errors.policeStation ? styles.inputError : ""}`}
                  aria-invalid={errors.policeStation ? "true" : undefined}
                />
                {errors.policeStation && (
                  <p className={styles.formFieldError} role="alert">
                    <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                    {errors.policeStation}
                  </p>
                )}
              </div>
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

            {/* Document Uploads: Aadhaar Card & Handwritten Complaint */}
            <div className={styles.formRow}>
              {/* Aadhaar Card Upload */}
              <div className={styles.formField}>
                <label className={styles.formLabel}>
                  Upload Aadhaar Card (Identity Proof) <span className={styles.formRequired} aria-hidden="true">*</span>
                </label>
                <input
                  ref={aadhaarInputRef}
                  type="file"
                  accept="application/pdf,image/jpeg,image/png,image/webp"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileUpload("aadhaar", e)}
                />
                <div
                  className={`${styles.uploadCard} ${values.aadhaarFileName ? styles.uploadCardSuccess : ""
                    } ${errors.aadhaarFile ? styles.uploadCardError : ""}`}
                  onClick={() => aadhaarInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") aadhaarInputRef.current?.click();
                  }}
                >
                  <div className={styles.uploadCardContent}>
                    <div className={styles.uploadIconText}>
                      <div
                        className={`${styles.uploadIconCircle} ${values.aadhaarFileName ? styles.uploadIconCircleSuccess : ""
                          }`}
                      >
                        {values.aadhaarFileName ? <Check size={18} strokeWidth={2.6} /> : <FileText size={18} />}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p className={styles.uploadTitle}>
                          {values.aadhaarFileName ? "Aadhaar Card Uploaded" : "Choose Aadhaar File"}
                        </p>
                        <p className={styles.uploadSubtitle}>
                          {values.aadhaarFileName || "PDF, JPG or PNG (Max 5MB)"}
                        </p>
                      </div>
                    </div>
                    {values.aadhaarFileName ? (
                      <button
                        type="button"
                        className={styles.uploadRemoveBtn}
                        onClick={(e) => handleRemoveFile("aadhaar", e)}
                        title="Remove Aadhaar file"
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    ) : (
                      <span className={styles.uploadActionBtn}>Browse</span>
                    )}
                  </div>
                </div>
                {errors.aadhaarFile && (
                  <p className={styles.formFieldError} role="alert">
                    <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                    {errors.aadhaarFile}
                  </p>
                )}
              </div>

              {/* Handwritten Complaint Upload */}
              <div className={styles.formField}>
                <label className={styles.formLabel}>
                  Upload Handwritten Complaint <span className={styles.formRequired} aria-hidden="true">*</span>
                </label>
                <input
                  ref={handwrittenInputRef}
                  type="file"
                  accept="application/pdf,image/jpeg,image/png,image/webp"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileUpload("handwritten", e)}
                />
                <div
                  className={`${styles.uploadCard} ${values.handwrittenFileName ? styles.uploadCardSuccess : ""
                    } ${errors.handwrittenFile ? styles.uploadCardError : ""}`}
                  onClick={() => handwrittenInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handwrittenInputRef.current?.click();
                  }}
                >
                  <div className={styles.uploadCardContent}>
                    <div className={styles.uploadIconText}>
                      <div
                        className={`${styles.uploadIconCircle} ${values.handwrittenFileName ? styles.uploadIconCircleSuccess : ""
                          }`}
                      >
                        {values.handwrittenFileName ? <Check size={18} strokeWidth={2.6} /> : <Upload size={18} />}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p className={styles.uploadTitle}>
                          {values.handwrittenFileName ? "Complaint Letter Uploaded" : "Signed Handwritten Letter"}
                        </p>
                        <p className={styles.uploadSubtitle}>
                          {values.handwrittenFileName || "Clear photo or scan (PDF/JPG)"}
                        </p>
                      </div>
                    </div>
                    {values.handwrittenFileName ? (
                      <button
                        type="button"
                        className={styles.uploadRemoveBtn}
                        onClick={(e) => handleRemoveFile("handwritten", e)}
                        title="Remove handwritten complaint"
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    ) : (
                      <span className={styles.uploadActionBtn}>Browse</span>
                    )}
                  </div>
                </div>
                {errors.handwrittenFile && (
                  <p className={styles.formFieldError} role="alert">
                    <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                    {errors.handwrittenFile}
                  </p>
                )}
              </div>
            </div>

            {/* Ask whether reported to another department */}
            <div className={styles.deptSection}>
              <label className={styles.formLabel} style={{ marginBottom: "2px" }}>
                Was this same issue reported to another department / authority?
              </label>
              <p style={{ margin: "0 0 10px", fontSize: "12.5px", color: "#64748b" }}>
                Let us know if you have previously filed this grievance with the Police, Court, or another commission.
              </p>
              <div className={styles.deptRadioRow}>
                <label
                  className={`${styles.deptRadioLabel} ${!values.reportedToOtherDept ? styles.deptRadioLabelSelected : ""
                    }`}
                >
                  <input
                    type="radio"
                    name="reportedToOtherDept"
                    checked={!values.reportedToOtherDept}
                    onChange={() => {
                      setValues((prev) => ({
                        ...prev,
                        reportedToOtherDept: false,
                        otherDeptName: "",
                        otherDeptFile: null,
                        otherDeptFileName: "",
                        otherDeptFileUri: null,
                      }));
                      if (errors.otherDeptName) setErrors((prev) => ({ ...prev, otherDeptName: undefined }));
                    }}
                  />
                  <span>No (First time filing grievance)</span>
                </label>

                <label
                  className={`${styles.deptRadioLabel} ${values.reportedToOtherDept ? styles.deptRadioLabelSelected : ""
                    }`}
                >
                  <input
                    type="radio"
                    name="reportedToOtherDept"
                    checked={values.reportedToOtherDept}
                    onChange={() => {
                      setValues((prev) => ({ ...prev, reportedToOtherDept: true }));
                    }}
                  />
                  <span>Yes (Previously reported)</span>
                </label>
              </div>

              {values.reportedToOtherDept && (
                <div className={styles.deptExpandBox}>
                  <div className={styles.formField}>
                    <label htmlFor="complaint-other-dept-name" className={styles.formLabel}>
                      Department / Authority Name <span className={styles.formRequired} aria-hidden="true">*</span>
                    </label>
                    <input
                      id="complaint-other-dept-name"
                      name="otherDeptName"
                      type="text"
                      required
                      placeholder="e.g. Police Station / SP Office / Women's Commission / Consumer Forum"
                      value={values.otherDeptName}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, otherDeptName: e.target.value }));
                        if (errors.otherDeptName) setErrors((prev) => ({ ...prev, otherDeptName: undefined }));
                      }}
                      className={`${styles.formInput} ${errors.otherDeptName ? styles.inputError : ""}`}
                    />
                    {errors.otherDeptName && (
                      <p className={styles.formFieldError} role="alert">
                        <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                        {errors.otherDeptName}
                      </p>
                    )}
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.formLabel}>
                      Upload Copy of Previous Complaint / Acknowledgment (Optional / Recommended)
                    </label>
                    <input
                      ref={otherDeptInputRef}
                      type="file"
                      accept="application/pdf,image/jpeg,image/png,image/webp"
                      style={{ display: "none" }}
                      onChange={(e) => handleFileUpload("otherDept", e)}
                    />
                    <div
                      className={`${styles.uploadCard} ${values.otherDeptFileName ? styles.uploadCardSuccess : ""
                        }`}
                      onClick={() => otherDeptInputRef.current?.click()}
                      role="button"
                      tabIndex={0}
                    >
                      <div className={styles.uploadCardContent}>
                        <div className={styles.uploadIconText}>
                          <div
                            className={`${styles.uploadIconCircle} ${values.otherDeptFileName ? styles.uploadIconCircleSuccess : ""
                              }`}
                          >
                            {values.otherDeptFileName ? <Check size={18} strokeWidth={2.6} /> : <Building2 size={18} />}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p className={styles.uploadTitle}>
                              {values.otherDeptFileName ? "Prior Complaint Copy Uploaded" : "Attach Previous Filing Copy"}
                            </p>
                            <p className={styles.uploadSubtitle}>
                              {values.otherDeptFileName || "FIR copy, receipt, or acknowledgement (PDF/JPG)"}
                            </p>
                          </div>
                        </div>
                        {values.otherDeptFileName ? (
                          <button
                            type="button"
                            className={styles.uploadRemoveBtn}
                            onClick={(e) => handleRemoveFile("otherDept", e)}
                            title="Remove prior filing copy"
                          >
                            <Trash2 size={13} /> Remove
                          </button>
                        ) : (
                          <span className={styles.uploadActionBtn}>Browse</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Consents & Declarations */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "14px 0" }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer", fontSize: "13px", color: "var(--color-navy)" }}>
                <input
                  type="checkbox"
                  checked={values.agreeTerms}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, agreeTerms: e.target.checked }));
                    if (errors.agreeTerms) setErrors((prev) => ({ ...prev, agreeTerms: undefined }));
                  }}
                  style={{ marginTop: "3px", accentColor: "var(--color-gold)", width: "16px", height: "16px", flexShrink: 0 }}
                />
                <span>
                  I agree to the <Link href="/terms" target="_blank" style={{ color: "var(--color-gold)", fontWeight: 600, textDecoration: "underline" }}>Terms &amp; Conditions</Link> of HRSJM. <span style={{ color: "#dc2626" }}>*</span>
                </span>
              </label>
              {errors.agreeTerms && (
                <p className={styles.formFieldError} role="alert">
                  <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                  {errors.agreeTerms}
                </p>
              )}

              <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer", fontSize: "13px", color: "var(--color-navy)" }}>
                <input
                  type="checkbox"
                  checked={values.agreePrivacy}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, agreePrivacy: e.target.checked }));
                    if (errors.agreePrivacy) setErrors((prev) => ({ ...prev, agreePrivacy: undefined }));
                  }}
                  style={{ marginTop: "3px", accentColor: "var(--color-gold)", width: "16px", height: "16px", flexShrink: 0 }}
                />
                <span>
                  I accept the <Link href="/privacy" target="_blank" style={{ color: "var(--color-gold)", fontWeight: 600, textDecoration: "underline" }}>Privacy Policy</Link> and consent to HRSJM verifying my details to provide support. <span style={{ color: "#dc2626" }}>*</span>
                </span>
              </label>
              {errors.agreePrivacy && (
                <p className={styles.formFieldError} role="alert">
                  <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                  {errors.agreePrivacy}
                </p>
              )}

              <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer", fontSize: "13px", color: "var(--color-navy)" }}>
                <input
                  type="checkbox"
                  checked={values.agreeDeclaration}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, agreeDeclaration: e.target.checked }));
                    if (errors.agreeDeclaration) setErrors((prev) => ({ ...prev, agreeDeclaration: undefined }));
                  }}
                  style={{ marginTop: "3px", accentColor: "var(--color-gold)", width: "16px", height: "16px", flexShrink: 0 }}
                />
                <span>
                  <strong>Solemn Declaration:</strong> I declare that all statements and facts provided in this complaint are true and accurate to the best of my knowledge. <span style={{ color: "#dc2626" }}>*</span>
                </span>
              </label>
              {errors.agreeDeclaration && (
                <p className={styles.formFieldError} role="alert">
                  <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                  {errors.agreeDeclaration}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={styles.formSubmit}
              disabled={submitting || !values.agreeTerms || !values.agreePrivacy || !values.agreeDeclaration}
              style={{ opacity: submitting || !values.agreeTerms || !values.agreePrivacy || !values.agreeDeclaration ? 0.7 : 1, cursor: submitting || !values.agreeTerms || !values.agreePrivacy || !values.agreeDeclaration ? "not-allowed" : "pointer" }}
            >
              {submitting ? "Submitting to Backend..." : "Submit Complaint"}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </button>

            {submitError && (
              <p className={styles.formFieldError} style={{ marginTop: "12px", color: "#dc2626" }} role="alert">
                <AlertCircle size={14} strokeWidth={2} aria-hidden="true" />
                {submitError}
              </p>
            )}

            {submitted ? (
              <div
                className={styles.formNote}
                role="status"
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  color: "#166534",
                  padding: "14px 16px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <CircleCheck size={18} strokeWidth={2.4} style={{ color: "#16a34a", flexShrink: 0, marginTop: "2px" }} aria-hidden="true" />
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: "14px" }}>
                    Complaint Registered Successfully with HRSJM!
                  </p>
                  {complaintRef && (
                    <p style={{ margin: "4px 0 0", fontSize: "13px", lineHeight: "1.5" }}>
                      Complaint ID / Ticket Reference: <strong style={{ color: "#14532d" }}>{complaintRef}</strong>. A confirmation email has been sent to your registered email address. Our human rights grievance team will review your case.
                    </p>
                  )}
                </div>
              </div>
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

      {/* Official Client-Approved Complaint Acknowledgement Modal & Post-Actions */}
      {ackModalOpen && ackData && (
        <div className={styles.ackModalOverlay} role="dialog" aria-modal="true" aria-labelledby="ack-modal-title">
          <div className={styles.ackModalCard}>
            {/* Modal Header */}
            <div className={styles.ackModalHeader}>
              <div className={styles.ackHeaderTopRow}>
                <div className={styles.ackLogoBadge}>
                  <Image
                    src="/logo.png"
                    alt="HRSJM Crest"
                    width={48}
                    height={40}
                    className={styles.ackLogoMark}
                    priority
                  />
                  <div className={styles.ackOrgInfo}>
                    <div className={styles.ackOrgName}>HUMAN RIGHTS &amp; SOCIAL JUSTICE MISSION</div>
                    <div className={styles.ackOrgSubtitle}>
                      <span>राष्ट्रीय मानवाधिकार एवं सामाजिक न्याय मिशन</span>
                      <span className={styles.ackOrgDivider}>•</span>
                      <span>Govt. Regd. Grievance Cell</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.ackCloseIconBtn}
                  onClick={() => setAckModalOpen(false)}
                  aria-label="Close acknowledgement modal"
                  title="Close (Esc)"
                >
                  <X size={18} />
                </button>
              </div>

              <h2 id="ack-modal-title" className={styles.ackModalTitle}>
                Official Complaint Acknowledgement Receipt
              </h2>
              <div className={styles.ackModalSubtitle}>
                शिकायत पावती पत्र • Formal Citizen Grievance Intake Confirmation
              </div>

              <div className={styles.ackReferenceBar}>
                <div className={styles.ackTicketBadge}>
                  <ShieldCheck size={16} className={styles.ackShieldIcon} />
                  <span className={styles.ackTicketLabel}>Reference No:</span>
                  <span className={styles.ackTicketCode}>{ackData.complaintRef}</span>
                </div>

                <button
                  type="button"
                  className={styles.ackCopyBtn}
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText(ackData.complaintRef);
                      setCopiedRef(true);
                      setTimeout(() => setCopiedRef(false), 2200);
                    }
                  }}
                  title="Copy Reference Number"
                >
                  {copiedRef ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedRef ? "Copied to Clipboard" : "Copy Reference"}</span>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className={styles.ackModalBody}>
              {/* Approved Official Acknowledgement Statement */}
              <div className={styles.ackDocketCard}>
                <div className={styles.ackDocketHeader}>
                  <CheckCircle2 size={16} color="#16a34a" />
                  <span>Grievance Officially Docketed</span>
                  <span className={styles.ackDocketBadge}>Verified Submission</span>
                </div>

                <p className={styles.ackDocketSalutation}>
                  Dear {ackData.fullName},
                </p>
                <p className={styles.ackDocketParagraph}>
                  Your grievance regarding <strong>{ackData.complaintType}</strong> has been successfully registered in the central intake docket of the <strong>Human Rights &amp; Social Justice Mission (HRSJM)</strong>.
                </p>
                <p className={styles.ackDocketParagraph}>
                  All attached citizen identification and signed complaint letters have been logged under Registration Number <strong>{ackData.complaintRef}</strong>. Our designated legal and human rights officer will examine the case and contact you within <strong>2 to 3 business days</strong>. Please keep this reference number safe for all future updates.
                </p>
              </div>

              {/* Verified Case Summary Grid */}
              <div className={styles.ackSummaryGrid}>
                <div className={styles.ackSummaryItem}>
                  <span className={styles.ackSummaryLabel}>Complainant Name</span>
                  <span className={styles.ackSummaryValue}>{ackData.fullName}</span>
                </div>
                <div className={styles.ackSummaryItem}>
                  <span className={styles.ackSummaryLabel}>Contact Phone</span>
                  <span className={styles.ackSummaryValue}>+91 {ackData.phone}</span>
                </div>
                <div className={styles.ackSummaryItem}>
                  <span className={styles.ackSummaryLabel}>State / Jurisdiction</span>
                  <span className={styles.ackSummaryValue}>{ackData.state}</span>
                </div>
                <div className={styles.ackSummaryItem}>
                  <span className={styles.ackSummaryLabel}>Nearby Police Station</span>
                  <span className={styles.ackSummaryValue}>{ackData.policeStation}</span>
                </div>
                <div className={styles.ackSummaryItem}>
                  <span className={styles.ackSummaryLabel}>Complaint Category</span>
                  <span className={styles.ackSummaryValue}>{ackData.complaintType}</span>
                </div>
                <div className={styles.ackSummaryItem}>
                  <span className={styles.ackSummaryLabel}>Filing Date &amp; Time</span>
                  <span className={styles.ackSummaryValue}>{ackData.submittedAt}</span>
                </div>

                <div className={styles.ackDocsList}>
                  <span className={styles.ackSummaryLabel}>Verified Document Attachments</span>
                  <div className={styles.ackDocChipsRow}>
                    <span className={`${styles.ackDocBadge} ${styles.ackDocBadgeVerified}`}>
                      <CheckCircle2 size={13} /> Aadhaar: {ackData.aadhaarFileName}
                    </span>
                    <span className={`${styles.ackDocBadge} ${styles.ackDocBadgeVerified}`}>
                      <FileText size={13} /> Handwritten Letter: {ackData.handwrittenFileName}
                    </span>
                    {ackData.reportedToOtherDept ? (
                      <span className={`${styles.ackDocBadge} ${styles.ackDocBadgeDept}`}>
                        <Building2 size={13} /> Prior Dept: {ackData.otherDeptName || "Reported"}
                        {ackData.otherDeptFileName ? ` (${ackData.otherDeptFileName})` : ""}
                      </span>
                    ) : (
                      <span
                        className={styles.ackDocBadge}
                        style={{ background: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1" }}
                      >
                        First Time Filing (Not reported elsewhere)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Offer the Agreed Post-Complaint Options: Donate up to 500, Join, or Donate Later */}
              <div className={styles.ackOptionsBox}>
                <div className={styles.ackOptionsHeader}>
                  <div className={styles.ackOptionsIcon}>
                    <Heart size={20} />
                  </div>
                  <div>
                    <h3 className={styles.ackOptionsTitle}>
                      Support Justice - Ways to Get Involved
                    </h3>
                    <p className={styles.ackOptionsSubtitle}>
                      HRSJM provides free legal aid, grievance redressal, and human rights defense across India. You may choose to support our work through a nominal donation, become an official member, or proceed directly.
                    </p>
                  </div>
                </div>

                <div className={styles.ackOptionsCardsGrid}>
                  {/* Option 1: Donate up to Rs 500 */}
                  <div className={styles.ackDonationCard}>
                    <div>
                      <div className={styles.ackActionTitle}>
                        Option 1: Voluntary Contribution (Up to ₹500)
                      </div>
                      <p className={styles.ackActionDesc}>
                        Every voluntary contribution directly powers pro-bono legal counsel, fact-finding, and citizen support.
                      </p>
                    </div>

                    <div className={styles.ackDonationChipsRow}>
                      {[100, 250, 500].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          className={`${styles.ackDonateChip} ${donateAmount === amt ? styles.ackDonateChipSelected : ""
                            }`}
                          onClick={() => {
                            setDonateAmount(amt);
                            setCustomDonateAmount(String(amt));
                          }}
                        >
                          ₹{amt}
                        </button>
                      ))}

                      <div className={styles.ackCustomInputWrap}>
                        <span className={styles.ackCustomInputPrefix}>Custom ₹</span>
                        <input
                          type="number"
                          min="1"
                          max="500"
                          className={styles.ackCustomInput}
                          placeholder="Max ₹500"
                          value={customDonateAmount}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            const num = Number(val);
                            if (num > 500) {
                              setCustomDonateAmount("500");
                              setDonateAmount(500);
                            } else {
                              setCustomDonateAmount(val);
                              setDonateAmount(num || 0);
                            }
                          }}
                        />
                      </div>

                      <Link
                        href={`/donation?amount=${donateAmount || 250}&name=${encodeURIComponent(
                          ackData.fullName
                        )}&phone=${encodeURIComponent(ackData.phone)}`}
                        className={styles.ackDonateSubmitBtn}
                      >
                        <Heart size={14} fill="#031d38" /> Donate ₹{donateAmount || 250} Now
                      </Link>
                    </div>
                  </div>

                  {/* Option 2: Join as a Member */}
                  <div className={styles.ackMemberCard}>
                    <div>
                      <div className={styles.ackActionTitle}>
                        Option 2: Become an HRSJM Member
                      </div>
                      <p className={styles.ackActionDesc}>
                        Join our national network of human rights defenders, legal advocates, and active citizens.
                      </p>
                    </div>
                    <Link
                      href={`/membership/apply?name=${encodeURIComponent(
                        ackData.fullName
                      )}&phone=${encodeURIComponent(ackData.phone)}&state=${encodeURIComponent(
                        ackData.state
                      )}`}
                      className={styles.ackMemberBtn}
                    >
                      <UserPlus size={14} /> Apply for Membership <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Modal Footer */}
            <div className={styles.ackModalFooter}>
              <div className={styles.ackFooterLeft}>
                <button
                  type="button"
                  className={styles.ackPrintBtn}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.print();
                    }
                  }}
                >
                  <Printer size={15} /> Print / Save Receipt
                </button>
              </div>

              <button
                type="button"
                className={styles.ackCloseBtn}
                onClick={() => setAckModalOpen(false)}
              >
                Done / Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}