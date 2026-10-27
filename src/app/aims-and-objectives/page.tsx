import type { Metadata } from "next";
import AimsAndObjectivesPage from "@/components/aims-and-objectives/AimsAndObjectivesPage";

export const metadata: Metadata = {
  title: "Aims & Objectives - Human Rights & Social Justice Mission (HRSJM)",
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
  openGraph: {
    title: "Aims & Objectives - HRSJM",
    description:
      "Our constitutional commitment to defending fundamental rights and advancing social equality for all citizens.",
    url: "https://hrsjm.org/aims-and-objectives",
  },
};

export default function AimsAndObjectivesRoute() {
  return <AimsAndObjectivesPage />;
}
