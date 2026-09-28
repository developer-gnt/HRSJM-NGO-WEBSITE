"use client";

import { useState } from "react";
import activitiesData from "@/data/activities.json";
import ActivityCard, { type ActivityItem } from "./ActivityCard";
import styles from "./events.module.css";

const categories = [
  "All",
  "Awareness",
  "Legal Aid",
  "Community Outreach",
  "Campaigns",
  "Workshops",
];

const activities: ActivityItem[] = activitiesData;

export default function PastActivities() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredActivities =
    activeCategory === "All"
      ? activities
      : activities.filter((activity) => activity.category === activeCategory);

  return (
    <section
      id="activities"
      className={styles.pastActivities}
      aria-labelledby="past-activities-heading"
    >
      <div className={styles.sectionInner}>
        <div className={styles.pastHeader}>
          <div>
            <p className={styles.sectionEyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Past Events
            </p>
            <h2 id="past-activities-heading" className={styles.pastTitle}>
              Our Activities in Action
            </h2>
            <p className={styles.pastSub}>
              A look at some of our recent programs and community initiatives.
            </p>
          </div>

          <ul className={styles.pastFilters} aria-label="Filter activities by category">
            {categories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  className={
                    category === activeCategory
                      ? `${styles.filterBtn} ${styles.filterBtnActive}`
                      : styles.filterBtn
                  }
                  aria-pressed={category === activeCategory}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {filteredActivities.length > 0 ? (
          <div className={styles.pastGrid}>
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <p className={styles.pastEmpty}>No activities found in this category.</p>
        )}
      </div>
    </section>
  );
}