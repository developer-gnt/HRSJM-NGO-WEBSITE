"use client";

import { type ChangeEvent, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  ChevronDown,
  Globe,
  MapPin,
  AlertCircle,
  Shield,
} from "lucide-react";
import { indianStates } from "@/components/complaint/ComplaintForm";
import styles from "./apply.module.css";

export interface Step2Data {
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  policeStation: string;
}

interface Step2Props {
  data: Step2Data;
  onChange: (field: keyof Step2Data, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  errors: Record<string, string>;
}

export default function Step2AddressDetails({
  data,
  onChange,
  onNext,
  onBack,
  errors,
}: Step2Props) {
  const handlePincodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 6);
    onChange("pincode", digits);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.stepHeader}>
        <h2 className={styles.sectionHeading}>Address Details</h2>
        <p className={styles.sectionSubtitle}>
          Please provide your current address details.
        </p>
      </div>

      <div className={styles.formGrid}>
        {/* Address Line 1 */}
        <div className={styles.formField}>
          <label htmlFor="app-address1" className={styles.fieldLabel}>
            Address Line 1 <span className={styles.fieldRequired}>*</span>
          </label>
          <div
            className={`${styles.inputWrapper} ${
              errors.address1 ? styles.inputWrapperError : ""
            }`}
          >
            <span className={styles.inputIcon} aria-hidden="true">
              <MapPin size={17} strokeWidth={2} />
            </span>
            <input
              id="app-address1"
              type="text"
              placeholder="Enter your address line 1"
              value={data.address1}
              onChange={(e) => onChange("address1", e.target.value)}
              className={styles.inputField}
              autoComplete="address-line1"
            />
          </div>
          <span className={styles.fieldHelper}>
            House no., building, street name
          </span>
          {errors.address1 && (
            <p className={styles.fieldError} role="alert">
              <AlertCircle size={13} strokeWidth={2} />
              {errors.address1}
            </p>
          )}
        </div>

        {/* Address Line 2 */}
        <div className={styles.formField}>
          <label htmlFor="app-address2" className={styles.fieldLabel}>
            Address Line 2
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon} aria-hidden="true">
              <MapPin size={17} strokeWidth={2} />
            </span>
            <input
              id="app-address2"
              type="text"
              placeholder="Enter your address line 2"
              value={data.address2}
              onChange={(e) => onChange("address2", e.target.value)}
              className={styles.inputField}
              autoComplete="address-line2"
            />
          </div>
          <span className={styles.fieldHelper}>Area, landmark (Optional)</span>
        </div>

        {/* City */}
        <div className={styles.formField}>
          <label htmlFor="app-city" className={styles.fieldLabel}>
            City <span className={styles.fieldRequired}>*</span>
          </label>
          <div
            className={`${styles.inputWrapper} ${
              errors.city ? styles.inputWrapperError : ""
            }`}
          >
            <span className={styles.inputIcon} aria-hidden="true">
              <Building2 size={17} strokeWidth={2} />
            </span>
            <input
              id="app-city"
              type="text"
              placeholder="Enter city"
              value={data.city}
              onChange={(e) => onChange("city", e.target.value)}
              className={styles.inputField}
              autoComplete="address-level2"
            />
          </div>
          {errors.city && (
            <p className={styles.fieldError} role="alert">
              <AlertCircle size={13} strokeWidth={2} />
              {errors.city}
            </p>
          )}
        </div>

        {/* State */}
        <div className={styles.formField}>
          <label htmlFor="app-state" className={styles.fieldLabel}>
            State <span className={styles.fieldRequired}>*</span>
          </label>
          <div
            className={`${styles.inputWrapper} ${
              errors.state ? styles.inputWrapperError : ""
            }`}
          >
            <span className={styles.inputIcon} aria-hidden="true">
              <Building2 size={17} strokeWidth={2} />
            </span>
            <select
              id="app-state"
              value={data.state}
              onChange={(e) => onChange("state", e.target.value)}
              className={styles.selectField}
            >
              <option value="">Select state</option>
              {indianStates.map((state: string) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className={styles.selectArrow} />
          </div>
          {errors.state && (
            <p className={styles.fieldError} role="alert">
              <AlertCircle size={13} strokeWidth={2} />
              {errors.state}
            </p>
          )}
        </div>

        {/* Pincode */}
        <div className={styles.formField}>
          <label htmlFor="app-pincode" className={styles.fieldLabel}>
            Pincode <span className={styles.fieldRequired}>*</span>
          </label>
          <div
            className={`${styles.inputWrapper} ${
              errors.pincode ? styles.inputWrapperError : ""
            }`}
          >
            <span className={styles.inputIcon} aria-hidden="true">
              <Building2 size={17} strokeWidth={2} />
            </span>
            <input
              id="app-pincode"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter pincode"
              value={data.pincode}
              onChange={handlePincodeChange}
              className={styles.inputField}
              autoComplete="postal-code"
            />
          </div>
          {errors.pincode && (
            <p className={styles.fieldError} role="alert">
              <AlertCircle size={13} strokeWidth={2} />
              {errors.pincode}
            </p>
          )}
        </div>

        {/* Country */}
        <div className={styles.formField}>
          <label htmlFor="app-country" className={styles.fieldLabel}>
            Country <span className={styles.fieldRequired}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon} aria-hidden="true">
              <Globe size={17} strokeWidth={2} />
            </span>
            <select
              id="app-country"
              value={data.country}
              onChange={(e) => onChange("country", e.target.value)}
              className={styles.selectField}
            >
              <option value="India">India</option>
            </select>
            <ChevronDown size={16} className={styles.selectArrow} />
          </div>
        </div>

        {/* Nearby Police Station */}
        <div className={`${styles.formField} ${styles.formFieldFull}`}>
          <label htmlFor="app-policeStation" className={styles.fieldLabel}>
            Nearby Police Station <span className={styles.fieldRequired}>*</span>
          </label>
          <div
            className={`${styles.inputWrapper} ${
              errors.policeStation ? styles.inputWrapperError : ""
            }`}
          >
            <span className={styles.inputIcon} aria-hidden="true">
              <Shield size={17} strokeWidth={2} />
            </span>
            <input
              id="app-policeStation"
              type="text"
              placeholder="Enter nearby police station"
              value={data.policeStation}
              onChange={(e) => onChange("policeStation", e.target.value)}
              className={styles.inputField}
            />
          </div>
          <span className={styles.fieldHelper}>
            Nearest police station for jurisdiction and verification
          </span>
          {errors.policeStation && (
            <p className={styles.fieldError} role="alert">
              <AlertCircle size={13} strokeWidth={2} />
              {errors.policeStation}
            </p>
          )}
        </div>
      </div>

      {/* Navigation Actions */}
      <div className={styles.navActions}>
        <button type="button" className={styles.btnOutline} onClick={onBack}>
          <ArrowLeft size={16} strokeWidth={2.4} /> Back
        </button>
        <button type="submit" className={styles.btnGold}>
          Continue <ArrowRight size={17} strokeWidth={2.4} />
        </button>
      </div>
    </form>
  );
}
