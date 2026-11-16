import { NextRequest, NextResponse } from "next/server";
import { fetchEventById } from "@/lib/backendApi";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Event ID is required" },
        { status: 400 }
      );
    }

    const event = await fetchEventById(id);
    if (!event) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      event,
    });
  } catch (error: any) {
    console.error("API /api/events/[id] error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch event details",
      },
      { status: 500 }
    );
  }
}

