import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const collectDescendantIds = async (
  documentId: string,
  userId: string,
): Promise<string[]> => {
  const children = await prisma.document.findMany({
    where: {
      userId,
      parentId: documentId,
    },
    select: {
      id: true,
    },
  });

  const childIds = children.map((child) => child.id);
  const nestedIds = await Promise.all(
    childIds.map((childId) => collectDescendantIds(childId, userId)),
  );

  return [...childIds, ...nestedIds.flat()];
};

export async function PATCH(
  request: Request,
  { params }: { params: { documentId: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const document = await prisma.document.findFirst({
      where: {
        id: params.documentId,
        userId: session.user.id,
      },
      select: {
        id: true,
        isArchived: true,
      },
    });

    if (!document) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const body = await request.json().catch(() => ({}));
    const {
      title,
      content,
      icon,
      coverImage,
      isArchived,
      isPublished,
      parentId,
    } = body ?? {};

    const archiveState =
      typeof isArchived === "boolean" ? isArchived : document.isArchived;

    if (typeof isArchived === "boolean") {
      const descendantIds = await collectDescendantIds(
        params.documentId,
        session.user.id,
      );
      const ids = [params.documentId, ...descendantIds];

      await prisma.document.updateMany({
        where: {
          id: {
            in: ids,
          },
          userId: session.user.id,
        },
        data: {
          isArchived,
          ...(isArchived ? { isPublished: false } : {}),
        },
      });
    }

    const updateData: {
      title?: string;
      content?: string | null;
      icon?: string | null;
      coverImage?: string | null;
      isPublished?: boolean;
      parentId?: string | null;
    } = {};

    if (typeof title === "string") {
      updateData.title = title;
    }

    if (typeof content === "string" || content === null) {
      updateData.content = content;
    }

    if (typeof icon === "string" || icon === null) {
      updateData.icon = icon;
    }

    if (typeof coverImage === "string" || coverImage === null) {
      updateData.coverImage = coverImage;
    }

    if (typeof isPublished === "boolean" && !archiveState) {
      updateData.isPublished = isPublished;
    }

    if (typeof parentId === "string" || parentId === null) {
      if (typeof parentId === "string") {
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

      updateData.parentId = parentId;
    }

    if (Object.keys(updateData).length === 0) {
      const refreshedDocument = await prisma.document.findFirst({
        where: {
          id: params.documentId,
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

      return NextResponse.json(refreshedDocument ?? { ok: true });
    }

    const updatedDocument = await prisma.document.update({
      where: {
        id: params.documentId,
      },
      data: updateData,
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

    return NextResponse.json(updatedDocument);
  } catch (error) {
    console.error("PATCH /api/documents/[documentId] error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { documentId: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const document = await prisma.document.findFirst({
      where: {
        id: params.documentId,
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    if (!document) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const descendantIds = await collectDescendantIds(
      params.documentId,
      session.user.id,
    );
    const ids = [params.documentId, ...descendantIds];

    await prisma.document.deleteMany({
      where: {
        id: {
          in: ids,
        },
        userId: session.user.id,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/documents/[documentId] error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
