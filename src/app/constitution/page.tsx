import type { Metadata } from "next";
import ConstitutionPage from "@/components/constitution/ConstitutionPage";

export const metadata: Metadata = {
  title: "Our Constitution | Human Rights & Social Justice Mission",
  description:
    "The Constitution of the Human Rights and Social Justice Mission (HRSJM) serves as the foundational document defining our vision, governance, membership, and core principles.",
};

export default function ConstitutionRoute() {
  return <ConstitutionPage />;
}
