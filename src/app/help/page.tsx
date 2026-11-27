import { createOpenGraph } from "@/lib/seo";
import type { Metadata } from "next";
import HelpCenterPage from "@/components/help/HelpCenterPage";

export const metadata: Metadata = {
  title: "Help Centre & Support | HRSJM Citizen Helpline",
  description:
    "Official HRSJM Help Centre. Access member support, complaint tracking assistance, FAQs, and reach our dedicated human rights helpline across India.",
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
  openGraph: createOpenGraph({
    title: "Help Centre & Support | HRSJM Citizen Helpline",
    description: "Official HRSJM Help Centre. Access member support, complaint tracking assistance, FAQs, and reach our dedicated human rights helpline across India.",
    urlPath: "/help",
    image: "/images/contact-hero-bg.jpg",
    imageAlt: "Help Centre & Support | HRSJM Citizen Helpline",
  }),
};

export default function Page() {
  return <HelpCenterPage />;
}
