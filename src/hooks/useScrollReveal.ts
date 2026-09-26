"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/* Shared scroll-reveal used by the HRSJM sections: the section root gets an
   "armed" class on mount (skipped when the user prefers reduced motion) and
   an IntersectionObserver flips it to "revealed" the first time it enters
   the viewport. Elements inside animate via [data-reveal] / [data-reveal-item]
   attributes styled in the section's CSS module. */
export function useScrollReveal(styles: Readonly<Record<string, string>>) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    node.classList.add(styles.armed);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.classList.add(styles.revealed);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
    // styles is a stable CSS-module import; safe to omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/* Stepped reveal delay for sequential elements (90ms per step, as used
   across the HRSJM home sections). */
export const revealDelay = (steps: number): CSSProperties =>
  ({ "--reveal-delay": `${steps * 90}ms` }) as CSSProperties;

/* Stagger index for repeated cards/items (70ms per index). */
export const revealStagger = (index: number): CSSProperties =>
  ({ "--stagger": index }) as CSSProperties;
