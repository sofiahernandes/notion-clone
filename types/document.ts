export type DocumentSummary = {
  id: string;
  title: string;
  icon: string | null;
  coverImage?: string | null;
  parentId: string | null;
  isArchived: boolean;
  isPublished: boolean;
};

export type DocumentWithContent = DocumentSummary & {
  content: string | null;
};

export type UserSummary = {
  name: string | null;
  email: string | null;
  image: string | null;
};

export type DocumentUpdatePayload = {
  title?: string;
  content?: string | null;
  icon?: string | null;
  coverImage?: string | null;
  isArchived?: boolean;
  isPublished?: boolean;
  parentId?: string | null;
};
