import { NextResponse } from "next/server";
import { createBackendComplaint } from "@/lib/backendApi";
import { saveComplaintDocuments } from "@/lib/db";

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
      aadhaarFileName,
      aadhaarFileUri,
      handwrittenFileName,
      handwrittenFileUri,
      reportedToOtherDept,
      otherDeptName,
      otherDeptFileName,
      otherDeptFileUri,
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

    if (!aadhaarFileName) {
      return NextResponse.json(
        {
          success: false,
          error: "Please upload your Aadhaar card for citizen identification and verification.",
        },
        { status: 400 }
      );
    }

    if (!handwrittenFileName) {
      return NextResponse.json(
        {
          success: false,
          error: "Please upload a clear copy of your signed handwritten complaint.",
        },
        { status: 400 }
      );
    }

    if (reportedToOtherDept && !otherDeptName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Please specify the name of the department or authority where the issue was previously reported.",
        },
        { status: 400 }
      );
    }

    // Prepare enriched details
    let enrichedDetails = String(details).trim();
    enrichedDetails += `\n\n--- Verified Documents & Submissions ---`;
    enrichedDetails += `\n- Aadhaar Card Attached: ${aadhaarFileName || "Not Provided"}`;
    enrichedDetails += `\n- Handwritten Complaint Attached: ${handwrittenFileName || "Not Provided"}`;
    if (reportedToOtherDept) {
      enrichedDetails += `\n- Previously Reported to Other Dept: Yes (${otherDeptName?.trim() || "Specified"})`;
      if (otherDeptFileName) {
        enrichedDetails += `\n- Prior Report / Acknowledgment Copy: ${otherDeptFileName}`;
      }
    } else {
      enrichedDetails += `\n- Previously Reported to Other Dept: No (First-time filing)`;
    }

    // Submit to central backend
    const backendResult = await createBackendComplaint({
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim().toLowerCase() : undefined,
      state: String(state).trim(),
      policeStation: String(policeStation).trim(),
      complaintType: String(complaintType).trim(),
      details: enrichedDetails,
      aadhaarFileName: aadhaarFileName || undefined,
      aadhaarFileUri: aadhaarFileUri || undefined,
      handwrittenFileName: handwrittenFileName || undefined,
      handwrittenFileUri: handwrittenFileUri || undefined,
      reportedToOtherDept: Boolean(reportedToOtherDept),
      otherDeptName: otherDeptName?.trim() || undefined,
      otherDeptFileName: otherDeptFileName || undefined,
      otherDeptFileUri: otherDeptFileUri || undefined,
    });

    const ticketId = backendResult?.id;
    if (ticketId) {
      try {
        await saveComplaintDocuments({
          ticketId,
          userId: backendResult?.user_id,
          aadhaarFileName: aadhaarFileName || undefined,
          aadhaarFileUri: aadhaarFileUri || undefined,
          handwrittenFileName: handwrittenFileName || undefined,
          handwrittenFileUri: handwrittenFileUri || undefined,
          otherDeptFileName: otherDeptFileName || undefined,
          otherDeptFileUri: otherDeptFileUri || undefined,
        });
      } catch (docErr) {
        console.error("Failed to persist complaint documents into database:", docErr);
      }
    }

    const complaintRef =
      backendResult?.ticketId ||
      (backendResult?.id
        ? `HRSJM-CMP-${backendResult.id.slice(0, 8).toUpperCase()}`
        : `HRSJM-CMP-${Date.now().toString(36).toUpperCase()}`);

    return NextResponse.json({
      success: true,
      complaintRef,
      complaintId: backendResult?.id,
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim().toLowerCase() : undefined,
      state: String(state).trim(),
      policeStation: String(policeStation).trim(),
      complaintType: String(complaintType).trim(),
      aadhaarFileName,
      handwrittenFileName,
      reportedToOtherDept: Boolean(reportedToOtherDept),
      otherDeptName: otherDeptName?.trim() || null,
      otherDeptFileName: otherDeptFileName || null,
      message:
        "Your complaint has been formally registered with Human Rights & Social Justice Mission (HRSJM). Our grievance verification and legal advocacy cell has recorded your case for statutory review.",
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
