import { createOpenGraph } from "@/lib/seo";
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
  openGraph: createOpenGraph({
    title: "Renew Membership Online | HRSJM Official Portal",
    description: "Renew your HRSJM annual membership online. Verify your member credentials, renew your ID card and appointment validity, and continue active advocacy.",
    urlPath: "/membership/renew",
    image: "/membership/membership-hero.png",
    imageAlt: "Renew Membership Online | HRSJM Official Portal",
  }),
};

export default function MembershipRenewRoute() {
  return <MembershipRenewPage />;
}
