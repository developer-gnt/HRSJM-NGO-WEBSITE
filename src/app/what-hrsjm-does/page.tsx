import type { Metadata } from "next";
import WhatHRSJMDoesHero from "@/components/what-hrsjm-does/WhatHRSJMDoesHero";
import WhatHRSJMDoesWhatWeDo from "@/components/what-hrsjm-does/WhatHRSJMDoesWhatWeDo";
import WhatHRSJMDoesApproach from "@/components/what-hrsjm-does/WhatHRSJMDoesApproach";
import WhatHRSJMDoesCoreAreas from "@/components/what-hrsjm-does/WhatHRSJMDoesCoreAreas";
import WhatHRSJMDoesHowWeWork from "@/components/what-hrsjm-does/WhatHRSJMDoesHowWeWork";
import WhatHRSJMDoesImpact from "@/components/what-hrsjm-does/WhatHRSJMDoesImpact";
import WhatHRSJMDoesFinalCta from "@/components/what-hrsjm-does/WhatHRSJMDoesFinalCta";

export const metadata: Metadata = {
  title: "What HRSJM Does - Programs, Legal Aid, Advocacy & Social Impact",
  description:
    "Discover what the Human Rights & Social Justice Mission (HRSJM) does. From community legal aid clinics and survivor support to constitutional education and grassroots campaigns across India.",
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
  openGraph: {
    title: "What HRSJM Does - Direct Impact & Advocacy in Communities",
    description:
      "Explore the key intervention areas and grassroots legal defense programs executed by HRSJM nationwide.",
    url: "https://hrsjm.org/what-hrsjm-does",
  },
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
