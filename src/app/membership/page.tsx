import type { Metadata } from "next";
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
  title: "Join HRSJM Membership - Human Rights & Social Justice Mission India",
  description:
    "Become an active member of the Human Rights & Social Justice Mission (HRSJM). Receive official appointment letters, identity cards, and lead community advocacy across India.",
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
  openGraph: {
    title: "Join HRSJM Membership - Stand for Justice & Human Dignity",
    description:
      "Join thousands of active leaders and volunteers fighting for justice, constitutional rights, and public welfare nationwide.",
    url: "https://hrsjm.org/membership",
    images: [
      {
        url: "/membership/membership-hero.png",
        width: 1200,
        height: 630,
        alt: "HRSJM Membership Movement",
      },
    ],
  },
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
