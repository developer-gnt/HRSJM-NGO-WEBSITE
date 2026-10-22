"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Search, X } from "lucide-react";
import allEventsData from "@/data/all-events.json";
import EventCard, { type EventItem } from "./EventCard";
import shared from "./events.module.css";
import styles from "./allEvents.module.css";

type AllEventsItem = EventItem & { category: string };

const events: AllEventsItem[] = allEventsData;

const filters = [
  "All Events",
  "Workshops",
  "Seminars",
  "Community Drives",
  "Awareness Programs",
] as const;

const PAGE_SIZE = 6;

export default function AllEventsListing() {
  const [activeFilter, setActiveFilter] = useState<string>("All Events");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  // Compute category counts for badge indicators
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "All Events": events.length };
    filters.forEach((f) => {
      if (f !== "All Events") {
        counts[f] = events.filter((e) => e.category === f).length;
      }
    });
    return counts;
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        activeFilter === "All Events" || event.category === activeFilter;
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !normalizedQuery ||
        event.title.toLowerCase().includes(normalizedQuery) ||
        event.location.toLowerCase().includes(normalizedQuery) ||
        event.description.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

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

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
    setPage(1);
  }

  function clearSearch() {
    setSearchQuery("");
    setPage(1);
  }

  function resetAllFilters() {
    setActiveFilter("All Events");
    setSearchQuery("");
    setPage(1);
  }

  function goToPage(nextPage: number) {
    setPage(nextPage);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className={styles.listing} aria-label="Upcoming events directory">
      <div className={shared.sectionInner}>
        <div className={styles.toolbar}>
          <div className={styles.searchAndMeta}>
            <div className={styles.searchWrap}>
              <Search
                size={16}
                strokeWidth={2}
                className={styles.searchIcon}
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search events by title or city..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput}
                aria-label="Search events"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className={styles.searchClear}
                  aria-label="Clear search"
                >
                  <X size={15} strokeWidth={2.2} />
                </button>
              )}
            </div>

            <p className={styles.resultsMeta} aria-live="polite">
              Showing{" "}
              <span className={styles.resultsMetaCount}>
                {visibleEvents.length}
              </span>{" "}
              of{" "}
              <span className={styles.resultsMetaCount}>
                {filteredEvents.length}
              </span>{" "}
              events
              {activeFilter !== "All Events" ? ` — ${activeFilter}` : ""}
              {searchQuery.trim() ? ` matching "${searchQuery.trim()}"` : ""}
            </p>
          </div>

          <ul className={styles.filterBar} aria-label="Filter events by category">
            {filters.map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <li key={filter}>
                  <button
                    type="button"
                    className={
                      isActive
                        ? `${styles.filterBtn} ${styles.filterBtnActive}`
                        : styles.filterBtn
                    }
                    aria-pressed={isActive}
                    onClick={() => applyFilter(filter)}
                  >
                    <span>{filter}</span>
                    <span className={styles.filterBadge}>
                      {categoryCounts[filter] ?? 0}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

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
          <div className={styles.listingEmpty}>
            <p className={styles.listingEmptyTitle}>No events match your criteria</p>
            <p className={styles.listingEmptyText}>
              We couldn&apos;t find any programs matching your current filter and
              search query. Try adjusting your search or view all events.
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className={styles.resetBtn}
            >
              <RotateCcw size={14} strokeWidth={2.2} />
              Reset All Filters
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <nav className={styles.pagination} aria-label="Event pages">
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