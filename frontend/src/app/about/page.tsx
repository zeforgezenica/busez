import React from "react";

export const metadata = {
  title: "About - kadJeBus",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto py-24 px-4">
      <h1 className="text-2xl font-bold mb-1 ">About</h1>
      <p className="text-sm text-muted-foreground mb-6 text-justify">
        kadJeBus is a modern web application developed with the goal of making the daily lives of
        Zenica citizens easier by providing quick and simple access to information about the city's
        public transportation.
      </p>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">Our mission</h2>
          <p className="text-sm text-muted-foreground text-justify">
            Our mission is to digitalize and modernize the public transportation system in Zenica,
            making it more accessible to all citizens. We believe that everyone has the right to
            accurate and up-to-date information about bus lines, schedules, and stops. Through the
            kadJeBus application, we strive to reduce waiting times, improve travel planning, and
            contribute to more environmentally conscious use of public transportation. Our goal is
            to create a platform that will serve as a reliable daily tool for all public transport
            users in the city.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-1">Team</h2>
          <p className="text-sm text-muted-foreground text-justify">
            kadJeBus is a product of the ZeForge community - a group of enthusiasts, programmers,
            and designers from Zenica who share a common vision of a more technologically advanced
            Bosnia and Herzegovina. Our team consists of volunteers from various backgrounds - from
            students to experienced professionals - who work in their free time on projects that
            have a direct positive impact on the local community. We believe in the power of open
            source philosophy and open collaboration, and we invite all interested parties to join
            our efforts by contributing to code, design, or application testing.
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
