"use client"

import React, { useState } from "react";
import { Search, Trash, Undo } from "lucide-react";
import { toast } from 'sonner';
import { useParams, useRouter } from "next/navigation";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Input } from "@/components/ui/input";
import { getTrashDocuments } from "@/lib/mock-data";
	
const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = getTrashDocuments();

  const [search, setSearch] = useState("");

  const filteredDocuments = documents.filter(document => {
    return document.title.toLowerCase().includes(search.toLocaleLowerCase());
  });

  const onClick = (documentId:string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (event:React.MouseEvent<HTMLDivElement,MouseEvent>, documentId:string) => {
    event.stopPropagation();
    toast("Mock mode", {
      description: "Restore is disabled for demo content.",
    });
  };

  const onRemove = (documentId:string) => {
    toast("Mock mode", {
      description: "Delete is disabled for demo content.",
    });
    if (params.documentId  === documentId) {
      router.push("/documents");
    };
  };

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="w-4 h-4"/>
        <Input className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
         value={search} onChange={e => setSearch(e.target.value)}
         placeholder="Filter by page title..."/>
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents here
        </p>
        {filteredDocuments.map(document => (
          <div className="text-sm rounded-sm w-full hover:bg-primary/5 flex justify-between items-center text-primary"
          key={document.id} role="button" onClick={() => onClick(document.id)}
          >
            <span className="truncate pl-2">
              {document.title}
            </span>
            <div className="flex items-center">
              <div className="rounded-sm p-2 hover:bg-neutral-200 
              dark:hover:bg-neutral-600" onClick={e => onRestore(e,document.id)}>
                <Undo className="w-4 h-4 text-muted-foreground"/>
              </div>
              <ConfirmModal onConfirm={() => onRemove(document.id)}>
                <div className="rounded-sm p-2 hover:bg-neutral-200
                dark:hover:bg-neutral-600" role="button">
                <Trash className="w-4 h-4 text-muted-foreground"/>
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
