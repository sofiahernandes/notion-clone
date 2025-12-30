"use client"

import dynamic from "next/dynamic";
import { use, useMemo } from "react";

import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import { getDocumentById } from "@/lib/mock-data";

interface DocumentIdPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    [],
  );

  const resolvedParams = use(params);
  const document = getDocumentById(resolvedParams.documentId);

  if (!document) {
    return <div>Not Found</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor onChange={() => undefined} initialContent={document.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
