"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const Heading = () => {
  const onSignIn = () => {
    void signIn("google", { callbackUrl: "/documents" });
  };

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        Your Ideas, Documents, & Plans. All Unified. Welcome to{" "}
        <span className="underline">Sofia's Notion Clone</span>
      </h1>
      <h3 className="text-base leading-tighter">
        All your projects, goals, calendars, roadmaps and more — in a single tool!
      </h3>
      <Button className="my-6" onClick={onSignIn}>
        Get Notion Today
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export { Heading };
