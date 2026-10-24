import type { Metadata } from "next";
import HelpCenterPage from "@/components/help/HelpCenterPage";

export const metadata: Metadata = {
  title: "Help Centre | Human Rights & Social Justice Mission",
  description:
    "Find answers, guides and resources to make your HRSJM membership journey simple and meaningful. Explore topics, search FAQs, or get in touch with our support team.",
  keywords: [
    "HRSJM Help Centre",
    "Human Rights Support",
    "Membership FAQs",
    "Volunteering Help",
    "HRSJM Contact Support",
  ],
};

export default function Page() {
  return <HelpCenterPage />;
}
