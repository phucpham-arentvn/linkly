import { NextResponse } from "next/server";
import { supabase } from "./supabase";

export type AuthUser = {
  id: string;
  email: string;
  role: string;
};

export async function getUserFromToken(
  request: Request
): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return null;
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.error("Error verifying token:", error);
      return null;
    }

    return {
      id: user.id,
      email: user.email || "",
      role: user.role || "user",
    };
  } catch (error) {
    console.error("Error in getUserFromToken:", error);
    return null;
  }
}

export function withAuth(
  handler: (request: Request) => Promise<NextResponse> | NextResponse
) {
  return async (request: Request) => {
    const user = await getUserFromToken(request);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Add user to request for use in the handler
    const requestWithUser = new Request(request, {
      headers: new Headers(request.headers),
    });
    (requestWithUser as any).user = user;

    return handler(requestWithUser);
  };
}
