import { createOpenGraph, createTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import WhatHRSJMDoesHero from "@/components/what-hrsjm-does/WhatHRSJMDoesHero";
import WhatHRSJMDoesWhatWeDo from "@/components/what-hrsjm-does/WhatHRSJMDoesWhatWeDo";
import WhatHRSJMDoesApproach from "@/components/what-hrsjm-does/WhatHRSJMDoesApproach";
import WhatHRSJMDoesCoreAreas from "@/components/what-hrsjm-does/WhatHRSJMDoesCoreAreas";
import WhatHRSJMDoesHowWeWork from "@/components/what-hrsjm-does/WhatHRSJMDoesHowWeWork";
import WhatHRSJMDoesImpact from "@/components/what-hrsjm-does/WhatHRSJMDoesImpact";
import WhatHRSJMDoesFinalCta from "@/components/what-hrsjm-does/WhatHRSJMDoesFinalCta";

export const metadata: Metadata = {
  title: "What We Do - Legal Aid, Programs & Advocacy | HRSJM",
  description:
    "Discover what HRSJM does: grassroots legal aid clinics, emergency relief, survivor support, and nationwide constitutional rights advocacy programs.",
  keywords: [
    "What HRSJM Does",
    "Human Rights Programs India",
    "Grassroots Legal Support NGO",
    "Human Rights Interventions India",
    "Community Advocacy Social Justice",
    "Free Legal Clinics India",
  ],
  alternates: {
    canonical: "/what-hrsjm-does",
  },
  openGraph: createOpenGraph({
    title: "What We Do - Legal Aid, Programs & Advocacy | HRSJM",
    description: "Discover what HRSJM does: grassroots legal aid clinics, emergency relief, survivor support, and nationwide constitutional rights advocacy programs.",
    urlPath: "/what-hrsjm-does",
    image: "/WHD-hero-bg.png",
    imageAlt: "What We Do - Legal Aid, Programs & Advocacy | HRSJM",
  }),
  twitter: createTwitter({
    title: "What We Do - Legal Aid, Programs & Advocacy | HRSJM",
    description: "Discover what HRSJM does: grassroots legal aid clinics, emergency relief, survivor support, and nationwide constitutional rights advocacy programs.",
    image: "/WHD-hero-bg.png",
  }),
};

export default function WhatHRSJMDoesPage() {
  return (
    <>
      <WhatHRSJMDoesHero />
      <WhatHRSJMDoesWhatWeDo />
      <WhatHRSJMDoesApproach />
      <WhatHRSJMDoesCoreAreas />
      <WhatHRSJMDoesHowWeWork />
      <WhatHRSJMDoesImpact />
      <WhatHRSJMDoesFinalCta />
    </>
  );
}
