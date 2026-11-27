import { createOpenGraph } from "@/lib/seo";
import type { Metadata } from "next";
import OurVisionPage from "@/components/our-vision/OurVisionPage";

export const metadata: Metadata = {
  title: "Our Vision - Peace, Equality & Human Dignity | HRSJM",
  description:
    "HRSJM envisions transforming discrimination into equality, conflict into harmony, and protecting fundamental constitutional dignity for every citizen.",
  keywords: [
    "HRSJM Vision",
    "Human Rights Vision India",
    "Social Justice Mission Philosophy",
    "Equality and Peace NGO",
    "Human Dignity Movement",
  ],
  alternates: {
    canonical: "/our-vision",
  },
  openGraph: createOpenGraph({
    title: "Our Vision - Peace, Equality & Human Dignity | HRSJM",
    description: "HRSJM envisions transforming discrimination into equality, conflict into harmony, and protecting fundamental constitutional dignity for every citizen.",
    urlPath: "/our-vision",
    image: "/logo.png",
    imageAlt: "Our Vision - Peace, Equality & Human Dignity | HRSJM",
  }),
};

export default function Page() {
  return <OurVisionPage />;
}
