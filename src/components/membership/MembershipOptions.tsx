"use client";

import {
  ArrowRight,
  HeartHandshake,
  User,
  Users,
} from "lucide-react";
import styles from "./membership.module.css";

/* No official HRSJM membership plans or pricing exist in the project yet,
   so these are configurable placeholders without invented prices — wire
   real plans here when the membership system is connected. */
const plans = [
  {
    id: "General Membership",
    name: "General Membership",
    description:
      "For individuals who want to support HRSJM's mission.",
    icon: User,
  },
  {
    id: "Letter Pad Post",
    name: "Letter Pad Post",
    description:
      "For people who want to participate in community initiatives.",
    icon: Users,
  },
  {
    id: "National Level Post",
    name: "National Level Post",
    description:
      "For individuals who want to provide additional support to the organisation's mission.",
    icon: HeartHandshake,
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
            <p className={styles.eyebrowGold}>Choose Your Membership</p>
            <h2
              id="membership-options-heading"
              className={styles.sectionHeading}
            >
              Find Your Way
              <br />
              to Participate
            </h2>
          </div>
          <p className={styles.sectionDescription}>
            Choose the membership option that best matches how you want to
            contribute to the HRSJM community.
          </p>
        </div>

        <ul className={styles.plansGrid}>
          {plans.map((plan) => {
            const PlanIcon = plan.icon;
            return (
              <li key={plan.id} className={styles.plan}>
                <span className={styles.planIcon}>
                  <PlanIcon size={22} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planDescription}>{plan.description}</p>
                <a
                  href="#membership-form"
                  className={styles.planButton}
                  onClick={() => choosePlan(plan.id)}
                >
                  Join Now
                  <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>

        <p className={styles.plansNote}>
          Membership details and benefits are being finalised by HRSJM. Apply
          now and our team will guide you through the next steps.
        </p>
      </div>
    </section>
  );
}
