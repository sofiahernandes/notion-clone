import { type DocumentUpdatePayload } from "@/types/document";

const handleJsonResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return (await response.json()) as T;
};

export const createDocument = async (parentId?: string | null) => {
  const response = await fetch("/api/documents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parentId: parentId ?? null,
    }),
  });

  return handleJsonResponse<{ id: string }>(response);
};

export const updateDocument = async (
  documentId: string,
  payload: DocumentUpdatePayload,
) => {
  const response = await fetch(`/api/documents/${documentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleJsonResponse<{ id: string }>(response);
};

export const deleteDocument = async (documentId: string) => {
  const response = await fetch(`/api/documents/${documentId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Delete failed");
  }
};
