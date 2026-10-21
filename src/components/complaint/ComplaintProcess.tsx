"use client";

import Link from "next/link";
import { ArrowRight, FileText, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { useScrollReveal, revealDelay, revealStagger } from "@/hooks/useScrollReveal";
import styles from "./complaint.module.css";

const processSteps = [
  {
    number: "01",
    icon: FileText,
    title: "Submit Your Complaint",
    text: "Fill out the form with your details and concern.",
  },
  {
    number: "02",
    icon: Users,
    title: "Review by Our Team",
    text: "Our team will carefully review your submission.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Get Guidance",
    text: "We will contact you with the next steps and available support.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Follow-up Support",
    text: "We stay with you through the process and connect you with the right resources.",
  },
];

export default function ComplaintProcess() {
  const sectionRef = useScrollReveal(styles);

  return (
    <section ref={sectionRef} className={styles.process} aria-labelledby="process-heading">
      <div className={styles.processInner}>
        <div className={styles.processIntro}>
          <p className={styles.processEyebrow} data-reveal>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            What to Expect
          </p>
          <h2 id="process-heading" className={styles.processHeading} data-reveal style={revealDelay(1)}>
            A Simple &amp; Secure
            <br />
            Process
          </h2>
          <p className={styles.processDescription} data-reveal style={revealDelay(2)}>
            We have made the process easy, transparent and people-centric to
            ensure you get the right support at the right time.
          </p>
          <Link href="/help" className={styles.btnGold} data-reveal style={revealDelay(3)}>
            Learn How It Works
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </div>

        <ol className={styles.processSteps}>
          {processSteps.map(({ number, icon: Icon, title, text }, index) => (
            <li key={number} className={styles.processStep} data-reveal-item style={revealStagger(index)}>
              <span className={styles.processStepNumber}>{number}</span>
              <span className={styles.processStepIcon}>
                <Icon size={26} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3 className={styles.processStepTitle}>{title}</h3>
              <p className={styles.processStepText}>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}