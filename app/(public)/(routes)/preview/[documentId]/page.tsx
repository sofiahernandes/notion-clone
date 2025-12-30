import { notFound } from "next/navigation";

import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import DocumentEditor from "@/components/document-editor";
import { prisma } from "@/lib/prisma";

interface DocumentIdPageProps {
  params: {
    documentId: string;
  };
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const document = await prisma.document.findFirst({
    where: {
      id: params.documentId,
      isPublished: true,
      isArchived: false,
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
      <Cover preview url={document.coverImage ?? undefined} />
      <div className="md:max-w-4xl lg:md-max-w-5xl">
        <Toolbar preview initialData={document} />
        <DocumentEditor
          documentId={document.id}
          initialContent={document.content}
          editable={false}
        />
      </div>
    </div>
  );
};

export default DocumentIdPage;
