import Link from "next/link";
import Icon from "@/components/ui/Icon";
import type { HeroSlideData } from "./heroSlides";
import styles from "./heroSlide.module.css";
import heroStyles from "./heroText.module.css";

interface HeroSlideProps {
  slide: HeroSlideData;
  active: boolean;
  leaving: boolean;
  direction: 1 | -1;
  isPrimaryHeading: boolean;
}

export default function HeroSlide({
  slide,
  active,
  leaving,
  direction,
  isPrimaryHeading,
}: HeroSlideProps) {
  const stateClass = active
    ? styles.slideActive
    : leaving
      ? styles.slideLeaving
      : styles.slideHidden;
  const HeadingTag = isPrimaryHeading ? "h1" : "h2";

  return (
    <div
      className={`${styles.slide} ${stateClass}`}
      style={{ backgroundImage: `url("${slide.image}")` }}
      data-direction={direction}
      aria-hidden={!active}
      inert={!active}
    >
      <div className={styles.heroInner}>
        <div className={heroStyles.content}>
          <p className={heroStyles.eyebrow}>{slide.eyebrow}</p>
          <HeadingTag
            id={isPrimaryHeading ? "hero-heading" : undefined}
            className={heroStyles.heading}
          >
            {slide.titleLine1}
            <br />
            {slide.titleLine2}{" "}
            <span className={heroStyles.gold}>{slide.highlightedText}</span>
          </HeadingTag>
          <p className={heroStyles.description}>{slide.description}</p>
          <div className={heroStyles.actions}>
            <Link href={slide.primaryHref} className={heroStyles.primaryCta}>
              {slide.primaryAction}
              <Icon name="arrow" />
            </Link>
            <Link href={slide.secondaryHref} className={heroStyles.secondaryCta}>
              {slide.secondaryAction}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
