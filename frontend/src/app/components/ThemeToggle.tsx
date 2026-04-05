"use client";

import * as React from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background border border-border/50 ${
        isDark ? "bg-indigo-950/30" : "bg-orange-100/50"
      }`}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 cursor-pointer">
        <MoonStar className="h-4 w-4 text-indigo-400" />
        <SunMedium className="h-4 w-4 text-orange-400" />
      </div>

      {/* Thumb */}
      <span
        className={`pointer-events-none relative z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-md transition-transform duration-500 ease-in-out ${
          isDark 
            ? "translate-x-1 bg-indigo-500" 
            : "translate-x-9 bg-white"
        }`}
      >
        {isDark ? (
           <MoonStar className="h-3.5 w-3.5 text-white" />
        ) : (
           <SunMedium className="h-3.5 w-3.5 text-orange-500" />
        )}
      </span>
    </button>
  );
}
