"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useScrollReveal, revealDelay, revealStagger } from "@/hooks/useScrollReveal";
import styles from "./complaint.module.css";

const stories = [
  {
    image: "/people-card-1.png",
    alt: "Woman wearing an orange patterned headscarf looking thoughtfully into the distance",
    quote:
      "HRSJM helped me get justice when I had nowhere else to go. Their support gave me hope.",
    location: "Mumbai, Maharashtra",
  },
  {
    image: "/people-card-6.png",
    alt: "Smiling young boy in a classroom looking up with hope",
    quote:
      "They guided me through the legal process and stood by my family during a difficult time.",
    location: "Satyenagar, Delhi",
  },
  {
    image: "/people-card-3.png",
    alt: "Young woman standing among community members at a local gathering",
    quote:
      "The counselling support helped me and my children rebuild our lives.",
    location: "Nandurbar, Maharashtra",
  },
  {
    image: "/people-card-4.png",
    alt: "Smiling young student carrying books over her shoulder",
    quote:
      "The team believed me when no one else did. Today my daughter is back in school.",
    location: "Pune, Maharashtra",
  },
  {
    image: "/people-card-2.png",
    alt: "Daily wage worker standing with fellow workers behind him",
    quote:
      "When our wages were withheld, HRSJM stood with us until we received what we had earned.",
    location: "Nashik, Maharashtra",
  },
  {
    image: "/people-card-5.png",
    alt: "Elderly villager looking towards the sun outside his home",
    quote:
      "After the flood, their volunteers were the first to reach our village and the last to leave.",
    location: "Gorakhpur, Uttar Pradesh",
  },
  {
    image: "/card-1.png",
    alt: "HRSJM field worker speaking with a group of women during a community visit",
    quote:
      "They sat with us, listened to our problem and explained every step in our own language.",
    location: "Latur, Maharashtra",
  },
  {
    image: "/card-2.png",
    alt: "Legal aid lawyer advising a client at his office desk",
    quote:
      "The legal aid cell fought my case for two years and never let me feel alone in it.",
    location: "Bhiwandi, Maharashtra",
  },
  {
    image: "/card-3.png",
    alt: "Awareness session underway under a tree in a rural village",
    quote:
      "Their village meetings taught us our rights and how to stand up for them together.",
    location: "Rewari, Haryana",
  },
  {
    image: "/card-4.png",
    alt: "Trainer leading a skills workshop for young women in a classroom",
    quote:
      "The skills training gave me a livelihood and the confidence to stand on my own.",
    location: "Indore, Madhya Pradesh",
  },
];

const getVisibleCount = () => {
  if (window.matchMedia("(max-width: 639px)").matches) return 1;
  if (window.matchMedia("(max-width: 1023px)").matches) return 2;
  return 3;
};

/* Continuous slow marquee: drifts forward one card every ~5s, looping
   forever and wrapping modulo stories.length. Arrows and swipes glide one
   card on top of the drift. The track renders the stories twice - the
   second copy stands in for the first whenever the offset crosses a full
   cycle. Drift pauses on hover/focus and while off-screen. */
const DRIFT_CARDS_PER_SECOND = 1 / 5;
const GLIDE_DURATION_MS = 600;

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

export default function SupportedStories() {
  const sectionRef = useScrollReveal(styles);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const offsetRef = useRef(0);
  const glideRef = useRef<{ from: number; to: number; start: number } | null>(null);
  const visibleRef = useRef(3);
  const reducedRef = useRef(false);
  const pausedRef = useRef(false);
  const inViewRef = useRef(true);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    let offset = offsetRef.current % stories.length;
    if (offset < 0) offset += stories.length;
    offsetRef.current = offset;
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
    const carousel = carouselRef.current;
    if (!carousel) return;

    const updateVisible = () => {
      setVisibleCount(getVisibleCount());
      applyTransform();
    };
    updateVisible();

    const wideQuery = window.matchMedia("(max-width: 1023px)");
    const narrowQuery = window.matchMedia("(max-width: 639px)");
    wideQuery.addEventListener("change", updateVisible);
    narrowQuery.addEventListener("change", updateVisible);

    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedRef.current) {
      return () => {
        wideQuery.removeEventListener("change", updateVisible);
        narrowQuery.removeEventListener("change", updateVisible);
      };
    }

    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      const glide = glideRef.current;
      if (glide) {
        const progress = Math.min((now - glide.start) / GLIDE_DURATION_MS, 1);
        offsetRef.current =
          glide.from + (glide.to - glide.from) * easeOutCubic(progress);
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
      wideQuery.removeEventListener("change", updateVisible);
      narrowQuery.removeEventListener("change", updateVisible);
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
    <section ref={sectionRef} className={styles.stories} aria-labelledby="stories-heading">
      <div className={styles.storiesInner}>
        <div className={styles.storiesIntro}>
          <p className={styles.storiesEyebrow} data-reveal>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Real Stories
          </p>
          <h2 id="stories-heading" className={styles.storiesHeading} data-reveal style={revealDelay(1)}>
            People We Have Supported
          </h2>
          <p className={styles.storiesDescription} data-reveal style={revealDelay(2)}>
            Every case is a person whose life can be changed. Here are a few
            stories of individuals and communities who received support
            through HRSJM.
          </p>
          <div className={styles.storiesNav} data-reveal style={revealDelay(3)}>
            <button
              type="button"
              className={styles.storiesNavButton}
              aria-label="Previous stories"
              onClick={() => nudge(-1)}
            >
              <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.storiesNavButton}
              aria-label="Next stories"
              onClick={() => nudge(1)}
            >
              <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div ref={carouselRef} className={styles.storiesCarousel}>
          <div
            className={styles.storiesViewport}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <ul ref={trackRef} className={styles.storiesTrack} aria-label="Support stories">
              {[0, 1].map((copy) =>
                stories.map(({ image, alt, quote, location }, index) => (
                  <li
                    key={`${copy}-${location}`}
                    className={styles.storiesCard}
                    data-reveal-item={copy === 0 || undefined}
                    style={
                      {
                        "--visible": visibleCount,
                        ...(copy === 0 ? revealStagger(index) : {}),
                      } as CSSProperties
                    }
                    aria-hidden={copy === 1 || undefined}
                    inert={copy === 1 || undefined}
                  >
                    <div className={styles.storiesCardBox}>
                      <div className={styles.storiesCardImage}>
                        <Image
                          src={image}
                          alt={alt}
                          fill
                          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 45vw, 300px"
                          style={{ objectFit: "cover", objectPosition: "center 30%" }}
                        />
                      </div>
                      <div className={styles.storiesCardBody}>
                        <blockquote className={styles.storiesQuote}>
                          &ldquo;{quote}&rdquo;
                        </blockquote>
                        <p className={styles.storiesLocation}>
                          <span className={styles.storiesLocationDash} aria-hidden="true" />
                          {location}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}