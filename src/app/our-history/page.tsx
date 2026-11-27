import { createOpenGraph, createTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import OurHistoryPage from "@/components/our-history/OurHistoryPage";

export const metadata: Metadata = {
  title: "Our History - Journey Since 2012 | HRSJM",
  description:
    "Founded on 26 November 2012, discover the founding milestones, constitutional principles, and decade-long human rights journey of HRSJM across India.",
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
  openGraph: createOpenGraph({
    title: "Our History - Journey Since 2012 | HRSJM",
    description: "Founded on 26 November 2012, discover the founding milestones, constitutional principles, and decade-long human rights journey of HRSJM across India.",
    urlPath: "/our-history",
    image: "/logo.png",
    imageAlt: "Our History - Journey Since 2012 | HRSJM",
  }),
  twitter: createTwitter({
    title: "Our History - Journey Since 2012 | HRSJM",
    description: "Founded on 26 November 2012, discover the founding milestones, constitutional principles, and decade-long human rights journey of HRSJM across India.",
    image: "/logo.png",
  }),
};

export default function Page() {
  return <OurHistoryPage />;
}
