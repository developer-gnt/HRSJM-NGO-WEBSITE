import type { Metadata } from "next";
import MembershipCategoriesPage from "@/components/membership/categories/MembershipCategoriesPage";

export const metadata: Metadata = {
  title: "Membership Categories - Human Rights & Social Justice Mission",
  description:
    "Explore HRSJM membership categories, qualifications, fees, validity, and kits. Choose from Active Membership, Letter Pad Post, and National Level Post.",
};

export default function MembershipCategoriesRoute() {
  return <MembershipCategoriesPage />;
}
