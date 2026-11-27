import { createOpenGraph, createTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import MembershipApplyPage from "@/components/membership/apply/MembershipApplyPage";

export const metadata: Metadata = {
  title: "Apply for Membership Online | HRSJM",
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
  openGraph: createOpenGraph({
    title: "Apply for Membership Online | HRSJM",
    description: "Apply online for official HRSJM membership. Simple 3-step application with instant verification, appointment letter, and official membership identity card.",
    urlPath: "/membership/apply",
    image: "/membership/membership-hero.png",
    imageAlt: "Apply for Membership Online | HRSJM",
  }),
  twitter: createTwitter({
    title: "Apply for Membership Online | HRSJM",
    description: "Apply online for official HRSJM membership. Simple 3-step application with instant verification, appointment letter, and official membership identity card.",
    image: "/membership/membership-hero.png",
  }),
};

export default function MembershipApplyRoute() {
  return <MembershipApplyPage />;
}
