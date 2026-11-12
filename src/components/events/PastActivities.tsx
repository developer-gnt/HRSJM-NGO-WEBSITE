"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type MouseEvent as ReactMouseEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import activitiesData from "@/data/activities.json";
import ActivityCard, { type ActivityItem } from "./ActivityCard";
import Icon from "@/components/ui/Icon";
import styles from "./events.module.css";

const categories = [
  "All",
  "Awareness",
  "Legal Aid",
  "Community Outreach",
];

const activities: ActivityItem[] = activitiesData;

const DRIFT_CARDS_PER_SECOND = 1 / 5; // Gently drift 1 card every 5 seconds
const GLIDE_DURATION_MS = 600;

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

const getVisibleCount = () => {
  if (typeof window === "undefined") return 4;
  if (window.matchMedia("(max-width: 639px)").matches) return 1;
  if (window.matchMedia("(max-width: 899px)").matches) return 2;
  if (window.matchMedia("(max-width: 1199px)").matches) return 3;
  return 4;
};

export default function PastActivities() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(4);

  const filteredActivities = useMemo(() => {
    return activeCategory === "All"
      ? activities
      : activities.filter((activity) => activity.category === activeCategory);
  }, [activeCategory]);

  const N = filteredActivities.length;
  const repeatCount = N > 0 ? Math.max(3, Math.ceil(18 / N)) : 0;

  const duplicatedActivities = useMemo(() => {
    if (N === 0) return [];
    const list: (ActivityItem & { loopKey: string })[] = [];
    for (let r = 0; r < repeatCount; r++) {
      for (const item of filteredActivities) {
        list.push({ ...item, loopKey: `${r}-${item.id}` });
      }
    }
    return list;
  }, [filteredActivities, repeatCount, N]);

  const offsetRef = useRef(N);
  const glideRef = useRef<{ from: number; to: number; start: number } | null>(null);
  const pausedRef = useRef(false);
  const inViewRef = useRef(true);
  const visibleRef = useRef(4);
  const reducedRef = useRef(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const isDragging = useRef(false);

  const trackRef = useRef<HTMLUListElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track || N === 0) return;
    track.style.transform = `translateX(${(-offsetRef.current * 100) / visibleRef.current}%)`;
  }, [N]);

  const nudge = useCallback(
    (direction: 1 | -1) => {
      if (N === 0) return;

      if (reducedRef.current) {
        offsetRef.current += direction;
        while (offsetRef.current >= N * 2) offsetRef.current -= N;
        while (offsetRef.current < N) offsetRef.current += N;
        applyTransform();
        return;
      }

      const currentTarget = glideRef.current ? glideRef.current.to : offsetRef.current;
      let from = offsetRef.current;
      let to = currentTarget + direction;

      // Keep from and to safely in positive range when gliding backwards
      if (direction < 0 && from < N) {
        from += N;
        to += N;
        offsetRef.current = from;
      }

      glideRef.current = {
        from,
        to,
        start: performance.now(),
      };
    },
    [applyTransform, N]
  );

  // Responsive visible count tracking
  useEffect(() => {
    const updateVisible = () => setVisibleCount(getVisibleCount());
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  useEffect(() => {
    visibleRef.current = visibleCount;
    applyTransform();
  }, [visibleCount, applyTransform]);

  // Reset offset and align when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const newFiltered =
      category === "All"
        ? activities
        : activities.filter((activity) => activity.category === category);
    offsetRef.current = newFiltered.length;
    glideRef.current = null;
  };

  // Continuous drift & glide animation loop
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || N === 0) return;

    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    offsetRef.current = N;
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
        if (progress >= 1) {
          offsetRef.current = glide.to;
          glideRef.current = null;
          while (offsetRef.current >= N * 2) offsetRef.current -= N;
          while (offsetRef.current < N) offsetRef.current += N;
        }
      } else if (!pausedRef.current && inViewRef.current) {
        offsetRef.current += DRIFT_CARDS_PER_SECOND * (dt / 1000);
        if (offsetRef.current >= N * 2) {
          offsetRef.current -= N;
        }
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
  }, [applyTransform, N]);

  // Touch and drag handling
  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
    isDragging.current = false;
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointerStart.current) return;
    const dx = event.clientX - pointerStart.current.x;
    if (Math.abs(dx) > 8) {
      isDragging.current = true;
    }
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy)) {
      nudge(dx < 0 ? 1 : -1);
    }
    setTimeout(() => {
      isDragging.current = false;
    }, 60);
  };

  const handleClickCapture = (event: ReactMouseEvent) => {
    if (isDragging.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const onKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      nudge(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      nudge(1);
    }
  };

  return (
    <section
      id="activities"
      className={styles.pastActivities}
      aria-labelledby="past-activities-heading"
    >
      <div className={styles.sectionInner}>
        <div className={styles.pastHeader}>
          <div>
            <p className={styles.sectionEyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Past Events
            </p>
            <h2 id="past-activities-heading" className={styles.pastTitle}>
              Our Activities in Action
            </h2>
            <p className={styles.pastSub}>
              A look at some of our recent programs and community initiatives.
            </p>
          </div>

          <ul className={styles.pastFilters} aria-label="Filter activities by category">
            {categories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  className={
                    category === activeCategory
                      ? `${styles.filterBtn} ${styles.filterBtnActive}`
                      : styles.filterBtn
                  }
                  aria-pressed={category === activeCategory}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {filteredActivities.length > 0 ? (
          <div className={styles.sliderContainer}>
            <div
              ref={carouselRef}
              className={styles.carousel}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onClickCapture={handleClickCapture}
              tabIndex={0}
              onKeyDown={onKeyDown}
              role="region"
              aria-label="Past activities slider"
            >
              <div className={styles.viewport}>
                <ul ref={trackRef} className={styles.track}>
                  {duplicatedActivities.map((activity) => (
                    <li
                      key={activity.loopKey}
                      className={styles.slide}
                      style={{ "--visible": visibleCount } as React.CSSProperties}
                    >
                      <ActivityCard activity={activity} />
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className={styles.sliderArrow}
                data-side="prev"
                onClick={() => nudge(-1)}
                aria-label="Previous activities"
              >
                <Icon name="chevronLeft" width={18} height={18} />
              </button>
              <button
                type="button"
                className={styles.sliderArrow}
                data-side="next"
                onClick={() => nudge(1)}
                aria-label="Next activities"
              >
                <Icon name="chevronRight" width={18} height={18} />
              </button>
            </div>
          </div>
        ) : (
          <p className={styles.pastEmpty}>No activities found in this category.</p>
        )}
      </div>
    </section>
  );
}
