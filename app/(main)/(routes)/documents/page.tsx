import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import DocumentsEmpty from "./_components/documents-empty";

const DocumentsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  return (
    <DocumentsEmpty userName={session.user.name ?? "User"} />
  );
};

export default DocumentsPage;
