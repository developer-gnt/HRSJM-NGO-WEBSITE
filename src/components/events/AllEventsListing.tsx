"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Search, X } from "lucide-react";
import allEventsData from "@/data/all-events.json";
import { formatEventDate, resolveEventCoverImage, type BackendEvent } from "@/lib/backendApi";
import EventCard, { type EventItem } from "./EventCard";
import shared from "./events.module.css";
import styles from "./allEvents.module.css";

type AllEventsItem = EventItem & { category: string };

const staticEvents: AllEventsItem[] = allEventsData;

const baseFilters = [
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
  const [eventsList, setEventsList] = useState<AllEventsItem[]>(staticEvents);
  const gridRef = useRef<HTMLDivElement>(null);

  // Fetch dynamic upcoming events from backend database on mount
  useEffect(() => {
    let isMounted = true;
    async function loadDynamicEvents() {
      try {
        const res = await fetch("/api/events?status=UPCOMING&limit=100", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.items) && data.items.length > 0) {
          const mappedDbEvents: AllEventsItem[] = data.items.map((event: BackendEvent) => {
            const rawCat = (event.category || "Workshops").trim();
            // Capitalize or normalize category
            const category = rawCat.charAt(0).toUpperCase() + rawCat.slice(1);
            return {
              id: event.id,
              title: event.title,
              category,
              description:
                event.short_information ||
                event.description ||
                "HRSJM grassroots initiative for social empowerment and legal protection.",
              date: formatEventDate(event.start_at),
              location: event.location || event.address || "India",
              status: "Upcoming",
              statusType: "open",
              image: resolveEventCoverImage(event.cover_image_url, event.category),
              action: {
                label: "Event Details",
                type: "link",
              },
              href: `/events/${event.id}`,
            };
          });

          if (isMounted) {
            // Put database events first, followed by curated non-conflicting static events
            const dbIds = new Set(mappedDbEvents.map((e) => e.id));
            const remainingStatic = staticEvents.filter((se) => !dbIds.has(se.id));
            setEventsList([...mappedDbEvents, ...remainingStatic]);
          }
        }
      } catch (err) {
        console.warn("Could not fetch live events for listing:", err);
      }
    }
    loadDynamicEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute dynamic filter categories including any custom categories in database
  const filters = useMemo(() => {
    const categoriesSet = new Set<string>(baseFilters);
    eventsList.forEach((e) => {
      if (e.category && typeof e.category === "string") {
        categoriesSet.add(e.category);
      }
    });
    return Array.from(categoriesSet);
  }, [eventsList]);

  // Compute category counts for badge indicators
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "All Events": eventsList.length };
    filters.forEach((f) => {
      if (f !== "All Events") {
        counts[f] = eventsList.filter((e) => e.category.toLowerCase() === f.toLowerCase()).length;
      }
    });
    return counts;
  }, [eventsList, filters]);

  const filteredEvents = useMemo(() => {
    return eventsList.filter((event) => {
      const matchesCategory =
        activeFilter === "All Events" ||
        event.category.toLowerCase() === activeFilter.toLowerCase();
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !normalizedQuery ||
        event.title.toLowerCase().includes(normalizedQuery) ||
        event.location.toLowerCase().includes(normalizedQuery) ||
        event.description.toLowerCase().includes(normalizedQuery) ||
        event.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [eventsList, activeFilter, searchQuery]);

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
                placeholder="Search events by title, category or city..."
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
              {activeFilter !== "All Events" ? ` - ${activeFilter}` : ""}
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
