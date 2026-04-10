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
    <>
      <form onSubmit={handleSubmit} className="space-y-4 max-full">
        <div>
          <label className="block text-sm font-medium mb-1">Ime</label>
          <Input name="name" placeholder="Vaše ime" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input name="email" placeholder="you@example.com" type="email" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Poruka</label>
          <textarea name="message" className="w-full rounded-md border border-input px-3 py-2 text-sm" rows={5} placeholder="Napišite poruku..." />
        </div>

        <div>
          <Button type="submit" disabled={sending}>{sending ? "Sending..." : "Pošaljite (placeholder)"}</Button>
        </div>


      </form>

      <div className="mt-8 text-center">
        <h2 className="text-lg font-semibold mb-4">Pronađite nas ovdje!</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2860.192926237827!2d17.90454487571755!3d44.20309277108142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475ee2512691221d%3A0xe7a6d6f5947318b5!2sZeForge%20Community!5e0!3m2!1sen!2sba!4v1775752066694!5m2!1sen!2sba"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}
