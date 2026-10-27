import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/lib/backendApi";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("order_id") || searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Missing order_id parameter" },
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
          return NextResponse.json({
            success: true,
            data: json.data || json,
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
          error: json.message || json.error || "Failed to verify payment with backend",
          data: json.data || null,
        },
        { status: (res as any)?.status || 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: json.data || json,
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
