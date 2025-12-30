import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Navigation from "./_components/navigation";
import { SearchCommand } from "@/components/search-command";
import { type UserSummary } from "@/types/document";

export default async function MainLayout ({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  const documents = await prisma.document.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "asc",
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

  const user: UserSummary = {
    name: session.user.name ?? "User",
    email: session.user.email ?? "",
    image: session.user.image ?? "",
  };

  return (
    <div className="h-full flex dark:bg-secondary/70">
      <Navigation documents={documents} user={user} />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand documents={documents} user={user} />
        {children}
      </main>
    </div>
  );
};
