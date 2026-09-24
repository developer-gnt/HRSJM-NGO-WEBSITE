import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactBreadcrumb from "@/components/contact/ContactBreadcrumb";
import ContactSection from "@/components/contact/ContactSection";
import ContactLocation from "@/components/contact/ContactLocation";
import ContactMap from "@/components/contact/ContactMap";
import ContactCTA from "@/components/contact/ContactCTA";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with HRSJM — Human Rights & Social Justice Mission. Reach out to learn more about our work, partnership opportunities or how you can make a difference.",
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