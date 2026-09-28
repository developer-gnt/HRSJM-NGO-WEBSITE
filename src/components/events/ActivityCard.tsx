import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import styles from "./events.module.css";

export type ActivityItem = {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  image: string;
};

export default function ActivityCard({ activity }: { activity: ActivityItem }) {
  return (
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
      </div>
    </article>
  );
}