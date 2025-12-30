"use client";

import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { createDocument } from "@/lib/documents-client";

interface DocumentsEmptyProps {
  userName: string;
}

const DocumentsEmpty = ({ userName }: DocumentsEmptyProps) => {
  const router = useRouter();

  const onCreate = async () => {
    try {
      const response = await createDocument();
      router.push(`/documents/${response.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Unable to create a new page.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full space-y-4">
      <Image
        className="dark:hidden"
        src="/empty.png"
        alt="Empty"
        width="300"
        height="300"
      />
      <Image
        className="hidden dark:block"
        src="/empty-dark.png"
        alt="Empty"
        width="300"
        height="300"
      />
      <h2 className="text-lg font-medium">Welcome to {userName}&apos;s Notion</h2>
      <Button onClick={onCreate}>
        <PlusCircle className="w-4 h-4 mr-2" />
        New note
      </Button>
    </div>
  );
};

export default DocumentsEmpty;
