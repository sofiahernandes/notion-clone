"use client"	

import { ChevronsLeftRight } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger}
from "@/components/ui/dropdown-menu";
import { mockUser } from "@/lib/mock-data";

export const UserItem = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center text-sm p-3 w-full hover:bg-primary/5" role="button">
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="w-5 h-5">
              <AvatarImage src={mockUser.imageUrl}/>
            </Avatar>
              <span className="text-start font-medium line-clamp-1">
                {mockUser.name}&apos;s Notion
              </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground w-4 h-4"/>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="start" alignOffset={11} forceMount>
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {mockUser.email}
          </p>
          <div className="flex gap-x-2 items-center">
            <div className="rounded-md bg-secondary p-1">
              <Avatar className="w-8 h-8">
                <AvatarImage src={mockUser.imageUrl}/>
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">
                {mockUser.name}&apos;s Notion
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator/>
        <DropdownMenuItem className="w-full cursor-default text-muted-foreground">
          Demo mode
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
