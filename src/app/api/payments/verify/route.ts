import { NextRequest, NextResponse } from "next/server";
import { getBackendApiUrl } from "@/lib/backendApi";

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

    const backendUrl = `${getBackendApiUrl()}/payments/cashfree/orders/${encodeURIComponent(orderId)}/verify`;
    const res = await fetch(backendUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const resText = await res.text();
    let json: any = null;
    try {
      json = JSON.parse(resText);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: `Payment verification gateway returned unexpected response (${res.status}): ${resText.slice(0, 100)}`,
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
        { status: res.status || 500 }
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
