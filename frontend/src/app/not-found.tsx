import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export const metadata = {
  title: "404 - Stranica nije pronađena | kadJeBus",
  description: "Stranica koju tražite ne postoji",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="text-center max-w-md space-y-6">
        {/* 404 Icon */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-gray-800 dark:text-gray-200">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl">
            🚍
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">
            Stranica nije pronađena
          </h2>
          <p className="text-muted-foreground">
            Ups! Izgleda da je ovaj autobus otišao pogrešnim putem. Stranica koju tražite ne postoji ili je premještena.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link href="/">
            <Button className="w-full sm:w-auto" size="lg">
              <Home className="mr-2 h-4 w-4" />
              Početna stranica
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
