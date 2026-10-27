import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactBreadcrumb from "@/components/contact/ContactBreadcrumb";
import ContactSection from "@/components/contact/ContactSection";
import ContactLocation from "@/components/contact/ContactLocation";
import ContactMap from "@/components/contact/ContactMap";
import ContactCTA from "@/components/contact/ContactCTA";

export const metadata: Metadata = {
  title: "Contact Us - Human Rights & Social Justice Mission (HRSJM) Office",
  description:
    "Contact the HRSJM National Head Office in Andheri East, Mumbai. Phone: +91 7021057853, Email: info@hrsjm.org. Reach out for membership enquiries, legal support, and partnerships.",
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
  openGraph: {
    title: "Contact HRSJM - National Head Office Mumbai",
    description:
      "Get in touch with the Human Rights & Social Justice Mission team for guidance, support, or partnership.",
    url: "https://hrsjm.org/contact",
  },
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