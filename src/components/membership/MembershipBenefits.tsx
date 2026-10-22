import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CircleDot,
  HandHeart,
  Mail,
  Users,
} from "lucide-react";
import styles from "./membership.module.css";

const benefits = [
  {
    number: "01",
    title: "Community Connection",
    description:
      "Connect with people and communities who care about human rights and social justice.",
    icon: Users,
  },
  {
    number: "02",
    title: "Learning & Awareness",
    description:
      "Access educational initiatives, awareness activities and community knowledge.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Participation",
    description:
      "Take part in events, campaigns, activities and initiatives.",
    icon: CalendarDays,
  },
  {
    number: "04",
    title: "Support & Contribution",
    description:
      "Contribute your time, ideas, skills or resources toward meaningful community work.",
    icon: HandHeart,
  },
  {
    number: "05",
    title: "Stay Connected",
    description:
      "Stay informed about HRSJM activities, initiatives and opportunities to participate.",
    icon: Mail,
  },
];

export default function MembershipBenefits() {
  return (
    <section
      className={styles.benefits}
      aria-labelledby="membership-benefits-heading"
    >
      <div className={styles.benefitsImageWrap} aria-hidden="true">
        <Image
          src="/membership/membership-movement.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.benefitsImage}
        />
      </div>
      <div className={styles.benefitsScrim} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.benefitsInner}>
          <div className={styles.benefitsIntro}>
            <p className={styles.benefitsEyebrow}>
              <CircleDot size={15} strokeWidth={2} aria-hidden="true" />
              Membership Benefits
            </p>
            <h2
              id="membership-benefits-heading"
              className={styles.benefitsHeading}
            >
              More Than Membership.
              <br />
              A Shared Commitment.
            </h2>
            <p className={styles.benefitsDescription}>
              Membership brings you closer to the people, activities and
              initiatives working for human rights and social justice.
            </p>
            <Link href="/membership/categories" className={styles.btnGold}>
              Become a Member
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </div>

          <ol className={styles.benefitsList}>
            {benefits.map((benefit) => {
              const BenefitIcon = benefit.icon;
              return (
                <li key={benefit.number} className={styles.benefit}>
                  <span className={styles.benefitNumber}>
                    {benefit.number}
                  </span>
                  <span className={styles.benefitIcon}>
                    <BenefitIcon
                      size={22}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                  <p className={styles.benefitDescription}>
                    {benefit.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
