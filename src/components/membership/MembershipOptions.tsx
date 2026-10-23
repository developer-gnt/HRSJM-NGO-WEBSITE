"use client";

import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Landmark,
  ShieldCheck,
  Users,
} from "lucide-react";
import styles from "./membership.module.css";

const categories = [
  {
    id: "Active Membership",
    name: "Active Membership",
    fee: "From ₹800 / year",
    description:
      "Contribute at the district and state level. Includes official appointment letter, certificate, and membership identity kit.",
    icon: Users,
    targetCategory: "active-membership",
    defaultPost: "District Active Member",
  },
  {
    id: "Letter Pad Post",
    name: "Letter Pad Post",
    fee: "From ₹5,000 / 5 Years",
    description:
      "Designated state-level positions authorized with official HRSJM letter pad to represent the mission in human rights causes.",
    icon: FileText,
    targetCategory: "letter-pad-post",
    defaultPost: "Lion of State",
  },
  {
    id: "National Level Post",
    name: "National Level Post",
    fee: "₹10,000 / 10 Years",
    description:
      "National leadership posts across specialized council cells: Legal, Minority, Women, and Political advisory cells.",
    icon: Landmark,
    targetCategory: "national-level-post",
    defaultPost: "National Legal Council Cell",
  },
];

export default function MembershipOptions() {
  const choosePlan = (planId: string) => {
    window.dispatchEvent(
      new CustomEvent("hrsjm:membership-type", { detail: planId })
    );
  };

  return (
    <section
      id="membership-options"
      className={styles.options}
      aria-labelledby="membership-options-heading"
    >
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrowGold}>Official Membership Categories</p>
            <h2
              id="membership-options-heading"
              className={styles.sectionHeading}
            >
              Choose Your Membership
              <br />
              Tier &amp; Post
            </h2>
          </div>
          <p className={styles.sectionDescription}>
            Select the membership category that matches your qualifications and
            how you want to contribute to the HRSJM human rights mission across India.
          </p>
        </div>

        <ul className={styles.plansGrid}>
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <li key={cat.id} className={styles.plan}>
                <span className={styles.planIcon}>
                  <CatIcon size={22} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div style={{ marginBottom: 6 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#166534",
                      background: "#dcfce7",
                      padding: "2px 8px",
                      borderRadius: 4,
                    }}
                  >
                    {cat.fee}
                  </span>
                </div>
                <h3 className={styles.planName}>{cat.name}</h3>
                <p className={styles.planDescription}>{cat.description}</p>
                <div style={{ display: "flex", gap: 10, marginTop: "auto", paddingTop: 14 }}>
                  <Link
                    href={`/membership/apply?post=${encodeURIComponent(cat.defaultPost)}`}
                    className={styles.planButton}
                    onClick={() => choosePlan(cat.id)}
                  >
                    Apply Now
                    <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/membership/categories"
                    style={{
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "var(--color-navy)",
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "8px 12px",
                      borderRadius: 6,
                      border: "1px solid #dce4ec",
                      textDecoration: "none",
                    }}
                  >
                    View Posts
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link
            href="/membership/categories"
            className={styles.btnGold}
            style={{ display: "inline-flex" }}
          >
            Explore All 12 Membership Posts &amp; Qualifications Table
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
