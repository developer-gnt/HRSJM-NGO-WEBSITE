import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./our-vision.module.css";

export default function OurVisionInAction() {
  return (
    <section className={styles.inActionSection} aria-labelledby="vision-in-action-title">
      {/* Background panoramic image on right side with soft blend */}
      <div className={styles.inActionBgWrap} aria-hidden="true">
        <Image
          src="/images/vision/hands-unity-hd.jpg"
          alt="Hands united in solidarity"
          fill
          quality={100}
          sizes="(max-width: 900px) 100vw, 62vw"
          className={styles.inActionBgImg}
        />
        <div className={styles.inActionBgVignette} />
      </div>

      <div className={styles.inActionContent}>
        <div className={styles.container}>
          <div className={styles.inActionGrid}>
            {/* Left Column: Text & Pill CTA */}
            <div className={styles.inActionLeft}>
              <span className={styles.inActionEyebrow}>Our Commitment</span>

              <h2 id="vision-in-action-title" className={styles.inActionTitle}>
                Our Vision in Action
              </h2>

              <div className={styles.inActionParagraphs}>
                <p>
                  We believe that <strong className={styles.highlightBlue}>every person</strong> has
                  the potential to contribute to a{" "}
                  <strong className={styles.highlightBlue}>better society</strong>. Every individual
                  who shares our values can become a part of this mission by promoting peace,
                  understanding, equality, and social responsibility.
                </p>

                <p>
                  HRSJM invites people from all walks of life to participate in initiatives that
                  support a{" "}
                  <strong className={styles.highlightBlue}>
                    peaceful, compassionate, and inclusive India
                  </strong>
                  . We encourage everyone to care for one another, support people in need, help
                  vulnerable communities, raise awareness of social issues, and stand together
                  against injustice.
                </p>

                <p>
                  We believe that{" "}
                  <strong className={styles.highlightBlue}>
                    tolerance, mutual respect, compassion, and dialogue
                  </strong>{" "}
                  are essential foundations for lasting peace. By listening to different
                  perspectives, respecting diversity, and resolving disagreements peacefully, we can
                  build stronger communities and a more harmonious society.
                </p>
              </div>

              <Link href="/membership" className={styles.pillButton}>
                <span>Join Our Movement</span>
                <ArrowRight size={17} className={styles.pillButtonIcon} strokeWidth={2.4} />
              </Link>
            </div>

            {/* Right Column: Floating Script Callout over the Image */}
            <div className={styles.inActionScriptWrap}>
              <p className={styles.inActionScriptText}>
                People
                <br />
                United for
                <br />
                a Kinder,
                <br />
                Fairer World.
              </p>
              <div className={styles.inActionScriptLine} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
