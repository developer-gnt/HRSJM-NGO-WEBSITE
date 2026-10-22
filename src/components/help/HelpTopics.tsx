import Link from "next/link";
import { Users, Handshake, FileText, MessageCircle, ArrowRight } from "lucide-react";
import styles from "./help.module.css";

interface TopicItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: typeof Users;
}

const topics: TopicItem[] = [
  {
    id: "membership",
    title: "Membership",
    description: "Application process, eligibility and benefits.",
    href: "/membership",
    icon: Users,
  },
  {
    id: "get-involved",
    title: "Get Involved",
    description: "Activities, volunteering and events.",
    href: "/events",
    icon: Handshake,
  },
  {
    id: "resources",
    title: "Resources",
    description: "Guides, policies and documents.",
    href: "/rights",
    icon: FileText,
  },
  {
    id: "general-support",
    title: "General Support",
    description: "Account, updates and other queries.",
    href: "/contact",
    icon: MessageCircle,
  },
];

export default function HelpTopics() {
  return (
    <section className={styles.topicsSection} aria-labelledby="help-topics-heading">
      <div className={styles.container}>
        {/* Section Header Row */}
        <div className={styles.sectionHeaderRow}>
          <div>
            <div className={styles.sectionEyebrow}>
              <span className={styles.sectionEyebrowDot} aria-hidden="true" />
              <span>HELP TOPICS</span>
            </div>
            <h2 id="help-topics-heading" className={styles.sectionHeading}>
              Get Support in Key Areas
            </h2>
          </div>

          <p className={styles.sectionDescription}>
            Explore our help topics to find the information you need. Whether
            you&apos;re a member, volunteer or someone interested in our work,
            we&apos;re here to assist you.
          </p>
        </div>

        {/* 4 Cards Responsive Grid */}
        <div className={styles.topicsGrid} role="list">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <div key={topic.id} role="listitem">
                <Link
                  href={topic.href}
                  className={styles.topicCardLink}
                  aria-label={`${topic.title} - ${topic.description}`}
                >
                  <article className={styles.topicCard}>
                    <div className={styles.topicIconRing} aria-hidden="true">
                      <Icon size={24} strokeWidth={2.2} />
                    </div>

                    <h3 className={styles.topicTitle}>{topic.title}</h3>

                    <p className={styles.topicDescription}>
                      {topic.description}
                    </p>

                    <span className={styles.topicArrow} aria-hidden="true">
                      <ArrowRight size={16} strokeWidth={2.4} />
                    </span>
                  </article>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
