import React from "react";
import ContactForm from "./ContactForm.client";

export const metadata = {
  title: "Contact - kadJeBus",
};

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4 min-h-[60vh] flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Kontakt</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Ako nas trebate kontaktirati, ispunite donji obrazac ili nas kontaktirajte putem društvenih mreža.
        </p>
      </div>
      <div className="w-full">
        <ContactForm />
      </div>
    </main>
  );
}