import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "kadJeBus",
    short_name: "Busez",
    description: "Polasci između stanica",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#050202",
    theme_color: "#ffffff",
    icons: [
      { src: "/iconSmall.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/iconBig.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}