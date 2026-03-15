import { UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guards";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { response } = await requireRole([UserRole.ADMIN]);
    if (response) {
      return response;
    }

    const body = await request.json();
    const { name, price, description, image, downloadUrl } = body;

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        image,
        downloadUrl,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
