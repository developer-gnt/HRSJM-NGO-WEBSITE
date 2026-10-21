import {
  Users,
  Megaphone,
  GraduationCap,
  HeartHandshake,
  FileText,
  UsersRound,
  ArrowRight,
} from "lucide-react";
import styles from "./benefits.module.css";

interface BenefitCardData {
  id: string;
  title: string;
  description: string;
  icon: typeof Users;
}

const benefitCards: BenefitCardData[] = [
  {
    id: "movement",
    title: "Be Part of a Larger Movement",
    description:
      "Join a community of individuals who believe in human rights, equality and social justice.",
    icon: Users,
  },
  {
    id: "informed",
    title: "Stay Informed",
    description:
      "Receive updates on our initiatives, campaigns, events and important developments.",
    icon: Megaphone,
  },
  {
    id: "learning",
    title: "Access Learning Opportunities",
    description:
      "Take part in workshops, discussions and knowledge-sharing sessions on key human rights issues.",
    icon: GraduationCap,
  },
  {
    id: "activities",
    title: "Get Involved in Activities",
    description:
      "Participate in campaigns, events and community programs that make a difference.",
    icon: HeartHandshake,
  },
  {
    id: "change",
    title: "Contribute to Real Change",
    description:
      "Support programs and advocacy efforts that create positive and lasting impact.",
    icon: FileText,
  },
  {
    id: "connections",
    title: "Build Meaningful Connections",
    description:
      "Network with like-minded individuals, experts and community leaders.",
    icon: UsersRound,
  },
];

export default function KeyBenefits() {
  return (
    <section
      className={styles.keyBenefitsSection}
      aria-labelledby="key-benefits-heading"
    >
      <div className={styles.container}>
        {/* Section Header Row */}
        <div className={styles.sectionHeaderRow}>
          <div>
            <div className={styles.eyebrowLine} aria-hidden="true" />
            <p className={styles.sectionEyebrow}>KEY BENEFITS</p>
            <h2 id="key-benefits-heading" className={styles.sectionHeading}>
              Why Membership Matters
            </h2>
          </div>

          <p className={styles.sectionDescriptionRight}>
            Being a member gives you the opportunity to stand with people,
            support meaningful work and contribute to stronger, fairer
            communities.
          </p>
        </div>

        {/* 6 Benefit Cards: 3 columns x 2 rows on Desktop */}
        <ul className={styles.benefitsGrid}>
          {benefitCards.map((card) => {
            const Icon = card.icon;
            return (
              <li key={card.id}>
                <article className={styles.benefitCard}>
                  <div className={styles.cardIconRing} aria-hidden="true">
                    <Icon size={24} strokeWidth={2.2} />
                  </div>

                  <h3 className={styles.cardTitle}>{card.title}</h3>

                  <p className={styles.cardDescription}>{card.description}</p>

                  <span className={styles.cardArrow} aria-hidden="true">
                    <ArrowRight size={16} strokeWidth={2.4} />
                  </span>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
