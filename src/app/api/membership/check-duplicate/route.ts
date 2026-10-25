import { NextResponse } from "next/server";
import { checkDuplicateMembership } from "@/lib/backendApi";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email") || undefined;
    const phone = searchParams.get("phone") || undefined;

    if (!email && !phone) {
      return NextResponse.json({ isDuplicate: false });
    }

    const result = await checkDuplicateMembership(email, phone);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Duplicate check error:", error);
    return NextResponse.json({ isDuplicate: false });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const email = data.email || undefined;
    const phone = data.phone || undefined;

    if (!email && !phone) {
      return NextResponse.json({ isDuplicate: false });
    }

    const result = await checkDuplicateMembership(email, phone);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Duplicate check error:", error);
    return NextResponse.json({ isDuplicate: false });
  }
}
