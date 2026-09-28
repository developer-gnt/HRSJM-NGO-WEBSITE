"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CircleDot } from "lucide-react";
import styles from "./membership.module.css";

interface Story {
  quote: string;
  attribution: string;
  image: string;
  alt: string;
}

const stories: Story[] = [
  {
    quote:
      "HRSJM helped me get justice when I had nowhere else to go. Their support gave me hope.",
    attribution: "Mumtaz, Maharashtra",
    image: "/images/story-1.png",
    alt: "A woman in an orange and brown headscarf shares her story of getting justice.",
  },
  {
    quote:
      "They guided me through the legal process and stood by my family during a difficult time.",
    attribution: "Satyenagar, Delhi",
    image: "/images/story-2.png",
    alt: "A man in a dark blue shirt standing before members of his community.",
  },
  {
    quote:
      "The counselling support helped me and my children rebuild our lives.",
    attribution: "Nandurbar, Maharashtra",
    image: "/images/story-6.png",
    alt: "A smiling boy in a village classroom after receiving support.",
  },
  {
    quote:
      "The awareness sessions taught me and my friends about our rights.",
    attribution: "Nashik, Maharashtra",
    image: "/images/story-3.png",
    alt: "A young student listening in a community education setting.",
  },
  {
    quote: "With HRSJM's support, our community finally had a voice.",
    attribution: "Mumbai, Maharashtra",
    image: "/images/story-4.png",
    alt: "A young woman carrying her books on her way to study.",
  },
  {
    quote: "They stood by me with dignity when I needed help the most.",
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

export default function MembershipStories() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(0);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const maxIndex = Math.max(0, stories.length - visibleCount);
  const clampedIndex = Math.min(index, maxIndex);

  useEffect(() => {
    const updateVisible = () => setVisibleCount(getVisibleCount());
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
      className={styles.stories}
      aria-labelledby="membership-stories-heading"
    >
      <div className={styles.container}>
        <div className={styles.storiesLayout}>
          <div className={styles.storiesIntro}>
            <p className={styles.storiesEyebrow}>
              <CircleDot size={15} strokeWidth={2} aria-hidden="true" />
              Real Stories
            </p>
            <h2
              id="membership-stories-heading"
              className={styles.storiesHeading}
            >
              People We Have Supported
            </h2>
            <p className={styles.storiesDescription}>
              Every case is a person whose life can be changed. Here are a few
              stories of individuals and communities who received support
              through HRSJM.
            </p>

            <div className={styles.storiesControls}>
              <button
                type="button"
                className={styles.storiesControl}
                onClick={() => goTo(clampedIndex - 1)}
                disabled={clampedIndex === 0}
                aria-label="Previous stories"
              >
                <ArrowLeft size={17} strokeWidth={2} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={styles.storiesControl}
                onClick={() => goTo(clampedIndex + 1)}
                disabled={clampedIndex === maxIndex}
                aria-label="Next stories"
              >
                <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            className={styles.storiesViewport}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <ul
              className={styles.storiesTrack}
              style={
                {
                  width: `${(stories.length / visibleCount) * 100}%`,
                  transform: `translateX(-${(clampedIndex / stories.length) * 100}%)`,
                } as React.CSSProperties
              }
            >
              {stories.map((story) => (
                <li key={story.attribution} className={styles.storiesSlide}>
                  <article className={styles.storiesCard}>
                    <span className={styles.storiesImageWrap}>
                      <Image
                        src={story.image}
                        alt={story.alt}
                        fill
                        sizes="(max-width: 639px) 88vw, (max-width: 1023px) 44vw, 250px"
                        className={styles.storiesImage}
                      />
                    </span>
                    <span className={styles.storiesBody}>
                      <span className={styles.storiesQuote}>
                        &ldquo;{story.quote}&rdquo;
                      </span>
                      <span className={styles.storiesAttribution}>
                        &mdash; {story.attribution}
                      </span>
                    </span>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
