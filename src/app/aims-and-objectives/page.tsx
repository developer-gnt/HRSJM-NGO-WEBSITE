import { createOpenGraph } from "@/lib/seo";
import type { Metadata } from "next";
import AimsAndObjectivesPage from "@/components/aims-and-objectives/AimsAndObjectivesPage";

export const metadata: Metadata = {
  title: "Aims & Objectives | HRSJM Human Rights Mission",
  description:
    "Explore the constitutional aims, legal advocacy objectives, and social welfare goals of the Human Rights and Social Justice Mission (HRSJM) across India.",
  keywords: [
    "HRSJM Aims and Objectives",
    "Human Rights NGO Objectives India",
    "Constitutional Advocacy Goals",
    "Social Justice Mission Purpose",
    "Human Rights Goals India",
  ],
  alternates: {
    canonical: "/aims-and-objectives",
  },
  openGraph: createOpenGraph({
    title: "Aims & Objectives | HRSJM Human Rights Mission",
    description: "Explore the constitutional aims, legal advocacy objectives, and social welfare goals of the Human Rights and Social Justice Mission (HRSJM) across India.",
    urlPath: "/aims-and-objectives",
    image: "/images/aims/aims_hero.jpg",
    imageAlt: "Aims & Objectives | HRSJM Human Rights Mission",
  }),
};

export default function AimsAndObjectivesRoute() {
  return <AimsAndObjectivesPage />;
}
