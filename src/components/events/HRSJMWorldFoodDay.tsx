"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Tag,
  MapPin,
  ArrowLeft,
  ArrowRight,
  Search,
  Maximize2,
  X,
  Users,
  Heart,
  Check,
  UserCheck,
  Globe,
  MessageSquare,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "./orgOverview.module.css";

interface ActivityInfo {
  id?: string;
  title?: string;
  date?: string;
  location?: string;
  category?: string;
  image?: string;
}

interface HRSJMWorldFoodDayProps {
  activity?: ActivityInfo;
}

const RECENT_POSTS = [
  {
    id: "poverty-eradication",
    title: "International Day for the Eradication of Poverty – 17 October",
    date: "October 17, 2026",
    href: "/events/international-day-for-the-eradication-of-poverty-17-october",
    thumb: "/images/activities/eradication-of-poverty.jpg",
  },
  {
    id: "hrsjm-mission",
    title: "HUMAN RIGHTS & SOCIAL JUSTICE MISSION (HRSJM)",
    date: "October 15, 2026",
    href: "/events/human-rights-social-justice-mission",
    thumb: "/images/activities/hrsjm-org-banner-card.jpg",
  },
  {
    id: "history-vision",
    title: "Human Rights & Social Justice Mission: History, Vision and Social Contribution",
    date: "October 14, 2026",
    href: "/events/human-rights-social-justice-mission-history-vision-social-contribution",
    thumb: "/images/activities/hrsjm-history-vision-social-contribution.jpg",
  },
  {
    id: "14-years-journey",
    title: "HUMAN RIGHTS & SOCIAL JUSTICE MISSION – 14 Years Journey",
    date: "October 12, 2026",
    href: "/events/human-rights-social-justice-mission-14-years-journey",
    thumb: "/images/activities/hrsjm-14-years-journey.jpg",
  },
  {
    id: "advancing-human-rights",
    title: "Advancing Human Rights and Social Justice in India: Missions for Equality, Dignity, and Opportunity",
    date: "October 10, 2026",
    href: "/events/advancing-human-rights-and-social-justice-in-india",
    thumb: "/images/activities/advancing-human-rights-social-justice.jpg",
  },
];

const MESSAGE_POINTS = [
  "Feed those who are hungry.",
  "Promote nutrition awareness.",
  "Support vulnerable families.",
  "Protect human dignity and basic human rights.",
  "Build a society rooted in equality, compassion and social justice.",
];

const JOIN_US_POINTS = [
  "Stand for human rights.",
  "Work for social justice.",
  "Be part of the change.",
  "Volunteer, spread awareness, support community welfare initiatives, and inspire others to serve humanity.",
];

const TAGS_KEYWORDS = [
  "#WorldFoodDay",
  "#FoodForAll",
  "#EndHunger",
  "#ZeroHunger",
  "#NutritionForAll",
  "#FoodSecurity",
  "#StopMalnutrition",
  "#HumanRights",
  "#SocialJustice",
  "#CommunityWelfare",
  "#HRSJM",
  "#VolunteerForChange",
  "#BetterIndia",
  "#StandForHumanRights",
  "#WorkForSocialJustice",
];

const PHOTO_GALLERY_IMAGES = [
  {
    src: "/images/world-food-day/hrsjm-food-drive-yellow-shirts-distribution.jpg",
    alt: "HRSJM Volunteers in yellow shirts distributing food meals",
  },
  {
    src: "/images/world-food-day/hrsjm-food-distribution-kids.jpg",
    alt: "Children receiving fresh nutritious meals on banana leaves",
  },
  {
    src: "/images/world-food-day/hrsjm-food-distribution-elderly.jpg",
    alt: "Elderly meal care and feeding support program",
  },
  {
    src: "/images/world-food-day/hrsjm-food-drive-tamilnadu-pot.jpg",
    alt: "Volunteer serving hot nutritious food from large pot, Tamil Nadu",
  },
  {
    src: "/images/world-food-day/hrsjm-food-drive-bengal-children.jpg",
    alt: "Children meal distribution in South 24 Parganas, West Bengal",
  },
  {
    src: "/images/world-food-day/hrsjm-food-drive-hospital-patient.jpg",
    alt: "Distribution of fruits and food support to hospital patient",
  },
  {
    src: "/images/world-food-day/hrsjm-food-drive-hall-distribution.jpg",
    alt: "Community hall youth and children meal distribution",
  },
  {
    src: "/images/world-food-day/hrsjm-food-drive-telangana-community.jpg",
    alt: "Telangana state community food distribution drive",
  },
  {
    src: "/images/world-food-day/hrsjm-food-drive-nellore-boy1.jpg",
    alt: "Nellore RTC Colony youth receiving food meal package",
  },
  {
    src: "/images/world-food-day/hrsjm-food-drive-nellore-boy2.jpg",
    alt: "Student receiving packaged meal at Nellore distribution drive",
  },
  {
    src: "/images/world-food-day/hrsjm-food-drive-nellore-girl.jpg",
    alt: "Young girl receiving packaged food meal at Nellore center",
  },
  {
    src: "/images/world-food-day/hrsjm-food-drive-nellore-group.jpg",
    alt: "Giving is more precious than taking – Nellore food drive group",
  },
  {
    src: "/images/world-food-day/hrsjm-food-drive-flood-relief-crowd.jpg",
    alt: "Food relief distribution camp for vulnerable families",
  },
  {
    src: "/images/world-food-day/hrsjm-food-drive-ration-distribution1.jpg",
    alt: "Ration and grocery grain kit distribution to rural woman",
  },
  {
    src: "/images/world-food-day/hrsjm-food-drive-ration-distribution2.jpg",
    alt: "Grocery ration bag hand-over to young community member",
  },
  {
    src: "/images/world-food-day/hrsjm-food-drive-ration-distribution3.jpg",
    alt: "Essential food supply packet hand-over to village youth",
  },
  {
    src: "/images/world-food-day/hrsjm-food-drive-ration-distribution4.jpg",
    alt: "Nutritional ration sack distribution to elder community member",
  },
  {
    src: "/images/world-food-day/hrsjm-world-food-day-banner.jpg",
    alt: "Services by HRSJM Volunteers – World Food Day field team",
  },
];

export default function HRSJMWorldFoodDay({ activity }: HRSJMWorldFoodDayProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState("");
  const [modalImgTitle, setModalImgTitle] = useState("");
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/news?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const openImageModal = (src: string, title: string) => {
    setGalleryIndex(null);
    setModalImgSrc(src);
    setModalImgTitle(title);
    setModalOpen(true);
  };

  const openGalleryModal = (index: number) => {
    setGalleryIndex(index);
    setModalImgSrc(PHOTO_GALLERY_IMAGES[index].src);
    setModalImgTitle(PHOTO_GALLERY_IMAGES[index].alt);
    setModalOpen(true);
  };

  const handlePrevGalleryImage = () => {
    if (galleryIndex === null) return;
    const newIdx = (galleryIndex - 1 + PHOTO_GALLERY_IMAGES.length) % PHOTO_GALLERY_IMAGES.length;
    setGalleryIndex(newIdx);
    setModalImgSrc(PHOTO_GALLERY_IMAGES[newIdx].src);
    setModalImgTitle(PHOTO_GALLERY_IMAGES[newIdx].alt);
  };

  const handleNextGalleryImage = () => {
    if (galleryIndex === null) return;
    const newIdx = (galleryIndex + 1) % PHOTO_GALLERY_IMAGES.length;
    setGalleryIndex(newIdx);
    setModalImgSrc(PHOTO_GALLERY_IMAGES[newIdx].src);
    setModalImgTitle(PHOTO_GALLERY_IMAGES[newIdx].alt);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      if (e.key === "Escape") {
        setModalOpen(false);
      } else if (e.key === "ArrowLeft" && galleryIndex !== null) {
        handlePrevGalleryImage();
      } else if (e.key === "ArrowRight" && galleryIndex !== null) {
        handleNextGalleryImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, galleryIndex]);


  return (
    <section
      id="world-food-day-detail"
      className={styles.orgSection}
      aria-label="World Food Day Program &amp; Awareness Drive Overview"
    >
      <div className={styles.container}>
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
          <ol className={styles.breadcrumbList}>
            <li className={styles.breadcrumbItem}>
              <Link href="/">Home</Link>
            </li>
            <li className={styles.breadcrumbSep} aria-hidden="true">/</li>
            <li className={styles.breadcrumbItem}>
              <Link href="/events">Events &amp; Activities</Link>
            </li>
            <li className={styles.breadcrumbSep} aria-hidden="true">/</li>
            <li className={styles.breadcrumbItem}>
              <Link href="/events#activities">Past Activities</Link>
            </li>
            <li className={styles.breadcrumbSep} aria-hidden="true">/</li>
            <li className={`${styles.breadcrumbItem} ${styles.breadcrumbActive}`} aria-current="page">
              World Food Day – Human Rights &amp; Social Justice Mission (HRSJM)
            </li>
          </ol>
        </nav>


        {/* Two-Column Editorial Layout */}
        <div className={styles.editorialLayout}>
          {/* ========================================================== */}
          {/* LEFT / MAIN EDITORIAL COLUMN                               */}
          {/* ========================================================== */}
          <div className={styles.mainContent}>
            {/* Header Block */}
            <header className={styles.headerBlock}>
              <h2 className={styles.orgTitle}>
                World Food Day – Human Rights &amp; Social Justice Mission (HRSJM)
              </h2>
              <div className={styles.metaBar}>
                <span className={styles.metaItem}>
                  <Calendar size={14} className={styles.metaIcon} aria-hidden="true" />
                  16 October 2026
                </span>
                <span className={styles.metaItem}>
                  <Tag size={14} className={styles.metaIcon} aria-hidden="true" />
                  Awareness &amp; Outreach
                </span>
                <span className={styles.metaItem}>
                  <MessageCircle size={14} className={styles.metaIcon} aria-hidden="true" />
                  0 Comments
                </span>
              </div>
            </header>

            {/* Top Primary Banner Image */}
            <div
              className={styles.editorialImageWrap}
              onClick={() =>
                openImageModal(
                  "/images/world-food-day/hrsjm-world-food-day-banner.jpg",
                  "Services by HRSJM Volunteers – World Food Day"
                )
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openImageModal(
                    "/images/world-food-day/hrsjm-world-food-day-banner.jpg",
                    "Services by HRSJM Volunteers – World Food Day"
                  );
                }
              }}
              aria-label="Click to enlarge World Food Day Volunteer Banner"
            >
              <Image
                src="/images/world-food-day/hrsjm-world-food-day-banner.jpg"
                alt="Services by HRSJM Volunteers – World Food Day Meal Service"
                width={1024}
                height={640}
                priority
                className={styles.bannerImg}
                sizes="(min-width: 1080px) 65vw, 100vw"
              />
              <div className={styles.chartZoomHint}>
                <Maximize2 size={16} />
                <span>Click to Enlarge</span>
              </div>
            </div>

            {/* Callout Lead Box: FIGHT HUNGER. NOURISH HOPE. SHARE HUMANITY. */}
            <div className={`${styles.povertyCard} ${styles.cardBorderBlue}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCircleBlue} aria-hidden="true">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className={styles.cardHeaderTitle}>
                    FIGHT HUNGER. NOURISH HOPE. SHARE HUMANITY.
                  </h3>
                </div>
              </div>
              <p className={styles.cardBodyText}>
                Food is not a privilege; it is a basic human right and necessity. Everyone deserves access to
                nutritious food, dignity, equality, and a life free from hunger.
              </p>
              <p className={styles.cardBodyText} style={{ marginTop: 2 }}>
                On World Food Day – <strong>16 October</strong>, Human Rights &amp; Social Justice Mission (HRSJM)
                calls on citizens, social workers, youth, volunteers, and responsible members of society to unite
                against hunger, malnutrition, and food insecurity.
              </p>
            </div>

            {/* Graphic 2: World Food Day Infographic Banner */}
            <div
              className={styles.editorialImageWrap}
              onClick={() =>
                openImageModal(
                  "/images/world-food-day/hrsjm-world-food-day-infographic.jpg",
                  "World Food Day – Together for a Hunger-Free India"
                )
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openImageModal(
                    "/images/world-food-day/hrsjm-world-food-day-infographic.jpg",
                    "World Food Day – Together for a Hunger-Free India"
                  );
                }
              }}
              aria-label="Click to enlarge World Food Day Infographic"
            >
              <Image
                src="/images/world-food-day/hrsjm-world-food-day-infographic.jpg"
                alt="World Food Day 16 October – Together for a Hunger-Free India, Better Food for a Healthier Tomorrow"
                width={1024}
                height={1400}
                className={styles.bannerImg}
                sizes="(min-width: 1080px) 65vw, 100vw"
              />
              <div className={styles.chartZoomHint}>
                <Maximize2 size={16} />
                <span>Click to Enlarge</span>
              </div>
            </div>

            {/* Two-Column Side-by-Side Cards (Our Message & Join Us) */}
            <div className={styles.twoColGrid}>
              {/* Left Box: Our Message is Simple (Orange) */}
              <div className={`${styles.povertyCard} ${styles.cardBorderOrange}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconCircleOrange} aria-hidden="true">
                    <Users size={20} />
                  </div>
                  <h4 className={styles.cardHeaderTitle} style={{ fontSize: "15px" }}>
                    Our Message is Simple
                  </h4>
                </div>
                <ul className={styles.cardCheckList}>
                  {MESSAGE_POINTS.map((point, idx) => (
                    <li key={idx} className={styles.cardCheckItem}>
                      <div className={styles.checkIconYellow} aria-hidden="true">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Box: Join Us for a Better Tomorrow (Pink) */}
              <div className={`${styles.povertyCard} ${styles.cardBorderPink}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconCirclePink} aria-hidden="true">
                    <Heart size={20} />
                  </div>
                  <h4 className={styles.cardHeaderTitle} style={{ fontSize: "15px" }}>
                    Join Us for a Better Tomorrow
                  </h4>
                </div>
                <ul className={styles.cardCheckList}>
                  {JOIN_US_POINTS.map((point, idx) => (
                    <li key={idx} className={styles.cardCheckItem}>
                      <div className={styles.checkIconYellow} aria-hidden="true">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Row Two Cards: Organized By & Tags/Keywords */}
            <div className={styles.twoColGrid}>
              {/* Left Box: Organized By (Green) */}
              <div className={`${styles.povertyCard} ${styles.cardBorderGreen}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconCircleGreen} aria-hidden="true">
                    <UserCheck size={20} />
                  </div>
                  <div>
                    <h4 className={styles.cardHeaderTitle} style={{ fontSize: "15px" }}>
                      Organized By
                    </h4>
                  </div>
                </div>
                <p className={styles.cardBodyText} style={{ fontWeight: 700, color: "var(--color-navy, #062a4f)" }}>
                  Human Rights &amp; Social Justice Mission (HRSJM)
                </p>
                <p className={styles.cardBodyText} style={{ fontStyle: "italic", marginTop: -6 }}>
                  We Are Human – And Serve for Humanity.
                </p>
                <div className={styles.contactLinksGrid}>
                  <div className={styles.contactLinkRow}>
                    <Globe size={15} style={{ color: "#28a745" }} />
                    <span>Website:</span>
                    <a
                      href="https://hrsjm.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLinkAnchor}
                    >
                      https://hrsjm.org/
                    </a>
                  </div>
                  <div className={styles.contactLinkRow}>
                    <MessageSquare size={15} style={{ color: "#28a745" }} />
                    <span>WhatsApp:</span>
                    <a
                      href="https://wa.me/917021057853"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLinkAnchor}
                    >
                      7021057853
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Box: Tags & Keywords (Blue) */}
              <div className={`${styles.povertyCard} ${styles.cardBorderBlue}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconCircleBlue} aria-hidden="true">
                    <Tag size={20} />
                  </div>
                  <h4 className={styles.cardHeaderTitle} style={{ fontSize: "15px" }}>
                    Tags &amp; Keywords
                  </h4>
                </div>
                <div className={styles.tagsList} style={{ marginTop: "4px" }}>
                  {TAGS_KEYWORDS.map((tag, idx) => (
                    <span key={idx} className={styles.tagPill} style={{ fontSize: "11px", padding: "4px 9px" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT / SIDEBAR COLUMN                                     */}
          {/* ========================================================== */}
          <aside className={styles.sidebar} aria-label="Sidebar Content">
            {/* Search Widget */}
            <div className={styles.searchWidget}>
              <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                  aria-label="Search posts"
                />
                <button type="submit" className={styles.searchBtn} aria-label="Submit search">
                  <Search size={16} />
                </button>
              </form>
            </div>

            {/* Recent Posts */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarCardTitle}>Recent Posts</h3>
              <ul className={styles.recentPostsList}>
                {RECENT_POSTS.map((post) => (
                  <li key={post.id}>
                    <Link href={post.href} className={styles.recentPostItem}>
                      <div className={styles.recentPostThumb}>
                        <Image
                          src={post.thumb}
                          alt={post.title}
                          width={58}
                          height={52}
                          className={styles.recentPostThumbImg}
                        />
                      </div>
                      <div className={styles.recentPostMeta}>
                        <span className={styles.recentPostTitle}>{post.title}</span>
                        <span className={styles.recentPostDate}>{post.date}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/events#activities" className={styles.viewAllPostsLink}>
                <span>View All Past Activities</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            {/* Photo Gallery Widget */}
            <div className={styles.sidebarCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", borderBottom: "2px solid var(--color-gold, #fad25c)", paddingBottom: "8px" }}>
                <h3 className={styles.sidebarCardTitle} style={{ margin: 0, padding: 0, border: "none" }}>Photo Gallery</h3>
                <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--color-navy, #062a4f)", background: "rgba(250, 210, 92, 0.35)", padding: "2px 8px", borderRadius: "10px" }}>
                  {PHOTO_GALLERY_IMAGES.length} Photos
                </span>
              </div>
              <div className={styles.galleryGrid}>
                {PHOTO_GALLERY_IMAGES.map((img, idx) => (
                  <div
                    key={idx}
                    className={styles.galleryThumbItem}
                    onClick={() => openGalleryModal(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        openGalleryModal(idx);
                      }
                    }}
                    aria-label={`Enlarge photo ${idx + 1}: ${img.alt}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={100}
                      height={100}
                      className={styles.galleryThumbImg}
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                className={styles.viewAllPostsLink}
                onClick={() => openGalleryModal(0)}
                style={{ marginTop: "14px", background: "none", border: "none", cursor: "pointer", width: "100%", justifyContent: "center" }}
              >
                <span>View Full Gallery ({PHOTO_GALLERY_IMAGES.length} Photos)</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>

            {/* Positive Change CTA Card */}
            <div className={styles.positiveChangeCard}>
              <div className={styles.positiveChangeIconWrap} aria-hidden="true">
                <Heart size={26} fill="currentColor" />
              </div>
              <h3 className={styles.positiveChangeTitle}>Be a Part of Positive Change</h3>
              <p className={styles.positiveChangeSub}>
                Join HRSJM and support our mission for a just, equal and humane society.
              </p>
              <Link href="/membership/apply" className={styles.positiveChangeBtn}>
                <span>Join Now</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* ============================================================ */}
      {/* Interactive Image Zoom / Photo Gallery Modal                 */}
      {/* ============================================================ */}
      {modalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image Preview Modal"
        >
          <div
            className={styles.modalDialog}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "1080px" }}
          >
            <div className={styles.modalHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h4 className={styles.modalTitle}>
                  {galleryIndex !== null
                    ? `Photo ${galleryIndex + 1} of ${PHOTO_GALLERY_IMAGES.length}`
                    : modalImgTitle}
                </h4>
              </div>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setModalOpen(false)}
                aria-label="Close modal preview"
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBodyRelative}>
              {galleryIndex !== null && (
                <>
                  <button
                    type="button"
                    className={`${styles.modalNavBtn} ${styles.modalNavPrev}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevGalleryImage();
                    }}
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    type="button"
                    className={`${styles.modalNavBtn} ${styles.modalNavNext}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextGalleryImage();
                    }}
                    aria-label="Next photo"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              <Image
                src={modalImgSrc}
                alt={modalImgTitle}
                width={1200}
                height={800}
                className={styles.modalImg}
                style={{
                  height: "auto",
                  width: "100%",
                  maxHeight: "75vh",
                  objectFit: "contain",
                }}
                priority
              />
            </div>

            <div className={styles.modalCaption}>
              {modalImgTitle}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
