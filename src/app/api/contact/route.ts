import { NextResponse } from "next/server";
import { sendContactInquiryEmail } from "@/lib/emailService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, reason, message } = body;

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

    const subjectText = body.subject || body.reason || undefined;

    const emailResult = await sendContactInquiryEmail({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : undefined,
      subject: subjectText ? String(subjectText).trim() : undefined,
      message: String(message).trim(),
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been received. A confirmation has been sent to your email.",
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
