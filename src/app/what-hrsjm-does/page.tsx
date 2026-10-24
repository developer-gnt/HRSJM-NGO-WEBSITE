import type { Metadata } from "next";
import WhatHRSJMDoesHero from "@/components/what-hrsjm-does/WhatHRSJMDoesHero";
import WhatHRSJMDoesWhatWeDo from "@/components/what-hrsjm-does/WhatHRSJMDoesWhatWeDo";
import WhatHRSJMDoesApproach from "@/components/what-hrsjm-does/WhatHRSJMDoesApproach";
import WhatHRSJMDoesCoreAreas from "@/components/what-hrsjm-does/WhatHRSJMDoesCoreAreas";
import WhatHRSJMDoesHowWeWork from "@/components/what-hrsjm-does/WhatHRSJMDoesHowWeWork";
import WhatHRSJMDoesImpact from "@/components/what-hrsjm-does/WhatHRSJMDoesImpact";
import WhatHRSJMDoesFinalCta from "@/components/what-hrsjm-does/WhatHRSJMDoesFinalCta";

export const metadata: Metadata = {
  title: "What HRSJM Does",
  description:
    "HRSJM works on the ground to protect human rights, promote justice, empower communities and build a more equal and compassionate society.",
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
