"use client"

import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({title: "Untitled"});

    toast.promise(promise,{
      loading:"Creating a new note...",
      success:"New note created ;)",
      error:"Failed to create a new note :O"
    })
  }

  return (
    <div className="flex flex-col justify-center items-center h-full space-y-4">
      <Image className="dark:hidden" src="/empty.png" alt="Empty" width='300' height="300"/>
      <Image className="hidden dark:block" src="/empty-dark.png" alt="Empty" width="300" height="300"/>
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Notion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="w-4 h-4 mr-2"/>
        New note
      </Button>
    </div>
  );
};

export default DocumentsPage;