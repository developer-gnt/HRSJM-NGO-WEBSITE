import type { Metadata } from "next";
import TermsPage from "@/components/terms/TermsPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | HRSJM Official Rules",
  description:
    "Review official Terms and Conditions governing HRSJM website usage, member registration, appointment validity, legal guidelines, and public donations.",
  keywords: [
    "HRSJM Terms and Conditions",
    "NGO Member Code of Conduct",
    "HRSJM Membership Terms",
    "Donation Policy India",
    "Human Rights Mission Rules",
  ],
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms & Conditions | Human Rights & Social Justice Mission",
    description:
      "Official terms governing membership, donations, and usage of the HRSJM platform.",
    url: "https://hrsjm.org/terms",
  },
};

export default function TermsRoute() {
  return <TermsPage />;
}
