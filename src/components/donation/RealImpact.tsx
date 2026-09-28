"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./donation.module.css";

interface Story {
  quote: string;
  attribution: string;
  image: string;
  alt: string;
}

const stories: Story[] = [
  {
    quote:
      "HRSJM helped me get justice when I had nowhere else to go. Your support gave me hope.",
    attribution: "Mumtaz, Maharashtra",
    image: "/images/story-1.png",
    alt: "A woman in an orange and brown headscarf shares her story of getting justice.",
  },
  {
    quote:
      "The awareness program changed our entire village. We now know our rights.",
    attribution: "Nandurbar, Maharashtra",
    image: "/images/story-6.png",
    alt: "A smiling boy in a village classroom after an awareness program.",
  },
  {
    quote: "With legal support, our community found hope and a voice.",
    attribution: "Satyenagar, Delhi",
    image: "/images/story-2.png",
    alt: "A man in a dark blue shirt standing before members of his community.",
  },
  {
    quote: "Education gave my children a future full of possibilities.",
    attribution: "Nashik, Maharashtra",
    image: "/images/story-3.png",
    alt: "A young student listening in a community education setting.",
  },
  {
    quote: "Knowing our rights gave us the confidence to speak up.",
    attribution: "Mumbai, Maharashtra",
    image: "/images/story-4.png",
    alt: "A young woman carrying her books on her way to study.",
  },
  {
    quote: "At this age, HRSJM stood by me with dignity and care.",
    attribution: "Satara, Maharashtra",
    image: "/images/story-5.png",
    alt: "An elderly man from a rural village.",
  },
];

const getVisibleCount = () => {
  if (typeof window === "undefined") return 3;
  if (window.matchMedia("(max-width: 639px)").matches) return 1;
  if (window.matchMedia("(max-width: 1023px)").matches) return 2;
  return 3;
};

export default function RealImpact() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(0);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const maxIndex = Math.max(0, stories.length - visibleCount);
  // Derived clamp: keeps the track in range when the viewport changes
  // without storing stale state (index is only ever set through goTo).
  const clampedIndex = Math.min(index, maxIndex);

  useEffect(() => {
    const updateVisible = () => {
      setVisibleCount(getVisibleCount());
    };
    updateVisible();

    const wideQuery = window.matchMedia("(max-width: 1023px)");
    const narrowQuery = window.matchMedia("(max-width: 639px)");
    wideQuery.addEventListener("change", updateVisible);
    narrowQuery.addEventListener("change", updateVisible);
    return () => {
      wideQuery.removeEventListener("change", updateVisible);
      narrowQuery.removeEventListener("change", updateVisible);
    };
  }, []);

  const goTo = (next: number) => {
    setIndex(Math.min(Math.max(next, 0), maxIndex));
  };

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
    goTo(clampedIndex + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      className={styles.impact}
      aria-labelledby="real-impact-heading"
    >
      <div className={styles.container}>
        <div className={styles.impactLayout}>
          <div className={styles.impactIntro}>
            <p className={styles.eyebrowGold}>Real Impact</p>
            <h2 id="real-impact-heading" className={styles.sectionHeading}>
              Lives Changed
              <br />
              Through Your Support
            </h2>
            <p className={styles.sectionDescription}>
              Your contributions have helped thousands of individuals and
              communities across India. Here are some real stories of change
              made possible by donors like you.
            </p>
            <Link href="/about" className={styles.btnGoldSmall}>
              View More Stories
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.carousel}>
            <div
              className={styles.carouselViewport}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
            >
              <ul
                className={styles.carouselTrack}
                style={
                  {
                    "--visible": visibleCount,
                    "--index": clampedIndex,
                  } as React.CSSProperties
                }
              >
                {stories.map((story) => (
                  <li
                    key={story.attribution}
                    className={styles.carouselSlide}
                  >
                    <article className={styles.storyCard}>
                      <span className={styles.storyImageWrap}>
                        <Image
                          src={story.image}
                          alt={story.alt}
                          fill
                          sizes="(max-width: 639px) 86vw, (max-width: 1023px) 44vw, 260px"
                          className={styles.storyImage}
                        />
                      </span>
                      <span className={styles.storyBody}>
                        <span className={styles.storyQuote}>
                          &ldquo;{story.quote}&rdquo;
                        </span>
                        <span className={styles.storyAttribution}>
                          &mdash; {story.attribution}
                        </span>
                      </span>
                    </article>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className={styles.carouselControl}
              data-side="prev"
              onClick={() => goTo(clampedIndex - 1)}
              disabled={clampedIndex === 0}
              aria-label="Previous stories"
            >
              <ChevronLeft size={17} strokeWidth={2.2} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.carouselControl}
              data-side="next"
              onClick={() => goTo(clampedIndex + 1)}
              disabled={clampedIndex === maxIndex}
              aria-label="Next stories"
            >
              <ChevronRight size={17} strokeWidth={2.2} aria-hidden="true" />
            </button>

            <div className={styles.carouselDots} role="group" aria-label="Story pages">
              {Array.from({ length: maxIndex + 1 }, (_, dot) => (
                <button
                  key={dot}
                  type="button"
                  className={styles.carouselDot}
                  data-active={dot === clampedIndex || undefined}
                  aria-label={`Go to story ${dot + 1}`}
                  aria-current={dot === clampedIndex || undefined}
                  onClick={() => goTo(dot)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
