import Image from "next/image";
import {
  BookOpen,
  FileText,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import styles from "./donation.module.css";

const categories = [
  {
    title: "Legal Aid & Support",
    description: "Helping individuals access justice",
    icon: Scale,
  },
  {
    title: "Awareness & Education",
    description: "Conducting workshops and training programs",
    icon: BookOpen,
  },
  {
    title: "Community Development",
    description: "Strengthening local communities",
    icon: Users,
  },
  {
    title: "Research & Policy",
    description: "Advocating for systemic change",
    icon: FileText,
  },
  {
    title: "Crisis Support",
    description: "Immediate assistance for vulnerable individuals",
    icon: ShieldCheck,
  },
];

export default function DonationSupports() {
  return (
    <section
      className={styles.supports}
      aria-labelledby="donation-supports-heading"
    >
      <div className={styles.supportsImageWrap} aria-hidden="true">
        <Image
          src="/donation/donation-supports.png"
          alt=""
          fill
          sizes="(max-width: 1099px) 100vw, 100vw"
          className={styles.supportsImage}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.supportsInner}>
          <h2
            id="donation-supports-heading"
            className={styles.supportsHeading}
          >
            Your
            <br />
            Donation
            <br />
            Supports
          </h2>

          <ul className={styles.supportsList}>
            {categories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <li key={category.title} className={styles.supportsItem}>
                  <span className={styles.supportsIcon}>
                    <CategoryIcon
                      size={22}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className={styles.supportsTitle}>{category.title}</h3>
                  <p className={styles.supportsDescription}>
                    {category.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
