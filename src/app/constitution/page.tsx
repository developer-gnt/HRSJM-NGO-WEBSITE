import type { Metadata } from "next";
import ConstitutionPage from "@/components/constitution/ConstitutionPage";

export const metadata: Metadata = {
  title: "HRSJM Constitution & Governance By-Laws | Official Document",
  description:
    "Read the official Constitution of the Human Rights and Social Justice Mission (HRSJM). Understand our legal framework, governance bylaws, code of conduct, and democratic structure.",
  keywords: [
    "HRSJM Constitution",
    "NGO Governance Bylaws India",
    "Human Rights Mission Rules",
    "HRSJM Code of Conduct",
    "NGO Legal Framework",
  ],
  alternates: {
    canonical: "/constitution",
  },
  openGraph: {
    title: "Constitution & Governance Bylaws | HRSJM",
    description:
      "The foundational governance document defining the vision, operational structure, and ethical principles of HRSJM.",
    url: "https://hrsjm.org/constitution",
  },
};

export default function ConstitutionRoute() {
  return <ConstitutionPage />;
}
