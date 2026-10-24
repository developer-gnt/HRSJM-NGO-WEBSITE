import type { Metadata } from "next";
import OurHistoryPage from "@/components/our-history/OurHistoryPage";

export const metadata: Metadata = {
  title: "Our History | Human Rights & Social Justice Mission (HRSJM)",
  description:
    "Established on 26 November 2012, the Human Rights & Social Justice Mission (HRSJM) has journeyed from a vision of humanity to a growing nationwide movement for justice, equality, and dignity.",
};

export default function Page() {
  return <OurHistoryPage />;
}
