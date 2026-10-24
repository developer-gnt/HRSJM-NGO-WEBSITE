"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import eventsData from "@/data/events.json";
import { successStories as stories } from "@/data/successStories";
import styles from "./humanStories.module.css";

const getVisibleCount = () => {
  if (window.matchMedia("(max-width: 639px)").matches) return 1;
  if (window.matchMedia("(max-width: 1023px)").matches) return 2;
  return 3;
};

/* Continuous marquee: drifts forward one card every ~4.5s, looping forever.
   Arrows and swipes glide one card on top of the drift. The track renders the
   stories twice; the position wraps modulo stories.length, so the second copy
   stands in for the first whenever the offset crosses a full cycle. */
const DRIFT_CARDS_PER_SECOND = 1 / 4.5;
const GLIDE_DURATION_MS = 600;

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

export default function HumanStoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const offsetRef = useRef(0);
  const glideRef = useRef<{ from: number; to: number; start: number } | null>(null);
  const pausedRef = useRef(false);
  const inViewRef = useRef(true);
  const visibleRef = useRef(3);
  const reducedRef = useRef(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    let offset = offsetRef.current % stories.length;
    if (offset < 0) offset += stories.length;
    track.style.transform = `translateX(${(-offset * 100) / visibleRef.current}%)`;
  }, []);

  const nudge = useCallback(
    (direction: 1 | -1) => {
      if (reducedRef.current) {
        offsetRef.current += direction;
        applyTransform();
        return;
      }
      glideRef.current = {
        from: offsetRef.current,
        to: offsetRef.current + direction,
        start: performance.now(),
      };
    },
    [applyTransform]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateVisible = () => setVisibleCount(getVisibleCount());
    updateVisible();

    const wideQuery = window.matchMedia("(max-width: 1023px)");
    const narrowQuery = window.matchMedia("(max-width: 639px)");
    wideQuery.addEventListener("change", updateVisible);
    narrowQuery.addEventListener("change", updateVisible);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add(styles.revealed);
      return () => {
        wideQuery.removeEventListener("change", updateVisible);
        narrowQuery.removeEventListener("change", updateVisible);
      };
    }

    section.classList.add(styles.armed);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add(styles.revealed);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      wideQuery.removeEventListener("change", updateVisible);
      narrowQuery.removeEventListener("change", updateVisible);
    };
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    applyTransform();

    if (reducedRef.current) return;

    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      const glide = glideRef.current;
      if (glide) {
        const progress = Math.min((now - glide.start) / GLIDE_DURATION_MS, 1);
        offsetRef.current = glide.from + (glide.to - glide.from) * easeOutCubic(progress);
        if (progress >= 1) glideRef.current = null;
      } else if (!pausedRef.current && inViewRef.current) {
        offsetRef.current += DRIFT_CARDS_PER_SECOND * (dt / 1000);
      }
      applyTransform();
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const inViewObserver = new IntersectionObserver(
      (entries) => {
        inViewRef.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    inViewObserver.observe(carousel);

    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      pausedRef.current = false;
    };
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (canHover) {
      carousel.addEventListener("mouseenter", pause);
      carousel.addEventListener("mouseleave", resume);
    }
    carousel.addEventListener("focusin", pause);
    carousel.addEventListener("focusout", resume);

    return () => {
      cancelAnimationFrame(raf);
      inViewObserver.disconnect();
      if (canHover) {
        carousel.removeEventListener("mouseenter", pause);
        carousel.removeEventListener("mouseleave", resume);
      }
      carousel.removeEventListener("focusin", pause);
      carousel.removeEventListener("focusout", resume);
    };
  }, [applyTransform]);

  useEffect(() => {
    visibleRef.current = visibleCount;
    applyTransform();
  }, [visibleCount, applyTransform]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    nudge(dx < 0 ? 1 : -1);
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="human-stories-heading"
    >
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <h2 id="human-stories-heading" className={styles.heading} data-reveal>
              Human
              <br />
              Stories
            </h2>
            <p
              className={styles.tagline}
              data-reveal
              style={{ "--reveal-delay": 1 } as React.CSSProperties}
            >
              Real Lives. Real Impact.
            </p>
            <p
              className={styles.description}
              data-reveal
              style={{ "--reveal-delay": 2 } as React.CSSProperties}
            >
              Behind every case is a person whose life changed. Hear directly
              from the people and communities HRSJM stands with.
            </p>
            <div data-reveal style={{ "--reveal-delay": 3 } as React.CSSProperties}>
              <Link href="/success-stories" className={styles.cta}>
                View All Stories
                <Icon name="arrow" width={16} height={16} />
              </Link>
            </div>
          </div>

          <div
            ref={carouselRef}
            className={styles.carousel}
            data-reveal
            style={{ "--reveal-delay": 2 } as React.CSSProperties}
          >
            <div
              className={styles.viewport}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
            >
              <ul ref={trackRef} className={styles.track}>
                {[0, 1].map((copy) =>
                  stories.map((story) => (
                    <li
                      key={`${copy}-${story.title}`}
                      className={styles.slide}
                      style={{ "--visible": visibleCount } as React.CSSProperties}
                      aria-hidden={copy === 1 || undefined}
                      inert={copy === 1 || undefined}
                    >
                      <article className={styles.card}>
                        <span className={styles.imageWrap}>
                          <Image
                            src={story.image}
                            alt={story.alt}
                            fill
                            sizes="(max-width: 639px) 86vw, (max-width: 1023px) 44vw, 220px"
                            className={styles.image}
                          />
                        </span>
                        <span className={styles.cardBody}>
                          <h3 className={styles.cardTitle}>{story.title}</h3>
                          <p className={styles.cardQuote}>&ldquo;{story.quote}&rdquo;</p>
                          <p className={styles.cardLocation}>
                            <Icon
                              name="location"
                              width={11}
                              height={11}
                              className={styles.locationIcon}
                            />
                            {story.location}
                          </p>
                        </span>
                      </article>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <button
              type="button"
              className={styles.control}
              data-side="prev"
              onClick={() => nudge(-1)}
              aria-label="Previous stories"
            >
              <Icon name="chevronLeft" width={16} height={16} />
            </button>
            <button
              type="button"
              className={styles.control}
              data-side="next"
              onClick={() => nudge(1)}
              aria-label="Next stories"
            >
              <Icon name="chevronRight" width={16} height={16} />
            </button>
          </div>

          <div className={styles.events}>
            <div className={styles.eventsHead} data-reveal>
              <h3 className={styles.eventsHeading}>
                <Link href="/events" className={styles.eventsHeadingLink}>
                  Events &amp; Activities
                </Link>
              </h3>
              <Link href="/events" className={styles.eventsLink}>
                View All Events
                <Icon name="arrow" width={14} height={14} />
              </Link>
            </div>
            <ul className={styles.eventList}>
              {eventsData.map((event, i) => (
                <li
                  key={event.id}
                  className={styles.eventItem}
                  data-reveal-item
                  style={{ "--stagger": i } as React.CSSProperties}
                >
                  <span className={styles.eventDate} aria-hidden="true">
                    <span className={styles.eventDay}>{event.day}</span>
                    <span className={styles.eventMonth}>{event.month}</span>
                  </span>
                  <span className={styles.eventInfo}>
                    <span className={styles.eventTitle}>{event.title}</span>
                    <span className={styles.eventMeta}>
                      <Icon
                        name="location"
                        width={11}
                        height={11}
                        className={styles.locationIcon}
                      />
                      {event.location}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
