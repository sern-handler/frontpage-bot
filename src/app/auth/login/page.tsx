"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex items-center p-4 lg:p-8">
      <div className="w-full max-w-md m-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold pb-1">Welcome!</h1>
        </div>
        <Link href="/auth/login/discord">
          <Button className="w-full mt-8 bg-[#5865F2] hover:bg-[#626FFC]">Log in with Discord</Button>
        </Link>  
        </div>
    </div>
  );
}
