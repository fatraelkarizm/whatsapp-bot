import { UserRole } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";

export const AUTH_COOKIE_NAME = "digicystore_auth";
const TOKEN_AGE_SECONDS = 60 * 60 * 24 * 7;

const jwtSecret = process.env.AUTH_JWT_SECRET;

if (!jwtSecret) {
  throw new Error("Missing AUTH_JWT_SECRET in environment variables");
}

const secretKey = new TextEncoder().encode(jwtSecret);

export type AuthTokenPayload = {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
};

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(
  password: string,
  passwordHash: string
): Promise<boolean> {
  return compare(password, passwordHash);
}

export async function signAuthToken(payload: AuthTokenPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_AGE_SECONDS}s`)
    .sign(secretKey);
}

export async function verifyAuthToken(token: string): Promise<AuthTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    const email = String(payload.email);
    const fallbackName = email.split("@")[0] || "Akun";

    return {
      userId: String(payload.userId),
      name: typeof payload.name === "string" ? payload.name : fallbackName,
      email,
      role: payload.role as UserRole,
    };
  } catch {
    return null;
  }
}

export function getAuthCookieMaxAge(): number {
  return TOKEN_AGE_SECONDS;
}
