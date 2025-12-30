"use client"

import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { mockDocuments, mockUser } from "@/lib/mock-data";

const DocumentsPage = () => {
  const router = useRouter();
  const primaryDocument = mockDocuments.find((document) => !document.isArchived);

  const onCreate = () => {
    if (primaryDocument) {
      router.push(`/documents/${primaryDocument.id}`);
      return;
    }

    toast.error("No mock documents available.");
  };

  return (
    <div className="flex flex-col justify-center items-center h-full space-y-4">
      <Image className="dark:hidden" src="/empty.png" alt="Empty" width='300' height="300"/>
      <Image className="hidden dark:block" src="/empty-dark.png" alt="Empty" width="300" height="300"/>
      <h2 className="text-lg font-medium">
        Welcome to {mockUser.name}&apos;s Notion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="w-4 h-4 mr-2"/>
        New note
      </Button>
    </div>
  );
};

export default DocumentsPage;
