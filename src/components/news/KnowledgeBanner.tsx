"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollReveal, revealDelay } from "@/hooks/useScrollReveal";
import styles from "./news.module.css";

export default function KnowledgeBanner() {
  const sectionRef = useScrollReveal(styles);

  return (
    <section ref={sectionRef} className={styles.knowledge} aria-labelledby="knowledge-heading">
      <div className={styles.knowledgeInner}>
        <div className={styles.knowledgeMain}>
          <p className={styles.knowledgeEyebrow} data-reveal>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Insights for a Better Tomorrow
          </p>
          <h2 id="knowledge-heading" className={styles.knowledgeHeading} data-reveal style={revealDelay(1)}>
            Knowledge Empowers
            <br />
            People. People <span className={styles.knowledgeGold}>Create Change.</span>
          </h2>
          <p className={styles.knowledgeDesc} data-reveal style={revealDelay(2)}>
            Explore articles, legal guides, success stories and community
            updates to stay informed and be part of a fairer, more inclusive
            India.
          </p>
          <div className={styles.knowledgeAction} data-reveal style={revealDelay(3)}>
            <Link href="#latest-news" className={styles.btnGold}>
              Explore All Articles
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
