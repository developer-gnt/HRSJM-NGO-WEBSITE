import { NextRequest, NextResponse } from "next/server";
import { fetchUpcomingEvents } from "@/lib/backendApi";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "UPCOMING";
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10) || 1;
    const limit = parseInt(searchParams.get("limit") || "50", 10) || 50;

    const data = await fetchUpcomingEvents({
      status,
      category,
      search,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      items: data.items,
      stats: data.stats,
      totalCount: data.totalCount,
      page: data.page,
      limit: data.limit,
    });
  } catch (error: any) {
    console.error("API /api/events error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch events from database",
        items: [],
        totalCount: 0,
      },
      { status: 500 }
    );
  }
}

