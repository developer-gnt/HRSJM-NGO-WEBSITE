import { NextResponse } from "next/server";
import { createCashfreeSubscription, fetchEventById } from "@/lib/backendApi";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      donorName,
      donorMobile,
      donorEmail,
      amount,
      frequency = "MONTHLY",
      cause,
      eventId,
      panNumber,
    } = body;

    const numAmount = Number(amount);
    if (!numAmount || numAmount < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid recurring donation amount of at least ₹10.",
        },
        { status: 400 }
      );
    }

    // Event donation eligibility check
    if (eventId) {
      try {
        const ev = await fetchEventById(eventId);
        if (ev && !ev.is_donation_enabled) {
          return NextResponse.json(
            {
              success: false,
              error: `Donations are currently disabled for event "${ev.title}". Please contribute to our general support causes.`,
            },
            { status: 400 }
          );
        }
      } catch (evErr: any) {
        console.warn("Event subscription check warning:", evErr.message);
      }
    }

    const resolvedName = donorName?.trim() || "Kind Citizen";
    const origin = request.headers.get("origin") || "http://localhost:3001";
    const returnUrl = `${origin}/payments/callback?order_id={order_id}&sub_id={sub_id}`;

    const subscription = await createCashfreeSubscription({
      amount: numAmount,
      frequency: frequency === "YEARLY" ? "YEARLY" : "MONTHLY",
      purpose: "donation",
      customerName: resolvedName,
      customerPhone: donorMobile?.trim() || "9876543210",
      customerEmail: donorEmail?.trim() || "donor@hrsjm.org",
      planNote: `Monthly Contribution: ${cause || "General Support & Human Rights Protection"}`,
      returnUrl,
      eventId,
      panNumber,
    });

    return NextResponse.json({
      success: true,
      subscription,
    });
  } catch (error: any) {
    console.error("Donation subscription creation error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "Failed to initialize recurring subscription session. Please try again.",
      },
      { status: 500 }
    );
  }
}
