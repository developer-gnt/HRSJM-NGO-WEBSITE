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
import Step4Payment, { type Step4Data } from "./Step4Payment";
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

  // Current Step (1, 2, 3, or 4)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1 State: Personal Information
  const [step1Data, setStep1Data] = useState<Step1Data>({
    photoFile: null,
    photoPreview: null,
    fullName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    priorConviction: "No",
    priorConvictionDetails: "",
  });

  // Step 2 State: Address Details
  const [step2Data, setStep2Data] = useState<Step2Data>({
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    policeStation: "",
  });

  // Step 3 State: Document Upload & Agreements
  const emptyDoc: DocumentUploadItem = { file: null, name: "", size: 0 };
  const [step3Data, setStep3Data] = useState<Step3Data>({
    idProof: emptyDoc,
    addressProof: emptyDoc,
    qualification: emptyDoc,
    photograph: emptyDoc,
    agreePrivacy: false,
    agreeTerms: false,
  });

  // Step 4 State: Payment
  const [step4Data, setStep4Data] = useState<Step4Data>({
    paymentMode: "upi_bank",
    paymentReference: "",
  });

  // Validation Errors
  const [step1Errors, setStep1Errors] = useState<Record<string, string>>({});
  const [step2Errors, setStep2Errors] = useState<Record<string, string>>({});
  const [step3Errors, setStep3Errors] = useState<Record<string, string>>({});
  const [step4Errors, setStep4Errors] = useState<Record<string, string>>({});

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    applicationRef: string;
    applicantName: string;
    packageName: string;
    packageFee: string;
    submittedAt: string;
  } | null>(null);

  // Field change handlers
  const handleStep1Change = (field: keyof Step1Data, value: any) => {
    setStep1Data((prev) => ({ ...prev, [field]: value }));
    if (step1Errors[field]) {
      setStep1Errors((prev) => ({ ...prev, [field]: undefined! }));
    }
  };

  const handleStep2Change = (field: keyof Step2Data, value: string) => {
    setStep2Data((prev) => ({ ...prev, [field]: value }));
    if (step2Errors[field]) {
      setStep2Errors((prev) => ({ ...prev, [field]: undefined! }));
    }
  };

  // Step 3 Changes
  const handleStep3Change = (field: keyof Step3Data, value: any) => {
    setStep3Data((prev) => ({ ...prev, [field]: value }));
    if (step3Errors[field]) {
      setStep3Errors((prev) => ({ ...prev, [field]: undefined! }));
    }
  };

  const handleStep4Change = (field: keyof Step4Data, value: string) => {
    setStep4Data((prev) => ({ ...prev, [field]: value }));
    if (step4Errors[field]) {
      setStep4Errors((prev) => ({ ...prev, [field]: undefined! }));
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

    if (step1Data.priorConviction === "Yes" && !step1Data.priorConvictionDetails.trim()) {
      errors.priorConvictionDetails = "Please provide details regarding prior conviction.";
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

    if (!step2Data.policeStation.trim()) {
      errors.policeStation = "Please enter nearby police station.";
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
    if (!step3Data.qualification.file) {
      errors.qualification = "Please upload Qualification Certificate.";
    }
    if (!step3Data.photograph.file) {
      errors.photograph = "Please upload Photograph.";
    }
    if (!step3Data.agreePrivacy) {
      errors.agreePrivacy = "Please agree to the Privacy Policy.";
    }
    if (!step3Data.agreeTerms) {
      errors.agreeTerms = "Please accept the Terms & Conditions.";
    }

    setStep3Errors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step Transitions
  const handleContinueStep1 = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 320, behavior: "smooth" });
    }
  };

  const handleContinueStep2 = () => {
    if (validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: 320, behavior: "smooth" });
    }
  };

  const handleContinueStep3 = () => {
    if (validateStep3()) {
      setCurrentStep(4);
      window.scrollTo({ top: 320, behavior: "smooth" });
    }
  };

  // Final Submit from Step 4
  const handleFinalSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        fullName: step1Data.fullName,
        dob: step1Data.dob,
        gender: step1Data.gender,
        phone: step1Data.phone,
        email: step1Data.email,
        priorConviction: step1Data.priorConviction,
        priorConvictionDetails: step1Data.priorConvictionDetails,
        address1: step2Data.address1,
        address2: step2Data.address2,
        city: step2Data.city,
        state: step2Data.state,
        pincode: step2Data.pincode,
        country: step2Data.country,
        policeStation: step2Data.policeStation,
        idProofName: step3Data.idProof.name,
        addressProofName: step3Data.addressProof.name,
        qualificationName: step3Data.qualification.name,
        photoName: step3Data.photograph.name,
        agreePrivacy: step3Data.agreePrivacy,
        agreeTerms: step3Data.agreeTerms,
        packageName: selectedPackage.item.post,
        packageFee: selectedPackage.item.fees,
        packageValidity: selectedPackage.item.validity,
        termsAgreed: step3Data.agreeTerms,
        pledgeAgreed: step3Data.agreeTerms,
        declarationAgreed: step3Data.agreePrivacy,
        paymentMode: step4Data.paymentMode === "upi_bank" ? "UPI / Bank Transfer" : "Online Gateway (Pending Verification)",
        paymentReference: step4Data.paymentReference,
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
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" />
              <Link href="/membership">Membership</Link>
              <ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" />
              <span className={styles.breadcrumbCurrent} aria-current="page">
                Apply for Membership
              </span>
            </nav>

            <div className={styles.heroContent}>
              <p className={styles.heroEyebrow}>
                <span className={styles.heroEyebrowSquare} aria-hidden="true" />
                MEMBERSHIP REGISTRATION
              </p>

              <h1 id="apply-heading" className={styles.heroHeading}>
                Apply for{" "}
                <span className={styles.heroHeadingGold}>Membership</span>
              </h1>

              <p className={styles.heroDescription}>
                Join HRSJM and be a part of a larger movement for human dignity,
                equality and justice. Together we can build a fairer and more
                inclusive society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Content */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.cardContainer}>
            {/* Four-Step Progress Indicator */}
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

            {/* Step 3: Document Upload & Declarations */}
            {currentStep === 3 && (
              <Step3DocumentUpload
                data={step3Data}
                onChange={handleStep3Change}
                onBack={() => setCurrentStep(2)}
                onNext={handleContinueStep3}
                errors={step3Errors}
              />
            )}

            {/* Step 4: Payment Step & Application Review */}
            {currentStep === 4 && (
              <Step4Payment
                data={step4Data}
                onChange={handleStep4Change}
                selectedPackage={selectedPackage}
                applicantName={step1Data.fullName}
                applicantPhone={step1Data.phone}
                applicantEmail={step1Data.email}
                onBack={() => setCurrentStep(3)}
                onSubmit={handleFinalSubmit}
                submitting={submitting}
                errors={step4Errors}
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
