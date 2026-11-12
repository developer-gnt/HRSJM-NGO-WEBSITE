import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import styles from "./events.module.css";

export type ActivityItem = {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  location: string;
  category: string;
  image: string;
  href?: string;
};

export default function ActivityCard({ activity }: { activity: ActivityItem }) {
  const href = activity.href || `/events/${activity.id}`;

  return (
    <Link href={href} className={styles.activityCardLink}>
      <article className={styles.activityCard}>
        <div className={styles.activityMedia}>
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.activityBody}>
          <h3 className={styles.activityTitle}>{activity.title}</h3>
          {activity.subtitle && (
            <p className={styles.activitySubtitle}>{activity.subtitle}</p>
          )}
          <div className={styles.activityMeta}>
            <span className={styles.activityMetaItem}>
              <Calendar size={13} strokeWidth={2} aria-hidden="true" />
              {activity.date}
            </span>
            <span className={styles.activityMetaItem}>
              <MapPin size={13} strokeWidth={2} aria-hidden="true" />
              {activity.location}
            </span>
          </div>
          <div className={styles.activityAction}>
            <span>View Overview</span>
            <ArrowRight size={13} aria-hidden="true" />
          </div>
        </div>
      </article>
    </Link>
  );
}