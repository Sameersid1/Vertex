import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import UserButton from "../../modules/components/user-button";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Button >
        Get Started
      </Button>
      <UserButton/>
    </div>
  );
}
