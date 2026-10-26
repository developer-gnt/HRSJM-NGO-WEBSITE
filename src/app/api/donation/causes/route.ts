import { NextResponse } from "next/server";
import { getBackendApiUrl } from "@/lib/backendApi";

export async function GET() {
  try {
    const url = `${getBackendApiUrl()}/assistance-requests/approved`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Backend error: ${res.statusText}`);
    }
    const data = await res.json();
    const items = data?.data?.items || [];
    return NextResponse.json({
      success: true,
      items,
    });
  } catch (error: any) {
    console.warn("Could not fetch approved assistance causes:", error.message);
    return NextResponse.json({
      success: true,
      items: [],
    });
  }
}
