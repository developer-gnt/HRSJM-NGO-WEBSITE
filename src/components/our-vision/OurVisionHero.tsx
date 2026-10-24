import Image from "next/image";
import Link from "next/link";
import styles from "./our-vision.module.css";

export default function OurVisionHero() {
  return (
    <section className={styles.heroBannerSection} aria-labelledby="vision-hero-title">
      {/* Full-width High-Definition Banner Background */}
      <div className={styles.heroBannerBgWrap} aria-hidden="true">
        <Image
          src="/images/vision/our-vision-banner-hd.png"
          alt="A World of Love, Peace, Harmony, and Human Dignity - Silhouettes holding hands under Earth globe with flying peace dove"
          fill
          priority
          quality={100}
          sizes="100vw"
          className={styles.heroBannerImg}
        />
        <div className={styles.heroBannerOverlay} />
      </div>

      <div className={styles.heroContentWrapper}>
        <div className={styles.container}>
          {/* Top row: Breadcrumb on left + Floating script on right */}
          <div className={styles.heroTopRow}>
            <div className={styles.heroBreadcrumbWrap}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <ol className={styles.breadcrumbList}>
                  <li>
                    <Link href="/" className={styles.breadcrumbLink}>
                      Home
                    </Link>
                  </li>
                  <li className={styles.breadcrumbSep} aria-hidden="true">
                    &gt;
                  </li>
                  <li>
                    <span className={styles.breadcrumbCurrent} aria-current="page">
                      Our Vision
                    </span>
                  </li>
                </ol>
              </nav>
              <div className={styles.heroBreadcrumbLine} />
            </div>

            {/* Script badge callout on right */}
            <div className={styles.heroScriptWrap}>
              <p className={styles.heroScriptCallout}>
                Together
                <br />
                for a Just and
                <br />
                Peaceful World.
              </p>
              <div className={styles.heroScriptLine} />
            </div>
          </div>

          {/* Main Title Content on Left */}
          <div className={styles.heroMainContent}>
            <span className={styles.eyebrow}>Our Vision</span>

            <h1 id="vision-hero-title" className={styles.heroHeading}>
              A World of Love,
              <br />
              Peace, Harmony,
              <br />
              and <span className={styles.goldText}>Human Dignity</span>
            </h1>

            <p className={styles.heroSubtitle}>
              We are Human – And serve for Humanity.
            </p>
            <div className={styles.heroSubtitleLine} />
          </div>
        </div>
      </div>
    </section>
  );
}
