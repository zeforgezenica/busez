import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./components/themeprovider";


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
        <div>
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
            <Providers>
              <main>{children}</main>
              <Toaster />
            </Providers>
          </ThemeProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
