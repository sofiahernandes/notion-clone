"use client"	

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog";
import { useConverImage } from "@/hooks/use-cover-image";

const CoverImageModal = () => {
  const coverImage = useConverImage();

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <VisuallyHidden>
        <DialogContent>
          <DialogHeader>
            <h2 className="text-center text-lg font-semibold">
              Cover Image
            </h2>
          </DialogHeader>
          <p className="text-sm text-muted-foreground text-center py-4">
            Cover uploads are disabled in mock mode.
          </p>
        </DialogContent>
      </VisuallyHidden>
    </Dialog>
  );
};

export { CoverImageModal };
