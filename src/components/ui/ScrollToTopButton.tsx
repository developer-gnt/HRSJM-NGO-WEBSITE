"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import styles from "./scrollToTopButton.module.css";

function findHeroElement(): HTMLElement | null {
  if (typeof document === "undefined") return null;

  // 1. Selector for explicit hero elements
  const explicitHero = document.querySelector<HTMLElement>(
    'section[class*="hero" i], div[class*="hero" i], [data-hero], #hero'
  );
  if (explicitHero) return explicitHero;

  // 2. First section element inside main
  const firstSection = document.querySelector<HTMLElement>(
    'main section:first-of-type, [role="main"] section:first-of-type'
  );
  if (firstSection) return firstSection;

  // 3. First major child block inside main
  const firstChild = document.querySelector<HTMLElement>(
    'main > *:first-child, [role="main"] > *:first-child'
  );
  if (firstChild) return firstChild;

  return null;
}

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const checkBoundary = useCallback(() => {
    const hero = findHeroElement();
    if (hero) {
      const rect = hero.getBoundingClientRect();
      // Button must remain completely hidden throughout the entire hero section
      // and become visible only once the user scrolls into the second section
      // (when the hero section's bottom boundary has scrolled completely above the viewport)
      const isPastHero = rect.bottom <= 0;
      setIsVisible(isPastHero);
    } else {
      // Fallback if no hero section exists on the page
      setIsVisible(window.scrollY > 400);
    }
  }, []);

  const handleScrollToTop = () => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    // Reset visibility immediately upon route change
    setIsVisible(false);

    // Disconnect any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const hero = findHeroElement();

    if (hero && typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;

          // If hero intersects viewport at all, keep button hidden
          if (entry.isIntersecting) {
            setIsVisible(false);
          } else if (entry.boundingClientRect.bottom <= 0) {
            // Hero has scrolled completely past the top of the viewport
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        },
        {
          root: null,
          threshold: 0,
        }
      );

      observer.observe(hero);
      observerRef.current = observer;
    }

    // Scroll & resize handler using requestAnimationFrame
    let rafId: number | null = null;
    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        checkBoundary();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    // Initial check after paint
    const timer = setTimeout(checkBoundary, 60);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      clearTimeout(timer);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [pathname, checkBoundary]);

  return (
    <button
      type="button"
      className={`${styles.scrollButton} ${isVisible ? styles.visible : ""}`}
      onClick={handleScrollToTop}
      aria-label="Scroll to top"
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
    >
      <ArrowUp className={styles.icon} aria-hidden="true" strokeWidth={2.5} />
    </button>
  );
}
