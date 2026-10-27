import type { Metadata } from "next";
import PresidentPage from "@/components/president/PresidentPage";

export const metadata: Metadata = {
  title: "How to Become a District / State President - Leadership in HRSJM",
  description:
    "Take leadership with the Human Rights & Social Justice Mission (HRSJM). Learn the step-by-step appointment process, build a 25-member unit, and lead human rights in your district or state.",
  keywords: [
    "How to Become a District President NGO",
    "HRSJM State President Appointment",
    "NGO Leadership Roles India",
    "District President Human Rights Mission",
    "Join HRSJM Leadership Team",
    "25 Member NGO Unit India",
  ],
  alternates: {
    canonical: "/how-to-become-a-district-and-state-president",
  },
  openGraph: {
    title: "How to Become a District / State President | HRSJM",
    description:
      "Form a dedicated 25-member unit and take official leadership for human rights, equality, and public welfare in your district or state.",
    url: "https://hrsjm.org/how-to-become-a-district-and-state-president",
    images: [
      {
        url: "/president-hero-full.jpg",
        width: 1024,
        height: 576,
        alt: "HRSJM District and State President Leadership",
      },
    ],
  },
};

export default function Page() {
  return <PresidentPage />;
}
