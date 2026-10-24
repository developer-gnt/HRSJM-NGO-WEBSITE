import { NextResponse } from "next/server";
import {
  saveMembershipRecord,
  type MembershipRecord,
} from "@/lib/membershipStorage";
import { sendMembershipApplicationEmail } from "@/lib/emailService";

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
          error: "All 4 required documents (Identity Proof, Address Proof, Qualification, Photograph) must be uploaded.",
        },
        { status: 400 }
      );
    }

    if (!agreePrivacy || !agreeTerms) {
      return NextResponse.json(
        {
          success: false,
          error: "You must accept the Privacy Policy and Terms & Conditions before submitting.",
        },
        { status: 400 }
      );
    }

    if (!pledgeAgreed) {
      return NextResponse.json(
        {
          success: false,
          error:
            "You must solemnly accept the HRSJM Membership Pledge to proceed.",
        },
        { status: 400 }
      );
    }

    if (!declarationAgreed) {
      return NextResponse.json(
        {
          success: false,
          error:
            "You must accept the Self-Declaration confirming accuracy of information.",
        },
        { status: 400 }
      );
    }

    // 6. Generate real application reference number
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const applicationRef = `HRSJM-${new Date().getFullYear()}-${randomSuffix}`;
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
      packageName: packageName || "District Active Member",
      packageFee: packageFee || "₹800",
      packageValidity: packageValidity || "1 Year",
      termsAgreed: Boolean(termsAgreed),
      pledgeAgreed: Boolean(pledgeAgreed),
      declarationAgreed: Boolean(declarationAgreed),
      paymentMode: paymentMode || "Pending / Offline Verification",
      paymentReference: paymentReference?.trim() || undefined,
      status: "pending_review",
    };

    // 7. Save application record to persistent storage
    const storageResult = await saveMembershipRecord(record);
    if (!storageResult.success) {
      console.warn("Storage warning:", storageResult.error);
    }

    // 8. Send confirmation email (with fallback)
    const emailResult = await sendMembershipApplicationEmail(record);

    return NextResponse.json({
      success: true,
      applicationRef,
      message: "Membership application submitted successfully.",
      submittedAt,
      applicantName: record.fullName,
      packageName: record.packageName,
      packageFee: record.packageFee,
      emailStatus: emailResult.status,
    });
  } catch (error) {
    console.error("Membership application error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to process your application at this time. Please try again.",
      },
      { status: 500 }
    );
  }
}
