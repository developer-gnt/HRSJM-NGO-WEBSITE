import { NextResponse } from "next/server";
import { createBackendComplaint } from "@/lib/backendApi";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      phone,
      email,
      state,
      policeStation,
      complaintType,
      details,
    } = body;

    // Validation
    if (!fullName || !phone || !state || !policeStation || !complaintType || !details) {
      return NextResponse.json(
        {
          success: false,
          error: "Please fill in all required complaint fields.",
        },
        { status: 400 }
      );
    }

    if (phone.trim().length !== 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Phone number must be exactly 10 digits.",
        },
        { status: 400 }
      );
    }

    // Submit to central backend
    let backendResult: any = null;
    let complaintRef = `HRSJM-CMP-${Date.now().toString(36).toUpperCase()}`;

    try {
      backendResult = await createBackendComplaint({
        fullName: String(fullName).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim().toLowerCase() : undefined,
        state: String(state).trim(),
        policeStation: String(policeStation).trim(),
        complaintType: String(complaintType).trim(),
        details: String(details).trim(),
      });

      if (backendResult?.id) {
        complaintRef = `HRSJM-CMP-${backendResult.id.slice(0, 8).toUpperCase()}`;
      }
    } catch (err: any) {
      console.warn("Backend complaint submission notice:", err.message);
    }

    return NextResponse.json({
      success: true,
      complaintRef,
      complaintId: backendResult?.id,
      fullName,
      complaintType,
      message:
        "Your complaint has been registered with HRSJM. Our human rights verification team will review your case and reach out shortly.",
      submittedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Complaint API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Unable to register complaint at this time. Please retry.",
      },
      { status: 500 }
    );
  }
}
