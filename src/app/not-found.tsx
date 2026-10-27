import type { Metadata } from "next";
import NotFoundPage from "@/components/not-found/NotFoundPage";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for may have moved or no longer exists. Return to HRSJM - Human Rights & Social Justice Mission.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <NotFoundPage />;
}
