import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { nanoid } from "nanoid";
import { getUserFromCookie } from "@/lib/middleware";
import { getClientIP } from "@/helper";

export const POST = async (request: Request) => {
  try {
    const { url } = await request.json();
    const user = await getUserFromCookie(request);
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

    // Check if URL already exists for this user
    const { data: existingUrl } = await supabase
      .from("linkly")
      .select()
      .eq("origin_link", url)
      .eq("user_id", userId)
      .single();

    if (existingUrl) {
      return NextResponse.json({
        shortCode: existingUrl.short_link,
        originalUrl: existingUrl.origin_link,
        shortUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/l/${existingUrl.short_link}`,
        userId: existingUrl.user_id,
        icon: existingUrl.icon,
      });
    }

    // Generate short code for new URL
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
      shortUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/l/${shortCode}`,
      userId: data.user_id,
      icon: data.icon,
    });
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
};

export const PUT = async (request: Request) => {
  try {
    const { url, shortCode, status } = await request.json();
    const user = await getUserFromCookie(request);
    const userId = user?.id || `ip_${getClientIP(request)}`;

    // Validate URL and shortCode
    if (!url || !shortCode) {
      return NextResponse.json(
        { error: "URL and short code are required" },
        { status: 400 }
      );
    }

    // Validate status if provided
    if (status && !["active", "inactive"].includes(status)) {
      return NextResponse.json(
        { error: "Status must be either 'active' or 'inactive'" },
        { status: 400 }
      );
    }

    try {
      new URL(url);
    } catch (err: any) {
      return NextResponse.json(
        { error: err?.message || "Invalid URL format" },
        { status: 400 }
      );
    }

    // Check if link exists and belongs to user
    const { data: existingLink } = await supabase
      .from("linkly")
      .select()
      .eq("short_link", shortCode)
      .eq("user_id", userId)
      .single();

    if (!existingLink) {
      return NextResponse.json(
        { error: "Link not found or unauthorized" },
        { status: 404 }
      );
    }

    // Update the link
    const { data, error } = await supabase
      .from("linkly")
      .update({
        origin_link: url,
        updated_at: new Date().toISOString(),
        ...(status && { status }), // Only include status if it's provided
      })
      .eq("short_link", shortCode)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      console.error("Error updating URL:", error);
      return NextResponse.json(
        { error: "Failed to update URL" },
        { status: 500 }
      );
    }

    // Return the updated URL data
    return NextResponse.json({
      shortCode: data.short_link,
      originalUrl: data.origin_link,
      shortUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/l/${data.short_link}`,
      userId: data.user_id,
      icon: data.icon,
      status: data.status,
    });
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const user = await getUserFromCookie(request);
    const userId = user?.id || `ip_${getClientIP(request)}`;

    if (!id) {
      return NextResponse.json(
        { error: "Linkly ID is required" },
        { status: 400 }
      );
    }

    // Check if link exists and belongs to user
    const { data: existingLink } = await supabase
      .from("linkly")
      .select()
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (!existingLink) {
      return NextResponse.json(
        { error: "Link not found or unauthorized" },
        { status: 404 }
      );
    }

    // Delete the link
    const { error } = await supabase
      .from("linkly")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      console.error("Error deleting URL:", error);
      return NextResponse.json(
        { error: "Failed to delete URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Link deleted successfully",
      id: id,
      shortCode: existingLink.short_link,
    });
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
};
