import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import { Toaster } from "./components/ui/toaster";

export const metadata: Metadata = {
  title: "kadJeBus - ZeForge Zenica",
  description: "By ZeForge Zenica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <React.Suspense fallback={null}>
            <NavigationBar />
          </React.Suspense>
          <main className="flex-1 pt-16">{children}</main>
          <Toaster />
        </Providers>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
