import Link from "next/link";
import Icon from "@/components/ui/Icon";
import styles from "./heroQuickActions.module.css";

const quickActions = [
  {
    icon: "users",
    title: "Join Membership",
    subtitle: "Be a part of the change",
    href: "/membership",
  },
  {
    icon: "fileText",
    title: "File a Complaint",
    subtitle: "Get help. We are with you.",
    href: "/complaint",
  },
  {
    icon: "heart",
    title: "Make a Donation",
    subtitle: "Support justice for all.",
    href: "/donation",
  },
] as const;

export default function HeroQuickActions() {
  return (
    <ul className={styles.grid}>
      {quickActions.map((action) => (
        <li key={action.title}>
          <Link href={action.href} className={styles.card}>
            <span className={styles.cardIcon}>
              <Icon name={action.icon} />
            </span>
            <span className={styles.cardText}>
              <span className={styles.cardTitle}>{action.title}</span>
              <span className={styles.cardSubtitle}>{action.subtitle}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
