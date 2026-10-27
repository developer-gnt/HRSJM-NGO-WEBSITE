import type { Metadata } from "next";
import ComplaintHero from "@/components/complaint/ComplaintHero";
import SupportOptions from "@/components/complaint/SupportOptions";
import ComplaintProcess from "@/components/complaint/ComplaintProcess";
import ComplaintForm from "@/components/complaint/ComplaintForm";
import AdditionalSupport from "@/components/complaint/AdditionalSupport";
import SupportedStories from "@/components/complaint/SupportedStories";
import ComplaintCTA from "@/components/complaint/ComplaintCTA";

export const metadata: Metadata = {
  title: "File a Human Rights Complaint Online | Get Help - HRSJM",
  description:
    "File a confidential human rights violation complaint with HRSJM. Get legal advice, community support, and constitutional advocacy for rights violations across India.",
  keywords: [
    "File Human Rights Complaint Online",
    "Human Rights Violation Complaint India",
    "Legal Aid Complaint Portal",
    "HRSJM Get Help",
    "Report Human Rights Abuse India",
    "Free Legal Advice Human Rights NGO",
    "मानव अधिकार शिकायत दर्ज करें",
  ],
  alternates: {
    canonical: "/complaint",
  },
  openGraph: {
    title: "File a Human Rights Complaint Online | HRSJM Legal Support",
    description:
      "Confidential, secure grievance portal for citizens facing human rights violations, social injustice, or police harassment across India.",
    url: "https://hrsjm.org/complaint",
  },
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
