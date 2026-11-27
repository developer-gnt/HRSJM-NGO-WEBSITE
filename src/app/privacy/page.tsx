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
  openGraph: {
    title: "Privacy Policy | Human Rights & Social Justice Mission",
    description:
      "Learn how HRSJM safeguards your personal data, membership records, and privacy.",
    url: "https://hrsjm.org/privacy",
  },
};

export default function PrivacyRoute() {
  return <PrivacyPolicyPage />;
}
