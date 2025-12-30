"use client"

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components//ui/skeleton";

interface CoverProps {
  url?:string
  preview?:boolean
};

const Cover = ({url,preview: _preview}:CoverProps) => {
  return (
    <div className={cn(`relative w-full h-[35vh] group`,
    !url && 'h-[12vh]',
    url && 'bg-muted')}>
      {!!url && (
        <Image className="object-cover" src={url} alt='Cover' fill/>
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
