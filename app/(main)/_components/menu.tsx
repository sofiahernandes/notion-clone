"use client"

import { toast } from "sonner";
import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { updateDocument } from "@/lib/documents-client";
	
interface MenuProps {
  documentId: string;
  lastEditedBy?: string;
};

const Menu = ({ documentId, lastEditedBy }: MenuProps) => {
  const router = useRouter();

  const onArchive = async () => {
    try {
      await updateDocument(documentId, { isArchived: true });
      toast.success("Moved to trash.");
      router.push("/documents");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to move page to trash.");
    }
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='sm' variant='ghost'>
          <MoreHorizontal className="w-4 h-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="w-4 h-4 mr-2"/>
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <div className="text-xs text-muted-foreground p-2">
          Last edited by: {lastEditedBy ?? "Unknown"}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return (
    <Skeleton className="w-10 h-10"/>
  );
};

export default Menu;
