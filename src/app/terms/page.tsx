import type { Metadata } from "next";
import TermsPage from "@/components/terms/TermsPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | Human Rights & Social Justice Mission",
  description:
    "Review the Terms and Conditions governing your use of the Human Rights and Social Justice Mission (HRSJM) website, membership, and services.",
};

export default function TermsRoute() {
  return <TermsPage />;
}
