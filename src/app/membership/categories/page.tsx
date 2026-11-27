import { createOpenGraph } from "@/lib/seo";
import type { Metadata } from "next";
import MembershipCategoriesPage from "@/components/membership/categories/MembershipCategoriesPage";

export const metadata: Metadata = {
  title: "Membership Categories, Posts & Fees | HRSJM India",
  description:
    "Explore HRSJM membership categories, fees, validity, and kit details for District Active Member, State Unit, Letter Pad, and National Council posts.",
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
  openGraph: createOpenGraph({
    title: "Membership Categories, Posts & Fees | HRSJM India",
    description: "Explore HRSJM membership categories, fees, validity, and kit details for District Active Member, State Unit, Letter Pad, and National Council posts.",
    urlPath: "/membership/categories",
    image: "/membership/membership-cta.png",
    imageAlt: "Membership Categories, Posts & Fees | HRSJM India",
  }),
};

export default function MembershipCategoriesRoute() {
  return <MembershipCategoriesPage />;
}
