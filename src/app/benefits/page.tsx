import type { Metadata } from "next";
import BenefitsPage from "@/components/benefits/BenefitsPage";

export const metadata: Metadata = {
  title: "Membership Benefits & Official Kit | HRSJM",
  description:
    "Discover HRSJM membership benefits: official appointment letters, photo ID cards, car stickers, legal training, and grassroots leadership authority.",
  keywords: [
    "HRSJM Membership Benefits",
    "Human Rights ID Card Benefits",
    "NGO Member Privileges India",
    "Appointment Letter NGO Kit",
    "Legal Advocacy Network India",
  ],
  alternates: {
    canonical: "/benefits",
  },
  openGraph: {
    title: "HRSJM Membership Benefits & Kit Privileges",
    description:
      "Explore the privileges, credentials, and legal backing provided to certified HRSJM members across India.",
    url: "https://hrsjm.org/benefits",
  },
};

export default function Page() {
  return <BenefitsPage />;
}
