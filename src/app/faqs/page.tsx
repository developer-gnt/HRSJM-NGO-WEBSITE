import type { Metadata } from "next";
import FAQPage from "@/components/faqs/FAQPage";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about HRSJM, your rights, membership, filing a complaint and making a donation.",
};

export default function FAQsPage() {
  return <FAQPage />;
}
