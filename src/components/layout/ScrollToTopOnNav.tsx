"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTopOnNav() {
  const pathname = usePathname();

  useEffect(() => {
    // If URL targets a specific anchor hash (e.g., #donate), do not override
    if (typeof window !== "undefined" && window.location.hash) {
      return;
    }

    // Smoothly scroll to the very top (scroll 0) on route change
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Additional checks to ensure scroll remains at 0 once dynamic page content mounts
    const t1 = setTimeout(() => {
      if (typeof window !== "undefined" && window.scrollY > 0 && !window.location.hash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 60);

    const t2 = setTimeout(() => {
      if (typeof window !== "undefined" && window.scrollY > 0 && !window.location.hash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 180);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}
