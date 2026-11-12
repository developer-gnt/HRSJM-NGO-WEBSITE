import { NextResponse } from "next/server";
import { createCashfreeOrder, checkDuplicateMembership } from "@/lib/backendApi";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { amount, packageName, packageValidity, fullName, phone, email } = data;

    if (!amount || !fullName || !phone || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Amount, full name, phone number, and email are required to initiate payment.",
        },
        { status: 400 }
      );
    }

    // Pre-payment duplicate check: verify applicant does not already have an account or active membership
    try {
      const dupCheck = await checkDuplicateMembership(email, phone);
      if (dupCheck?.isDuplicate) {
        return NextResponse.json(
          {
            success: false,
            error:
              dupCheck.message ||
              "An account or membership application is already registered with this mobile number or email. Please login or renew your membership instead.",
            field: dupCheck.field,
          },
          { status: 400 }
        );
      }
    } catch (dupErr) {
      console.warn("Pre-payment duplicate check failed in initiate-order:", dupErr);
    }

    const cleanFee = String(amount).replace(/[^0-9]/g, "");
    const feeAmount = parseInt(cleanFee, 10);
    if (!feeAmount || feeAmount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid fee amount.",
        },
        { status: 400 }
      );
    }

    const origin = request.headers.get("origin") || "http://localhost:3001";
    const validityStr = packageValidity || "1 Year";
    const cashfreeOrder = await createCashfreeOrder({
      purpose: "membership",
      amount: feeAmount,
      customerName: String(fullName).trim(),
      customerPhone: String(phone).trim(),
      customerEmail: String(email).trim().toLowerCase(),
      orderNote: `Membership: ${packageName || "District Unit"} (${validityStr}) - ${fullName}`,
      returnUrl: `${origin}/payments/callback?order_id={order_id}`,
    });

    return NextResponse.json({
      success: true,
      orderId: cashfreeOrder.order_id,
      paymentSessionId: cashfreeOrder.payment_session_id,
      amount: feeAmount,
      currency: cashfreeOrder.currency || "INR",
    });
  } catch (error: any) {
    console.error("Initiate membership order error:", error);
    const friendlyMessage =
      error.message === "fetch failed"
        ? "Unable to reach the payment service. Please verify your internet connection or backend server status."
        : error.message || "Failed to create payment session with gateway.";

    return NextResponse.json(
      {
        success: false,
        error: friendlyMessage,
      },
      { status: 500 }
    );
  }
}
