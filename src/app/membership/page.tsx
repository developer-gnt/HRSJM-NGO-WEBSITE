import type { Metadata } from "next";
import { createOpenGraph, createTwitter } from "@/lib/seo";
import MembershipHero from "@/components/membership/MembershipHero";
import WhyMembership from "@/components/membership/WhyMembership";
import MembershipBenefits from "@/components/membership/MembershipBenefits";
import MembershipOptions from "@/components/membership/MembershipOptions";
import MembershipMovement from "@/components/membership/MembershipMovement";
import MembershipForm from "@/components/membership/MembershipForm";
import MembershipStories from "@/components/membership/MembershipStories";
import MembershipSupport from "@/components/membership/MembershipSupport";
import MembershipFAQ from "@/components/membership/MembershipFAQ";
import MembershipCTA from "@/components/membership/MembershipCTA";

export const metadata: Metadata = {
  title: "Join HRSJM Membership | Stand for Human Rights",
  description:
    "Join the Human Rights & Social Justice Mission (HRSJM). Receive official ID cards, appointment letters, and lead grassroots social justice across India.",
  keywords: [
    "Join HRSJM",
    "Human Rights Membership India",
    "NGO Member Registration",
    "Active Social Worker Membership",
    "Human Rights Volunteer India",
    "HRSJM Membership Benefits",
    "मानव अधिकार सदस्यता",
  ],
  alternates: {
    canonical: "/membership",
  },
  openGraph: createOpenGraph({
    title: "Join HRSJM Membership - Stand for Justice & Human Dignity",
    description:
      "Join thousands of active leaders and volunteers fighting for justice, constitutional rights, and public welfare nationwide.",
    urlPath: "/membership",
    image: "/membership/membership-hero.png",
    imageAlt: "HRSJM Membership Movement",
  }),
  twitter: createTwitter({
    title: "Join HRSJM Membership - Stand for Justice & Human Dignity",
    description:
      "Join thousands of active leaders and volunteers fighting for justice, constitutional rights, and public welfare nationwide.",
    image: "/membership/membership-hero.png",
  }),
};

export default function MembershipPage() {
  return (
    <main>
      <MembershipHero />
      <WhyMembership />
      <MembershipBenefits />
      <MembershipOptions />
      <MembershipMovement />
      <MembershipForm />
      <MembershipStories />
      <MembershipSupport />
      <MembershipFAQ />
      <MembershipCTA />
    </main>
  );
}
