import type { Metadata } from "next";
import RefundPolicyPage from "@/components/refund-and-cancellation-policy/RefundPolicyPage";

export const metadata: Metadata = {
  title: {
    absolute: "Refund & Cancellation Policy | HRSJM",
  },
  description:
    "Understand our policies regarding donations, membership fees, cancellations, and refunds at Human Rights and Social Justice Mission (HRSJM).",
};

export default function RefundPolicyRoute() {
  return <RefundPolicyPage />;
}
