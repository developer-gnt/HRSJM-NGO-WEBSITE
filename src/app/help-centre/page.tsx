import type { Metadata } from "next";
import HelpCenterPage from "@/components/help/HelpCenterPage";

export const metadata: Metadata = {
  title: "Help Centre | Human Rights & Social Justice Mission",
  description:
    "Find answers, guides and resources to make your HRSJM membership journey simple and meaningful.",
};

export default function HelpCentreAliasPage() {
  return <HelpCenterPage />;
}
