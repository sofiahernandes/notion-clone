"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FileIcon } from "lucide-react";
import Item from "./item";
import { type DocumentSummary } from "@/types/document";

interface DocumentListProps {
  parentDocumentId?: string;
  level?: number;
  documents: DocumentSummary[];
  userName: string;
}

const DocumentList = ({
  parentDocumentId,
  level = 0,
  documents,
  userName,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const currentDocumentId = Array.isArray(params.documentId)
    ? params.documentId[0]
    : params.documentId;

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const normalizedParentId = parentDocumentId ?? null;
  const childDocuments = documents.filter(
    (document) =>
      (document.parentId ?? null) === normalizedParentId && !document.isArchived,
  );

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  return (
    <>
      {childDocuments.length === 0 && level > 0 && (
        <p
          className="text-sm font-medium text-muted-foreground/80"
          style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        >
          No pages available
        </p>
      )}
      {childDocuments.map((document) => (
        <div key={document.id}>
          <Item
            id={document.id}
            onClick={() => onRedirect(document.id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={currentDocumentId === document.id}
            level={level}
            onExpand={() => onExpand(document.id)}
            expanded={expanded[document.id]}
            lastEditedBy={userName}
          />
          {expanded[document.id] && (
            <DocumentList
              parentDocumentId={document.id}
              level={level + 1}
              documents={documents}
              userName={userName}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
