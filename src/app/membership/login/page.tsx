import type { Metadata } from "next";
import { createOpenGraph, createTwitter } from "@/lib/seo";
import MembershipLoginPage from "@/components/membership/login/MembershipLoginPage";

export const metadata: Metadata = {
  title: "Member Login - Human Rights & Social Justice Mission",
  description:
    "Secure member login and verification portal for HRSJM members. Access member records, digital ID, and official updates.",
  alternates: {
    canonical: "/membership/login",
  },
  openGraph: createOpenGraph({
    title: "Member Login - Human Rights & Social Justice Mission",
    description:
      "Secure member login and verification portal for HRSJM members. Access member records, digital ID, and official updates.",
    urlPath: "/membership/login",
    image: "/social-preview.jpg",
  }),
  twitter: createTwitter({
    title: "Member Login - Human Rights & Social Justice Mission",
    description:
      "Secure member login and verification portal for HRSJM members. Access member records, digital ID, and official updates.",
    image: "/social-preview.jpg",
  }),
};

export default function MembershipLoginRoute() {
  return <MembershipLoginPage />;
}
