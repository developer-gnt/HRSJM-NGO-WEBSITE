import type { Metadata } from "next";
import BenefitsPage from "@/components/benefits/BenefitsPage";

export const metadata: Metadata = {
  title: "Membership Benefits | Human Rights & Social Justice Mission",
  description:
    "Discover the benefits of joining HRSJM. Learn, contribute, connect and be part of a larger movement for human rights, equality and social justice.",
};

export default function MembershipBenefitsAliasPage() {
  return <BenefitsPage />;
}
