import type { Metadata } from "next";
import MembershipApplyPage from "@/components/membership/apply/MembershipApplyPage";

export const metadata: Metadata = {
  title: "Apply for Membership - Human Rights & Social Justice Mission",
  description:
    "Apply online for HRSJM membership. Complete the 3-step application form with personal information, address details, and document upload.",
};

export default function MembershipApplyRoute() {
  return <MembershipApplyPage />;
}
