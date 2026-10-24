import {
  Scale,
  Feather,
  Landmark,
  ShieldCheck,
  Users,
  Leaf,
  Lock,
  HeartHandshake,
  Handshake,
  Globe,
} from "lucide-react";
import styles from "./our-vision.module.css";

const issues = [
  {
    id: 1,
    title: "Human rights violations and social injustice",
    icon: Scale,
    color: "#062a4f",
  },
  {
    id: 2,
    title: "Peace, communal harmony, and religious tolerance",
    icon: Feather,
    color: "#0284c7",
  },
  {
    id: 3,
    title: "Democracy, responsible governance, and public accountability",
    icon: Landmark,
    color: "#062a4f",
  },
  {
    id: 4,
    title: "War, terrorism, and the protection of innocent civilians",
    icon: ShieldCheck,
    color: "#0369a1",
  },
  {
    id: 5,
    title: "Social discrimination, inequality, and harmful social practices",
    icon: Users,
    color: "#062a4f",
  },
  {
    id: 6,
    title: "Environmental protection, wildlife conservation, and deforestation",
    icon: Leaf,
    color: "#16a34a",
  },
  {
    id: 7,
    title: "Privacy, individual freedoms, and human dignity",
    icon: Lock,
    color: "#062a4f",
  },
  {
    id: 8,
    title: "Poverty, economic inequality, and the welfare of disadvantaged communities",
    icon: HeartHandshake,
    color: "#dc2626",
  },
  {
    id: 9,
    title: "Abuse of power, greed, exploitation, and the misuse of authority",
    icon: Handshake,
    color: "#062a4f",
  },
  {
    id: 10,
    title: "Respect for cultural diversity and peaceful coexistence among communities",
    icon: Globe,
    color: "#2563eb",
  },
];

export default function OurVisionFocusIssues() {
  return (
    <section className={styles.focusSection} aria-labelledby="focus-issues-title">
      <div className={styles.container}>
        <div className={styles.focusHeader}>
          <span className={styles.eyebrow}>Key Focus Areas</span>

          <h2 id="focus-issues-title" className={styles.focusTitle}>
            Issues We Encourage Society to Address
          </h2>

          <p className={styles.focusSubtitle}>
            HRSJM supports constructive dialogue, public awareness, and responsible
            community participation on important social and humanitarian issues, including:
          </p>
        </div>

        <div className={styles.focusGrid}>
          {issues.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className={styles.focusCard}>
                <div className={styles.focusIconCircle}>
                  <IconComponent size={22} strokeWidth={1.8} style={{ color: item.color }} />
                </div>
                <p className={styles.focusCardText}>{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
