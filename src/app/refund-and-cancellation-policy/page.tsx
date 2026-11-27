import { createOpenGraph, createTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import RefundPolicyPage from "@/components/refund-and-cancellation-policy/RefundPolicyPage";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | HRSJM",
  description:
    "Understand our official policies regarding donations, membership fees, cancellations, and refunds at Human Rights and Social Justice Mission (HRSJM).",
  alternates: {
    canonical: "/refund-and-cancellation-policy",
  },
  openGraph: createOpenGraph({
    title: "Refund & Cancellation Policy | HRSJM",
    description: "Understand our official policies regarding donations, membership fees, cancellations, and refunds at Human Rights and Social Justice Mission (HRSJM).",
    urlPath: "/refund-and-cancellation-policy",
    image: "/logo.png",
    imageAlt: "Refund & Cancellation Policy | HRSJM",
  }),
  twitter: createTwitter({
    title: "Refund & Cancellation Policy | HRSJM",
    description: "Understand our official policies regarding donations, membership fees, cancellations, and refunds at Human Rights and Social Justice Mission (HRSJM).",
    image: "/logo.png",
  }),
};

export default function RefundPolicyRoute() {
  return <RefundPolicyPage />;
}
