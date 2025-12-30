"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

import Editor from "@/components/editor";
import { updateDocument } from "@/lib/documents-client";

interface DocumentEditorProps {
  documentId: string;
  initialContent?: string | null;
  editable?: boolean;
}

const DocumentEditor = ({
  documentId,
  initialContent,
  editable = true,
}: DocumentEditorProps) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (value: string) => {
    if (!editable) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        await updateDocument(documentId, { content: value });
      } catch (error) {
        console.error(error);
        toast.error("Failed to save changes.");
      }
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Editor
      initialContent={initialContent ?? undefined}
      onChange={handleChange}
      editable={editable}
    />
  );
};

export default DocumentEditor;
