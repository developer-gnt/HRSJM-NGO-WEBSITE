import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TestingPhaseModal from "@/components/ui/TestingPhaseModal";
import ScrollToTopOnNav from "@/components/layout/ScrollToTopOnNav";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import JsonLd from "@/components/seo/JsonLd";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hrsjm.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HRSJM | Human Rights & Social Justice Mission - Justice, Equality & Dignity for All",
    template: "%s | HRSJM",
  },
  description:
    "Human Rights & Social Justice Mission (HRSJM) is a registered nationwide NGO in India advocating for constitutional rights, legal aid, social justice, women empowerment, and public welfare.",
  keywords: [
    "Human Rights NGO India",
    "HRSJM",
    "Human Rights and Social Justice Mission",
    "Legal Aid NGO",
    "File Human Rights Complaint India",
    "Social Justice Organization",
    "NGO Membership India",
    "मानव अधिकार संगठन",
    "मानव अधिकार एवं सामाजिक न्याय मिशन",
  ],
  authors: [{ name: "Human Rights & Social Justice Mission", url: siteUrl }],
  creator: "Human Rights & Social Justice Mission",
  publisher: "HRSJM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "HRSJM - Human Rights & Social Justice Mission",
    title: "HRSJM | Human Rights & Social Justice Mission - Fighting for Justice, Equality & Dignity",
    description:
      "A nationwide non-governmental movement committed to protecting human rights, offering legal support, and uplifting communities across India.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Human Rights & Social Justice Mission Logo & Emblem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HRSJM | Human Rights & Social Justice Mission",
    description:
      "Nationwide NGO fighting for fundamental rights, equality, legal aid, and social dignity for every citizen.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Human Rights & Social Justice Mission",
  alternateName: ["HRSJM", "मानव अधिकार एवं सामाजिक न्याय मिशन"],
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/logo.png`,
  description:
    "Human Rights & Social Justice Mission is a nationwide organization working for human rights, dignity, equality, legal awareness, and social justice across India.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sir Mathuradas Vasanji Rd, Chimatpada, Marol Naka, Andheri East",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400059",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-7021057853",
    contactType: "Enquiry & Public Support",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <JsonLd schema={organizationSchema} />
      </head>
      <body suppressHydrationWarning>
        <ScrollToTopOnNav />
        <TestingPhaseModal />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
