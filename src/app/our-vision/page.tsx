import type { Metadata } from "next";
import OurVisionPage from "@/components/our-vision/OurVisionPage";

export const metadata: Metadata = {
  title: "Our Vision | A World of Love, Peace, Harmony, and Human Dignity",
  description:
    "The vision of the Human Rights & Social Justice Mission (HRSJM) is to transform hatred into love, conflict into understanding, discrimination into equality, and division into unity.",
};

export default function Page() {
  return <OurVisionPage />;
}
