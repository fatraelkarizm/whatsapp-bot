import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAuthUserFromCookie } from "@/lib/auth-guards";

export async function GET() {
  try {
    const user = await getAuthUserFromCookie();

    if (!user) {
      return NextResponse.json(
        {
          user: null,
          role: UserRole.GUEST,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        user,
        role: user.role,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Gagal mengambil session" }, { status: 500 });
  }
}
