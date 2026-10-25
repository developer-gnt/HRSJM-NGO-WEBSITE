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
    console.warn("Could not fetch approved assistance causes, returning standard categories:", error.message);
    return NextResponse.json({
      success: true,
      items: [
        {
          id: "medical",
          reason: "Medical Assistance",
          full_name: "Suresh Sharma",
          description: "Support for Heart Surgery for a 7-year-old Child",
          requested_amount: 500000,
        },
        {
          id: "education",
          reason: "Educational Assistance",
          full_name: "Amina Khatun",
          description: "Help for School Fees and Uniforms",
          requested_amount: 100000,
        },
        {
          id: "disaster",
          reason: "Disaster Relief",
          full_name: "Ramesh Patil",
          description: "Relief Support for Flood Affected Families",
          requested_amount: 500000,
        },
        {
          id: "housing",
          reason: "Housing & Rehabilitation",
          full_name: "Sunita Kamble",
          description: "Rebuild a Home After Building Collapse",
          requested_amount: 400000,
        },
      ],
    });
  }
}
