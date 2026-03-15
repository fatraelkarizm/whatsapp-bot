import { UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guards";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { response } = await requireRole([UserRole.ADMIN]);
    if (response) {
      return response;
    }

    const body = await request.json();
    const { name, price, description, image, downloadUrl } = body;

    const product = await prisma.product.update({
      where: { id: params.id },
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
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { response } = await requireRole([UserRole.ADMIN]);
    if (response) {
      return response;
    }

    await prisma.product.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
