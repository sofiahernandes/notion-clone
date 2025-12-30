"use client"	

import { ChevronsLeftRight, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger}
from "@/components/ui/dropdown-menu";
import { type UserSummary } from "@/types/document";

interface UserItemProps {
  user: UserSummary;
}

export const UserItem = ({ user }: UserItemProps) => {
  const displayName = user.name ?? "User";
  const displayEmail = user.email ?? "";
  const displayImage = user.image ?? undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center text-sm p-3 w-full hover:bg-primary/5" role="button">
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="w-5 h-5">
              <AvatarImage src={displayImage}/>
            </Avatar>
              <span className="text-start font-medium line-clamp-1">
                {displayName}&apos;s Notion
              </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground w-4 h-4"/>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="start" alignOffset={11} forceMount>
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {displayEmail}
          </p>
          <div className="flex gap-x-2 items-center">
            <div className="rounded-md bg-secondary p-1">
              <Avatar className="w-8 h-8">
                <AvatarImage src={displayImage}/>
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">
                {displayName}&apos;s Notion
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator/>
        <DropdownMenuItem
          className="w-full cursor-pointer text-muted-foreground"
          onClick={() => void signOut({ callbackUrl: "/" })}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
