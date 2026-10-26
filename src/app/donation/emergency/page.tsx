import type { Metadata } from "next";
import EmergencyPage from "@/components/emergency/EmergencyPage";

export const metadata: Metadata = {
  title: "Explore Emergency Cases | Human Rights & Social Justice Mission",
  description:
    "Browse verified emergency cases and support people who need urgent medical, educational, disaster relief and rehabilitation help. Verified by HRSJM.",
};

export default function Page() {
  return <EmergencyPage />;
}
