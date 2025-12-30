"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components//ui/skeleton";
import { useConverImage } from "@/hooks/use-cover-image";
import { updateDocument } from "@/lib/documents-client";

interface CoverProps {
  url?:string
  preview?:boolean
  documentId?: string;
};

const Cover = ({url,preview = false, documentId}:CoverProps) => {
  const coverImage = useConverImage();
  const router = useRouter();

  const onRemove = async () => {
    if (!documentId) return;
    try {
      await updateDocument(documentId, { coverImage: null });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove cover.");
    }
  };

  return (
    <div className={cn(`relative w-full h-[35vh] group`,
    !url && 'h-[12vh]',
    url && 'bg-muted')}>
      {!!url && (
        <Image className="object-cover" src={url} alt='Cover' fill/>
      )}
      {!preview && documentId && (
        <div className="opacity-0 group-hover:opacity-100 absolute -bottom-16 right-4 flex gap-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => coverImage.onOpen(documentId, url)}
          >
            {url ? "Change cover" : "Add cover"}
          </Button>
          {url && (
            <Button size="sm" variant="outline" onClick={onRemove}>
              Remove
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return (
    <Skeleton className="w-full h-[12vh]"/>
  );
};

export { Cover };
