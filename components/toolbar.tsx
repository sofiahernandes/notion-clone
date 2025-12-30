"use client"

import { 
  Smile, 
  X 
} from "lucide-react";
import React, { 
  ElementRef, 
  useRef, 
  useState 
} from "react";
import TextAreaAutoSize from "react-textarea-autosize";

import { Button } from "@/components/ui/button";
import { IconPicker } from "./icon-picker";
import { MockDocument } from "@/lib/mock-data";

interface ToolbarProps {
  initialData: MockDocument;
  preview?:boolean
};

export function Toolbar ({initialData,preview}:ToolbarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);
  const [icon, setIcon] = useState(initialData.icon);

  const inputRef = useRef<ElementRef<'textarea'>>(null);

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value:string) => {
    setValue(value);
  };

  const onKeyDown = (event:React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    };
  };

  const onIconSelect = (icon:string) => {
    if (preview) return;
    setIcon(icon);
  };

  const onRemoveIcon = () => {
    setIcon(undefined);
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
