import Image from "next/image";
import Link from "next/link";
import {
  Scale,
  GraduationCap,
  Users,
  HeartPulse,
  ArrowRight,
} from "lucide-react";
import styles from "./aboutAims.module.css";

const aimsPreviewCards = [
  {
    id: "legal",
    title: "Human Rights & Legal Justice",
    description:
      "Promote human rights, civil rights and fundamental rights, provide legal assistance and create awareness.",
    icon: Scale,
    image: "/images/aims/legal_justice.jpg",
    alt: "Wooden judge gavel resting beside vintage law books on a table",
  },
  {
    id: "education",
    title: "Education & Youth Development",
    description:
      "Provide opportunities for education, restore extracurricular activities and sports, and empower youth for a better future.",
    icon: GraduationCap,
    image: "/images/aims/education_youth.jpg",
    alt: "Indian schoolchildren walking towards school with backpacks and open notebooks",
  },
  {
    id: "equality",
    title: "Equality & Protection for All",
    description:
      "Support women, children, senior citizens, minorities, workers and vulnerable groups for an inclusive and just society.",
    icon: Users,
    image: "/images/aims/vulnerable_groups.jpg",
    alt: "Human hands cupping and protecting a white paper cutout chain of a family",
  },
  {
    id: "community",
    title: "Community Welfare & Social Development",
    description:
      "Advance health awareness, rural development, environmental protection and social welfare for stronger communities.",
    icon: HeartPulse,
    image: "/images/aims/rural_agriculture.jpg",
    alt: "Hands tenderly planting a small green plant sapling in fertile soil",
  },
];

export default function AboutAimsSection() {
  return (
    <section
      id="aims-objectives"
      className={styles.aimsSection}
      aria-labelledby="aims-heading"
    >
      {/* Decorative Watermark: Target / Bullseye */}
      <svg
        className={styles.watermarkTarget}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="6" />
        <circle cx="100" cy="100" r="54" stroke="currentColor" strokeWidth="5" />
        <circle cx="100" cy="100" r="28" stroke="currentColor" strokeWidth="4" />
        <circle cx="100" cy="100" r="10" fill="currentColor" />
        <path
          d="M170 30L100 100M170 30L150 32M170 30L168 50"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Decorative Watermark: Community / People Silhouettes */}
      <svg
        className={styles.watermarkPeople}
        viewBox="0 0 240 180"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="24" />
        <path d="M10 160C10 120 30 100 50 100C70 100 90 120 90 160H10Z" />
        <circle cx="120" cy="40" r="28" />
        <path d="M72 160C72 110 95 90 120 90C145 90 168 110 168 160H72Z" />
        <circle cx="190" cy="50" r="24" />
        <path d="M150 160C150 120 170 100 190 100C210 100 230 120 230 160H150Z" />
      </svg>

      <div className={styles.container}>
        <div className={styles.aimsGrid}>
          {/* Left Column */}
          <div className={styles.aimsLeft}>
            <p className={styles.eyebrow}>OUR AIMS &amp; OBJECTIVES</p>
            <div className={styles.eyebrowUnderline} aria-hidden="true" />

            <h2 id="aims-heading" className={styles.heading}>
              Working Towards a
              <br />
              <span className={styles.goldText}>Just</span> and{" "}
              <span className={styles.goldText}>Equal Society</span>
            </h2>

            <p className={styles.description}>
              Our aims and objectives guide our work to promote human rights,
              dignity, equality and social justice through awareness, education,
              advocacy and community support.
            </p>

            <Link
              href="/aims-and-objectives"
              className={styles.exploreButton}
            >
              <span>Explore All Aims &amp; Objectives</span>
              <ArrowRight
                className={styles.exploreButtonIcon}
                size={17}
                strokeWidth={2.4}
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Right Column: 2x2 Cards Grid */}
          <div className={styles.cardsGrid}>
            {aimsPreviewCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.id} className={styles.aimCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrap} aria-hidden="true">
                      <Icon size={22} strokeWidth={1.85} />
                    </div>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                  </div>

                  <p className={styles.cardText}>{card.description}</p>

                  <div className={styles.cardImageWrap}>
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 600px) 45vw, 100vw"
                      className={styles.cardImage}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
