import type { Metadata } from "next";
import PrivacyPolicyPage from "@/components/privacy/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Human Rights & Social Justice Mission",
  description:
    "Learn how Human Rights and Social Justice Mission (HRSJM) collects, uses, protects, and safeguards your personal information.",
};

export default function PrivacyRoute() {
  return <PrivacyPolicyPage />;
}
