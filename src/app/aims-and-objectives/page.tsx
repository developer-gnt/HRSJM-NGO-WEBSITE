import type { Metadata } from "next";
import AimsAndObjectivesPage from "@/components/aims-and-objectives/AimsAndObjectivesPage";

export const metadata: Metadata = {
  title: {
    absolute: "Our Aims & Objectives | HRSJM",
  },
  description:
    "Explore the aims and objectives of Human Rights and Social Justice Mission (HRSJM) working towards a just, equal and dignified society for every individual in India.",
};

export default function AimsAndObjectivesRoute() {
  return <AimsAndObjectivesPage />;
}
