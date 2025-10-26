import React from "react";

export const metadata = {
  title: "About - kadJeBus",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto py-24 px-4">
      <h1 className="text-3xl font-bold mb-4">About</h1>
      <p className="text-muted-foreground mb-6">
        This is the about page for the kadJeBus project. Below are a few
        placeholders — replace as needed with real content.
      </p>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Our mission</h2>
          <p className="text-sm text-muted-foreground">Placeholder mission statement. Add a short paragraph describing the project.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Team</h2>
          <p className="text-sm text-muted-foreground">No team data available. Replace with names, roles, and links if you want.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Credits</h2>
          <p className="text-sm text-muted-foreground">Placeholder credits. Mention libraries, data sources, or contributors here.</p>
        </div>
      </section>
    </main>
  );
}
