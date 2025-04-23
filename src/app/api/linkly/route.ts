import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { nanoid } from "nanoid";
import { getUserFromToken } from "@/lib/middleware";
import { getClientIP } from "@/helper";

// Helper function to get client IP

export const POST = async (request: Request) => {
  try {
    const { url } = await request.json();
    const user = await getUserFromToken(request);
    const userId = user?.id || `ip_${getClientIP(request)}`;

    // Validate URL
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    try {
      new URL(url);
    } catch (err: any) {
      return NextResponse.json(
        { error: err?.message || "Invalid URL format" },
        { status: 400 }
      );
    }

    // Generate short code
    const shortCode = nanoid(8);

    const { data, error } = await supabase
      .from("linkly")
      .insert([
        {
          origin_link: url,
          short_link: shortCode,
          created_at: new Date().toISOString(),
          user_id: userId,
          status: "active",
          clicks: 0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error storing URL:", error);
      return NextResponse.json(
        { error: "Failed to store URL" },
        { status: 500 }
      );
    }

    // Return the shortened URL
    return NextResponse.json({
      shortCode: data.short_link,
      originalUrl: data.origin_link,
      shortUrl: `${process.env.NEXT_PUBLIC_APP_URL}/l/${shortCode}`,
      userId: data.user_id,
    });
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
};
