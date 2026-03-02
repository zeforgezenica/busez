import React from "react";

export const metadata = {
  title: "About - kadJeBus",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto py-24 px-4">
      <h1 className="text-2xl font-bold mb-1 ">O nama</h1>
      <p className="text-sm text-muted-foreground mb-6 text-justify">
        kadJeBus je moderna web aplikacija razvijena s ciljem olakšavanja svakodnevnog života
        građana Zenice pružajući brz i jednostavan pristup informacijama o gradskom javnom prevozu.
      </p>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">Naša misija</h2>
          <p className="text-sm text-muted-foreground text-justify">
            Naša misija je digitalizirati i modernizovati sistem javnog prevoza u Zenici, čineći ga
            pristupačnijim svim građanima. Vjerujemo da svako ima pravo na tačne i ažurne
            informacije o autobusnim linijama, voznim redovima i stajalištima. Kroz kadJeBus
            aplikaciju, nastojimo smanjiti vrijeme čekanja, poboljšati planiranje putovanja i
            doprinijeti ekološki osvješćenijem korištenju javnog prevoza. Naš cilj je stvoriti
            platformu koja će služiti kao pouzdan svakodnevni alat za sve korisnike javnog prevoza u
            gradu.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Team</h2>
          <p className="text-sm text-muted-foreground">No team data available. Replace with names, roles, and links if you want.</p>
        </div>
      </section>
    </main>
  );
}
