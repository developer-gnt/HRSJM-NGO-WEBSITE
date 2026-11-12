"use client";

import React, { useState } from "react";
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
  Target,
  Eye,
  Users,
  Check,
  BookOpen,
  MessageCircle,
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

interface HRSJMHistoryVisionProps {
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
    id: "world-food-day",
    title: "World Food Day – Human Rights & Social Justice Mission (HRSJM)",
    date: "October 16, 2026",
    href: "/events/world-food-day-human-rights-and-social-justice-mission",
    thumb: "/images/activities/world-food-day.jpg",
  },
  {
    id: "hrsjm-mission",
    title: "HUMAN RIGHTS & SOCIAL JUSTICE MISSION (HRSJM)",
    date: "October 15, 2026",
    href: "/events/human-rights-social-justice-mission",
    thumb: "/images/activities/hrsjm-org-banner-card.jpg",
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

const MISSION_CHECKLIST = [
  "Human dignity and equality",
  "Social justice and fraternity",
  "Protection of human rights",
  "Awareness of citizens' rights and responsibilities",
  "Respect for senior citizens and vulnerable communities",
  "Opposition to discrimination and social injustice",
  "Peace, brotherhood and communal harmony",
  "Responsible participation in society",
];

const VISION_CHECKLIST = [
  "Through awareness campaigns and community outreach, HRSJM seeks to make human-rights awareness more accessible to ordinary citizens.",
  "Social Justice and Community Participation",
  "Social justice is not only a legal or governmental responsibility; it is also a shared social responsibility.",
  "HRSJM encourages citizens to participate constructively in addressing social concerns, supporting affected individuals and bringing legitimate grievances to the attention of the appropriate authorities.",
  "Promoting Equality and Brotherhood",
];

export default function HRSJMHistoryVision({ activity }: HRSJMHistoryVisionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState("");
  const [modalImgTitle, setModalImgTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/news?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const openImageModal = (src: string, title: string) => {
    setModalImgSrc(src);
    setModalImgTitle(title);
    setModalOpen(true);
  };

  return (
    <section
      id="hrsjm-history-vision"
      className={styles.orgSection}
      aria-label="HRSJM History, Vision and Social Contribution Overview"
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
              {activity?.title || "Human Rights & Social Justice Mission: History, Vision and Social Contribution"}
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
                Human Rights &amp; Social Justice Mission: History, Vision and Social Contribution
              </h2>
              <div className={styles.metaBar}>
                <span className={styles.metaItem}>
                  <Calendar size={14} className={styles.metaIcon} aria-hidden="true" />
                  19 Aug 2025
                </span>
                <span className={styles.metaItem}>
                  <Tag size={14} className={styles.metaIcon} aria-hidden="true" />
                  Blog / Awareness
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
                  "/images/history-vision/hrsjm-better-tomorrow-banner.jpg",
                  "Human Rights & Social Justice Mission – and a Better Tomorrow"
                )
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openImageModal(
                    "/images/history-vision/hrsjm-better-tomorrow-banner.jpg",
                    "Human Rights & Social Justice Mission – and a Better Tomorrow"
                  );
                }
              }}
              aria-label="Click to enlarge Better Tomorrow Banner"
            >
              <Image
                src="/images/history-vision/hrsjm-better-tomorrow-banner.jpg"
                alt="Human Rights & Social Justice Mission – and a Better Tomorrow Banner"
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

            {/* Introductory Editorial Paragraph */}
            <div className={styles.editorialLead}>
              <p>
                <strong>Human Rights &amp; Social Justice Mission (HRSJM)</strong> is an organization dedicated
                to promoting awareness of human equality, dignity, fraternity and peaceful coexistence. Through
                public awareness, social initiatives and community participation, the Mission seeks to encourage
                citizens to understand their rights and responsibilities and contribute positively to society.
              </p>
            </div>

            {/* Graphic 2: 29 August Nuclear Tests */}
            <div
              className={styles.editorialImageWrap}
              onClick={() =>
                openImageModal(
                  "/images/history-vision/hrsjm-nuclear-tests-banner.jpg",
                  "29 August – International Day Against Nuclear Tests"
                )
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openImageModal(
                    "/images/history-vision/hrsjm-nuclear-tests-banner.jpg",
                    "29 August – International Day Against Nuclear Tests"
                  );
                }
              }}
              aria-label="Click to enlarge Nuclear Tests Banner"
            >
              <Image
                src="/images/history-vision/hrsjm-nuclear-tests-banner.jpg"
                alt="29 August Human Rights & Social Justice Mission - Say No to Nuclear Tests, Say Yes to Peace - International Day Against Nuclear Tests"
                width={1024}
                height={819}
                className={styles.bannerImg}
                sizes="(min-width: 1080px) 65vw, 100vw"
              />
              <div className={styles.chartZoomHint}>
                <Maximize2 size={16} />
                <span>Click to Enlarge</span>
              </div>
            </div>

            {/* Section 1: Our History and Journey */}
            <div className={styles.historyCalloutCard}>
              <div className={styles.sectionCalloutHeader}>
                <div className={styles.missionVisionIconOrange} aria-hidden="true">
                  <BookOpen size={20} />
                </div>
                <h3 className={styles.sectionCalloutTitle}>Our History and Journey</h3>
              </div>
              <p className={styles.sectionCalloutText}>
                The journey of Human Rights &amp; Social Justice Mission has been shaped by the belief that every
                person deserves dignity, equality and fair treatment, irrespective of social, economic, cultural
                or other differences. Over the years, the Mission has focused on creating awareness about human rights
                and social justice at the grassroots level. Its approach emphasizes awareness, guidance, responsible
                citizenship and peaceful engagement rather than confrontation. The organization continues to build a
                community of people who believe in humanity, equality and social responsibility. One of the important
                areas of HRSJM&apos;s work is spreading awareness about fundamental human rights and encouraging
                citizens to understand the importance of justice and equality.
              </p>
            </div>

            {/* Section 2: Two-Column Side-by-Side Cards (Our Mission & Our Vision) */}
            <div className={styles.twoColGrid}>
              {/* Left Box: Our Mission */}
              <div className={styles.missionVisionBox}>
                <div className={styles.missionVisionHeader}>
                  <div className={styles.missionVisionIconOrange} aria-hidden="true">
                    <Target size={20} />
                  </div>
                  <div>
                    <h4 className={styles.missionVisionTitle}>Our Mission</h4>
                  </div>
                </div>
                <p className={styles.missionVisionSubtitle}>
                  The Mission works to promote awareness concerning:
                </p>
                <ul className={styles.checkList}>
                  {MISSION_CHECKLIST.map((item, idx) => (
                    <li key={idx} className={styles.checkItem}>
                      <div className={styles.checkIconYellow} aria-hidden="true">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Box: Our Vision for the Future */}
              <div className={styles.missionVisionBox}>
                <div className={styles.missionVisionHeader}>
                  <div className={styles.missionVisionIconGreen} aria-hidden="true">
                    <Eye size={20} />
                  </div>
                  <div>
                    <h4 className={styles.missionVisionTitle}>Our Vision for the Future</h4>
                  </div>
                </div>
                <ul className={styles.checkList} style={{ marginTop: "8px" }}>
                  {VISION_CHECKLIST.map((item, idx) => (
                    <li key={idx} className={styles.checkItem}>
                      <div className={styles.checkIconGreen} aria-hidden="true">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 3: Our Social Contribution */}
            <div className={styles.contributionCard}>
              <div className={styles.sectionCalloutHeader}>
                <div className={styles.missionVisionIconOrange} aria-hidden="true">
                  <Users size={20} />
                </div>
                <h3 className={styles.sectionCalloutTitle}>Our Social Contribution</h3>
              </div>
              <p className={styles.sectionCalloutText}>
                India&apos;s strength lies in its diversity. Communities with different languages, cultures,
                traditions and beliefs live together across the country. HRSJM promotes the values of equality,
                brotherhood, mutual respect and peaceful coexistence. Its social-awareness initiatives aim to
                encourage people to look beyond discrimination and work toward a society where every individual is
                treated with dignity.
              </p>
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

            {/* Dedicated Signature Programs */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarCardTitle}>Dedicated Signature Programs</h3>
              <ul className={styles.programItemsList} style={{ marginTop: "12px" }}>
                <li className={styles.programItem}>
                  <div className={styles.programNum} aria-hidden="true" style={{ background: "#e6a817" }}>
                    1
                  </div>
                  <div>
                    <strong>Child Adhikar:</strong> A specialized child rights protection framework that
                    establishes a stronger environment for children&apos;s safety, education and dignity.
                  </div>
                </li>
                <li className={styles.programItem}>
                  <div className={styles.programNum} aria-hidden="true" style={{ background: "#e6a817" }}>
                    2
                  </div>
                  <div>
                    <strong>Paryavaran Raksha:</strong> An environmental justice initiative focusing on
                    eco-sustainability, including tree plantation, waste conservation campaigns, and resource
                    preservation.
                  </div>
                </li>
              </ul>
            </div>

            {/* Easy Joining Process Infographic Widget */}
            <div className={styles.easyJoiningCard}>
              <div
                className={styles.easyJoiningImgWrap}
                onClick={() =>
                  openImageModal(
                    "/images/journey/hrsjm-easy-joining-process.jpg",
                    "HRSJM Easy Joining Process"
                  )
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    openImageModal(
                      "/images/journey/hrsjm-easy-joining-process.jpg",
                      "HRSJM Easy Joining Process"
                    );
                  }
                }}
                aria-label="Click to enlarge Easy Joining Process"
              >
                <Image
                  src="/images/journey/hrsjm-easy-joining-process.jpg"
                  alt="HRSJM Easy Joining Process: Open Website, Click I Want to Join, Fill Form, Attach Documents, Pay Joining Fees"
                  width={683}
                  height={1024}
                  className={styles.easyJoiningImg}
                  sizes="(min-width: 1080px) 350px, 100vw"
                />
                <div className={styles.chartZoomHint}>
                  <Maximize2 size={16} />
                  <span>Click to Enlarge</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ============================================================ */}
      {/* Interactive Image Zoom Modal                                 */}
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
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h4 className={styles.modalTitle}>{modalImgTitle}</h4>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setModalOpen(false)}
                aria-label="Close modal preview"
              >
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <Image
                src={modalImgSrc}
                alt={modalImgTitle}
                width={1200}
                height={800}
                className={styles.modalImg}
                style={{ height: "auto", width: "100%", maxHeight: "82vh", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
