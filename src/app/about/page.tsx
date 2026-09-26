import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About HRSJM",
  description:
    "Human Rights & Social Justice Mission (HRSJM) is a democratic network committed to human rights at national and regional levels.",
};

export default function About() {
  return <AboutPage />;
}
