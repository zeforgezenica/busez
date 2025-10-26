"use client";

import React, { useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AuthClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const mode = useMemo(() => {
    const m = searchParams?.get("mode");
    return m === "register" ? "register" : "login";
  }, [searchParams]);

  const setMode = (newMode: "login" | "register") => {
    const url = `${pathname}?mode=${newMode}`;
    // replace to avoid history clutter
    router.replace(url);
  };

  return (
    <main className="max-w-2xl mx-auto py-24 px-4">
      <div className="bg-background/60 backdrop-blur-md p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{mode === "login" ? "Login" : "Register"}</h1>
        </div>

        {/* Mode toggle in header of the page */}
        <div className="relative mb-6 bg-muted-foreground/5 rounded-md p-1 inline-flex">
          <button
            onClick={() => setMode("login")}
            className={`relative z-10 px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === "login" ? "text-primary" : "text-muted-foreground"}`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={`relative z-10 px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === "register" ? "text-primary" : "text-muted-foreground"}`}
          >
            Register
          </button>

          {/* animated slider */}
          <motion.div
            layout
            initial={false}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="absolute top-1 left-1 bottom-1 w-24 bg-primary/10 rounded-md"
            style={{
              transform: mode === "login" ? "translateX(0)" : "translateX(6rem)",
            }}
          />
        </div>

        <AuthForm mode={mode} setMode={setMode} />
      </div>
    </main>
  );
}

function AuthForm({ mode, setMode }: { mode: "login" | "register"; setMode: (m: "login" | "register") => void }) {
  const isRegister = mode === "register";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder behavior: toggle a quick animation then log
    // real authentication should be implemented server-side
    // For now we just console.log
    const data = new FormData(e.target as HTMLFormElement);
    const payload: Record<string, string> = {};
    data.forEach((v, k) => (payload[k] = String(v)));
    // animate a quick feedback
    console.log("Auth submit", mode, payload);
    alert("Submitted (placeholder). Check console for payload.");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {isRegister && (
        <div>
          <label className="block text-sm font-medium mb-1">Full name</label>
          <Input name="name" placeholder="Your full name" />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input name="email" type="email" placeholder="you@example.com" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <Input name="password" type="password" placeholder="••••••••" />
      </div>

      <div className="flex items-center space-x-3">
        <Button type="submit">{isRegister ? "Create account" : "Sign in"}</Button>
        <Button variant="ghost" type="button" onClick={() => setMode(isRegister ? "login" : "register")}>{isRegister ? "Have an account? Login" : "Need an account? Register"}</Button>
      </div>
    </form>
  );
}
