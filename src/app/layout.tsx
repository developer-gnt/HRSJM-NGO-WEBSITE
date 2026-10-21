import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TestingPhaseModal from "@/components/ui/TestingPhaseModal";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "HRSJM | Human Rights & Social Justice Mission",
    template: "%s | HRSJM",
  },
  description: "Human Rights & Social Justice Mission",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <TestingPhaseModal />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
