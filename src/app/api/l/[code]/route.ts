import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const GET = async (request: Request, { params }: { params: any }) => {
  try {
    const { code } = params;

    // Find the link in database
    const { data, error } = await supabase
      .from("linkly")
      .select("origin_link, clicks")
      .eq("short_link", code)
      .eq("status", "active")
      .single();

    if (error || !data) {
      console.error("Error finding link:", error);
      return NextResponse.redirect(new URL("/404", request.url));
    }

    // Increment clicks count
    const { error: updateError } = await supabase
      .from("linkly")
      .update({
        clicks: (data.clicks || 0) + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("short_link", code);

    if (updateError) {
      console.error("Error updating clicks:", updateError);
    }

    // Redirect to original URL
    return NextResponse.redirect(new URL(data.origin_link));
  } catch (error: any) {
    console.error("Error processing redirect:", error);
    return NextResponse.redirect(new URL("/404", request.url));
  }
};
