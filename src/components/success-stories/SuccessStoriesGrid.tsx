"use client";

import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { successStories } from "@/data/successStories";
import { useScrollReveal, revealDelay, revealStagger } from "@/hooks/useScrollReveal";
import styles from "./successStories.module.css";

export default function SuccessStoriesGrid() {
  const sectionRef = useScrollReveal(styles);

  return (
    <section
      ref={sectionRef}
      className={styles.stories}
      aria-labelledby="success-stories-grid-heading"
    >
      <div className={styles.storiesInner}>
        <div className={styles.storiesIntro}>
          <p className={styles.storiesEyebrow} data-reveal>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Success Stories
          </p>
          <h2
            id="success-stories-grid-heading"
            className={styles.storiesHeading}
            data-reveal
            style={revealDelay(1)}
          >
            People We Have Supported
          </h2>
          <p className={styles.storiesDescription} data-reveal style={revealDelay(2)}>
            Every case is a person whose life can be changed. Here are the
            stories of individuals and communities who received support
            through HRSJM.
          </p>
        </div>

        <ul className={styles.grid} aria-label="Success stories">
          {successStories.map((story, index) => (
            <li
              key={story.title}
              className={styles.card}
              data-reveal-item
              style={revealStagger(index)}
            >
              <article className={styles.cardInner}>
                <span className={styles.cardImageWrap}>
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 440px"
                    className={styles.cardImage}
                  />
                </span>
                <span className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{story.title}</h3>
                  <p className={styles.cardQuote}>&ldquo;{story.quote}&rdquo;</p>
                  <p className={styles.cardLocation}>
                    <Icon
                      name="location"
                      width={12}
                      height={12}
                      className={styles.locationIcon}
                    />
                    {story.location}
                  </p>
                </span>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}