import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "@/auth";

export type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export async function getUser(): Promise<SessionUser | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  return {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  };
}

// Client-side function to get user from cookies
export async function getUserFromCookie(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("next-auth.session-token");

  if (!sessionToken) {
    return null;
  }

  try {
    const sessionData = JSON.parse(atob(sessionToken.value.split(".")[1]));
    return sessionData.user as SessionUser;
  } catch (error) {
    console.error("Error parsing session token:", error);
    return null;
  }
}
