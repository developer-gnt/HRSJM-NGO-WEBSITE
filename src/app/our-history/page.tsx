import type { Metadata } from "next";
import OurHistoryPage from "@/components/our-history/OurHistoryPage";

export const metadata: Metadata = {
  title: "Our History - Since 2012 | Human Rights & Social Justice Mission",
  description:
    "Founded on 26 November 2012, discover the founding milestones, constitutional principles, and decade-long journey of the Human Rights & Social Justice Mission across India.",
  keywords: [
    "HRSJM History",
    "Human Rights NGO History India",
    "Founded 26 November 2012",
    "Social Justice Movement Milestones",
    "National Human Rights Mission Origin",
  ],
  alternates: {
    canonical: "/our-history",
  },
  openGraph: {
    title: "Our History - The Journey of HRSJM Since 2012",
    description:
      "From a grassroots initiative in 2012 to a nationwide human rights organization upholding justice and dignity.",
    url: "https://hrsjm.org/our-history",
  },
};

export default function Page() {
  return <OurHistoryPage />;
}
