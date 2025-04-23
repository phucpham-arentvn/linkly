import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getClientIP } from "@/helper";
import { getUserFromCookie } from "@/lib/middleware";

export const GET = async (request: Request) => {
  try {
    const user = await getUserFromCookie(request);
    const userId = user?.id || `ip_${getClientIP(request)}`;
    // Get query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    // Get total count
    const { count } = await supabase
      .from("linkly")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    // Get paginated data
    const { data, error } = await supabase
      .from("linkly")
      .select(
        `
        id,
        short_link,
        origin_link,
        clicks,
        status,
        created_at,
        updated_at,
        icon
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching links:", error);
      return NextResponse.json(
        { error: "Failed to fetch links" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
};
