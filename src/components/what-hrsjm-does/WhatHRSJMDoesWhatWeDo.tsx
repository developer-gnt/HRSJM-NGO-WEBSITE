"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Icon from "@/components/ui/Icon";
import styles from "./what-hrsjm-does.module.css";

interface ProgramPillar {
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  alt: string;
  description: string;
  highlights: string[];
  link: string;
}

const programPillars: ProgramPillar[] = [
  {
    title: "Human Rights",
    subtitle: "Monitoring & Advocacy",
    tag: "Defense & Safeguard",
    image: "/card-1.png",
    alt: "HRSJM volunteers supporting community members and documenting human rights concerns",
    description:
      "Actively documenting violations, providing legal protection, and safeguarding civil liberties for vulnerable and marginalized individuals.",
    highlights: [
      "Fact-finding & violation reporting",
      "Immediate crisis intervention",
      "Safeguarding fundamental liberties",
    ],
    link: "/rights",
  },
  {
    title: "Legal Awareness",
    subtitle: "& Policy Support",
    tag: "Education & Literacy",
    image: "/card-2.png",
    alt: "Community legal awareness session explaining rights and entitlements",
    description:
      "Empowering citizens through legal literacy workshops, constitutional rights seminars, and grassroots guidance on rights and remedies.",
    highlights: [
      "Community legal literacy camps",
      "Simplified constitutional guides",
      "Policy research & PIL support",
    ],
    link: "/constitution",
  },
  {
    title: "Community Organising",
    subtitle: "Grassroots Action",
    tag: "Empowerment & Unity",
    image: "/card-3.png",
    alt: "Neighbours gathering outdoors to organise a local community initiative",
    description:
      "Building solidarity through local village and urban committees, enabling citizens to voice their concerns and lead civic initiatives.",
    highlights: [
      "Local rights & welfare committees",
      "Collective civic empowerment",
      "Peaceful community-led action",
    ],
    link: "/membership",
  },
  {
    title: "Training & Leadership",
    subtitle: "Capacity Building",
    tag: "Youth & Defending",
    image: "/card-4.png",
    alt: "Participants collaborating during an HRSJM leadership training workshop",
    description:
      "Mentoring emerging human rights defenders, paralegals, and youth leaders to champion justice in their own localities.",
    highlights: [
      "Human Rights Defender workshops",
      "Paralegal skills & grievance redressal",
      "Youth leadership for social change",
    ],
    link: "/our-vision",
  },
];

const workDomains = [
  "Legal Aid & Support",
  "Awareness & Education",
  "Community Development",
  "Research & Policy",
  "Advocacy & Campaigns",
  "Crisis Support",
];

export default function WhatHRSJMDoesWhatWeDo() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add(styles.revealed);
      return;
    }
    node.classList.add(styles.armed);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.classList.add(styles.revealed);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      className={styles.whatWeDoSection}
      aria-labelledby="what-we-do-page-heading"
    >
      <div className={styles.whatWeDoInner}>
        {/* Section Header */}
        <div className={styles.whatWeDoHeader}>
          <p className={styles.whatWeDoEyebrow}>
            <span className={styles.whatWeDoEyebrowDot} aria-hidden="true" />
            What We Do
          </p>

          <h2 id="what-we-do-page-heading" className={styles.whatWeDoHeading}>
            Protecting Rights. Empowering Lives.
            <span className={styles.whatWeDoHeadingLine}>Building Justice Together.</span>
          </h2>

          <p className={styles.whatWeDoDescription}>
            We work on the ground across India through human rights monitoring, legal awareness,
            community organising, and leadership development to turn constitutional guarantees into
            lived realities.
          </p>
        </div>

        {/* 4 Program Cards Grid */}
        <div className={styles.whatWeDoGrid} role="list" aria-label="Our Core Programs">
          {programPillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={styles.whatWeDoCard}
              style={{ "--stagger": index } as CSSProperties}
              role="listitem"
            >
              {/* Card Media */}
              <div className={styles.whatWeDoCardMedia}>
                <Image
                  src={pillar.image}
                  alt={pillar.alt}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  className={styles.whatWeDoCardImg}
                />
                <span className={styles.whatWeDoCardBadge}>{pillar.tag}</span>
              </div>

              {/* Card Content */}
              <div className={styles.whatWeDoCardBody}>
                <div className={styles.whatWeDoCardHead}>
                  <h3 className={styles.whatWeDoCardTitle}>{pillar.title}</h3>
                  <span className={styles.whatWeDoCardSubtitle}>{pillar.subtitle}</span>
                </div>

                <p className={styles.whatWeDoCardText}>{pillar.description}</p>

                {/* Highlights List */}
                <ul className={styles.whatWeDoHighlights} aria-label={`${pillar.title} key highlights`}>
                  {pillar.highlights.map((item) => (
                    <li key={item} className={styles.whatWeDoHighlightItem}>
                      <CheckCircle2 size={15} className={styles.whatWeDoHighlightIcon} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Link */}
                <Link href={pillar.link} className={styles.whatWeDoCardCta}>
                  <span>Explore Program</span>
                  <ArrowRight size={15} className={styles.whatWeDoCardCtaArrow} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Work Domains Callout Strip */}
        <div className={styles.whatWeDoDomainsStrip}>
          <div className={styles.whatWeDoDomainsIntro}>
            <span className={styles.whatWeDoDomainsTag}>Active Domains</span>
            <h4 className={styles.whatWeDoDomainsTitle}>Key Action Sectors</h4>
          </div>

          <div className={styles.whatWeDoDomainsList} aria-label="HRSJM operational sectors">
            {workDomains.map((domain) => (
              <span key={domain} className={styles.whatWeDoDomainPill}>
                <span className={styles.domainDot} aria-hidden="true" />
                {domain}
              </span>
            ))}
          </div>

          <Link href="/complaint" className={styles.whatWeDoDomainsBtn}>
            <span>Request Assistance</span>
            <Icon name="arrow" width={14} height={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
