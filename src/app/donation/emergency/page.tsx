import type { Metadata } from "next";
import EmergencyPage from "@/components/emergency/EmergencyPage";

export const metadata: Metadata = {
  title: "Emergency & Humanitarian Assistance | HRSJM",
  description:
    "Support individuals and families facing urgent medical, educational, disaster-related and housing emergencies. Verified cases, transparent fund use, and real impact.",
};

export default function Page() {
  return <EmergencyPage />;
}
