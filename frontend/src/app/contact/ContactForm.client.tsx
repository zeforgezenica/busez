"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const data = new FormData(e.target as HTMLFormElement);
    const payload: Record<string, string> = {};
    data.forEach((v, k) => (payload[k] = String(v)));
    console.log("Contact form (placeholder)", payload);
    // simulate network delay
    await new Promise((r) => setTimeout(r, 600));
    setSending(false);
    alert("Message sent (placeholder)");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <Input name="name" placeholder="Your name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input name="email" placeholder="you@example.com" type="email" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea name="message" className="w-full rounded-md border border-input px-3 py-2 text-sm" rows={5} placeholder="Write your message..." />
      </div>

      <div>
        <Button type="submit" disabled={sending}>{sending ? "Sending..." : "Send (placeholder)"}</Button>
      </div>
    </form>
  );
}
