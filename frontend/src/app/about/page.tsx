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
          <h2 className="text-xl font-semibold mb-1">Tim</h2>
          <p className="text-sm text-muted-foreground text-justify">
            kadJeBus je proizvod ZeForge zajednice - grupe entuzijasta, programera i dizajnera iz
            Zenice koji dijele zajedničku viziju o tehnološki naprednijoj Bosni i Hercegovini. Naš
            tim čine volonteri različitih profila - od studenata do iskusnih profesionalaca - koji u
            slobodno vrijeme rade na projektima koji imaju direktan pozitivan uticaj na lokalnu
            zajednicu. Vjerujemo u snagu open source filozofije i otvorene saradnje, te pozivamo sve
            zainteresirane da se pridruže našim naporima kroz doprinose kodu, dizajnu ili testiranju
            aplikacije.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-1">Credits</h2>
          <p className="text-sm text-muted-foreground">
            Placeholder credits. Mention libraries, data sources, or contributors here.
          </p>
        </div>
      </section>
    </main>
  );
}
