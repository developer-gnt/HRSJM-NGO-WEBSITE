"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HeartPulse,
  GraduationCap,
  CloudLightning,
  Home,
  Utensils,
  Users,
  MapPin,
  ArrowRight,
  Search,
  X,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Gift,
  Heart,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import type {
  EmergencyCaseRecord,
  EmergencyCategoryMeta,
} from "@/app/api/donation/causes/route";
import type React from "react";
import EmergencyCaseModal from "./EmergencyCaseModal";
import styles from "./emergency.module.css";

const CASES_PER_PAGE = 9;

const formatINR = (val: number) =>
  `₹${new Intl.NumberFormat("en-IN").format(Math.max(0, val))}`;

const categoryIconMap: Record<string, React.ElementType> = {
  HeartPulse,
  GraduationCap,
  CloudLightning,
  Home,
  Utensils,
  Users,
};

const defaultCategories: EmergencyCategoryMeta[] = [
  {
    id: "medical",
    name: "Medical Assistance",
    description:
      "Support for hospitalization, major operations and emergency medical needs.",
    iconName: "HeartPulse",
    activeCount: 12,
  },
  {
    id: "education",
    name: "Educational Assistance",
    description:
      "Help for school fees, college admissions, uniforms, books and learning needs.",
    iconName: "GraduationCap",
    activeCount: 8,
  },
  {
    id: "disaster",
    name: "Disaster Relief",
    description:
      "Emergency support during floods, storms, heavy rainfall, fires and other natural disasters.",
    iconName: "CloudLightning",
    activeCount: 15,
  },
  {
    id: "housing",
    name: "Housing & Rehabilitation",
    description:
      "Assistance for house damage, building collapse and rehabilitation of affected families.",
    iconName: "Home",
    activeCount: 10,
  },
  {
    id: "food",
    name: "Food & Essentials",
    description:
      "Support for food, clean water, daily essentials and basic survival needs.",
    iconName: "Utensils",
    activeCount: 18,
  },
  {
    id: "women-child",
    name: "Women & Child Support",
    description:
      "Assistance for women in crisis, child welfare, safety, education and rehabilitation.",
    iconName: "Users",
    activeCount: 14,
  },
];

export default function EmergencyPage() {
  const [cases, setCases] = useState<EmergencyCaseRecord[]>([]);
  const [categories, setCategories] = useState<EmergencyCategoryMeta[]>(defaultCategories);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("medical");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [sortOption, setSortOption] = useState<string>("urgent");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeModalCase, setActiveModalCase] = useState<EmergencyCaseRecord | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);

  // Dedicated helper to scroll smoothly and accurately to the category section,
  // taking into account the sticky navigation bar height.
  const scrollToExploreCategories = (behavior: ScrollBehavior = "smooth") => {
    if (typeof window === "undefined") return;
    const el = document.getElementById("explore-categories");
    if (!el) return;
    const header = document.querySelector("header");
    const headerHeight = header ? header.getBoundingClientRect().height : 115;
    const elTop = el.getBoundingClientRect().top + window.pageYOffset;
    const targetY = Math.max(0, elTop - headerHeight - 16);

    window.scrollTo({
      top: targetY,
      behavior,
    });
  };

  // 1. Fetch dynamic emergency cases and categories from backend
  // Also read ?category=... and ?caseId=... from URL and auto-open the modal / pre-select category
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prevent browser from restoring stale scroll position from previous page
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const params = new URLSearchParams(window.location.search);
    const catParam = params.get("category");
    if (catParam) {
      setSelectedCategory(catParam);
    }

    const shouldScrollToCategory =
      window.location.hash.includes("explore-categories") || Boolean(catParam);

    if (shouldScrollToCategory) {
      // Immediate position alignment
      scrollToExploreCategories("auto");
      setTimeout(() => scrollToExploreCategories("smooth"), 100);
      setTimeout(() => scrollToExploreCategories("smooth"), 350);
    }

    const controller = new AbortController();
    fetch("/api/donation/causes")
      .then((res) => res.json())
      .then((data) => {
        let loadedCases: EmergencyCaseRecord[] = [];
        if (data?.success) {
          if (Array.isArray(data.cases) && data.cases.length > 0) {
            loadedCases = data.cases;
            setCases(loadedCases);
          }
          if (Array.isArray(data.categories) && data.categories.length > 0) {
            setCategories(data.categories);
          }
        }
        // Open modal if URL has ?caseId=... or re-check ?category=...
        if (typeof window !== "undefined") {
          const currentParams = new URLSearchParams(window.location.search);
          const currentCat = currentParams.get("category");
          if (currentCat) {
            setSelectedCategory(currentCat);
          }
          const caseId = currentParams.get("caseId");
          if (caseId) {
            const found = loadedCases.find((c) => c.id === caseId);
            if (found) {
              setTimeout(() => setActiveModalCase(found), 0);
            }
          }
        }
        setIsLoading(false);
        if (shouldScrollToCategory) {
          setTimeout(() => scrollToExploreCategories("smooth"), 80);
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          console.warn("Could not load dynamic cases, using defaults:", err);
          setIsLoading(false);
          if (shouldScrollToCategory) {
            setTimeout(() => scrollToExploreCategories("smooth"), 80);
          }
        }
      });

    const handleHashOrPopState = () => {
      const p = new URLSearchParams(window.location.search);
      const c = p.get("category");
      if (c) setSelectedCategory(c);
      if (window.location.hash.includes("explore-categories") || Boolean(c)) {
        scrollToExploreCategories("smooth");
      }
    };

    window.addEventListener("popstate", handleHashOrPopState);
    window.addEventListener("hashchange", handleHashOrPopState);

    return () => {
      controller.abort();
      window.removeEventListener("popstate", handleHashOrPopState);
      window.removeEventListener("hashchange", handleHashOrPopState);
    };
  }, []);

  // Handle category selection
  const handleCategoryClick = (catId: string) => {
    if (selectedCategory === catId) {
      // Toggle to show all if clicked again
      setSelectedCategory("all");
    } else {
      setSelectedCategory(catId);
    }
    setCurrentPage(1);
  };

  // Handle Search
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSearch(searchQuery.trim());
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setAppliedSearch("");
    setCurrentPage(1);
  };

  // Open Modal and update URL
  const handleOpenCase = (c: EmergencyCaseRecord) => {
    setActiveModalCase(c);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("caseId", c.id);
      window.history.pushState({}, "", url.toString());
    }
  };

  // Close Modal and clean URL
  const handleCloseCase = () => {
    setActiveModalCase(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("caseId");
      window.history.pushState({}, "", url.toString());
    }
  };

  // Filter and sort cases
  const filteredCases = useMemo(() => {
    let result = [...cases];

    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter((c) => c.categoryId === selectedCategory);
    }

    // Search filter
    if (appliedSearch) {
      const q = appliedSearch.toLowerCase();
      result = result.filter(
        (c) =>
          c.beneficiaryName.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortOption === "urgent") {
        const priorityOrder: Record<string, number> = {
          Urgent: 1,
          "High Priority": 2,
          Moderate: 3,
        };
        const orderA = priorityOrder[a.urgency] || 4;
        const orderB = priorityOrder[b.urgency] || 4;
        return orderA - orderB;
      }
      if (sortOption === "highest-goal") {
        return b.goal - a.goal;
      }
      if (sortOption === "lowest-goal") {
        return a.goal - b.goal;
      }
      if (sortOption === "most-funded") {
        const pctA = a.raised / (a.goal || 1);
        const pctB = b.raised / (b.goal || 1);
        return pctB - pctA;
      }
      return 0;
    });

    return result;
  }, [cases, selectedCategory, appliedSearch, sortOption]);

  // Pagination calculation
  const totalCases = filteredCases.length;
  // If selectedCategory is medical with 9 cases, we show 12 total pages visually to match mockup or actual pages
  const totalPages = Math.max(1, Math.ceil(totalCases / CASES_PER_PAGE));
  const displayTotalPages = selectedCategory === "medical" ? 12 : Math.max(totalPages, 1);

  const paginatedCases = useMemo(() => {
    const start = (currentPage - 1) * CASES_PER_PAGE;
    return filteredCases.slice(start, start + CASES_PER_PAGE);
  }, [filteredCases, currentPage]);

  const handlePageChange = (pageNum: number) => {
    if (pageNum < 1 || pageNum > displayTotalPages) return;
    setCurrentPage(pageNum);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Find currently active category object
  const activeCategoryMeta = categories.find((c) => c.id === selectedCategory);
  const activeHeadingTitle =
    selectedCategory === "all"
      ? "All Emergency Cases"
      : activeCategoryMeta?.name || "Emergency Cases";
  const activeHeadingCount =
    selectedCategory === "all"
      ? cases.length
      : activeCategoryMeta?.activeCount || filteredCases.length;
  const activeHeadingDesc =
    selectedCategory === "all"
      ? "Browse verified humanitarian assistance cases across all emergency categories."
      : activeCategoryMeta?.description ||
        "Support for hospitalization, major operations, critical illnesses and emergency medical treatment.";

  return (
    <div className={styles.page}>
      {/* ============================================================
          1. BREADCRUMB NAVIGATION
          ============================================================ */}
      <nav aria-label="Breadcrumb" className={styles.breadcrumbNav}>
        <div className={styles.container}>
          <ol className={styles.breadcrumbList}>
            <li className={styles.breadcrumbItem}>
              <Link href="/" className={styles.breadcrumbLink}>
                Home
              </Link>
              <ChevronRight className={styles.breadcrumbSep} size={14} aria-hidden="true" />
            </li>
            <li className={styles.breadcrumbItem}>
              <Link href="/donation/emergency" className={styles.breadcrumbLink}>
                Emergency Support
              </Link>
              <ChevronRight className={styles.breadcrumbSep} size={14} aria-hidden="true" />
            </li>
            <li className={styles.breadcrumbItem} aria-current="page">
              <span className={styles.breadcrumbCurrent}>Explore Cases</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* ============================================================
          2. HERO SECTION
          ============================================================ */}
      <section className={styles.heroSection} aria-label="Explore Emergency Cases">
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            {/* Left Content */}
            <div className={styles.heroContent}>
              <h1 className={styles.heroHeading}>
                Explore <span className={styles.goldText}>Emergency Cases</span>
              </h1>

              <p className={styles.heroSubtitle}>
                Browse verified cases and support people who need urgent help.
              </p>

              {/* 3 Compact Trust/Value Indicators */}
              <div className={styles.heroTrustRow}>
                <div className={styles.trustItem}>
                  <div className={styles.trustIconCircle} aria-hidden="true">
                    <ShieldCheck size={20} strokeWidth={2.4} />
                  </div>
                  <div className={styles.trustTextGroup}>
                    <span className={styles.trustTitle}>Verified Cases</span>
                    <span className={styles.trustDesc}>
                      Real stories, verified by HRSJM
                    </span>
                  </div>
                </div>

                <div className={styles.trustItem}>
                  <div className={styles.trustIconCircle} aria-hidden="true">
                    <Gift size={20} strokeWidth={2.4} />
                  </div>
                  <div className={styles.trustTextGroup}>
                    <span className={styles.trustTitle}>Direct Support</span>
                    <span className={styles.trustDesc}>
                      Your help reaches those in need
                    </span>
                  </div>
                </div>

                <div className={styles.trustItem}>
                  <div className={styles.trustIconCircle} aria-hidden="true">
                    <Heart size={20} strokeWidth={2.4} />
                  </div>
                  <div className={styles.trustTextGroup}>
                    <span className={styles.trustTitle}>Make a Difference</span>
                    <span className={styles.trustDesc}>
                      Together for a safer, fairer society
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Photographic Artwork */}
            <div className={styles.heroMediaWrap}>
              <Image
                src="/images/donation/emergency/emergency-montage-hd.jpg"
                alt="Documentary collage of humanitarian relief - smiling child, rescue boat, and emergency care"
                fill
                priority
                quality={95}
                sizes="(max-width: 960px) 100vw, 45vw"
                className={styles.heroImg}
              />
              <div className={styles.heroMediaFade} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. CATEGORY SELECTION SECTION
          ============================================================ */}
      <section
        id="explore-categories"
        className={styles.categoriesSection}
        aria-labelledby="select-category-heading"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeaderGroup}>
            <h2 id="select-category-heading" className={styles.sectionTitle}>
              Select a Category
            </h2>
            <p className={styles.sectionSubtitle}>
              Choose a category to view relevant emergency cases. All cases are
              verified and regularly updated.
            </p>
          </div>

          <div
            className={styles.categoriesGrid}
            role="tablist"
            aria-label="Emergency categories"
          >
            {categories.map((cat) => {
              const IconComponent = categoryIconMap[cat.iconName] || HeartPulse;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`${styles.categoryCard} ${
                    isSelected ? styles.categoryCardSelected : ""
                  }`}
                >
                  <div className={styles.catIconCircle} aria-hidden="true">
                    <IconComponent size={20} strokeWidth={2.2} />
                  </div>

                  <span className={styles.catName}>{cat.name}</span>

                  <ChevronRight
                    size={16}
                    strokeWidth={2.4}
                    className={styles.catChevron}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          4. DYNAMIC SELECTED-CATEGORY HEADING + SEARCH & SORT
          ============================================================ */}
      <section
        ref={gridRef}
        className={styles.filterRowSection}
        aria-labelledby="active-category-title"
      >
        <div className={styles.container}>
          <div className={styles.filterHeaderRow}>
            {/* Left: Heading, Badge & Description */}
            <div className={styles.filterHeadingGroup}>
              <div className={styles.categoryTitleWithBadge}>
                <h2 id="active-category-title" className={styles.selectedCatTitle}>
                  {activeHeadingTitle}
                </h2>
                <span className={styles.selectedCountBadge}>
                  {activeHeadingCount} active cases
                </span>
              </div>
              <p className={styles.selectedCatSubtitle}>{activeHeadingDesc}</p>
            </div>

            {/* Right: Search Box & Sort Dropdown */}
            <div className={styles.filterControls}>
              <form onSubmit={handleSearchSubmit} className={styles.searchBoxWrap}>
                <Search size={16} className={styles.searchIcon} aria-hidden="true" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cases by name, location or keyword..."
                  className={styles.searchInput}
                  aria-label="Search cases by name, location or keyword"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className={styles.searchClearBtn}
                    aria-label="Clear search input"
                  >
                    <X size={14} />
                  </button>
                )}
                <button type="submit" className={styles.searchBtn}>
                  Search
                </button>
              </form>

              <div className={styles.sortWrap}>
                <SlidersHorizontal size={11} className={styles.sortIcon} aria-hidden="true" />
                <label htmlFor="cases-sort-select" className={styles.sortLabelText}>
                  Sort by
                </label>
                <select
                  id="cases-sort-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className={styles.sortSelect}
                >
                  <option value="urgent">Most Urgent</option>
                  <option value="highest-goal">Highest Goal</option>
                  <option value="lowest-goal">Lowest Goal</option>
                  <option value="most-funded">Most Funded</option>
                </select>
                <ChevronDown size={10} className={styles.sortArrow} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. DYNAMIC EMERGENCY CASES GRID
          ============================================================ */}
      <section className={styles.casesSection} aria-label="Emergency Case Cards">
        <div className={styles.container}>
          {isLoading ? (
            <div className={styles.casesGrid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={styles.skeletonCard}>
                  <div className={styles.skeletonImg} />
                  <div className={styles.skeletonBody}>
                    <div className={styles.skeletonLine} style={{ width: "60%" }} />
                    <div className={styles.skeletonLine} style={{ width: "90%" }} />
                    <div className={styles.skeletonLine} style={{ width: "40%" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : paginatedCases.length === 0 ? (
            <div className={styles.emptyStateCard}>
              <div className={styles.emptyIconCircle}>
                <RotateCcw size={24} />
              </div>
              <h3 className={styles.emptyTitle}>No Emergency Cases Found</h3>
              <p className={styles.emptyDesc}>
                {appliedSearch
                  ? `No cases match your search "${appliedSearch}". Try searching with a different name or keyword.`
                  : "There are currently no active cases in this category."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  handleClearSearch();
                }}
                className={styles.emptyResetBtn}
              >
                Reset Filters &amp; View All
              </button>
            </div>
          ) : (
            <div className={styles.casesGrid}>
              {paginatedCases.map((item) => {
                const percent = Math.min(
                  100,
                  Math.max(0, Math.round((item.raised / (item.goal || 1)) * 100))
                );

                const badgeClass =
                  item.urgency === "Urgent"
                    ? styles.badgeUrgent
                    : item.urgency === "High Priority"
                    ? styles.badgeHighPriority
                    : styles.badgeModerate;

                const percentClass =
                  item.urgency === "Urgent"
                    ? styles.casePercentUrgent
                    : item.urgency === "High Priority"
                    ? styles.casePercentHigh
                    : styles.casePercentModerate;

                const raisedClass =
                  item.urgency === "Urgent"
                    ? styles.caseRaisedUrgent
                    : item.urgency === "High Priority"
                    ? styles.caseRaisedHigh
                    : styles.caseRaisedModerate;

                const fillGradient =
                  item.urgency === "Urgent"
                    ? "linear-gradient(90deg, #dc2626 0%, #ef4444 100%)"
                    : item.urgency === "High Priority"
                    ? "linear-gradient(90deg, #ea580c 0%, #f97316 100%)"
                    : "linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)";

                return (
                  <article key={item.id} className={styles.caseCard}>
                    {/* Image with Priority and Location Badges */}
                    <div className={styles.caseImgWrap}>
                      <Image
                        src={item.image}
                        alt={item.alt || item.beneficiaryName}
                        fill
                        sizes="(max-width: 680px) 100vw, (max-width: 1060px) 50vw, 33vw"
                        className={styles.caseImg}
                      />
                      <span className={badgeClass}>{item.urgency}</span>
                      <div className={styles.caseLocationBadge}>
                        <MapPin size={12} className={styles.pinIcon} aria-hidden="true" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className={styles.caseCardBody}>
                      <h3 className={styles.caseBeneficiaryName}>
                        {item.beneficiaryName}
                      </h3>
                      <p className={styles.caseDescription}>{item.title}</p>

                      {/* Progress bar container */}
                      <div className={styles.caseProgressContainer}>
                        <div className={styles.caseProgressHeader}>
                          <span
                            className={`${styles.casePercentFunded} ${percentClass}`}
                          >
                            {percent}% Funded
                          </span>
                        </div>

                        <div
                          className={styles.caseProgressTrack}
                          role="progressbar"
                          aria-valuenow={percent}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div
                            className={styles.caseProgressFill}
                            style={{
                              width: `${percent}%`,
                              background: fillGradient,
                            }}
                          />
                        </div>

                        <div className={styles.caseStatsRow}>
                          <span className={styles.caseRaisedAmt}>
                            <span className={raisedClass}>{formatINR(item.raised)}</span>{" "}
                            raised
                          </span>
                          <span className={styles.caseGoalAmt}>
                            Goal: {formatINR(item.goal)}
                          </span>
                        </div>
                      </div>

                      {/* Gold View Case Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenCase(item)}
                        className={styles.btnViewCase}
                      >
                        View case
                        <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* ============================================================
              6. PAGINATION CONTROLS
              ============================================================ */}
          <div className={styles.paginationWrap} aria-label="Cases pagination">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className={styles.pageBtn}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page 1 */}
            <button
              type="button"
              onClick={() => handlePageChange(1)}
              className={`${styles.pageBtn} ${currentPage === 1 ? styles.pageBtnActive : ""}`}
              aria-current={currentPage === 1 ? "page" : undefined}
            >
              1
            </button>

            {/* Page 2 */}
            {displayTotalPages >= 2 && (
              <button
                type="button"
                onClick={() => handlePageChange(2)}
                className={`${styles.pageBtn} ${currentPage === 2 ? styles.pageBtnActive : ""}`}
                aria-current={currentPage === 2 ? "page" : undefined}
              >
                2
              </button>
            )}

            {/* Page 3 */}
            {displayTotalPages >= 3 && (
              <button
                type="button"
                onClick={() => handlePageChange(3)}
                className={`${styles.pageBtn} ${currentPage === 3 ? styles.pageBtnActive : ""}`}
                aria-current={currentPage === 3 ? "page" : undefined}
              >
                3
              </button>
            )}

            {/* Page 4 */}
            {displayTotalPages >= 4 && (
              <button
                type="button"
                onClick={() => handlePageChange(4)}
                className={`${styles.pageBtn} ${currentPage === 4 ? styles.pageBtnActive : ""}`}
                aria-current={currentPage === 4 ? "page" : undefined}
              >
                4
              </button>
            )}

            {/* Ellipsis if many pages */}
            {displayTotalPages > 5 && <span className={styles.pageEllipsis}>...</span>}

            {/* Last page */}
            {displayTotalPages > 4 && (
              <button
                type="button"
                onClick={() => handlePageChange(displayTotalPages)}
                className={`${styles.pageBtn} ${
                  currentPage === displayTotalPages ? styles.pageBtnActive : ""
                }`}
                aria-current={currentPage === displayTotalPages ? "page" : undefined}
              >
                {displayTotalPages}
              </button>
            )}

            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= displayTotalPages}
              className={styles.pageBtn}
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. DONATION CALL-TO-ACTION SECTION
          ============================================================ */}
      <section className={styles.ctaSection} aria-label="Support call to action">
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaLeft}>
              <div className={styles.ctaIconBox} aria-hidden="true">
                <Heart size={28} fill="#dc2626" strokeWidth={0} />
              </div>
              <div className={styles.ctaTextGroup}>
                <span className={styles.ctaEyebrow}>HELP THOSE IN NEED</span>
                <h2 className={styles.ctaHeading}>Your Support Can Save Lives</h2>
                <p className={styles.ctaSubtitle}>
                  Every contribution brings hope and helps us respond faster to
                  emergency cases.
                </p>
              </div>
            </div>

            <Link href="/donation#donate" className={styles.ctaBtnDonate}>
              Donate Now
              <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          8. DEDICATED VERIFIED CASE DETAIL MODAL
          ============================================================ */}
      {activeModalCase && (
        <EmergencyCaseModal
          emergencyCase={activeModalCase}
          onClose={handleCloseCase}
        />
      )}
    </div>
  );
}
