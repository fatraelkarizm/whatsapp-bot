import { UserRole } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, verifyAuthToken } from "@/lib/auth";

export type AuthUser = {
  userId: string;
  email: string;
  role: UserRole;
};

export async function getAuthUserFromCookie(): Promise<AuthUser | null> {
  const store = await cookies();
  const token = store.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifyAuthToken(token);
}

export async function requireRole(
  allowedRoles: UserRole[]
): Promise<{ user: AuthUser | null; response: NextResponse | null }> {
  const user = await getAuthUserFromCookie();

  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (!allowedRoles.includes(user.role)) {
    return {
      user,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { user, response: null };
}
