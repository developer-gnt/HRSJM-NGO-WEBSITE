import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About Us - Human Rights & Social Justice Mission (HRSJM) | India",
  description:
    "Learn about HRSJM (Human Rights & Social Justice Mission), established in 2012 to champion fundamental constitutional rights, free legal assistance, social justice, and citizen empowerment across India.",
  keywords: [
    "About HRSJM",
    "Human Rights NGO Profile",
    "Social Justice Mission India",
    "Human Rights Movement Mumbai",
    "Constitutional Rights NGO India",
    "National NGO for Equality",
    "मानव अधिकार मिशन",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us - Human Rights & Social Justice Mission (HRSJM)",
    description:
      "Discover the founding history, core leadership, and nationwide mission of HRSJM, defending dignity and equality for every citizen.",
    url: "https://hrsjm.org/about",
  },
};

export default function About() {
  return <AboutPage />;
}
