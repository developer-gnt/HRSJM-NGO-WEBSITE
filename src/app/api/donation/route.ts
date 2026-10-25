import { NextResponse } from "next/server";
import { createBackendDonation, createCashfreeOrder } from "@/lib/backendApi";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      donorName,
      donorMobile,
      donorEmail,
      amount,
      cause,
      isAnonymous,
      remark,
    } = body;

    const numAmount = Number(amount);
    if (!numAmount || numAmount < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid donation amount of at least ₹10.",
        },
        { status: 400 }
      );
    }

    const resolvedName = isAnonymous
      ? "Anonymous Donor"
      : donorName?.trim() || "Kind Citizen";

    // 1. Create donation in backend database
    let backendDonation: any = null;
    try {
      backendDonation = await createBackendDonation({
        donorName: resolvedName,
        donorMobile: donorMobile?.trim() || undefined,
        donorEmail: donorEmail?.trim() || undefined,
        amount: numAmount,
        cause: cause || "General Support & Human Rights Protection",
        isAnonymous: Boolean(isAnonymous),
        remark: remark?.trim() || undefined,
      });
    } catch (err: any) {
      console.warn("Backend donation record warning:", err.message);
    }

    const donationRef =
      backendDonation?.id
        ? `HRSJM-DON-${backendDonation.id.slice(0, 8).toUpperCase()}`
        : `HRSJM-DON-${Date.now().toString(36).toUpperCase()}`;

    // 2. Create Cashfree checkout session order
    let cashfreeOrder = null;
    try {
      const origin = request.headers.get("origin") || "http://localhost:3001";
      cashfreeOrder = await createCashfreeOrder({
        purpose: "donation",
        amount: numAmount,
        customerName: resolvedName,
        customerPhone: donorMobile?.trim() || "9999999999",
        customerEmail: donorEmail?.trim() || undefined,
        orderNote: `Donation: ${cause || "Human Rights & Social Justice"} (${donationRef})`,
        referenceId: backendDonation?.id || donationRef,
        returnUrl: `${origin}/payments/callback?order_id={order_id}`,
      });
    } catch (cfErr: any) {
      console.warn("Cashfree order creation notice for donation:", cfErr.message);
    }

    return NextResponse.json({
      success: true,
      donationRef,
      donationId: backendDonation?.id,
      amount: numAmount,
      donorName: resolvedName,
      cashfreeOrder,
      message: "Donation record initiated successfully.",
    });
  } catch (error: any) {
    console.error("Donation processing error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to process donation. Please retry.",
      },
      { status: 500 }
    );
  }
}
