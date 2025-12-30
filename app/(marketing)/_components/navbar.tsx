"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useScrollTop } from "@/hooks/use-scroll-top";

const Navbar = () => {
  const scrolled = useScrollTop();
  const onSignIn = () => {
    void signIn("google", { callbackUrl: "/documents" });
  };

  return (
    <div className={cn(`z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-5`,scrolled && 'border-b shadow-sm')}>
      <Logo/>
      <div className="md:ml-auto md:justify-end flex gap-x-2 justify-between items-center w-full">
        <Button size="sm" onClick={onSignIn}>
          Get Notion Today
        </Button>
        <ModeToggle/>
      </div>
    </div>
 );
};

export { Navbar };
