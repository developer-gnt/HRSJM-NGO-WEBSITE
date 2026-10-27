import type { Metadata } from "next";
import MembershipApplyPage from "@/components/membership/apply/MembershipApplyPage";

export const metadata: Metadata = {
  title: "Apply for Membership Online | Human Rights & Social Justice Mission",
  description:
    "Apply online for official HRSJM membership. Simple 3-step application with instant verification, appointment letter, and official membership identity card.",
  keywords: [
    "Apply for HRSJM Membership",
    "Online NGO Membership Application",
    "Human Rights Card Application",
    "Join Human Rights Mission Online",
    "NGO Member Form India",
  ],
  alternates: {
    canonical: "/membership/apply",
  },
  openGraph: {
    title: "Apply Online for HRSJM Membership",
    description:
      "Join the nationwide human rights movement today. Submit your online membership application.",
    url: "https://hrsjm.org/membership/apply",
  },
};

export default function MembershipApplyRoute() {
  return <MembershipApplyPage />;
}
