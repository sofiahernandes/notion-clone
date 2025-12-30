import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const parentId =
      typeof body?.parentId === "string" ? body.parentId : null;

    if (parentId) {
      const parentDocument = await prisma.document.findFirst({
        where: {
          id: parentId,
          userId: session.user.id,
        },
        select: {
          id: true,
        },
      });

      if (!parentDocument) {
        return new NextResponse("Parent Not Found", { status: 404 });
      }
    }

    const document = await prisma.document.create({
      data: {
        title: "Untitled",
        content: "[]",
        parentId,
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        icon: true,
        coverImage: true,
        parentId: true,
        isArchived: true,
        isPublished: true,
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error("POST /api/documents error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
