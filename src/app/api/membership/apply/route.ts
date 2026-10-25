import { NextResponse } from "next/server";
import {
  saveMembershipRecord,
  type MembershipRecord,
} from "@/lib/membershipStorage";
import { sendMembershipApplicationEmail } from "@/lib/emailService";
import {
  createBackendMembership,
  resolveBackendCategoryId,
  createCashfreeOrder,
  verifyCashfreeOrder,
} from "@/lib/backendApi";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      fullName,
      dob,
      gender,
      phone,
      email,
      priorConviction,
      priorConvictionDetails,
      address1,
      address2,
      city,
      state,
      pincode,
      country,
      policeStation,
      idProofName,
      addressProofName,
      qualificationName,
      photoName,
      agreePrivacy,
      agreeTerms,
      packageName,
      packageFee,
      packageValidity,
      termsAgreed,
      pledgeAgreed,
      declarationAgreed,
      paymentMode,
      paymentReference,
      orderId,
      password,
    } = data;

    // 1. Personal Information Validation
    if (!fullName || !phone || !email || !dob || !gender) {
      return NextResponse.json(
        {
          success: false,
          error: "Please complete all required Personal Information fields.",
        },
        { status: 400 }
      );
    }

    // Minimum age 18 years check and future date prevention
    const dobDate = new Date(dob);
    const today = new Date();
    if (isNaN(dobDate.getTime()) || dobDate > today) {
      return NextResponse.json(
        {
          success: false,
          error: "Future date of birth is not allowed. Please select a valid date of birth.",
        },
        { status: 400 }
      );
    }

    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    if (age < 18) {
      return NextResponse.json(
        {
          success: false,
          error: "Applicant must be at least 18 years old to apply for membership.",
        },
        { status: 400 }
      );
    }

    if (!address1 || !city || !state || !pincode || !country || !policeStation) {
      return NextResponse.json(
        {
          success: false,
          error: "Please complete all required Address Details fields.",
        },
        { status: 400 }
      );
    }

    if (!idProofName || !addressProofName || !qualificationName || !photoName) {
      return NextResponse.json(
        {
          success: false,
          error:
            "All 4 required documents (Identity Proof, Address Proof, Qualification, Photograph) must be uploaded.",
        },
        { status: 400 }
      );
    }

    if (!agreePrivacy || !agreeTerms) {
      return NextResponse.json(
        {
          success: false,
          error:
            "You must accept the Privacy Policy and Terms & Conditions before submitting.",
        },
        { status: 400 }
      );
    }

    if (pledgeAgreed !== undefined && !pledgeAgreed) {
      return NextResponse.json(
        {
          success: false,
          error:
            "You must solemnly accept the HRSJM Membership Pledge to proceed.",
        },
        { status: 400 }
      );
    }

    if (declarationAgreed !== undefined && !declarationAgreed) {
      return NextResponse.json(
        {
          success: false,
          error:
            "You must accept the Self-Declaration confirming accuracy of information.",
        },
        { status: 400 }
      );
    }

    // 2. Resolve matching category UUID from live backend
    const categoryId = await resolveBackendCategoryId(
      packageName || "District Unit"
    );

    // 3. Prepare structured documents array compatible with backend & admin portal
    const documents = [
      {
        id: "id-proof",
        title: "Identity Proof (Aadhaar / Voter ID / Passport)",
        fileName: idProofName,
        fileSize: "1.5 MB",
        type: "ID_PROOF",
      },
      {
        id: "address-proof",
        title: "Address Proof",
        fileName: addressProofName,
        fileSize: "1.8 MB",
        type: "ADDRESS_PROOF",
      },
      {
        id: "qualification",
        title: "Educational Qualification Certificate",
        fileName: qualificationName,
        fileSize: "1.2 MB",
        type: "QUALIFICATION",
      },
      {
        id: "photograph",
        title: "Passport Size Photograph",
        fileName: photoName,
        fileSize: "850 KB",
        type: "PHOTOGRAPH",
      },
    ];

    const personalDetails = {
      full_name: String(fullName).trim(),
      mobile_number: String(phone).trim(),
      email: String(email).trim().toLowerCase(),
      dob,
      gender,
      prior_conviction: priorConviction,
      prior_conviction_details: priorConvictionDetails?.trim() || undefined,
      police_station: String(policeStation).trim(),
      nearby_police_station: String(policeStation).trim(),
      address_line1: String(address1).trim(),
      address_line2: address2 ? String(address2).trim() : undefined,
      city: String(city).trim(),
      state: String(state).trim(),
      pincode: String(pincode).trim(),
      country: String(country || "India").trim(),
    };

    const isOnlinePayment = paymentMode !== "UPI / Bank Transfer" && paymentMode !== "upi_bank";
    let verifiedPaymentInfo: any = null;

    if (isOnlinePayment) {
      if (!orderId) {
        return NextResponse.json(
          {
            success: false,
            error: "Payment order ID is required to verify transaction before submission.",
          },
          { status: 400 }
        );
      }

      // 4. Verify payment with Cashfree via Central Backend
      let verifyRes: any = null;
      try {
        verifyRes = await verifyCashfreeOrder(orderId);
      } catch (err: any) {
        return NextResponse.json(
          {
            success: false,
            error: err.message || "Failed to communicate with payment gateway verification.",
          },
          { status: 400 }
        );
      }

      if (verifyRes?.status !== "SUCCESS") {
        const failureReason =
          verifyRes?.latest_message ||
          verifyRes?.message ||
          (verifyRes?.latest_status ? `Gateway reported status: ${verifyRes.latest_status}` : "Payment not confirmed or pending");
        return NextResponse.json(
          {
            success: false,
            error: `Payment is not confirmed: ${failureReason}. The application has not been submitted.`,
            paymentStatus: verifyRes?.latest_status || verifyRes?.status || "PENDING",
          },
          { status: 400 }
        );
      }

      verifiedPaymentInfo = verifyRes;
    }

    const applicationData = {
      personal_details: personalDetails,
      full_name: String(fullName).trim(),
      mobile_number: String(phone).trim(),
      email: String(email).trim().toLowerCase(),
      police_station: String(policeStation).trim(),
      address_line1: String(address1).trim(),
      address_line2: address2 ? String(address2).trim() : undefined,
      city: String(city).trim(),
      state: String(state).trim(),
      pincode: String(pincode).trim(),
      country: String(country || "India").trim(),
      documents,
      package_name: packageName || "District Unit",
      package_fee: packageFee || "₹3,000",
      package_validity: packageValidity || "1 Year",
      terms_agreed: Boolean(termsAgreed || agreeTerms),
      pledge_agreed: Boolean(pledgeAgreed),
      declaration_agreed: Boolean(declarationAgreed),
      payment_mode: isOnlinePayment ? "Online Gateway (Cashfree Confirmed)" : "UPI / Bank Transfer",
      payment_reference: isOnlinePayment ? orderId : paymentReference?.trim() || undefined,
      payment_order_id: orderId || undefined,
      gateway_payment_id: verifiedPaymentInfo?.payment?.gateway_payment_id || undefined,
      payment_verified: isOnlinePayment ? true : false,
      submitted_via: "HRSJM-NGO-WEBSITE",
    };

    // 5. Submit to live NestJS Central API (Status will be PENDING / Applied)
    let backendMembership: any = null;
    let applicationRef = `HRSJM-${new Date().getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    try {
      backendMembership = await createBackendMembership({
        categoryId,
        fullName: String(fullName).trim(),
        mobile: String(phone).trim(),
        email: String(email).trim().toLowerCase(),
        password: password ? String(password).trim() : undefined,
        policeStation: String(policeStation).trim(),
        personalDetails,
        applicationData,
      });

      if (backendMembership?.membership_number) {
        applicationRef = backendMembership.membership_number;
      } else if (backendMembership?.id) {
        applicationRef = `HRSJM-APP-${backendMembership.id.slice(0, 8).toUpperCase()}`;
      }
    } catch (apiErr: any) {
      console.warn("Backend API returned error during application:", apiErr.message);
      // If error is duplicate email or specific validation, pass it to user
      if (
        apiErr.message.includes("already registered") ||
        apiErr.message.includes("already has an active") ||
        apiErr.message.includes("EMAIL_TAKEN")
      ) {
        return NextResponse.json(
          {
            success: false,
            error: apiErr.message,
          },
          { status: 409 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          error: apiErr.message || "Unable to save application to database. Please contact support.",
        },
        { status: 500 }
      );
    }

    const submittedAt = new Date().toISOString();

    const record: MembershipRecord = {
      applicationRef,
      submittedAt,
      fullName: String(fullName).trim(),
      dob,
      gender,
      phone: String(phone).trim(),
      email: String(email).trim().toLowerCase(),
      priorConviction,
      priorConvictionDetails: priorConvictionDetails?.trim() || undefined,
      address1: String(address1).trim(),
      address2: address2 ? String(address2).trim() : undefined,
      city: String(city).trim(),
      state,
      pincode: String(pincode).trim(),
      country: String(country || "India").trim(),
      idProofName,
      addressProofName,
      photoName,
      packageName: packageName || "District Unit",
      packageFee: packageFee || "₹3,000",
      packageValidity: packageValidity || "1 Year",
      termsAgreed: Boolean(termsAgreed || agreeTerms),
      pledgeAgreed: Boolean(pledgeAgreed),
      declarationAgreed: Boolean(declarationAgreed),
      paymentMode: isOnlinePayment ? "Online Gateway (Cashfree Confirmed)" : (paymentMode || "Pending / Offline Verification"),
      paymentReference: isOnlinePayment ? orderId : (paymentReference?.trim() || undefined),
      status: "pending_review",
    };

    // 6. Save backup local copy for redundancy
    await saveMembershipRecord(record).catch(() => {});

    // 7. Send confirmation email
    const emailResult = await sendMembershipApplicationEmail(record).catch(() => ({
      status: "fallback",
    }));

    return NextResponse.json({
      success: true,
      applicationRef,
      message: "Membership application registered successfully with HRSJM backend.",
      submittedAt,
      applicantName: record.fullName,
      packageName: record.packageName,
      packageFee: record.packageFee,
      emailStatus: emailResult.status,
      orderId: orderId || undefined,
      backendId: backendMembership?.id,
    });
  } catch (error: any) {
    console.error("Membership application error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Unable to process application at this time. Please retry.",
      },
      { status: 500 }
    );
  }
}
