"use client"

import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";

import Banner from "./banner";
import Menu from "./menu";
import Publish from "./publish";
import Title from "./title";
import { getDocumentById } from "@/lib/mock-data";

interface NavbarProps {
  isCollapsed:boolean
  onResetWidth:() => void
};

const Navbar = ({isCollapsed, onResetWidth}:NavbarProps) => {
  const params = useParams();
  const documentId = Array.isArray(params.documentId)
    ? params.documentId[0]
    : params.documentId;
  const document = documentId ? getDocumentById(documentId) : null;

  if (!document) {
    return null;
  }

  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full
      flex gap-x-4 items-center">
        {isCollapsed && (
          <MenuIcon className="w-6 h-6 text-muted-foreground" role="button"
           onClick={onResetWidth}
           />
        )}
        <div className="flex justify-between items-center w-full">
          <Title initialData={document}/>
          <div className="flex gap-x-2 items-center">
            <Publish initialData={document}/>
            <Menu documentId={document.id}/>
          </div>
        </div>
      </nav>
      {document.isArchived && (
        <Banner documentId={document.id}/>
      )}
    </>
  );
};

export default Navbar;
