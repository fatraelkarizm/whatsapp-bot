import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/roles";
import {
  AUTH_COOKIE_NAME,
  getAuthCookieMaxAge,
  signAuthToken,
  verifyPassword,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        passwordHash: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    const passwordOk = await verifyPassword(password, user.passwordHash);
    if (!passwordOk) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    let effectiveRole = user.role;

    if (effectiveRole !== UserRole.ADMIN && isAdminEmail(user.email)) {
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { role: UserRole.ADMIN },
        select: { role: true },
      });
      effectiveRole = updatedUser.role;
    }

    const token = await signAuthToken({
      userId: user.id,
      name: user.name,
      email: user.email,
      role: effectiveRole,
    });

    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: effectiveRole,
        },
      },
      { status: 200 }
    );

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: getAuthCookieMaxAge(),
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Login gagal" }, { status: 500 });
  }
}
