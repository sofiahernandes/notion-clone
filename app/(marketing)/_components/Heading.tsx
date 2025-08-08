"use client"

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">
        Your Ideas, Documents, & Plans. All Unified. Welcome to <span className="underline">Sofia's Notion Clone</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        All your projects, goals, calendars,<br/>
        roadmaps and more — in a single tool!
      </h3>
      {isLoading && <div className="w-full flex justify-center items-center">
        <Spinner size='lg'/>
      </div>}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href='/documents'>
            Enter Notion
            <ArrowRight className="w-4 h-4 ml-2"/>
          </Link>
      </Button>
        )}
        {!isAuthenticated && !isLoading && (
          <SignInButton mode='modal'>
            <Button>
              Get Notion Today
              <ArrowRight className="w-4 h-4 ml-2"/>
            </Button>
          </SignInButton>
        )}
    </div>
  );
};

export { Heading };