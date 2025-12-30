"use client"

import { File } from "lucide-react";
import { useRouter } from "next/navigation";

import { type DocumentSummary, type UserSummary } from "@/types/document";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { useSearch } from "@/hooks/use-search";

interface SearchCommandProps {
  documents: DocumentSummary[];
  user: UserSummary;
}

const SearchCommand = ({ documents, user }: SearchCommandProps) => {
  const router = useRouter();
  const [isMounted,setIsMounted] = useState(false);
  const visibleDocuments = documents.filter((document) => !document.isArchived);

  const toggle = useSearch(store => store.toggle);
  const isOpen = useSearch(store => store.isOpen);
  const onClose = useSearch(store => store.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e:KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      };
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggle]);

  const onSelect = (id:string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  if (!isMounted) {
    return null;
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user.name ?? "your"}'s Notion`}/>
      <CommandList>
        <CommandEmpty>No results found</CommandEmpty>
        <CommandGroup heading='Documents'>
          {visibleDocuments.map((document) => (
            <CommandItem
              key={document.id}
              value={`${document.id}-${document.title}`}
              title={document.title}
              onSelect={() => onSelect(document.id)}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">
                  {document.icon}
                </p>
              ) : (
                <File className="w-4 h-4 mr-2"/>
              )}
              <span>
                {document.title}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export { SearchCommand };
