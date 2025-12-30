"use client"

import { 
  Smile, 
  X 
} from "lucide-react";
import React, {
  ElementRef,
  useEffect,
  useRef,
  useState,
} from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { IconPicker } from "./icon-picker";
import { updateDocument } from "@/lib/documents-client";
import { type DocumentWithContent } from "@/types/document";

interface ToolbarProps {
  initialData: DocumentWithContent;
  preview?:boolean
};

export function Toolbar ({initialData,preview}:ToolbarProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);
  const [icon, setIcon] = useState(initialData.icon);

  const inputRef = useRef<ElementRef<'textarea'>>(null);

  useEffect(() => {
    setValue(initialData.title);
    setIcon(initialData.icon);
  }, [initialData.title, initialData.icon]);

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = async () => {
    setIsEditing(false);
    if (preview) return;
    const nextTitle = value.trim() || "Untitled";
    if (nextTitle === initialData.title) return;
    try {
      await updateDocument(initialData.id, { title: nextTitle });
      setValue(nextTitle);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update title.");
      setValue(initialData.title);
    }
  };

  const onInput = (value:string) => {
    setValue(value);
  };

  const onKeyDown = (event:React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    };
  };

  const onIconSelect = async (icon:string) => {
    if (preview) return;
    setIcon(icon);
    try {
      await updateDocument(initialData.id, { icon });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update icon.");
      setIcon(initialData.icon);
    }
  };

  const onRemoveIcon = async () => {
    if (preview) return;
    setIcon(undefined);
    try {
      await updateDocument(initialData.id, { icon: null });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove icon.");
      setIcon(initialData.icon);
    }
  };

  return (
    <div className="pl-[54px] group relative">
      {!!icon && !preview && (
        <div className="flex gap-x-2 items-center group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">{icon}</p>
          </IconPicker>
          <Button className="rounded-full opacity-0 group-hover/icon:opacity-100 transition
          text-muted-foreground text-xs" variant='outline' size='icon' onClick={onRemoveIcon}>
            <X className="w-4 h-4"/>
          </Button>
        </div>
      )}
      {!!icon && preview && (
        <p className="text-6xl pt-6">
          {icon}
        </p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button className="text-muted-foreground text-xs" variant='outline' size='sm'>
              <Smile className="w-4 h-4 mr-2"/>
              Add icon
            </Button>
          </IconPicker>
        )}
      </div>
      {isEditing && !preview ? (
        <TextAreaAutoSize className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]
        resize-none"
         ref={inputRef} onBlur={disableInput} onKeyDown={onKeyDown} value={value}
        onChange={e => onInput(e.target.value)}/>
      ) : (
        <div className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]" onClick={enableInput}>
          {value}
        </div>
      )}
    </div>
  );
};
