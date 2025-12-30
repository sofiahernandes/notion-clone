"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { toast } from "sonner";

interface BannerProps {
  documentId: string;
}

const Banner = ({ documentId: _documentId }: BannerProps) => {
  const router = useRouter();

  const onRemove = () => {
    toast("Mock mode", {
      description: "Delete is disabled for demo content.",
    });
    router.push("/documents");
  };

  const onRestore = () => {
    toast("Mock mode", {
      description: "Restore is disabled for demo content.",
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex gap-x-2 justify-center items-center">
      <p>This page is in the Trash.</p>
      <Button
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2
      h-auto font-normal"
        variant="outline"
        size="sm"
        onClick={onRestore}
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2
      h-auto font-normal"
          variant="outline"
          size="sm"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
