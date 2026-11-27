import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";
import { createOpenGraph, createTwitter } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us | Human Rights & Social Justice Mission",
  description:
    "Established in 2012, HRSJM champions constitutional rights, free legal aid, social justice, and citizen empowerment across India. Learn our story.",
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
  openGraph: createOpenGraph({
    title: "About Us | Human Rights & Social Justice Mission",
    description:
      "Discover the founding history, core leadership, and nationwide mission of HRSJM, defending dignity and equality for every citizen.",
    urlPath: "/about",
    image: "/logo.png",
    imageAlt: "About HRSJM - Human Rights & Social Justice Mission",
  }),
  twitter: createTwitter({
    title: "About Us | Human Rights & Social Justice Mission",
    description: "Discover the founding history, core leadership, and nationwide mission of HRSJM, defending dignity and equality for every citizen.",
    image: "/logo.png",
  }),
};

export default function About() {
  return <AboutPage />;
}
