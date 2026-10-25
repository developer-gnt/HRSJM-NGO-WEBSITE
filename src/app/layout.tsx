import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TestingPhaseModal from "@/components/ui/TestingPhaseModal";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hrsjm.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HRSJM | Human Rights & Social Justice Mission",
    template: "%s | HRSJM",
  },
  description: "Human Rights & Social Justice Mission",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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
