import { UserRole } from "@prisma/client";

export function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS || "";
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return getAdminEmails().includes(normalized);
}

export function resolveRegisterRole(params: {
  email: string;
  usersCount: number;
}): UserRole {
  if (params.usersCount === 0) {
    return UserRole.ADMIN;
  }

  if (isAdminEmail(params.email)) {
    return UserRole.ADMIN;
  }

  return UserRole.RESELLER;
}
