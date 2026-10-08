"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import allEventsData from "@/data/all-events.json";
import EventCard, { type EventItem } from "./EventCard";
import shared from "./events.module.css";
import styles from "./allEvents.module.css";

type AllEventsItem = EventItem & { category: string };

const events: AllEventsItem[] = allEventsData;

const filters = [
  "All Events",
  "Upcoming",
  "Workshops",
  "Seminars",
  "Community Drives",
  "Awareness Programs",
] as const;

const PAGE_SIZE = 6;

export default function AllEventsListing() {
  const [activeFilter, setActiveFilter] = useState<string>("All Events");
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredEvents = useMemo(() => {
    if (activeFilter === "All Events" || activeFilter === "Upcoming") {
      // Every event in the calendar is an upcoming one, so both show the
      // full list — the filters stay future-proof for past events.
      return events;
    }
    return events.filter((event) => event.category === activeFilter);
  }, [activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleEvents = filteredEvents.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function applyFilter(filter: string) {
    setActiveFilter(filter);
    setPage(1);
  }

  function goToPage(nextPage: number) {
    setPage(nextPage);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className={styles.listing} aria-label="All events listing">
      <div className={shared.sectionInner}>
        <p className={styles.filtersLabel}>Browse by category</p>
        <ul className={styles.filterBar} aria-label="Filter events by category">
          {filters.map((filter) => (
            <li key={filter}>
              <button
                type="button"
                className={
                  filter === activeFilter
                    ? `${shared.filterBtn} ${shared.filterBtnActive}`
                    : shared.filterBtn
                }
                aria-pressed={filter === activeFilter}
                onClick={() => applyFilter(filter)}
              >
                {filter}
              </button>
            </li>
          ))}
        </ul>

        <p className={styles.resultsMeta} aria-live="polite">
          Showing {visibleEvents.length} of {filteredEvents.length} events
          {activeFilter !== "All Events" ? ` — ${activeFilter}` : ""}
        </p>

        {visibleEvents.length > 0 ? (
          <div
            ref={gridRef}
            className={shared.upcomingGrid}
            style={{ scrollMarginTop: "90px" }}
          >
            {visibleEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className={styles.listingEmpty}>
            No events found in this category right now — check back soon.
          </p>
        )}

        {totalPages > 1 && (
          <nav
            className={styles.pagination}
            aria-label="Event pages"
          >
            <button
              type="button"
              className={styles.pageBtn}
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              <ArrowLeft size={15} strokeWidth={2.2} aria-hidden="true" />
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  className={`${styles.pageBtn} ${styles.pageNum}${
                    pageNum === currentPage ? ` ${styles.pageNumActive}` : ""
                  }`}
                  aria-current={pageNum === currentPage ? "page" : undefined}
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </button>
              )
            )}
            <button
              type="button"
              className={styles.pageBtn}
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              Next
              <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}