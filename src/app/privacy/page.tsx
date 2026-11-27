import { createOpenGraph } from "@/lib/seo";
import type { Metadata } from "next";
import PrivacyPolicyPage from "@/components/privacy/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | HRSJM Official Website",
  description:
    "Learn how HRSJM protects your personal information, member records, and donation data under India's data protection laws. 100% secure and confidential.",
  keywords: [
    "HRSJM Privacy Policy",
    "NGO Data Protection India",
    "Member Privacy Terms",
    "Donation Security Policy",
    "Human Rights Data Confidentiality",
  ],
  alternates: {
    canonical: "/privacy",
  },
  openGraph: createOpenGraph({
    title: "Privacy Policy | HRSJM Official Website",
    description: "Learn how HRSJM protects your personal information, member records, and donation data under India",
    urlPath: "/privacy",
    image: "/logo.png",
    imageAlt: "Privacy Policy | HRSJM Official Website",
  }),
};

export default function PrivacyRoute() {
  return <PrivacyPolicyPage />;
}
