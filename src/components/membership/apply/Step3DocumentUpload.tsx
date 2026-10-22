"use client";

import Link from "next/link";
import { useRef, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  FileUp,
  Loader2,
  Trash2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import styles from "./apply.module.css";

export interface DocumentUploadItem {
  file: File | null;
  name: string;
  size: number;
}

export interface Step3Data {
  idProof: DocumentUploadItem;
  addressProof: DocumentUploadItem;
  qualification: DocumentUploadItem;
  photograph: DocumentUploadItem;
  agreePrivacy: boolean;
  agreeTerms: boolean;
}

interface Step3Props {
  data: Step3Data;
  onChange: (field: keyof Step3Data, value: any) => void;
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
  errors: Record<string, string>;
}

export default function Step3DocumentUpload({
  data,
  onChange,
  onBack,
  onSubmit,
  submitting,
  errors,
}: Step3Props) {
  const browseIdRef = useRef<HTMLInputElement>(null);
  const browseAddrRef = useRef<HTMLInputElement>(null);
  const browseQualRef = useRef<HTMLInputElement>(null);
  const browsePhotoRef = useRef<HTMLInputElement>(null);

  const handleFile = (
    field: keyof Step3Data,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size <= 5MB
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

    onChange(field, {
      file,
      name: file.name,
      size: file.size,
    });
  };

  const handleRemove = (field: keyof Step3Data) => {
    onChange(field, {
      file: null,
      name: "",
      size: 0,
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "";
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isConsentChecked = Boolean(data.agreePrivacy && data.agreeTerms);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isConsentChecked) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.stepHeader}>
        <h2 className={styles.sectionHeading}>Document Upload</h2>
        <p className={styles.sectionSubtitle}>
          Please upload the required documents (4 documents).
        </p>
      </div>

      <div className={styles.docCardsList}>
        {/* Document 1: Identity Proof */}
        <div
          className={`${styles.docCard} ${
            errors.idProof ? styles.docCardError : ""
          }`}
        >
          <div className={styles.docCardMeta}>
            <span className={styles.docNumberBadge} aria-hidden="true">
              1
            </span>
            <div className={styles.docMetaText}>
              <h3 className={styles.docTitle}>
                Identity Proof <span className={styles.fieldRequired}>*</span>
              </h3>
              <p className={styles.docSubtitle}>
                Aadhaar Card, PAN Card or Passport
              </p>
              {errors.idProof && (
                <p className={styles.fieldError} role="alert">
                  <AlertCircle size={12} strokeWidth={2} />
                  {errors.idProof}
                </p>
              )}
            </div>
          </div>

          <div className={styles.docUploadBox}>
            <input
              ref={browseIdRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={(e) => handleFile("idProof", e)}
            />

            {data.idProof.file ? (
              <div className={styles.docUploadedState}>
                <div className={styles.docUploadedFile}>
                  <CheckCircle2 size={20} className={styles.docCheckIcon} />
                  <div>
                    <span className={styles.docUploadedFileName}>
                      {data.idProof.name}
                    </span>
                    <span className={styles.docUploadedFileSize}>
                      ({formatSize(data.idProof.size)})
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.photoRemoveBtn}
                  onClick={() => handleRemove("idProof")}
                  title="Remove document"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            ) : (
              <>
                <div
                  className={styles.docUploadPrompt}
                  onClick={() => browseIdRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  style={{ cursor: "pointer" }}
                >
                  <div className={styles.docUploadIcon} aria-hidden="true">
                    <FileUp size={18} strokeWidth={2.2} />
                  </div>
                  <div className={styles.docUploadInfo}>
                    <span className={styles.docUploadHeadline}>
                      Tap to choose document
                    </span>
                    <span className={styles.docUploadSub}>
                      PDF, JPG or PNG (Max 5MB)
                    </span>
                  </div>
                </div>

                <div className={styles.docActions}>
                  <button
                    type="button"
                    className={styles.docActionBtn}
                    onClick={() => browseIdRef.current?.click()}
                  >
                    <FileText size={14} /> Browse Files
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Document 2: Address Proof */}
        <div
          className={`${styles.docCard} ${
            errors.addressProof ? styles.docCardError : ""
          }`}
        >
          <div className={styles.docCardMeta}>
            <span className={styles.docNumberBadge} aria-hidden="true">
              2
            </span>
            <div className={styles.docMetaText}>
              <h3 className={styles.docTitle}>
                Address Proof <span className={styles.fieldRequired}>*</span>
              </h3>
              <p className={styles.docSubtitle}>
                Electricity Bill, Rent Agreement or Bank Statement
              </p>
              {errors.addressProof && (
                <p className={styles.fieldError} role="alert">
                  <AlertCircle size={12} strokeWidth={2} />
                  {errors.addressProof}
                </p>
              )}
            </div>
          </div>

          <div className={styles.docUploadBox}>
            <input
              ref={browseAddrRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={(e) => handleFile("addressProof", e)}
            />

            {data.addressProof.file ? (
              <div className={styles.docUploadedState}>
                <div className={styles.docUploadedFile}>
                  <CheckCircle2 size={20} className={styles.docCheckIcon} />
                  <div>
                    <span className={styles.docUploadedFileName}>
                      {data.addressProof.name}
                    </span>
                    <span className={styles.docUploadedFileSize}>
                      ({formatSize(data.addressProof.size)})
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.photoRemoveBtn}
                  onClick={() => handleRemove("addressProof")}
                  title="Remove document"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            ) : (
              <>
                <div
                  className={styles.docUploadPrompt}
                  onClick={() => browseAddrRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  style={{ cursor: "pointer" }}
                >
                  <div className={styles.docUploadIcon} aria-hidden="true">
                    <FileUp size={18} strokeWidth={2.2} />
                  </div>
                  <div className={styles.docUploadInfo}>
                    <span className={styles.docUploadHeadline}>
                      Tap to choose document
                    </span>
                    <span className={styles.docUploadSub}>
                      PDF, JPG or PNG (Max 5MB)
                    </span>
                  </div>
                </div>

                <div className={styles.docActions}>
                  <button
                    type="button"
                    className={styles.docActionBtn}
                    onClick={() => browseAddrRef.current?.click()}
                  >
                    <FileText size={14} /> Browse Files
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Document 3: Qualification */}
        <div
          className={`${styles.docCard} ${
            errors.qualification ? styles.docCardError : ""
          }`}
        >
          <div className={styles.docCardMeta}>
            <span className={styles.docNumberBadge} aria-hidden="true">
              3
            </span>
            <div className={styles.docMetaText}>
              <h3 className={styles.docTitle}>
                Qualification <span className={styles.fieldRequired}>*</span>
              </h3>
              <p className={styles.docSubtitle}>
                Marksheet, Degree or Certificate
              </p>
              {errors.qualification && (
                <p className={styles.fieldError} role="alert">
                  <AlertCircle size={12} strokeWidth={2} />
                  {errors.qualification}
                </p>
              )}
            </div>
          </div>

          <div className={styles.docUploadBox}>
            <input
              ref={browseQualRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={(e) => handleFile("qualification", e)}
            />

            {data.qualification.file ? (
              <div className={styles.docUploadedState}>
                <div className={styles.docUploadedFile}>
                  <CheckCircle2 size={20} className={styles.docCheckIcon} />
                  <div>
                    <span className={styles.docUploadedFileName}>
                      {data.qualification.name}
                    </span>
                    <span className={styles.docUploadedFileSize}>
                      ({formatSize(data.qualification.size)})
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.photoRemoveBtn}
                  onClick={() => handleRemove("qualification")}
                  title="Remove document"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            ) : (
              <>
                <div
                  className={styles.docUploadPrompt}
                  onClick={() => browseQualRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  style={{ cursor: "pointer" }}
                >
                  <div className={styles.docUploadIcon} aria-hidden="true">
                    <FileUp size={18} strokeWidth={2.2} />
                  </div>
                  <div className={styles.docUploadInfo}>
                    <span className={styles.docUploadHeadline}>
                      Tap to choose document
                    </span>
                    <span className={styles.docUploadSub}>
                      PDF, JPG or PNG (Max 5MB)
                    </span>
                  </div>
                </div>

                <div className={styles.docActions}>
                  <button
                    type="button"
                    className={styles.docActionBtn}
                    onClick={() => browseQualRef.current?.click()}
                  >
                    <FileText size={14} /> Browse Files
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Document 4: Photograph */}
        <div
          className={`${styles.docCard} ${
            errors.photograph ? styles.docCardError : ""
          }`}
        >
          <div className={styles.docCardMeta}>
            <span className={styles.docNumberBadge} aria-hidden="true">
              4
            </span>
            <div className={styles.docMetaText}>
              <h3 className={styles.docTitle}>
                Photograph <span className={styles.fieldRequired}>*</span>
              </h3>
              <p className={styles.docSubtitle}>
                Recent passport size photograph
              </p>
              {errors.photograph && (
                <p className={styles.fieldError} role="alert">
                  <AlertCircle size={12} strokeWidth={2} />
                  {errors.photograph}
                </p>
              )}
            </div>
          </div>

          <div className={styles.docUploadBox}>
            <input
              ref={browsePhotoRef}
              type="file"
              accept=".jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={(e) => handleFile("photograph", e)}
            />

            {data.photograph.file ? (
              <div className={styles.docUploadedState}>
                <div className={styles.docUploadedFile}>
                  <CheckCircle2 size={20} className={styles.docCheckIcon} />
                  <div>
                    <span className={styles.docUploadedFileName}>
                      {data.photograph.name}
                    </span>
                    <span className={styles.docUploadedFileSize}>
                      ({formatSize(data.photograph.size)})
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.photoRemoveBtn}
                  onClick={() => handleRemove("photograph")}
                  title="Remove document"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            ) : (
              <>
                <div
                  className={styles.docUploadPrompt}
                  onClick={() => browsePhotoRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  style={{ cursor: "pointer" }}
                >
                  <div className={styles.docUploadIcon} aria-hidden="true">
                    <FileUp size={18} strokeWidth={2.2} />
                  </div>
                  <div className={styles.docUploadInfo}>
                    <span className={styles.docUploadHeadline}>
                      Tap to choose document
                    </span>
                    <span className={styles.docUploadSub}>
                      JPG or PNG (Max 5MB)
                    </span>
                  </div>
                </div>

                <div className={styles.docActions}>
                  <button
                    type="button"
                    className={styles.docActionBtn}
                    onClick={() => browsePhotoRef.current?.click()}
                  >
                    <FileText size={14} /> Browse Files
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Declarations & Consents */}
      <div className={styles.consentSection}>
        <div className={styles.consentHeader}>
          <ShieldCheck size={18} className={styles.consentHeaderIcon} />
          <h4 className={styles.consentHeading}>Applicant Declarations &amp; Consents</h4>
        </div>

        <div className={styles.consentList}>
          {/* 1. Privacy Policy Consent */}
          <div
            className={`${styles.consentItem} ${
              data.agreePrivacy ? styles.consentItemChecked : ""
            } ${errors.agreePrivacy ? styles.consentItemError : ""}`}
          >
            <input
              id="consent-privacy"
              type="checkbox"
              checked={data.agreePrivacy}
              onChange={(e) => onChange("agreePrivacy", e.target.checked)}
              className={styles.consentCheckbox}
            />
            <label htmlFor="consent-privacy" className={styles.consentLabel}>
              I have read and agree to the{" "}
              <Link
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.consentLink}
              >
                Privacy Policy
              </Link>
              . I consent to the collection, verification, and processing of my personal
              information and uploaded documents by HRSJM. <span className={styles.fieldRequired}>*</span>
            </label>
          </div>
          {errors.agreePrivacy && (
            <p className={styles.fieldError} role="alert">
              <AlertCircle size={12} strokeWidth={2} />
              {errors.agreePrivacy}
            </p>
          )}

          {/* 2. Terms & Conditions Consent */}
          <div
            className={`${styles.consentItem} ${
              data.agreeTerms ? styles.consentItemChecked : ""
            } ${errors.agreeTerms ? styles.consentItemError : ""}`}
          >
            <input
              id="consent-terms"
              type="checkbox"
              checked={data.agreeTerms}
              onChange={(e) => onChange("agreeTerms", e.target.checked)}
              className={styles.consentCheckbox}
            />
            <label htmlFor="consent-terms" className={styles.consentLabel}>
              I have read and accept the{" "}
              <Link
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.consentLink}
              >
                Terms &amp; Conditions
              </Link>{" "}
              of Human Rights &amp; Social Justice Mission, and agree to abide by the
              rules, aims, and code of conduct of the organization.{" "}
              <span className={styles.fieldRequired}>*</span>
            </label>
          </div>
          {errors.agreeTerms && (
            <p className={styles.fieldError} role="alert">
              <AlertCircle size={12} strokeWidth={2} />
              {errors.agreeTerms}
            </p>
          )}
        </div>

        {!isConsentChecked && (
          <div className={styles.consentNotice} role="status">
            <AlertCircle size={14} />
            <span>Please check both consent boxes above to enable application submission.</span>
          </div>
        )}
      </div>

      {/* Navigation Actions */}
      <div className={styles.navActions}>
        <button
          type="button"
          className={styles.btnOutline}
          onClick={onBack}
          disabled={submitting}
        >
          <ArrowLeft size={16} strokeWidth={2.4} /> Back
        </button>
        <button
          type="submit"
          className={styles.btnGold}
          disabled={submitting || !isConsentChecked}
          title={
            !isConsentChecked
              ? "Please agree to the Privacy Policy and Terms & Conditions to submit"
              : undefined
          }
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Submitting
              Application...
            </>
          ) : (
            <>
              Submit Application <ArrowRight size={17} strokeWidth={2.4} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
