import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  CircleDot,
  HeartHandshake,
} from "lucide-react";
import styles from "./donation.module.css";

export default function DonationHero() {
  return (
    <section className={styles.hero} aria-labelledby="donation-hero-heading">
      <Image
        src="/donation/donation-hero-clean.png"
        alt=""
        fill
        preload
        sizes="100vw"
        className={styles.heroImage}
        aria-hidden="true"
      />
      <div className={styles.heroScrim} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.heroContent}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" />
            <span aria-current="page">Donation</span>
          </nav>

          <p className={styles.heroEyebrow}>
            <CircleDot size={15} strokeWidth={2} aria-hidden="true" />
            Support Our Mission
          </p>

          <h1 id="donation-hero-heading" className={styles.heroHeading}>
            <span>Small Actions.</span>
            <span className={styles.heroHeadingGold}>Real Change.</span>
          </h1>

          <p className={styles.heroDescription}>
            Your donation helps us protect human rights, support vulnerable
            communities and build a more just and equal society.
          </p>

          <div className={styles.heroActions}>
            <a href="#donate" className={styles.btnGold}>
              Donate Now
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </a>
            <Link href="/what-hrsjm-does" className={styles.btnOutline}>
              See Our Impact
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.heroCard}>
        <span className={styles.heroCardIcon}>
          <HeartHandshake size={22} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <p className={styles.heroCardText}>
          <strong>Your Support</strong>
          <span className={styles.heroCardLine}>Empowers Real People</span>
          <span>Real Communities</span>
          <span>Real Change</span>
        </p>
      </div>
    </section>
  );
}
