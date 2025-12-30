"use client"	

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog";
import { useConverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { updateDocument } from "@/lib/documents-client";

const CoverImageModal = () => {
  const coverImage = useConverImage();
  const { edgestore } = useEdgeStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = async (file?: File) => {
    if (!coverImage.documentId) return;

    try {
      setIsSubmitting(true);

      if (!file) {
        await updateDocument(coverImage.documentId, { coverImage: null });
        coverImage.onClose();
        router.refresh();
        return;
      }

      const response = await edgestore.publicFiles.upload({ file });
      await updateDocument(coverImage.documentId, { coverImage: response.url });
      coverImage.onClose();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update cover image.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">
            Cover Image
          </h2>
        </DialogHeader>
        <div className="py-4">
          <SingleImageDropzone
            value={coverImage.url}
            onChange={onChange}
            dropzoneOptions={{
              maxSize: 5 * 1024 * 1024,
            }}
            disabled={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { CoverImageModal };
