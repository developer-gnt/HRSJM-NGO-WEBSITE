"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal, revealDelay, revealStagger } from "@/hooks/useScrollReveal";
import styles from "./news.module.css";

interface Voice {
  image: string;
  alt: string;
  quote: string;
  name: string;
  location: string;
  imagePosition?: string;
}

const voices: Voice[] = [
  {
    image: "/images/story-1.png",
    alt: "Portrait of a community member standing among his neighbours",
    quote: "Your guidance gave me confidence to speak up for my rights.",
    name: "Rahul Desai",
    location: "Community Member, Maharashtra",
  },
  {
    image: "/images/story-5.png",
    alt: "Portrait of a smiling student in a classroom",
    quote: "Awareness programs helped our community understand our rights.",
    name: "Sunita Dasi",
    location: "Community Volunteer, Mumbai",
  },
  {
    image: "/images/story-3.png",
    alt: "Portrait of a woman wearing a traditional headscarf",
    quote: "Legal support helped me understand what steps I could take.",
    name: "Aditi Tirkha",
    location: "Community Member, Delhi",
  },
  {
    image: "/images/story-4.png",
    alt: "Portrait of a young student carrying her books",
    quote: "Small actions can create meaningful change.",
    name: "Ravi Raut",
    location: "Community Partner, Maharashtra",
  },
  {
    image: "/images/story-2.png",
    alt: "Portrait of a young girl attending an awareness session",
    quote: "The workshops taught me that every voice matters.",
    name: "Meera Joshi",
    location: "Youth Volunteer, Nagpur",
  },
  {
    image: "/images/story-6.png",
    alt: "Portrait of an elderly farmer in his village",
    quote: "With the right support, our village finally got its due.",
    name: "Shankar Patil",
    location: "Community Elder, Palghar",
  },
  {
    image: "/images/take-action-bg.png",
    imagePosition: "14% 30%",
    alt: "Portrait of a girl standing with a crowd at a community gathering",
    quote: "Knowing my rights changed how I face the world every day.",
    name: "Kavita More",
    location: "Community Member, Pune",
  },
  {
    image: "/images/complaint-cta-bg.png",
    imagePosition: "16% 26%",
    alt: "Portrait of a boy smiling at a community event",
    quote: "HRSJM stood by our family when we needed help the most.",
    name: "Arjun Kale",
    location: "Youth Member, Thane",
  },
];

/* Autoplay cadence for the looping carousel. */
const AUTOPLAY_MS = 4500;

export default function CommunityVoices() {
  const sectionRef = useScrollReveal(styles);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const pausedRef = useRef(false);

  /* Width of one full copy of the card list (cards + gaps). */
  const getCopyWidth = () => {
    const track = trackRef.current;
    const card = track?.querySelector("li");
    if (!track || !card) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 20;
    return voices.length * (card.getBoundingClientRect().width + gap);
  };

  /* The list is rendered twice; while the viewport sits inside the second
     (cloned) copy, snap silently back to the identical spot in the first
     copy. The jump is invisible, so the row loops forever. */
  const normalizeScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const copyWidth = getCopyWidth();
    if (copyWidth > 0 && track.scrollLeft >= copyWidth) {
      track.scrollLeft -= copyWidth;
    }
  };

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 20;
    const step = card.getBoundingClientRect().width + gap;
    /* Sliding backward from the very start: slip into the cloned tail
       first (invisible), then glide back one card. */
    if (direction === -1 && track.scrollLeft < step) {
      track.scrollLeft += getCopyWidth();
    }
    track.scrollBy({ left: direction * step, behavior: "smooth" });
    /* Fallback normalization for browsers without the scrollend event. */
    window.setTimeout(normalizeScroll, 700);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onSettled = () => normalizeScroll();
    track.addEventListener("scrollend", onSettled);
    return () => track.removeEventListener("scrollend", onSettled);
    // normalizeScroll only reads refs; safe to omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) {
        normalizeScroll();
        scrollByCard(1);
      }
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className={styles.voices} aria-labelledby="voices-heading">
      <div className={styles.sectionInner}>
        <div className={styles.voicesHeader} data-reveal>
          <div>
            <p className={styles.sectionEyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Real People. Real Impact.
            </p>
            <h2 id="voices-heading" className={styles.sectionTitle}>
              Voices from the Community
            </h2>
          </div>

          <div className={styles.voicesControls}>
            <Link href="#latest-news" className={styles.viewAll}>
              View All Stories
              <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <div className={styles.voicesArrows}>
              <button
                type="button"
                className={styles.voicesArrow}
                onClick={() => scrollByCard(-1)}
                aria-label="Previous stories"
              >
                <ChevronLeft size={17} strokeWidth={2} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={styles.voicesArrow}
                onClick={() => scrollByCard(1)}
                aria-label="Next stories"
              >
                <ChevronRight size={15} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <ul
          ref={trackRef}
          className={styles.voicesTrack}
          aria-label="Community stories"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
        >
          {/* The list is rendered twice: the second pass only exists so the
              loop can glide past the "end" and continue from the first card. */}
          {[...voices, ...voices].map(({ image, alt, quote, name, location, imagePosition }, index) => (
            <li
              key={`${name}-${index < voices.length ? "a" : "b"}`}
              className={styles.voiceCard}
              aria-hidden={index >= voices.length ? true : undefined}
              data-reveal-item
              style={revealStagger(index % voices.length)}
            >
              <div className={styles.voicePortrait}>
                <Image
                  src={image}
                  alt={index < voices.length ? alt : ""}
                  fill
                  sizes="(max-width: 639px) 86vw, (max-width: 1023px) 45vw, 300px"
                  style={{
                    objectFit: "cover",
                    ...(imagePosition ? { objectPosition: imagePosition } : {}),
                  }}
                />
              </div>
              <div className={styles.voiceBody}>
                <span className={styles.voiceAccent} aria-hidden="true" />
                <blockquote className={styles.voiceQuote}>{quote}</blockquote>
                <p className={styles.voiceName}>{name}</p>
                <p className={styles.voiceLocation}>{location}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
