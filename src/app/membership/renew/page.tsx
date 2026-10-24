import type { Metadata } from "next";
import MembershipRenewPage from "@/components/membership/renew/MembershipRenewPage";

export const metadata: Metadata = {
  title: "Renew Membership - Human Rights & Social Justice Mission",
  description:
    "Renew your HRSJM annual membership. Select your renewal tier, verify member status, and maintain active rights advocate credentials.",
};

export default function MembershipRenewRoute() {
  return <MembershipRenewPage />;
}
