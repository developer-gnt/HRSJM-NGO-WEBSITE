"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import HeroControls from "./HeroControls";
import HeroQuickActions from "./HeroQuickActions";
import HeroSlide from "./HeroSlide";
import { heroSlides } from "./heroSlides";
import styles from "./hero.module.css";

const AUTOPLAY_INTERVAL_MS = 2500;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

export default function HeroSection() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const [timerNonce, setTimerNonce] = useState(0);
  const activeIndexRef = useRef(0);

  const transitionTo = useCallback(
    (index: number, nextDirection: 1 | -1) => {
      const current = activeIndexRef.current;
      if (index === current) return;
      activeIndexRef.current = index;
      setPreviousIndex(current);
      setDirection(nextDirection);
      setActiveIndex(index);
    },
    [],
  );

  const selectSlide = useCallback(
    (index: number) => {
      const current = activeIndexRef.current;
      if (index === current) return;
      transitionTo(index, index > current ? 1 : -1);
      setTimerNonce((nonce) => nonce + 1);
    },
    [transitionTo],
  );

  const step = useCallback(
    (delta: 1 | -1, resetAutoplay: boolean) => {
      const count = heroSlides.length;
      const next =
        (activeIndexRef.current + delta + count) % count;
      transitionTo(next, delta);
      if (resetAutoplay) setTimerNonce((nonce) => nonce + 1);
    },
    [transitionTo],
  );

  const goToNext = useCallback(() => step(1, false), [step]);
  const goToPrevious = useCallback(() => step(-1, true), [step]);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(goToNext, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, timerNonce, goToNext]);

  return (
    <section
      className={styles.hero}
      aria-roledescription="carousel"
      aria-label="HRSJM mission highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className={styles.slides}>
        {heroSlides.map((slide, index) => (
          <HeroSlide
            key={slide.id}
            slide={slide}
            active={index === activeIndex}
            leaving={index === previousIndex && index !== activeIndex}
            direction={direction}
            isPrimaryHeading={index === 0}
          />
        ))}
      </div>
      <div className={styles.frame}>
        <div className={styles.frameInner}>
          <HeroQuickActions />
          <HeroControls
            count={heroSlides.length}
            activeIndex={activeIndex}
            onSelect={selectSlide}
            onPrevious={goToPrevious}
            onNext={() => step(1, true)}
          />
        </div>
      </div>
      <p className={styles.liveStatus} aria-live="polite">
        Slide {activeIndex + 1} of {heroSlides.length}
      </p>
    </section>
  );
}
