import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "./components/Footer";
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
		<html lang="en">
			<body className="flex flex-col min-h-screen bg-gray-100">
				<div>
					<Providers>
						<main>{children}</main>
						<Toaster />
					</Providers>
				</div>
				<Footer />
				<Analytics />
			</body>
		</html>
  );
}
