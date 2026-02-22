import React from "react";

export const metadata = {
  title: "About - kadJeBus",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto py-24 px-4">
      <h1 className="text-3xl font-bold mb-4">O nama</h1>
      <p className="text-muted-foreground mb-6">
        Ovo je stranica "O nama" za projekt kadJeBus. Ispod su nekoliko
        placeholder-a — zamijenite ih stvarnim sadržajem po potrebi.
      </p>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Naša misija</h2>
          <p className="text-sm text-muted-foreground">Rezervisano mjesto za izjavu o misiji. Dodajte kratak paragraf koji opisuje projekat.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Tim</h2>
          <p className="text-sm text-muted-foreground">Nema dostupnih podataka o timu. Zamijenite imenima, ulogama i linkovima ako želite.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Zasluge</h2>
          <p className="text-sm text-muted-foreground">Rezervisano mjesto za priznanje. Ovdje spomenite biblioteke, izvore podataka ili saradnike.</p>
        </div>
      </section>
    </main>
  );
}
