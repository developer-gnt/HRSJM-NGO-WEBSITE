import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import styles from "./what-hrsjm-does.module.css";

export default function WhatHRSJMDoesHero() {
  return (
    <section className={styles.hero} aria-labelledby="whd-hero-heading">
      <div className={styles.heroBg} aria-hidden="true">
        <Image
          src="/WHD-hero-bg.png"
          alt=""
          fill
          preload
          sizes="100vw"
          quality={90}
          className={styles.heroImg}
        />
        <div className={styles.heroScrim} />
        <div className={styles.heroShade} />
      </div>

      <div className={styles.heroInner}>
        <nav aria-label="Breadcrumb">
          <ol className={styles.breadcrumbList}>
            <li>
              <Link href="/" className={styles.breadcrumbLink}>
                Home
              </Link>
            </li>
            <li className={styles.breadcrumbSeparator} aria-hidden="true">
              <Icon name="chevronRight" width={12} height={12} strokeWidth={2} />
            </li>
            <li>
              <span className={styles.breadcrumbCurrent} aria-current="page">
                What HRSJM Does
              </span>
            </li>
          </ol>
        </nav>

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Our Work
          </p>

          <h1 id="whd-hero-heading" className={styles.heading}>
            From Rights to
            <span className={styles.headingGold}>Real Change</span>
          </h1>

          <p className={styles.description}>
            HRSJM works on the ground to protect human rights, promote
            justice, empower communities and build a more equal and
            compassionate society.
          </p>

          <div className={styles.actions}>
            <Link href="#key-areas" className={styles.primaryBtn}>
              Explore Our Work
              <span className={styles.primaryBtnIcon}>
                <Icon name="arrow" width={17} height={17} strokeWidth={2} />
              </span>
            </Link>
            <Link href="#impact" className={styles.secondaryBtn}>
              <span className={styles.secondaryChevrons} aria-hidden="true">
                <Icon name="chevronRight" width={14} height={14} strokeWidth={2.4} />
                <Icon name="chevronRight" width={14} height={14} strokeWidth={2.4} />
              </span>
              Our Impact
            </Link>
          </div>
        </div>

        <div className={styles.heroScript} aria-hidden="true">
          <p className={styles.heroScriptText}>
            People.
            <br />
            Rights.
            <br />
            Support.
            <br />
            Change.
          </p>
        </div>

        <div className={styles.heroCard}>
          <span className={styles.heroCardIcon} aria-hidden="true">
            <Icon name="usersRound" width={22} height={22} />
          </span>
          <span className={styles.heroCardText}>
            <span className={styles.heroCardTitle}>Real People</span>
            <span className={styles.heroCardSub}>Real Communities</span>
            <span className={styles.heroCardTitle}>Real Impact</span>
          </span>
        </div>
      </div>
    </section>
  );
}
