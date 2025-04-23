import { getToken } from "next-auth/jwt";
import { supabase } from "./supabase";

export type AuthUser = {
  id: string;
  email: string;
  role: string;
};

export async function getUserFromCookie(request: Request): Promise<any> {
  try {
    const token = await getToken({ req: request as any });
    if (!token) {
      return null;
    }

    const email = token.email;

    console.log("email", email);

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    console.log("data", data);

    if (error) {
      console.error("Error in getUserFromToken:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getUserFromToken:", error);
    return null;
  }
}
