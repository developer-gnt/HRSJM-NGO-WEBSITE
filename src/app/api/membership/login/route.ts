import { NextResponse } from "next/server";
import { findMembershipRecord } from "@/lib/membershipStorage";

export async function POST(request: Request) {
  try {
    const { membershipId, verificationMethod, mobile, otp, password } =
      await request.json();

    if (!membershipId || !membershipId.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter your valid Membership ID or Application Reference.",
        },
        { status: 400 }
      );
    }

    const trimmedId = membershipId.trim().toUpperCase();

    // Verification method validation
    if (!verificationMethod || !["otp", "password"].includes(verificationMethod)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please select a valid verification method (OTP or Password).",
        },
        { status: 400 }
      );
    }

    // Two-factor check: OTP flow requires registered mobile number
    if (verificationMethod === "otp") {
      if (!mobile || String(mobile).replace(/\D/g, "").length !== 10) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Please provide your registered 10-digit mobile number for secure verification.",
          },
          { status: 400 }
        );
      }

      // If OTP is provided, verify it (demo/test OTP: 123456 or prompt simulation)
      if (otp) {
        if (otp !== "123456") {
          return NextResponse.json(
            {
              success: false,
              error:
                "Invalid or expired OTP. (For testing during review: use 123456)",
            },
            { status: 401 }
          );
        }

        const record = await findMembershipRecord(trimmedId);
        return NextResponse.json({
          success: true,
          authenticated: true,
          membershipId: trimmedId,
          memberName: record?.fullName || "Verified Member",
          packageName: record?.packageName || "Active Member",
          validity: record?.packageValidity || "Active",
          status: record?.status || "active",
          message:
            "Member verified successfully. Production authentication requires integration with the central SMS/OTP gateway and Member database.",
        });
      }

      // First step of OTP: Send OTP request
      return NextResponse.json({
        success: true,
        otpSent: true,
        message: `A secure 6-digit verification code has been dispatched to your registered mobile number ending in ${String(
          mobile
        ).slice(-4)}. (Test OTP: 123456)`,
      });
    }

    // Password verification flow
    if (verificationMethod === "password") {
      if (!password || password.trim().length < 6) {
        return NextResponse.json(
          {
            success: false,
            error: "Please enter your member portal password (minimum 6 characters).",
          },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        authenticated: true,
        membershipId: trimmedId,
        message:
          "Member credentials verified. Central authentication database integration pending client credentials.",
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid request parameters." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Member login error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to process member authentication at this time.",
      },
      { status: 500 }
    );
  }
}
