"use client";

import Link from "next/link";
import { Globe, MessageSquare, Award } from "lucide-react";
import styles from "./our-history.module.css";

export default function HistoryContactStrip() {
  return (
    <div className={styles.contactStrip}>
      <div className={styles.container}>
        <div className={styles.contactStripRow}>
          {/* Website Link */}
          <Link
            href="https://hrsjm.org"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            <Globe className={styles.contactIconBlue} size={20} strokeWidth={2.2} />
            <span>
              <strong>Website :</strong>{" "}
              <span className={styles.contactLinkValueBlue}>https://hrsjm.org</span>
            </span>
          </Link>

          {/* WhatsApp Contact */}
          <a
            href="https://wa.me/917021057853"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            <MessageSquare
              className={styles.contactIconGreen}
              size={20}
              strokeWidth={2.2}
            />
            <span>
              <strong>WhatsApp :</strong>{" "}
              <span className={styles.contactLinkValueGreen}>7021057853</span>
            </span>
          </a>

          {/* Badge Pill with Laurel */}
          <div className={styles.badgePill}>
            <Award className={styles.badgeLaurel} size={18} strokeWidth={2.4} />
            <span>HRSJM - We Are Human &amp; Serve For Humanity.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
