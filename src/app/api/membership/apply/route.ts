import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Required fields validation
    const {
      fullName,
      dob,
      gender,
      phone,
      email,
      address1,
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
    } = data;

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

    // Generate real application reference number
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const applicationRef = `HRSJM-${new Date().getFullYear()}-${randomSuffix}`;

    return NextResponse.json({
      success: true,
      applicationRef,
      message: "Membership application submitted successfully.",
      submittedAt: new Date().toISOString(),
      applicantName: fullName,
      packageName: packageName || "District Active Member",
      packageFee: packageFee || "₹800",
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
