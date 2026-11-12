import type { Metadata } from "next";
import MembershipRenewPage from "@/components/membership/renew/MembershipRenewPage";

export const metadata: Metadata = {
  title: "Renew Membership - Human Rights & Social Justice Mission",
  description:
    "Renew your HRSJM annual membership online. Verify your member credentials, renew your identity card and appointment validity, and continue active human rights work.",
  keywords: [
    "Renew HRSJM Membership",
    "NGO Member Renewal Online",
    "Human Rights Card Renewal",
    "Active Member Verification",
  ],
  alternates: {
    canonical: "/membership/renew",
  },
  openGraph: {
    title: "Renew Your HRSJM Membership Online",
    description:
      "Maintain your official rights advocate credentials and continue leading social change.",
    url: "https://hrsjm.org/membership/renew",
  },
};

export default function MembershipRenewRoute() {
  return <MembershipRenewPage />;
}
