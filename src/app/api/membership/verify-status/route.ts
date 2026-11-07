import { NextResponse } from "next/server";
import { verifyMemberStatus } from "@/lib/backendApi";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    if (!query.trim()) {
      return NextResponse.json({
        found: false,
        message: "Please enter a valid Membership ID or registered mobile number.",
      });
    }

    const result = await verifyMemberStatus(query);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Status verification route error:", error);
    return NextResponse.json(
      {
        found: false,
        message: "Internal server error occurred while verifying membership status.",
      },
      { status: 500 }
    );
  }
}

