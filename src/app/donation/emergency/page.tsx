import type { Metadata } from "next";
import EmergencyPage from "@/components/emergency/EmergencyPage";

export const metadata: Metadata = {
  title: "Emergency & Humanitarian Assistance Relief Fund | HRSJM",
  description:
    "Donate to the HRSJM Emergency Relief Fund. Support urgent medical crises, disaster-affected families, children education emergencies, and immediate legal defense with 100% transparent fund use.",
  keywords: [
    "Emergency Relief Fund NGO",
    "Humanitarian Assistance India",
    "Medical Emergency NGO Support",
    "Disaster Relief Donation India",
    "HRSJM Emergency Fund",
  ],
  alternates: {
    canonical: "/donation/emergency",
  },
  openGraph: {
    title: "Emergency & Humanitarian Assistance Fund | HRSJM",
    description:
      "Direct emergency assistance for citizens in severe distress. Transparent and verified humanitarian relief.",
    url: "https://hrsjm.org/donation/emergency",
  },
};

export default function Page() {
  return <EmergencyPage />;
}
