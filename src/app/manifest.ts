import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Human Rights & Social Justice Mission (HRSJM)",
    short_name: "HRSJM",
    description:
      "Working for human rights, dignity, equality, legal aid, and social justice across India.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F0",
    theme_color: "#011F39",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
