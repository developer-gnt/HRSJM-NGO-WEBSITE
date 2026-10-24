import type { Metadata } from "next";
import MembershipLoginPage from "@/components/membership/login/MembershipLoginPage";

export const metadata: Metadata = {
  title: "Member Login - Human Rights & Social Justice Mission",
  description:
    "Secure member login and verification portal for HRSJM members. Access member records, digital ID, and official updates.",
};

export default function MembershipLoginRoute() {
  return <MembershipLoginPage />;
}
