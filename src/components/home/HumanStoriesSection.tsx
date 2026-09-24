"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import eventsData from "@/data/events.json";
import styles from "./humanStories.module.css";

interface Story {
  title: string;
  quote: string;
  location: string;
  image: string;
  alt: string;
}

const stories: Story[] = [
  {
    title: "From Silence to Strength",
    quote: "HRSJM gave me a voice and a new future.",
    location: "Mumbai, Maharashtra",
    image: "/images/story-1.png",
    alt: "A woman in an orange and brown headscarf shares her story of finding her voice.",
  },
  {
    title: "Justice for Our Community",
    quote: "With legal support, our community found hope.",
    location: "Satyenagar, Delhi",
    image: "/images/story-2.png",
    alt: "A man in a blue shirt standing before members of his community.",
  },
  {
    title: "Education Changes Lives",
    quote: "I can now dream of a brighter tomorrow.",
    location: "Nashik, Maharashtra",
    image: "/images/story-3.png",
    alt: "A young student in a community education setting.",
  },
  {
    title: "Community Voices",
    quote: "Together, our voices can create meaningful change.",
    location: "Mumbai, Maharashtra",
    image: "/images/story-4.png",
    alt: "A young woman carrying her books on her way to study.",
  },
  {
    title: "Dignity & Justice",
    quote: "Everyone deserves dignity, support and justice.",
    location: "Maharashtra, India",
    image: "/images/story-5.png",
    alt: "An elderly man from a rural village.",
  },
  {
    title: "A Brighter Tomorrow",
    quote: "Education gives every child a reason to dream.",
    location: "Maharashtra, India",
    image: "/images/story-6.png",
    alt: "A smiling child in a classroom setting.",
  },
];

const getVisibleCount = () => {
  if (window.matchMedia("(max-width: 639px)").matches) return 1;
  if (window.matchMedia("(max-width: 1023px)").matches) return 2;
  return 3;
};

export default function HumanStoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(0);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const maxIndex = stories.length - visibleCount;
  const clampedIndex = Math.min(index, maxIndex);

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

  const prevStories = () => setIndex((current) => Math.max(0, current - 1));
  const nextStories = () =>
    setIndex((current) => Math.min(stories.length - visibleCount, current + 1));

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
    if (dx < 0) nextStories();
    else prevStories();
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
              <Link href="/stories" className={styles.cta}>
                View All Stories
                <Icon name="arrow" width={16} height={16} />
              </Link>
            </div>
          </div>

          <div
            className={styles.carousel}
            data-reveal
            style={{ "--reveal-delay": 2 } as React.CSSProperties}
          >
            <div
              className={styles.viewport}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
            >
              <ul
                className={styles.track}
                style={{ transform: `translateX(-${clampedIndex * (100 / visibleCount)}%)` }}
              >
                {stories.map((story) => (
                  <li
                    key={story.title}
                    className={styles.slide}
                    style={{ "--visible": visibleCount } as React.CSSProperties}
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
                ))}
              </ul>
            </div>

            <button
              type="button"
              className={styles.control}
              data-side="prev"
              onClick={prevStories}
              disabled={clampedIndex === 0}
              aria-label="Previous stories"
            >
              <Icon name="chevronLeft" width={16} height={16} />
            </button>
            <button
              type="button"
              className={styles.control}
              data-side="next"
              onClick={nextStories}
              disabled={clampedIndex === maxIndex}
              aria-label="Next stories"
            >
              <Icon name="chevronRight" width={16} height={16} />
            </button>
          </div>

          <div className={styles.events}>
            <div className={styles.eventsHead} data-reveal>
              <h3 className={styles.eventsHeading}>Events &amp; Activities</h3>
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
