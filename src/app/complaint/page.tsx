import type { Metadata } from "next";
import ComplaintHero from "@/components/complaint/ComplaintHero";
import SupportOptions from "@/components/complaint/SupportOptions";
import ComplaintProcess from "@/components/complaint/ComplaintProcess";
import ComplaintForm from "@/components/complaint/ComplaintForm";
import AdditionalSupport from "@/components/complaint/AdditionalSupport";
import SupportedStories from "@/components/complaint/SupportedStories";
import ComplaintCTA from "@/components/complaint/ComplaintCTA";

export const metadata: Metadata = {
  title: "Complaint / Get Help",
  description:
    "Raise a concern with HRSJM — Human Rights & Social Justice Mission. If you or someone you know has faced a human rights violation or needs legal, social or community support, we are here to help. Your information is confidential and secure.",
};

export default function ComplaintPage() {
  return (
    <>
      <ComplaintHero />
      <SupportOptions />
      <ComplaintProcess />
      <ComplaintForm />
      <AdditionalSupport />
      <SupportedStories />
      <ComplaintCTA />
    </>
  );
}
