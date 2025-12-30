"use client";

import "@blocknote/core/style.css";
import { PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";

import { useEdgeStore } from "@/lib/edgestore";

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ initialContent, onChange, editable = true }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const parsedContent = (() => {
    if (!initialContent) return undefined;
    try {
      return JSON.parse(initialContent) as PartialBlock[];
    } catch {
      return undefined;
    }
  })();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };

  const editor = useCreateBlockNote({
    initialContent: parsedContent,
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        editable={editable}
        onChange={() => {
          if (!editable) return;
          onChange(JSON.stringify(editor.document));
        }}
      />
    </div>
  );
};

export default Editor;
