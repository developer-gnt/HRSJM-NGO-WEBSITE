import type { Metadata } from "next";
import MembershipRenewPage from "@/components/membership/renew/MembershipRenewPage";

export const metadata: Metadata = {
  title: "Renew Membership Online | HRSJM Official Portal",
  description:
    "Renew your HRSJM annual membership online. Verify your member credentials, renew your ID card and appointment validity, and continue active advocacy.",
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
