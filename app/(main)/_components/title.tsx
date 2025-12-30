"use client"

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { updateDocument } from "@/lib/documents-client";
import { type DocumentSummary } from "@/types/document";

interface TitleProps {
  initialData: DocumentSummary;
};

const Title = ({initialData}:TitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [title, setTitle] = useState(initialData.title || "Untitled");
  const [isEditing, setIsEditing] = useState(false);

  React.useEffect(() => {
    setTitle(initialData.title || "Untitled");
  }, [initialData.title]);

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0,inputRef.current.value.length);
    }, 0);
  };

  const disableInput = async () => {
    setIsEditing(false);
    const nextTitle = title.trim() || "Untitled";
    if (nextTitle === initialData.title) return;
    try {
      await updateDocument(initialData.id, { title: nextTitle });
      setTitle(nextTitle);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update title.");
      setTitle(initialData.title || "Untitled");
    }
  };

  const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onKeyDown = (event:React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    };
  };

  return (
    <div className="flex gap-x-1 items-center">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input className="h-7 px-2 focus-visible:ring-transparent" ref={inputRef}
        onClick={enableInput} onBlur={disableInput} value={title} onChange={onChange} onKeyDown={onKeyDown}/>
      ) : (
        <Button className="font-normal h-auto p-1" variant='ghost' size='sm' onClick={enableInput}>
          <span className="truncate">
            {title}
          </span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return (
    <Skeleton className="w-20 h-8 rounded-md"/>
  );
};

export default Title;
