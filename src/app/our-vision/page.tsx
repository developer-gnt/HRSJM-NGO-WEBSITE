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
  openGraph: {
    title: "Our Vision - Human Rights & Social Justice Mission",
    description:
      "Transforming conflict into harmony and upholding dignity for all human beings across India.",
    url: "https://hrsjm.org/our-vision",
  },
};

export default function Page() {
  return <OurVisionPage />;
}
