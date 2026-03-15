import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const status = await prisma.botStatus.findUnique({
      where: { id: "singleton" },
    });
    
    // Consider bot offline if last seen > 2 minutes ago
    const isLive = status?.isLive && (Date.now() - new Date(status.lastSeen).getTime()) < 120000;

    return NextResponse.json({ 
      isLive: !!isLive,
      lastSeen: status?.lastSeen || null
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch bot status" }, { status: 500 });
  }
}
