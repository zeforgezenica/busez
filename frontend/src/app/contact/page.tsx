import React from "react";
import ContactForm from "./ContactForm.client";

export const metadata = {
  title: "Contact - kadJeBus",
};

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto py-24 px-4">
      <h1 className="text-2xl font-bold mb-1">Contact</h1>
      <p className="text-muted-foreground mb-6">If you need to reach us, fill the form below or replace this with your preferred contact channels.</p>

      <ContactForm />
    </main>
  );
}
