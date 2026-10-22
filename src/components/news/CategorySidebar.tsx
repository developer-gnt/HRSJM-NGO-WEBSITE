import Link from "next/link";
import { articleCategories } from "@/data/articleCategories";
import { revealDelay, revealStagger } from "@/hooks/useScrollReveal";
import styles from "./news.module.css";

/* Categories card shared by the Featured Article section, the Featured
   Article page and the category listings. `activeLabel` highlights the
   category of the page it appears on; every entry navigates to its listing. */
export default function CategorySidebar({
  activeLabel = "All Posts",
}: {
  activeLabel?: string;
}) {
  return (
    <aside className={styles.sidebar} aria-label="Article categories">
      <div className={styles.sidebarCard} data-reveal style={revealDelay(2)}>
        <h3 className={styles.sidebarTitle}>Categories</h3>
        <ul className={styles.categoryList}>
          {articleCategories.map(({ icon: Icon, label, href }, index) => (
            <li key={label} data-reveal-item style={revealStagger(index)}>
              <Link
                href={href}
                className={`${styles.categoryItem}${
                  label === activeLabel ? ` ${styles.categoryItemActive}` : ""
                }`}
                aria-current={label === activeLabel ? "true" : undefined}
              >
                <span className={styles.categoryItemIcon}>
                  <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className={styles.categoryItemLabel}>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}