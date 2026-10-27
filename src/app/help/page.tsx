import type { Metadata } from "next";
import HelpCenterPage from "@/components/help/HelpCenterPage";

export const metadata: Metadata = {
  title: "Help Centre & Support - Human Rights & Social Justice Mission",
  description:
    "Official Help Centre of HRSJM. Find guides, membership support, complaint tracking assistance, and direct helpline contact for citizens and members.",
  keywords: [
    "HRSJM Help Centre",
    "Human Rights Support India",
    "Membership FAQs",
    "HRSJM Complaint Assistance",
    "HRSJM Helpline",
  ],
  alternates: {
    canonical: "/help",
  },
  openGraph: {
    title: "HRSJM Help Centre & Support",
    description:
      "Find guides, FAQs, and support resources for your membership and rights enquiries.",
    url: "https://hrsjm.org/help",
  },
};

export default function Page() {
  return <HelpCenterPage />;
}
