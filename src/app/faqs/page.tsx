import type { Metadata } from "next";
import FAQPage from "@/components/faqs/FAQPage";
import JsonLd from "@/components/seo/JsonLd";
import { faqCategories } from "@/components/faqs/faqData";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs) | HRSJM",
  description:
    "Get authoritative answers about the Human Rights & Social Justice Mission (HRSJM), fundamental rights in India, online membership, filing complaints, and 80G tax-exempt donations.",
  keywords: [
    "HRSJM FAQ",
    "Human rights questions India",
    "How to file human rights complaint",
    "How to join HRSJM NGO",
    "NGO donation 80G tax deduction FAQ",
  ],
  alternates: {
    canonical: "/faqs",
  },
};

export default function FAQsPage() {
  const allFaqs = faqCategories.flatMap((cat) => cat.items);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd schema={faqSchema} />
      <FAQPage />
    </>
  );
}
