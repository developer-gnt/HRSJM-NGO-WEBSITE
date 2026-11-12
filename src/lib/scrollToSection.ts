import type { MouseEvent } from "react";

/**
 * Smoothly scrolls to a same-page section every time a hash anchor is clicked,
 * even when the browser URL already matches the target hash.
 */
export function scrollToSection(
  event: MouseEvent<HTMLAnchorElement>,
  sectionId: string
): void {
  const target = document.getElementById(sectionId);
  if (!target) return;

  event.preventDefault();
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  target.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "start",
  });

  const targetHash = `#${sectionId}`;
  if (window.location.hash !== targetHash) {
    window.history.pushState(null, "", targetHash);
  }
}

