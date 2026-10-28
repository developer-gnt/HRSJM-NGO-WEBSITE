"use client";

import { useEffect, useState, useRef, Suspense } from "react";
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
import { launchCashfreeCheckout } from "@/lib/cashfreeCheckout";
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
    password: "",
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
    agreePledge: false,
  });

  // Step 4 State: Payment & Verification (Default to Online Cashfree Gateway)
  const [step4Data, setStep4Data] = useState<Step4Data>({
    paymentMode: "online_gateway",
    paymentReference: "",
    validity: selectedPackage.item.validity || "1 Year",
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
    applicantEmail?: string;
    applicantPhone?: string;
    applicantAddress?: string;
    packageName: string;
    packageFee: string;
    submittedAt: string;
    paymentStatus?: string;
    applicationStatus?: string;
    paymentSessionId?: string;
  } | null>(null);

  // Keep track of active paid Cashfree order so user does not get double-charged on retry
  const completedOrderIdRef = useRef<string | null>(null);

  const formatDisplayError = (err: any, fallback: string): string => {
    if (!err) return fallback;
    if (typeof err === "string" && err.trim().length > 0) return err;
    if (typeof err.message === "string" && err.message.trim().length > 0) return err.message;
    if (Array.isArray(err.message) && err.message.length > 0) return err.message.join(", ");
    if (typeof err.error === "string" && err.error.trim().length > 0) return err.error;
    if (err.error && typeof err.error === "object") {
      if (typeof err.error.message === "string") return err.error.message;
      if (Array.isArray(err.error.details)) return err.error.details.join(", ");
      if (typeof err.error.details === "string") return err.error.details;
      if (err.error.code) return `Server Error (${err.error.code})`;
    }
    return fallback;
  };

  const parseResponseSafely = async (res: Response, context: string) => {
    const text = await res.text();
    if (res.status === 413 || text.includes("Request Entity Too Large") || text.includes("Payload Too Large")) {
      throw new Error(
        "Uploaded documents exceed server size limit (413 Request Entity Too Large). Please upload smaller or compressed document files."
      );
    }
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(
        `Server returned unexpected response (${res.status}) while ${context}. Please try again.`
      );
    }
  };

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
    } else {
      const dobDate = new Date(step1Data.dob);
      const today = new Date();
      if (isNaN(dobDate.getTime()) || dobDate > today) {
        errors.dob = "Future dates are not allowed. Please select a valid date of birth.";
      } else {
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
          age--;
        }
        if (age < 18) {
          errors.dob = "Applicant must be at least 18 years old to apply for membership.";
        }
      }
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

    if (!step1Data.password || step1Data.password.trim().length === 0) {
      errors.password = "Please create a password for your account.";
    } else if (step1Data.password.trim().length < 6) {
      errors.password = "Password must be at least 6 characters.";
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

    if (!step3Data.idProof.file && !step3Data.idProof.dataUrl) {
      errors.idProof = "Please upload Identity Proof.";
    }
    if (!step3Data.addressProof.file && !step3Data.addressProof.dataUrl) {
      errors.addressProof = "Please upload Address Proof.";
    }
    if (!step3Data.qualification.file && !step3Data.qualification.dataUrl) {
      errors.qualification = "Please upload Qualification Certificate.";
    }

    const hasPhoto = Boolean(
      step3Data.photograph.file ||
      step3Data.photograph.dataUrl ||
      step1Data.photoFile ||
      step1Data.photoPreview
    );
    if (!hasPhoto) {
      errors.photograph = "Please upload Photograph.";
    }

    if (!step3Data.agreePrivacy) {
      errors.agreePrivacy = "Please agree to the Privacy Policy.";
    }
    if (!step3Data.agreeTerms) {
      errors.agreeTerms = "Please accept the Terms & Conditions.";
    }
    if (!step3Data.agreePledge) {
      errors.agreePledge = "Please take the HRSJM Member Pledge.";
    }

    setStep3Errors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate Step 4: Package, Validity, and Payment Mode
  const validateStep4 = (): boolean => {
    const errors: Record<string, string> = {};

    const chosenValidity = step4Data.validity || selectedPackage?.item?.validity;
    if (!chosenValidity || !chosenValidity.trim()) {
      errors.validity = "Please select or confirm your membership validity period.";
    }

    if (!selectedPackage?.item?.post) {
      errors.post = "Please select a membership post.";
    }

    if (!selectedPackage?.item?.fees) {
      errors.fee = "Registration fee is required.";
    }

    if (!step4Data.paymentMode) {
      errors.paymentMode = "Please select a payment method.";
    }

    setStep4Errors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step Transitions & Duplicate Check
  const [checkingDuplicate, setCheckingDuplicate] = useState(false);

  const handleContinueStep1 = async () => {
    if (!validateStep1()) {
      return;
    }

    setCheckingDuplicate(true);
    try {
      const res = await fetch("/api/membership/check-duplicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: step1Data.phone.trim(),
          email: step1Data.email.trim(),
        }),
      });

      const data = await res.json();
      if (data?.isDuplicate) {
        const errorMsg = data.message || "This mobile number or email is already registered.";
        const newErrors: Record<string, string> = {};
        if (data.field === "phone") {
          newErrors.phone = errorMsg;
        } else if (data.field === "email") {
          newErrors.email = errorMsg;
        } else {
          newErrors.phone = errorMsg;
          newErrors.email = errorMsg;
        }
        setStep1Errors((prev) => ({ ...prev, ...newErrors }));
        return;
      }

      setCurrentStep(2);
      window.scrollTo({ top: 320, behavior: "smooth" });
    } catch (err) {
      console.warn("Could not check duplicate:", err);
      setCurrentStep(2);
      window.scrollTo({ top: 320, behavior: "smooth" });
    } finally {
      setCheckingDuplicate(false);
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
    // Step 1 Check BEFORE Payment
    if (!validateStep1()) {
      setCurrentStep(1);
      window.scrollTo({ top: 320, behavior: "smooth" });
      alert("Please resolve all errors in Step 1 (Personal Information) before making payment.");
      return;
    }

    // Step 2 Check BEFORE Payment
    if (!validateStep2()) {
      setCurrentStep(2);
      window.scrollTo({ top: 320, behavior: "smooth" });
      alert("Please complete all required fields in Step 2 (Address Details) before making payment.");
      return;
    }

    // Step 3 Check BEFORE Payment
    if (!validateStep3()) {
      setCurrentStep(3);
      window.scrollTo({ top: 320, behavior: "smooth" });
      alert("Please upload all 4 required documents and accept all declarations in Step 3 before making payment.");
      return;
    }

    // Step 4 Check & Validity BEFORE Payment
    if (!validateStep4()) {
      setCurrentStep(4);
      window.scrollTo({ top: 320, behavior: "smooth" });
      alert("Please confirm your membership validity period before proceeding to payment.");
      return;
    }

    const chosenValidity = step4Data.validity || selectedPackage?.item?.validity || "1 Year";

    setSubmitting(true);
    try {
      // Pre-Payment Duplicate Verification: Do NOT take payment if mobile/email already exists!
      try {
        const dupRes = await fetch("/api/membership/check-duplicate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: step1Data.phone.trim(),
            email: step1Data.email.trim(),
          }),
        });

        const dupData = await dupRes.json();
        if (dupData?.isDuplicate) {
          const errorMsg =
            dupData.message ||
            "An account or membership application is already registered with this mobile number or email. Please login or renew instead of paying again.";
          const newErrors: Record<string, string> = {};
          if (dupData.field === "phone") {
            newErrors.phone = errorMsg;
          } else if (dupData.field === "email") {
            newErrors.email = errorMsg;
          } else {
            newErrors.phone = errorMsg;
            newErrors.email = errorMsg;
          }
          setStep1Errors((prev) => ({ ...prev, ...newErrors }));
          setCurrentStep(1);
          window.scrollTo({ top: 320, behavior: "smooth" });
          alert(errorMsg);
          setSubmitting(false);
          return;
        }
      } catch (dupErr) {
        console.warn("Pre-payment duplicate check failed:", dupErr);
      }

      const payload = {
        fullName: step1Data.fullName,
        dob: step1Data.dob,
        gender: step1Data.gender,
        phone: step1Data.phone,
        email: step1Data.email,
        password: step1Data.password?.trim() || undefined,
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
        idProofUri: step3Data.idProof.dataUrl,
        addressProofName: step3Data.addressProof.name,
        addressProofUri: step3Data.addressProof.dataUrl,
        qualificationName: step3Data.qualification.name,
        qualificationUri: step3Data.qualification.dataUrl,
        photoName: step3Data.photograph.name || (step1Data.photoFile ? step1Data.photoFile.name : "photograph.png"),
        photoUri: step3Data.photograph.dataUrl || step1Data.photoPreview || undefined,
        avatarUrl: step3Data.photograph.dataUrl || step1Data.photoPreview || undefined,
        agreePrivacy: step3Data.agreePrivacy,
        agreeTerms: step3Data.agreeTerms,
        agreePledge: step3Data.agreePledge,
        packageName: selectedPackage.item.post,
        packageFee: selectedPackage.item.fees,
        packageValidity: chosenValidity,
        termsAgreed: step3Data.agreeTerms,
        pledgeAgreed: step3Data.agreePledge,
        declarationAgreed: step3Data.agreePrivacy,
        paymentMode: step4Data.paymentMode === "upi_bank" ? "UPI / Bank Transfer" : "Online Gateway",
        paymentReference: step4Data.paymentReference,
      };

      // Safeguard: Ensure total request payload does not exceed Vercel's 4.5MB serverless limit
      const payloadString = JSON.stringify(payload);
      if (payloadString.length > 3.8 * 1024 * 1024) {
        alert(
          "Total document upload size is too large (exceeds 3.8MB server limit). Please upload compressed images or smaller documents and try again."
        );
        setSubmitting(false);
        return;
      }

      if (step4Data.paymentMode !== "upi_bank") {
        let orderId = completedOrderIdRef.current;
        let paymentSessionId: string | undefined = undefined;

        // Only create a new Cashfree session if we don't already have a paid order from this session
        if (!orderId) {
          // Request Cashfree payment session with verified validity and duplicate checks
          const orderRes = await fetch("/api/membership/initiate-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: selectedPackage.item.fees,
              packageName: selectedPackage.item.post,
              packageValidity: chosenValidity,
              fullName: step1Data.fullName,
              phone: step1Data.phone,
              email: step1Data.email,
            }),
          });

          const orderJson = await parseResponseSafely(orderRes, "initiating payment session");
          if (!orderRes.ok || !orderJson.success) {
            alert(formatDisplayError(orderJson, "Failed to initiate payment session. Please check your details and try again."));
            setSubmitting(false);
            return;
          }

          orderId = orderJson.orderId;
          paymentSessionId = orderJson.paymentSessionId;

          // Open Cashfree checkout popup ONLY after all checks and validity have passed
          try {
            await launchCashfreeCheckout({
              paymentSessionId: paymentSessionId!,
              redirectTarget: "_modal",
            });
            completedOrderIdRef.current = orderId;
          } catch (cfErr) {
            console.warn("Cashfree checkout interaction:", cfErr);
          }
        }

        // Verify payment with gateway before saving
        const verifyRes = await fetch("/api/membership/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            orderId,
            paymentMode: "Online Gateway",
          }),
        });

        const verifyJson = await parseResponseSafely(verifyRes, "verifying payment and submitting application");
        if (!verifyRes.ok || !verifyJson.success) {
          if (verifyJson.paymentStatus && verifyJson.paymentStatus !== "SUCCESS") {
            completedOrderIdRef.current = null;
          }
          alert(
            formatDisplayError(
              verifyJson,
              "Payment was not completed or failed. Your membership application has not been submitted. Please try again."
            )
          );
          setSubmitting(false);
          return;
        }

        completedOrderIdRef.current = null;

        const fullAddress = [
          step2Data.address1,
          step2Data.city,
          step2Data.state,
          step2Data.country,
        ].filter(Boolean).join(", ") || "Mumbai, Maharashtra, India";

        setSubmissionResult({
          applicationRef: verifyJson.applicationRef,
          applicantName: verifyJson.applicantName || step1Data.fullName,
          applicantEmail: step1Data.email,
          applicantPhone: step1Data.phone,
          applicantAddress: fullAddress,
          packageName: verifyJson.packageName || selectedPackage.item.post,
          packageFee: String(verifyJson.packageFee || selectedPackage.item.fees),
          submittedAt: verifyJson.submittedAt || new Date().toISOString(),
          paymentStatus: "Confirmed Paid",
          applicationStatus: "Applied (Pending Review)",
          paymentSessionId,
        });
      } else {
        // Manual Bank Transfer / UPI with UTR
        const res = await fetch("/api/membership/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            paymentMode: "UPI / Bank Transfer",
          }),
        });

        const json = await parseResponseSafely(res, "submitting membership application");
        if (!res.ok || !json.success) {
          alert(formatDisplayError(json, "Submission failed. Please check your data and retry."));
          setSubmitting(false);
          return;
        }

        const fullAddress = [
          step2Data.address1,
          step2Data.city,
          step2Data.state,
          step2Data.country,
        ].filter(Boolean).join(", ") || "Mumbai, Maharashtra, India";

        setSubmissionResult({
          applicationRef: json.applicationRef,
          applicantName: json.applicantName || step1Data.fullName,
          applicantEmail: step1Data.email,
          applicantPhone: step1Data.phone,
          applicantAddress: fullAddress,
          packageName: json.packageName || selectedPackage.item.post,
          packageFee: String(json.packageFee || selectedPackage.item.fees),
          submittedAt: json.submittedAt || new Date().toISOString(),
          paymentStatus: "Pending Verification",
          applicationStatus: "Applied (Pending Review)",
        });
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      const friendlyMessage =
        err.message === "fetch failed"
          ? "Unable to connect to the server. Please verify your internet connection and try again."
          : err.message || "Network error. Unable to connect to server. Please try again.";
      alert(friendlyMessage);
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
              onStepClick={(step) => {
                if (step < currentStep) {
                  setCurrentStep(step);
                  window.scrollTo({ top: 320, behavior: "smooth" });
                } else if (step === 2) {
                  if (validateStep1()) {
                    setCurrentStep(2);
                    window.scrollTo({ top: 320, behavior: "smooth" });
                  } else {
                    alert("Please complete Step 1 (Personal Information) before moving forward.");
                  }
                } else if (step === 3) {
                  if (!validateStep1()) {
                    setCurrentStep(1);
                    alert("Please complete Step 1 (Personal Information) first.");
                  } else if (!validateStep2()) {
                    setCurrentStep(2);
                    alert("Please complete Step 2 (Address Details) before moving to Step 3.");
                  } else {
                    setCurrentStep(3);
                    window.scrollTo({ top: 320, behavior: "smooth" });
                  }
                } else if (step === 4) {
                  if (!validateStep1()) {
                    setCurrentStep(1);
                    alert("Please complete Step 1 (Personal Information) first.");
                  } else if (!validateStep2()) {
                    setCurrentStep(2);
                    alert("Please complete Step 2 (Address Details) first.");
                  } else if (!validateStep3()) {
                    setCurrentStep(3);
                    alert("Please complete Step 3 (Documents & Declarations) before moving to Step 4.");
                  } else {
                    setCurrentStep(4);
                    window.scrollTo({ top: 320, behavior: "smooth" });
                  }
                }
              }}
            />

            {/* Dynamic Membership Package Summary */}
            <MembershipSummaryCard
              selectedPackage={selectedPackage}
              onSelectPackage={(pkg) => {
                setSelectedPackage(pkg);
                setStep4Data((prev) => ({
                  ...prev,
                  validity: pkg.item.validity,
                }));
              }}
            />

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <Step1PersonalInfo
                data={step1Data}
                onChange={handleStep1Change}
                onNext={handleContinueStep1}
                errors={step1Errors}
                checkingDuplicate={checkingDuplicate}
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
          applicantEmail={submissionResult.applicantEmail}
          applicantPhone={submissionResult.applicantPhone}
          applicantAddress={submissionResult.applicantAddress}
          packageName={submissionResult.packageName}
          packageFee={submissionResult.packageFee}
          submittedAt={submissionResult.submittedAt}
          paymentStatus={submissionResult.paymentStatus}
          applicationStatus={submissionResult.applicationStatus}
          paymentSessionId={submissionResult.paymentSessionId}
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
