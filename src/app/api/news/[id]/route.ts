import { NextRequest, NextResponse } from "next/server";
import { fetchNewsByIdOrSlug } from "@/lib/backendApi";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const article = await fetchNewsByIdOrSlug(id);

    if (!article) {
      return NextResponse.json(
        { success: false, error: "News article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: article,
    });
  } catch (error: any) {
    console.error("API /api/news/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch news article" },
      { status: 500 }
    );
  }
}

