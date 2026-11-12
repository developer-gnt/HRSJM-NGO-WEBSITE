import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backendApi";
import { sendContactInquiryEmail } from "@/lib/emailService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;
    const subject = body.subject || body.reason || "General Inquiry";

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please provide your name, email, and message." },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const payload = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : undefined,
      subject: String(subject).trim(),
      message: String(message).trim(),
    };

    // 1. Primary: Forward to Backend API (which has active Gmail SMTP transporter configured)
    try {
      const backendRes = await backendFetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (backendRes.ok) {
        const backendData = await backendRes.json();
        return NextResponse.json({
          success: true,
          message:
            "Your message has been received. A confirmation has been sent to your email and our admin team has been notified.",
          inquiryRef: backendData.inquiryRef,
          details: backendData,
        });
      }
    } catch (backendErr: any) {
      console.warn(
        "Backend /contact endpoint call failed, falling back to local email service:",
        backendErr.message
      );
    }

    // 2. Fallback: If backend is unreachable, shoot via local email service directly
    const emailResult = await sendContactInquiryEmail(payload);

    return NextResponse.json({
      success: true,
      message:
        "Your message has been received. A confirmation has been sent to your email and our admin team has been notified.",
      emailStatus: emailResult.status,
    });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process inquiry." },
      { status: 500 }
    );
  }
}
