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
  title: "Membership - Join Human Rights & Social Justice Mission",
  description:
    "Join HRSJM as a member to stand for human rights, participate in grassroots advocacy, and support social justice initiatives across India.",
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
