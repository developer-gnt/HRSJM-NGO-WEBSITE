import Image from "next/image";
import Link from "next/link";
import {
  Scale,
  GraduationCap,
  Users,
  Handshake,
  HeartPulse,
  Sprout,
  Globe,
  BookOpen,
  FileText,
  Landmark,
  UserCheck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import styles from "./aims.module.css";

function GoldDotIcon() {
  return (
    <svg
      className={styles.bulletIcon}
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.5" stroke="#d9a928" strokeWidth="2" />
      <circle cx="8" cy="8" r="2.8" fill="#d9a928" />
    </svg>
  );
}

const aimsCards = [
  {
    num: "01",
    title: "Human Rights & Legal Justice",
    icon: Scale,
    image: "/images/aims/legal_justice.jpg",
    alt: "Wooden gavel and law books in a courtroom",
    bullets: [
      "Promote human rights, civil rights and fundamental rights.",
      "Provide legal assistance and protection.",
      "Act as a bridge between the oppressed and concerned authorities.",
      "Support RTI and create awareness about rights.",
    ],
  },
  {
    num: "02",
    title: "Education & Youth Development",
    icon: GraduationCap,
    image: "/images/aims/education_youth.jpg",
    alt: "Indian schoolchildren walking towards school with backpacks",
    bullets: [
      "Provide opportunities for citizens to move forward with dignity.",
      "Restore extracurricular activities and sports.",
      "Establish schools and health centers.",
      "Train youth to face challenges and promote community sense.",
    ],
  },
  {
    num: "03",
    title: "Protection of Vulnerable Groups",
    icon: Users,
    image: "/images/aims/vulnerable_groups.jpg",
    alt: "Hands protecting a white paper cutout chain of family",
    bullets: [
      "Prevent human trafficking and slavery.",
      "Support women, children, senior citizens, minorities, workers and disabled persons.",
      "Eradicate child labor, violence and dowry.",
      "Provide counseling centers and support for domestic violence and family disputes.",
    ],
  },
  {
    num: "04",
    title: "Equality & Social Reform",
    icon: Handshake,
    image: "/images/aims/equality_social.jpg",
    alt: "Diverse young Indian citizens standing together united",
    bullets: [
      "Reduce gender inequalities and injustices.",
      "Promote equality, equity, brotherhood, non-violence, love and peace.",
      "Fight against corruption.",
      "Avoid compromising human rights for economic or political expediency.",
    ],
  },
  {
    num: "05",
    title: "Health & Community Welfare",
    icon: HeartPulse,
    image: "/images/aims/health_welfare.jpg",
    alt: "Medical assistance and healthcare support",
    bullets: [
      "Spread awareness about health care, food, housing and rehabilitation.",
      "Support refugees, indigenous people, AIDS patients, drug addicts and ageing people.",
      "Promote population control and environment protection.",
    ],
  },
  {
    num: "06",
    title: "Rural & Agricultural Development",
    icon: Sprout,
    image: "/images/aims/rural_agriculture.jpg",
    alt: "Hands tenderly planting a small green plant sapling in soil",
    bullets: [
      "Provide awareness to farmers, gardeners and rural communities.",
      "Establish counseling centers for training in farming, husbandry and plantation.",
      "Share knowledge and information through field experts.",
    ],
  },
  {
    num: "07",
    title: "Democracy, Peace & Environmental Protection",
    icon: Globe,
    image: "/images/aims/peace_environment.jpg",
    alt: "Planet earth and dove representing peace and environment",
    bullets: [
      "Uphold civil liberties and democratic way of life.",
      "Create awareness about environmental protection and ecological balance.",
      "Promote social harmony, international integration and non-violence.",
      "Ensure dignity and just rights for all.",
    ],
  },
  {
    num: "08",
    title: "Research & Publications",
    icon: BookOpen,
    image: "/images/aims/research_publications.png",
    alt: "Constitution book and research documentation",
    bullets: [
      "Publish books, monthly/yearly magazines, encyclopedias, journals and directories on human rights.",
      "Study and prepare reports on human rights violations.",
      "Organize seminars, programs and events to promote social harmony.",
    ],
  },
];

const rightsSubCategories = [
  {
    title: "Civil and Political Rights",
    icon: Landmark,
    text: "Right to Life, Liberty, Free Speech, Movement, Political thought, Religious practice, Fair Trial, Privacy, to raise a Family, to Vote.",
  },
  {
    title: "Economic, Social & Cultural Rights",
    icon: Users,
    text: "Adequate Food and Water, Health Care, Education, Clean Environment, Respect for Cultural Practices, Welfare Assistance.",
  },
  {
    title: "Humanitarian Rights",
    icon: Handshake,
    text: "Rights of those affected by armed conflict, prisoners of war, wounded, women and children; for necessary care and treatment.",
  },
  {
    title: "Rights of Categories of People",
    icon: UserCheck,
    text: "Worker's Rights, Women's Rights, Children's Rights, Minority groups, Refugees, Disabled.",
  },
];

export default function AimsAndObjectivesPage() {
  return (
    <div className={styles.page}>
      {/* ── 1. Hero Banner ────────────────────────────────────────── */}
      <section className={styles.hero} aria-label="Aims and Objectives header">
        <div className={styles.heroBgLayer}>
          <Image
            src="/images/aims/aims_hero.jpg"
            alt="Indian citizens holding hands in unity at dawn with the national flag"
            fill
            priority
            sizes="100vw"
            className={styles.heroBgImage}
          />
          <div className={styles.heroGradientOverlay} aria-hidden="true" />
        </div>

        <div className={styles.heroContainer}>
          <div className={styles.heroLayout}>
            <div className={styles.heroContent}>
              <div className={styles.heroEyebrowGroup}>
                <span className={styles.heroEyebrow}>ABOUT HRSJM</span>
                <span className={styles.heroEyebrowUnderline} aria-hidden="true" />
              </div>

              <h1 className={styles.heroHeading}>
                Our Aims <span className={styles.heroGold}>&amp;</span> Objectives
              </h1>

              <p className={styles.heroText}>
                Working towards a just, equal and dignified society for every
                individual in India.
              </p>

              <div className={styles.heroPills}>
                <span className={styles.pillBadge}>
                  <Scale size={15} className={styles.pillIcon} aria-hidden="true" />
                  Human Rights
                </span>
                <span className={styles.pillBadge}>
                  <Users size={15} className={styles.pillIcon} aria-hidden="true" />
                  Social Justice
                </span>
                <span className={styles.pillBadge}>
                  <ShieldCheck size={15} className={styles.pillIcon} aria-hidden="true" />
                  Equality
                </span>
                <span className={styles.pillBadge}>
                  <Sparkles size={15} className={styles.pillIcon} aria-hidden="true" />
                  Dignity
                </span>
              </div>
            </div>

            <div className={styles.heroSloganWrap} aria-hidden="true">
              <span>Human Rights</span>
              <span>Dignity</span>
              <span>Justice</span>
              <span>For All</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Our Commitment Section ─────────────────────────────── */}
      <section
        className={styles.commitmentSection}
        aria-labelledby="commitment-heading"
      >
        <div className={styles.container}>
          <div className={styles.commitmentGrid}>
            <div className={styles.commitmentImgWrap}>
              <Image
                src="/images/aims/our_commitment.jpg"
                alt="Diverse team hands stacked together in unity and mutual support"
                fill
                sizes="(min-width: 900px) 45vw, 100vw"
                className={styles.commitmentImg}
              />
            </div>

            <div className={styles.commitmentContent}>
              <h2 id="commitment-heading" className={styles.sectionHeading}>
                Our Commitment
              </h2>
              <div className={styles.sectionUnderline} aria-hidden="true" />
              <p className={styles.commitmentCopy}>
                At Human Rights and Social Justice Mission (HRSJM), we are
                committed to promoting justice, equality, human rights and dignity
                for every individual. Our aims and objectives guide our work
                towards building a fair, inclusive and humane society through
                awareness, education, advocacy, legal assistance and community
                development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Main Aims & Objectives Cards (01 to 08) ─────────────── */}
      <section
        className={styles.aimsCardsSection}
        aria-labelledby="all-aims-heading"
      >
        <div className={styles.container}>
          <h2 id="all-aims-heading" className={styles.sectionHeading}>
            Our Aims and Objectives
          </h2>
          <div className={styles.sectionUnderline} aria-hidden="true" />
          <p className={styles.sectionSubtext}>
            HRSJM works towards the following aims and objectives:
          </p>

          <div className={styles.aimsGridTwoCol}>
            {aimsCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.num} className={styles.aimCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.numBadge}>{card.num}</span>
                    <div className={styles.iconWrap} aria-hidden="true">
                      <Icon size={20} strokeWidth={1.9} />
                    </div>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardThumbnail}>
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
                        sizes="(min-width: 900px) 20vw, 40vw"
                        className={styles.cardImg}
                      />
                    </div>

                    <ul className={styles.bulletList} style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {card.bullets.map((bullet, idx) => (
                        <li key={idx} className={styles.bulletItem}>
                          <GoldDotIcon />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ── 4. Card 09: Understanding Our Rights ─────────────────── */}
          <article className={styles.rightsWideCard}>
            <div className={styles.rightsHeader}>
              <span className={styles.numBadge}>09</span>
              <div className={styles.iconWrap} aria-hidden="true">
                <FileText size={20} strokeWidth={1.9} />
              </div>
              <div className={styles.rightsHeaderText}>
                <h3 className={styles.cardTitle}>Understanding Our Rights</h3>
                <p className={styles.rightsSubtitle}>
                  To educate society about the concept of rights in the frame of
                  Constitution of India:
                </p>
              </div>
            </div>

            <div className={styles.rightsSubCardsGrid}>
              {rightsSubCategories.map((sub, idx) => {
                const SubIcon = sub.icon;
                return (
                  <div key={idx} className={styles.rightsSubCard}>
                    <div className={styles.subCardIconWrap} aria-hidden="true">
                      <SubIcon size={20} strokeWidth={2} />
                    </div>
                    <h4 className={styles.subCardTitle}>{sub.title}</h4>
                    <p className={styles.subCardText}>{sub.text}</p>
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </section>

      {/* ── 5. Call To Action Banner ──────────────────────────────── */}
      <section
        className={styles.ctaSection}
        aria-label="Join our mission call to action"
      >
        <div className={styles.ctaBgLayer}>
          <Image
            src="/images/aims/aims_hero.jpg"
            alt=""
            fill
            sizes="100vw"
            className={styles.ctaBgImage}
          />
        </div>

        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaHeading}>
            Together for a{" "}
            <span className={styles.ctaGold}>Just and Equal India</span>
          </h2>
          <p className={styles.ctaText}>
            HRSJM will continue to work with communities, individuals and
            institutions to promote human rights, social justice and dignity for
            all.
          </p>
          <Link href="/membership" className={styles.ctaButton}>
            <span>Join Our Mission</span>
            <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
