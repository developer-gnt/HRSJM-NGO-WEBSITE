"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import ProgressIndicator from "./ProgressIndicator";
import MembershipSummaryCard from "./MembershipSummaryCard";
import Step1PersonalInfo, { type Step1Data } from "./Step1PersonalInfo";
import Step2AddressDetails, { type Step2Data } from "./Step2AddressDetails";
import Step3DocumentUpload, {
  type Step3Data,
  type DocumentUploadItem,
} from "./Step3DocumentUpload";
import ApplicationSuccessModal from "./ApplicationSuccessModal";
import {
  findMembershipPackage,
  type UnifiedMembershipPackage,
} from "../categories/categoriesData";
import styles from "./apply.module.css";

function MembershipApplyContent() {
  const searchParams = useSearchParams();
  const postParam = searchParams.get("post") || searchParams.get("package");

  // Dynamic Membership Package
  const [selectedPackage, setSelectedPackage] = useState<UnifiedMembershipPackage>(
    () => findMembershipPackage(postParam)
  );

  useEffect(() => {
    if (postParam) {
      setSelectedPackage(findMembershipPackage(postParam));
    }
  }, [postParam]);

  // Current Step (1, 2, or 3)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Shared Form State across all 3 steps
  const [step1Data, setStep1Data] = useState<Step1Data>({
    photoFile: null,
    photoPreview: null,
    fullName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
  });

  const [step2Data, setStep2Data] = useState<Step2Data>({
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const emptyDoc: DocumentUploadItem = { file: null, name: "", size: 0 };
  const [step3Data, setStep3Data] = useState<Step3Data>({
    idProof: emptyDoc,
    addressProof: emptyDoc,
    photograph: emptyDoc,
  });

  // Validation Errors
  const [step1Errors, setStep1Errors] = useState<Record<string, string>>({});
  const [step2Errors, setStep2Errors] = useState<Record<string, string>>({});
  const [step3Errors, setStep3Errors] = useState<Record<string, string>>({});

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    applicationRef: string;
    applicantName: string;
    packageName: string;
    packageFee: string;
    submittedAt: string;
  } | null>(null);

  // Step 1 Changes
  const handleStep1Change = (field: keyof Step1Data, value: any) => {
    setStep1Data((prev) => ({ ...prev, [field]: value }));
    if (step1Errors[field]) {
      setStep1Errors((prev) => ({ ...prev, [field]: undefined! }));
    }
  };

  // Step 2 Changes
  const handleStep2Change = (field: keyof Step2Data, value: string) => {
    setStep2Data((prev) => ({ ...prev, [field]: value }));
    if (step2Errors[field]) {
      setStep2Errors((prev) => ({ ...prev, [field]: undefined! }));
    }
  };

  // Step 3 Changes
  const handleStep3Change = (field: keyof Step3Data, value: DocumentUploadItem) => {
    setStep3Data((prev) => ({ ...prev, [field]: value }));
    if (step3Errors[field]) {
      setStep3Errors((prev) => ({ ...prev, [field]: undefined! }));
    }
  };

  // Validate Step 1
  const validateStep1 = (): boolean => {
    const errors: Record<string, string> = {};

    const trimmedName = step1Data.fullName.trim();
    if (!trimmedName) {
      errors.fullName = "Please enter your full name.";
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      errors.fullName = "Full name cannot contain numbers or special characters.";
    } else if (trimmedName.length < 2) {
      errors.fullName = "Full name must be at least 2 characters.";
    }

    if (!step1Data.dob) {
      errors.dob = "Please select your date of birth.";
    }

    if (!step1Data.gender) {
      errors.gender = "Please select your gender.";
    }

    const phoneDigits = step1Data.phone.trim();
    if (!phoneDigits) {
      errors.phone = "Please enter your mobile number.";
    } else if (phoneDigits.length !== 10) {
      errors.phone = "Mobile number must be exactly 10 digits.";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const trimmedEmail = step1Data.email.trim();
    if (!trimmedEmail) {
      errors.email = "Please enter your email address.";
    } else if (!emailRegex.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }

    setStep1Errors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate Step 2
  const validateStep2 = (): boolean => {
    const errors: Record<string, string> = {};

    if (!step2Data.address1.trim()) {
      errors.address1 = "Please enter your address line 1.";
    }

    if (!step2Data.city.trim()) {
      errors.city = "Please enter your city.";
    }

    if (!step2Data.state) {
      errors.state = "Please select your state.";
    }

    const pincodeDigits = step2Data.pincode.trim();
    if (!pincodeDigits) {
      errors.pincode = "Please enter your pincode.";
    } else if (pincodeDigits.length !== 6) {
      errors.pincode = "Pincode must be 6 digits.";
    }

    setStep2Errors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate Step 3
  const validateStep3 = (): boolean => {
    const errors: Record<string, string> = {};

    if (!step3Data.idProof.file) {
      errors.idProof = "Please upload Identity Proof.";
    }
    if (!step3Data.addressProof.file) {
      errors.addressProof = "Please upload Address Proof.";
    }
    if (!step3Data.photograph.file) {
      errors.photograph = "Please upload Photograph.";
    }

    setStep3Errors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step 1 -> Step 2
  const handleContinueStep1 = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 320, behavior: "smooth" });
    }
  };

  // Step 2 -> Step 3
  const handleContinueStep2 = () => {
    if (validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: 320, behavior: "smooth" });
    }
  };

  // Step 3 -> Final Submit
  const handleFinalSubmit = async () => {
    if (!validateStep3()) return;

    setSubmitting(true);
    try {
      const payload = {
        fullName: step1Data.fullName,
        dob: step1Data.dob,
        gender: step1Data.gender,
        phone: step1Data.phone,
        email: step1Data.email,
        address1: step2Data.address1,
        address2: step2Data.address2,
        city: step2Data.city,
        state: step2Data.state,
        pincode: step2Data.pincode,
        country: step2Data.country,
        idProofName: step3Data.idProof.name,
        addressProofName: step3Data.addressProof.name,
        photoName: step3Data.photograph.name,
        packageName: selectedPackage.item.post,
        packageFee: selectedPackage.item.fees,
        packageValidity: selectedPackage.item.validity,
      };

      const res = await fetch("/api/membership/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        alert(json.error || "Submission failed. Please check your data and retry.");
        return;
      }

      setSubmissionResult({
        applicationRef: json.applicationRef,
        applicantName: json.applicantName,
        packageName: json.packageName,
        packageFee: json.packageFee,
        submittedAt: json.submittedAt,
      });
    } catch (err) {
      console.error(err);
      alert("Network error. Unable to connect to server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero} aria-labelledby="apply-heading">
        <Image
          src="/membership/membership-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroBg}
        />
        <div className={styles.heroGradient} aria-hidden="true" />

        <div className={styles.container}>
          <div className={styles.heroInner}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" />
              <Link href="/membership">Membership</Link>
              <ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" />
              <span className={styles.breadcrumbCurrent} aria-current="page">
                Apply for Membership
              </span>
            </nav>

            {/* Hero Copy */}
            <div className={styles.heroContent}>
              <p className={styles.heroEyebrow}>
                <span className={styles.heroEyebrowSquare} aria-hidden="true" />
                MEMBERSHIP
              </p>

              <h1 id="apply-heading" className={styles.heroHeading}>
                Apply for{" "}
                <span className={styles.heroHeadingGold}>Membership</span>
              </h1>

              <p className={styles.heroDescription}>
                Join HRSJM and be a part of a larger movement for human dignity,
                equality and justice. Together we can build a more just, fairer
                and inclusive society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Content */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.cardContainer}>
            {/* Three-Step Progress Indicator */}
            <ProgressIndicator
              currentStep={currentStep}
              onStepClick={(step) => setCurrentStep(step)}
            />

            {/* Dynamic Membership Package Summary */}
            <MembershipSummaryCard
              selectedPackage={selectedPackage}
              onSelectPackage={(pkg) => setSelectedPackage(pkg)}
            />

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <Step1PersonalInfo
                data={step1Data}
                onChange={handleStep1Change}
                onNext={handleContinueStep1}
                errors={step1Errors}
              />
            )}

            {/* Step 2: Address Details */}
            {currentStep === 2 && (
              <Step2AddressDetails
                data={step2Data}
                onChange={handleStep2Change}
                onNext={handleContinueStep2}
                onBack={() => setCurrentStep(1)}
                errors={step2Errors}
              />
            )}

            {/* Step 3: Document Upload */}
            {currentStep === 3 && (
              <Step3DocumentUpload
                data={step3Data}
                onChange={handleStep3Change}
                onBack={() => setCurrentStep(2)}
                onSubmit={handleFinalSubmit}
                submitting={submitting}
                errors={step3Errors}
              />
            )}
          </div>
        </div>
      </main>

      {/* Success Confirmation Modal */}
      {submissionResult && (
        <ApplicationSuccessModal
          applicationRef={submissionResult.applicationRef}
          applicantName={submissionResult.applicantName}
          packageName={submissionResult.packageName}
          packageFee={submissionResult.packageFee}
          submittedAt={submissionResult.submittedAt}
        />
      )}
    </div>
  );
}

export default function MembershipApplyPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
      <MembershipApplyContent />
    </Suspense>
  );
}
