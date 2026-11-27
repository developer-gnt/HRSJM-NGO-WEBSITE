import { createOpenGraph, createTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import ConstitutionPage from "@/components/constitution/ConstitutionPage";

export const metadata: Metadata = {
  title: "Constitution & Governance Bylaws | HRSJM",
  description:
    "Read the official Constitution of HRSJM. Learn our legal framework, governance bylaws, code of conduct, and democratic structure upholding human rights.",
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
  openGraph: createOpenGraph({
    title: "Constitution & Governance Bylaws | HRSJM",
    description: "Read the official Constitution of HRSJM. Learn our legal framework, governance bylaws, code of conduct, and democratic structure upholding human rights.",
    urlPath: "/constitution",
    image: "/assets/terms_hero.png",
    imageAlt: "Constitution & Governance Bylaws | HRSJM",
  }),
  twitter: createTwitter({
    title: "Constitution & Governance Bylaws | HRSJM",
    description: "Read the official Constitution of HRSJM. Learn our legal framework, governance bylaws, code of conduct, and democratic structure upholding human rights.",
    image: "/assets/terms_hero.png",
  }),
};

export default function ConstitutionRoute() {
  return <ConstitutionPage />;
}
