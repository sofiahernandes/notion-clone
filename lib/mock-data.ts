export type MockUser = {
  name: string;
  email: string;
  imageUrl: string;
};

export type MockDocument = {
  id: string;
  title: string;
  content?: string;
  icon?: string;
  coverImage?: string;
  parentId?: string | null;
  isArchived?: boolean;
  isPublished?: boolean;
  lastEditedBy?: string;
};

const welcomeContent = JSON.stringify([
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "Welcome to your mock workspace.",
      },
    ],
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "This content is static and meant for demo purposes.",
      },
    ],
  },
]);

const roadmapContent = JSON.stringify([
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "Q1: Capture ideas and organize notes.",
      },
    ],
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "Q2: Share drafts and gather feedback.",
      },
    ],
  },
]);

export const mockUser: MockUser = {
  name: "Sofia",
  email: "sofia@example.com",
  imageUrl: "/logo.svg",
};

export const mockDocuments: MockDocument[] = [
  {
    id: "welcome",
    title: "Welcome",
    icon: "N",
    coverImage: "/reading.png",
    content: welcomeContent,
    parentId: null,
    isArchived: false,
    isPublished: true,
    lastEditedBy: mockUser.name,
  },
  {
    id: "product-notes",
    title: "Product Notes",
    icon: "P",
    content: "[]",
    parentId: null,
    isArchived: false,
    isPublished: false,
    lastEditedBy: mockUser.name,
  },
  {
    id: "roadmap",
    title: "Roadmap",
    icon: "R",
    content: roadmapContent,
    parentId: "product-notes",
    isArchived: false,
    isPublished: true,
    lastEditedBy: mockUser.name,
  },
  {
    id: "archive-notes",
    title: "Archived Ideas",
    icon: "A",
    content: "[]",
    parentId: null,
    isArchived: true,
    isPublished: false,
    lastEditedBy: mockUser.name,
  },
];

export const getDocumentById = (id: string) =>
  mockDocuments.find((document) => document.id === id) ?? null;

export const getSidebarDocuments = (parentId?: string) => {
  const normalizedParent = parentId ?? null;
  return mockDocuments.filter(
    (document) =>
      (document.parentId ?? null) === normalizedParent && !document.isArchived,
  );
};

export const getSearchDocuments = () =>
  mockDocuments.filter((document) => !document.isArchived);

export const getTrashDocuments = () =>
  mockDocuments.filter((document) => document.isArchived);
