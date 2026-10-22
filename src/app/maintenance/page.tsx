import type { Metadata } from "next";
import MaintenancePage from "@/components/maintenance/MaintenancePage";

export const metadata: Metadata = {
  title: "Under Maintenance | We'll Be Right Back Shortly",
  description:
    "The HRSJM official portal is currently undergoing scheduled maintenance and system upgrades. We will be right back shortly.",
};

export default function MaintenanceRoute() {
  return <MaintenancePage />;
}
