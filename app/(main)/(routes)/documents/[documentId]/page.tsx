import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import DocumentEditor from "@/components/document-editor";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface DocumentIdPageProps {
  params: {
    documentId: string;
  };
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  const document = await prisma.document.findFirst({
    where: {
      id: params.documentId,
      userId: session.user.id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      icon: true,
      coverImage: true,
      parentId: true,
      isArchived: true,
      isPublished: true,
    },
  });

  if (!document) {
    notFound();
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage ?? undefined} documentId={document.id} />
      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <DocumentEditor
          documentId={document.id}
          initialContent={document.content}
        />
      </div>
    </div>
  );
};

export default DocumentIdPage;
