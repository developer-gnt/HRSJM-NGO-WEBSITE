"use client";

import { useState } from "react";
import { Playfair_Display } from "next/font/google";
import AboutHero from "./AboutHero";
import WhoWeAre from "./WhoWeAre";
import MissionVision from "./MissionVision";
import ValuesAndLeadership from "./ValuesAndLeadership";
import MovementCTA from "./MovementCTA";
import StoryModal from "./StoryModal";
import LeadershipModal from "./LeadershipModal";
import JoinModal from "./JoinModal";
import { leadershipMembers } from "./aboutData";
import type { LeadershipMember } from "./aboutData";
import styles from "./about.module.css";

// Reference typography uses Playfair Display; loaded here (page-scoped)
// because the shared layout.tsx must not be modified.
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export default function AboutPage() {
  const [storyOpen, setStoryOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<LeadershipMember | null>(
    null
  );

  return (
    <div className={`${styles.page} ${playfair.variable}`}>
      <div className={styles.pageMain}>
        {/* 1. Hero section */}
        <AboutHero />

        {/* 2. Who We Are & sub-navigation */}
        <WhoWeAre onOpenStory={() => setStoryOpen(true)} />

        {/* 3. Mission & Vision */}
        <MissionVision />

        {/* 4. Values, Principles & Leadership */}
        <ValuesAndLeadership
          onSelectMember={(member) => setSelectedLeader(member)}
          onOpenAllLeadership={() => setSelectedLeader(leadershipMembers[0])}
        />

        {/* 5. Movement CTA */}
        <MovementCTA onOpenJoin={() => setJoinOpen(true)} />
      </div>

      {/* Interactive modals */}
      <StoryModal
        isOpen={storyOpen}
        onClose={() => setStoryOpen(false)}
        onOpenJoin={() => {
          setStoryOpen(false);
          setJoinOpen(true);
        }}
      />

      <LeadershipModal
        member={selectedLeader}
        onClose={() => setSelectedLeader(null)}
      />

      <JoinModal isOpen={joinOpen} onClose={() => setJoinOpen(false)} />
    </div>
  );
}
