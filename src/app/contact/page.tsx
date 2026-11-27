import { createOpenGraph } from "@/lib/seo";
import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactBreadcrumb from "@/components/contact/ContactBreadcrumb";
import ContactSection from "@/components/contact/ContactSection";
import ContactLocation from "@/components/contact/ContactLocation";
import ContactMap from "@/components/contact/ContactMap";
import ContactCTA from "@/components/contact/ContactCTA";

export const metadata: Metadata = {
  title: "Contact Us | National Head Office Mumbai - HRSJM",
  description:
    "Contact HRSJM National Head Office in Andheri East, Mumbai. Phone: +91 7021057853, Email: enquiry@hrsjm.org for legal support and membership enquiries.",
  keywords: [
    "Contact HRSJM",
    "Human Rights NGO Mumbai Address",
    "HRSJM Phone Number",
    "Human Rights Office Andheri East",
    "Social Justice Mission Contact",
    "HRSJM Email Helpline",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: createOpenGraph({
    title: "Contact Us | National Head Office Mumbai - HRSJM",
    description: "Contact HRSJM National Head Office in Andheri East, Mumbai. Phone: +91 7021057853, Email: enquiry@hrsjm.org for legal support and membership enquiries.",
    urlPath: "/contact",
    image: "/images/contact-hero-bg.jpg",
    imageAlt: "Contact Us | National Head Office Mumbai - HRSJM",
  }),
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactBreadcrumb />
      <ContactSection />
      <ContactLocation />
      <ContactMap />
      <ContactCTA />
    </>
  );
}