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
import ActivityCard, { type ActivityItem } from "./ActivityCard";
import Icon from "@/components/ui/Icon";
import { formatEventDate, resolveEventCoverImage } from "@/lib/backendApi";
import styles from "./events.module.css";

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

export default function PastActivities({
  initialActivities,
}: {
  initialActivities?: ActivityItem[];
}) {
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities || []);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(4);

  // Fetch real completed events from database on mount if not provided via SSR
  useEffect(() => {
    let isMounted = true;
    async function loadPastEvents() {
      try {
        const res = await fetch("/api/events?status=COMPLETED&limit=50", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.items)) {
          const mapped: ActivityItem[] = data.items.map((event: any) => ({
            id: event.id,
            title: event.title,
            subtitle: event.short_information || event.description?.slice(0, 80) || undefined,
            date: formatEventDate(event.start_at),
            location: event.location || event.address || "India",
            category: event.category || "Community",
            image: resolveEventCoverImage(event.cover_image_url, event.category),
            href: `/events/${event.id}`,
          }));
          if (isMounted) {
            setActivities(mapped);
          }
        }
      } catch (err) {
        console.warn("Could not fetch completed events for past activities:", err);
      }
    }
    loadPastEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute categories dynamically from actual database records
  const categories = useMemo(() => {
    const cats = new Set<string>(["All"]);
    activities.forEach((item) => {
      if (item.category && item.category.trim()) {
        cats.add(item.category.trim());
      }
    });
    return Array.from(cats);
  }, [activities]);

  const filteredActivities = useMemo(() => {
    return activeCategory === "All"
      ? activities
      : activities.filter((activity) => activity.category.toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory, activities]);

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
        : activities.filter((activity) => activity.category.toLowerCase() === category.toLowerCase());
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

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (glideRef.current) {
        const { from, to, start } = glideRef.current;
        const elapsed = now - start;
        const progress = Math.min(1, elapsed / GLIDE_DURATION_MS);
        const eased = easeOutCubic(progress);

        offsetRef.current = from + (to - from) * eased;

        if (progress >= 1) {
          offsetRef.current = to;
          glideRef.current = null;
        }

        while (offsetRef.current >= N * 2) offsetRef.current -= N;
        while (offsetRef.current < N) offsetRef.current += N;

        applyTransform();
      } else if (!pausedRef.current && inViewRef.current && !isDragging.current) {
        offsetRef.current += dt * DRIFT_CARDS_PER_SECOND;
        while (offsetRef.current >= N * 2) offsetRef.current -= N;
        applyTransform();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [N, applyTransform]);

  // IntersectionObserver to pause when off-screen
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  // Pointer drag interactions
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (N === 0) return;
    pointerStart.current = { x: e.clientX, y: e.clientY };
    isDragging.current = false;
    glideRef.current = null;
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointerStart.current || N === 0) return;
    const dx = e.clientX - pointerStart.current.x;

    if (!isDragging.current && Math.abs(dx) > 6) {
      isDragging.current = true;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
    }

    if (isDragging.current) {
      const carouselWidth = carouselRef.current?.offsetWidth || 1;
      const cardWidth = carouselWidth / visibleRef.current;
      const deltaCards = dx / cardWidth;

      offsetRef.current -= deltaCards;
      pointerStart.current = { x: e.clientX, y: e.clientY };

      while (offsetRef.current >= N * 2) offsetRef.current -= N;
      while (offsetRef.current < N) offsetRef.current += N;

      applyTransform();
    }
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      glideRef.current = {
        from: offsetRef.current,
        to: Math.round(offsetRef.current),
        start: performance.now(),
      };
    }
    pointerStart.current = null;
    setTimeout(() => {
      isDragging.current = false;
    }, 50);
  };

  const handleClickCapture = (e: ReactMouseEvent) => {
    if (isDragging.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      nudge(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nudge(1);
    }
  };

  return (
    <section
      id="past-activities"
      className={styles.past}
      aria-labelledby="past-heading"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onFocusCapture={() => {
        pausedRef.current = true;
      }}
      onBlurCapture={() => {
        pausedRef.current = false;
      }}
    >
      <div className={styles.sectionInner}>
        <div className={styles.pastHeader}>
          <div>
            <p className={styles.sectionEyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Past Events
            </p>
            <h2 id="past-heading" className={styles.pastTitle}>
              Our Activities in Action
            </h2>
            <p className={styles.pastSub}>
              A look at some of our recent programs and community initiatives.
            </p>
          </div>

          <ul className={styles.categoryPills} role="tablist" aria-label="Filter activities by category">
            {categories.map((category) => (
              <li key={category} role="presentation">
                <button
                  type="button"
                  role="tab"
                  className={`${styles.pill} ${
                    category === activeCategory ? styles.pillActive : ""
                  }`}
                  aria-selected={category === activeCategory}
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
