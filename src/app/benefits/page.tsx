import { createOpenGraph } from "@/lib/seo";
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
  openGraph: createOpenGraph({
    title: "Membership Benefits & Official Kit | HRSJM",
    description: "Discover HRSJM membership benefits: official appointment letters, photo ID cards, car stickers, legal training, and grassroots leadership authority.",
    urlPath: "/benefits",
    image: "/membership/membership-movement.png",
    imageAlt: "Membership Benefits & Official Kit | HRSJM",
  }),
};

export default function Page() {
  return <BenefitsPage />;
}
