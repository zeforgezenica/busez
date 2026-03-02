"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console or error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="text-center max-w-md space-y-6">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-6">
            <AlertCircle className="h-20 w-20 text-destructive" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Nešto je pošlo naopako</h1>
          <p className="text-muted-foreground">
            Dogodila se greška prilikom učitavanja stranice. Molimo pokušajte ponovo.
          </p>
          {process.env.NODE_ENV === "development" && error.message && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                Detalji greške (samo za razvoj)
              </summary>
              <pre className="mt-2 text-xs bg-muted p-4 rounded-md overflow-auto max-h-40">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
              </pre>
            </details>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button onClick={reset} size="lg" className="w-full sm:w-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            Pokušajte ponovo
          </Button>
        </div>

        {/* Additional Help */}
        <div className="pt-6 pb-2 text-sm text-muted-foreground">
          <p>
            Ako se problem nastavi, molimo kontaktirajte nas putem{" "}
            <Link href="/contact" className="underline hover:text-foreground">
              kontakt forme
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
