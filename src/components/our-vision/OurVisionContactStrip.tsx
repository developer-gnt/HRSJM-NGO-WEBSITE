import Link from "next/link";
import { Globe } from "lucide-react";
import styles from "./our-vision.module.css";

export default function OurVisionContactStrip() {
  return (
    <section className={styles.contactStrip} aria-label="Official Connect & Commitment">
      <div className={styles.container}>
        <div className={styles.contactStripFlex}>
          {/* Website Link */}
          <Link
            href="https://hrsjm.org"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}
          >
            <Globe size={22} className={styles.contactIconGlobe} />
            <span>Website : https://hrsjm.org</span>
          </Link>

          {/* WhatsApp Link */}
          <Link
            href="https://wa.me/917021057853"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}
          >
            {/* Crisp WhatsApp SVG */}
            <svg
              className={styles.contactIconWhatsApp}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.15c-1.49 0-2.95-.4-4.22-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 01-1.25-4.37c0-4.51 3.67-8.18 8.18-8.18 2.19 0 4.24.85 5.79 2.4a8.13 8.13 0 012.4 5.79c0 4.51-3.67 8.17-8.18 8.17zm4.49-6.13c-.25-.12-1.47-.72-1.7-.81-.23-.09-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.18-.48-.3z" />
            </svg>
            <span>WhatsApp : 7021057853</span>
          </Link>

          {/* Pill Badge */}
          <div className={styles.contactPillBadge}>
            <svg
              className={styles.pillLeaf}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>

            <div className={styles.pillTextWrap}>
              <span className={styles.pillSub}>With hope, unity, and commitment,</span>
              <strong className={styles.pillMain}>Together for a Just and Peaceful World.</strong>
            </div>

            <svg
              className={styles.pillLeaf}
              style={{ transform: "scaleX(-1)" }}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
