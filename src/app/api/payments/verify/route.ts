import { NextRequest, NextResponse } from "next/server";
import {
  backendFetch,
  extractErrorMessage,
  verifyDirectlyWithCashfree,
  verifyCashfreeSubscription,
} from "@/lib/backendApi";
import { sendDonationReceiptEmail } from "@/lib/emailService";

async function dispatchDonationReceiptSafely(data: any, orderId: string, isSub = false) {
  try {
    const raw = data?.data || data?.payment || data;
    const email =
      raw?.customer_details?.customer_email ||
      raw?.customer_email ||
      raw?.donor_email ||
      raw?.user?.email ||
      data?.customer_details?.customer_email;
    const name =
      raw?.customer_details?.customer_name ||
      raw?.customer_name ||
      raw?.donor_name ||
      raw?.user?.full_name ||
      data?.customer_details?.customer_name ||
      "Generous Supporter";
    const amount =
      raw?.payment_amount ||
      raw?.order_amount ||
      raw?.amount ||
      raw?.plan_amount ||
      data?.payment_amount ||
      data?.order_amount ||
      500;
    const paymentId =
      raw?.cf_payment_id ||
      raw?.gateway_payment_id ||
      raw?.payment_id ||
      orderId;
    const cause =
      raw?.order_note ||
      raw?.cause ||
      "General Support & Human Rights Protection";

    if (email && typeof email === "string" && email.includes("@")) {
      await sendDonationReceiptEmail({
        donorName: String(name),
        donorEmail: String(email),
        amount: Number(amount) || amount,
        orderId: orderId,
        paymentId: String(paymentId),
        cause: String(cause),
        isRecurring: isSub,
      });
    }
  } catch (err: any) {
    console.error("Auto donation receipt dispatch warning:", err.message);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("order_id") || searchParams.get("orderId");
    const subId =
      searchParams.get("sub_id") ||
      searchParams.get("subId") ||
      searchParams.get("subscription_id") ||
      searchParams.get("subscriptionId");

    // Handle Subscription / AutoPay verification
    if (subId && !orderId) {
      try {
        const subData = await verifyCashfreeSubscription(subId);
        dispatchDonationReceiptSafely(subData, subId, true).catch(console.error);
        return NextResponse.json({
          success: true,
          isSubscription: true,
          data: subData,
        });
      } catch (subErr: any) {
        return NextResponse.json(
          {
            success: false,
            error: subErr.message || "Failed to verify recurring subscription status",
          },
          { status: 500 }
        );
      }
    }

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Missing order_id or sub_id parameter" },
        { status: 400 }
      );
    }

    const endpoint = `/payments/cashfree/orders/${encodeURIComponent(orderId)}/verify`;
    let res: Response | null = null;
    let json: any = null;
    let resText = "";

    // Retry up to 2 times with 1.2s delay to absorb Cashfree cluster indexing & webhook latency
    const maxTries = 2;
    for (let tryCount = 1; tryCount <= maxTries; tryCount++) {
      try {
        res = await backendFetch(endpoint, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });

        resText = await res.text();
        try {
          json = JSON.parse(resText);
        } catch {
          json = null;
        }

        const isSuccess =
          res.ok &&
          json &&
          json.success !== false &&
          (json.data?.status === "SUCCESS" || json.status === "SUCCESS");

        if (isSuccess) {
          const successPayload = json.data || json;
          dispatchDonationReceiptSafely(successPayload, orderId, false).catch(console.error);
          return NextResponse.json({
            success: true,
            data: successPayload,
          });
        }

        // If returned an error (e.g. 500 race condition or pending attempt), wait briefly and retry
        if (tryCount < maxTries) {
          await new Promise((r) => setTimeout(r, 1200));
          continue;
        }
      } catch (fetchErr) {
        if (tryCount < maxTries) {
          await new Promise((r) => setTimeout(r, 1200));
          continue;
        }
        throw fetchErr;
      }
    }

    // If central backend returned an error or was unavailable, verify directly with Cashfree PG
    try {
      const directRes = await verifyDirectlyWithCashfree(orderId);
      if (directRes && (directRes.status === "SUCCESS" || directRes.latest_status === "SUCCESS")) {
        dispatchDonationReceiptSafely(directRes, orderId, false).catch(console.error);
        return NextResponse.json({
          success: true,
          data: directRes,
        });
      }
    } catch (directErr: any) {
      console.warn("Direct Cashfree verification check:", directErr.message);
    }

    if (!res || !json) {
      const fallbackStatus = (res as any)?.status || 502;
      return NextResponse.json(
        {
          success: false,
          error: `Payment verification gateway returned unexpected response (${fallbackStatus}): ${resText.slice(0, 100)}`,
        },
        { status: 502 }
      );
    }

    if (!res.ok || json.success === false) {
      return NextResponse.json(
        {
          success: false,
          error: extractErrorMessage(json, "Failed to verify payment with backend"),
          data: json.data || null,
        },
        { status: (res as any)?.status || 500 }
      );
    }

    const finalPayload = json.data || json;
    dispatchDonationReceiptSafely(finalPayload, orderId, false).catch(console.error);
    return NextResponse.json({
      success: true,
      data: finalPayload,
    });
  } catch (error: any) {
    console.error("Payment verification proxy error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to communicate with backend payment verification",
      },
      { status: 500 }
    );
  }
}
