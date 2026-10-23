"use client";

import { useRef, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  FileText,
  FileUp,
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
  photograph: DocumentUploadItem;
  termsAgreed: boolean;
  pledgeAgreed: boolean;
  declarationAgreed: boolean;
}

interface Step3Props {
  data: Step3Data;
  onChange: (field: keyof Step3Data, value: any) => void;
  onBack: () => void;
  onNext: () => void;
  errors: Record<string, string>;
}

export default function Step3DocumentUpload({
  data,
  onChange,
  onBack,
  onNext,
  errors,
}: Step3Props) {
  const browseIdRef = useRef<HTMLInputElement>(null);
  const cameraIdRef = useRef<HTMLInputElement>(null);

  const browseAddrRef = useRef<HTMLInputElement>(null);
  const cameraAddrRef = useRef<HTMLInputElement>(null);

  const browsePhotoRef = useRef<HTMLInputElement>(null);
  const cameraPhotoRef = useRef<HTMLInputElement>(null);

  const handleFile = (
    field: "idProof" | "addressProof" | "photograph",
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

    onChange(field, {
      file,
      name: file.name,
      size: file.size,
    });
  };

  const handleRemove = (field: "idProof" | "addressProof" | "photograph") => {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.stepHeader}>
        <h2 className={styles.sectionHeading}>Documents &amp; Declarations</h2>
        <p className={styles.sectionSubtitle}>
          Upload the 3 required identity documents and accept the mandatory mission agreements.
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
            <input
              ref={cameraIdRef}
              type="file"
              accept="image/*"
              capture="environment"
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
                    onClick={() => cameraIdRef.current?.click()}
                  >
                    <Camera size={14} /> Camera Scan
                  </button>
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
            <input
              ref={cameraAddrRef}
              type="file"
              accept="image/*"
              capture="environment"
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
                    onClick={() => cameraAddrRef.current?.click()}
                  >
                    <Camera size={14} /> Camera Scan
                  </button>
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

        {/* Document 3: Photograph */}
        <div
          className={`${styles.docCard} ${
            errors.photograph ? styles.docCardError : ""
          }`}
        >
          <div className={styles.docCardMeta}>
            <span className={styles.docNumberBadge} aria-hidden="true">
              3
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
            <input
              ref={cameraPhotoRef}
              type="file"
              accept="image/*"
              capture="environment"
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
                    onClick={() => cameraPhotoRef.current?.click()}
                  >
                    <Camera size={14} /> Camera Scan
                  </button>
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

      {/* Mandatory Checkboxes Section */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          padding: "20px 22px",
          marginTop: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <ShieldCheck size={20} style={{ color: "#0a3a6b" }} />
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--color-navy)", margin: 0 }}>
            Mandatory Declarations &amp; Agreements
          </h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Checkbox 1: Terms & Conditions */}
          <div>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 13, color: "#1e293b", lineHeight: 1.45 }}>
              <input
                type="checkbox"
                checked={data.termsAgreed}
                onChange={(e) => onChange("termsAgreed", e.target.checked)}
                style={{ marginTop: 2 }}
              />
              <span>
                I have read, understood, and agree to abide by the{" "}
                <Link
                  href="/terms"
                  target="_blank"
                  style={{ color: "#0a3a6b", fontWeight: 600, textDecoration: "underline" }}
                >
                  HRSJM Terms &amp; Conditions
                </Link>{" "}
                and official Bye-Laws. <span style={{ color: "#dc2626" }}>*</span>
              </span>
            </label>
            {errors.termsAgreed && (
              <p className={styles.fieldError} style={{ marginLeft: 24 }}>
                <AlertCircle size={12} /> {errors.termsAgreed}
              </p>
            )}
          </div>

          {/* Checkbox 2: Membership Pledge */}
          <div>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 13, color: "#1e293b", lineHeight: 1.45 }}>
              <input
                type="checkbox"
                checked={data.pledgeAgreed}
                onChange={(e) => onChange("pledgeAgreed", e.target.checked)}
                style={{ marginTop: 2 }}
              />
              <span>
                I solemnly take the{" "}
                <Link
                  href="/constitution"
                  target="_blank"
                  style={{ color: "#0a3a6b", fontWeight: 600, textDecoration: "underline" }}
                >
                  HRSJM Membership Pledge
                </Link>{" "}
                to promote constitutional rights, protect human dignity, and serve the community without discrimination. <span style={{ color: "#dc2626" }}>*</span>
              </span>
            </label>
            {errors.pledgeAgreed && (
              <p className={styles.fieldError} style={{ marginLeft: 24 }}>
                <AlertCircle size={12} /> {errors.pledgeAgreed}
              </p>
            )}
          </div>

          {/* Checkbox 3: Declaration */}
          <div>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 13, color: "#1e293b", lineHeight: 1.45 }}>
              <input
                type="checkbox"
                checked={data.declarationAgreed}
                onChange={(e) => onChange("declarationAgreed", e.target.checked)}
                style={{ marginTop: 2 }}
              />
              <span>
                I hereby declare that all information and uploaded documents provided by me are authentic, true, and correct to the best of my knowledge. I understand that any false statement or suppression of material facts will lead to immediate cancellation of membership and legal liability. <span style={{ color: "#dc2626" }}>*</span>
              </span>
            </label>
            {errors.declarationAgreed && (
              <p className={styles.fieldError} style={{ marginLeft: 24 }}>
                <AlertCircle size={12} /> {errors.declarationAgreed}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className={styles.navActions}>
        <button
          type="button"
          className={styles.btnOutline}
          onClick={onBack}
        >
          <ArrowLeft size={16} strokeWidth={2.4} /> Back
        </button>
        <button
          type="submit"
          className={styles.btnGold}
        >
          Proceed to Payment &amp; Review <ArrowRight size={17} strokeWidth={2.4} />
        </button>
      </div>
    </form>
  );
}
