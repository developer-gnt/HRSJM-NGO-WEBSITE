import type { Metadata } from "next";
import MembershipCategoriesPage from "@/components/membership/categories/MembershipCategoriesPage";

export const metadata: Metadata = {
  title: "Membership Categories, Posts & Fees | HRSJM India",
  description:
    "Explore HRSJM membership categories, qualification criteria, fees, validity, and kit details. Apply for District Active Member, State Unit Post, Letter Pad Post, or National Council.",
  keywords: [
    "HRSJM Membership Categories",
    "NGO Post Fees",
    "District Active Member NGO",
    "State Unit Post HRSJM",
    "Letter Pad Post NGO",
    "National Level NGO Post",
    "Human Rights ID Card Kit",
  ],
  alternates: {
    canonical: "/membership/categories",
  },
  openGraph: {
    title: "HRSJM Membership Categories & Leadership Posts",
    description:
      "Detailed fee structure, qualification requirements, and kit entitlements for district, state, and national posts in HRSJM.",
    url: "https://hrsjm.org/membership/categories",
  },
};

export default function MembershipCategoriesRoute() {
  return <MembershipCategoriesPage />;
}
