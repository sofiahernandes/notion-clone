"use client"

import React from "react";
import Navigation from "./_components/navigation";
import { SearchCommand } from "@/components/search-command";

export default function MainLayout ({children}:{children:React.ReactNode}) {
  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation/>
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand/>
        {children}
      </main>
    </div>
  );
};
