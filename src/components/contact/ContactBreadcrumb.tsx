import Link from "next/link";
import { ChevronRight } from "lucide-react";
import styles from "./contact.module.css";

export default function ContactBreadcrumb() {
  return (
    <nav className={styles.contactBreadcrumb} aria-label="Breadcrumb">
      <ol className={styles.contactBreadcrumb__list}>
        <li className={styles.contactBreadcrumb__item}>
          <Link href="/" className={styles.contactBreadcrumb__link}>
            Home
          </Link>
        </li>
        <li className={styles.contactBreadcrumb__separator} aria-hidden="true">
          <ChevronRight size={13} strokeWidth={2} />
        </li>
        <li className={styles.contactBreadcrumb__item}>
          <span className={styles.contactBreadcrumb__current} aria-current="page">
            Contact
          </span>
        </li>
      </ol>
    </nav>
  );
}