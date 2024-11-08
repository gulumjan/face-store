import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const DELETE = async (request: Request) => {
  try {
    const { productId } = await request.json();

    console.log("Attempting to delete item with productId:", productId);

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required." },
        { status: 400 }
      );
    }

    const result = await prisma.basket.delete({
      where: {
        id: productId,
      },
    });

    console.log("Deleted item:", result);

    return NextResponse.json(
      { message: "Item successfully deleted." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting from basket:", error);

    if (error === "P2025") {
      return NextResponse.json(
        { message: "No matching item found to delete." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `Error deleting from basket: ${error}` },
      { status: 500 }
    );
  }
};
