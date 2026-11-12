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
  Users,
  Target,
  ShieldCheck,
  GraduationCap,
  Scale,
  Layers,
  Sun,
  Heart,
  MessageCircle,
  UserCheck,
  Activity,
  Leaf,
  LifeBuoy,
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

interface HRSJMAdvancingRightsProps {
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
];

const KEY_FOCUS_AREAS = [
  { name: "Human Rights Protection", icon: ShieldCheck, color: "#8a2be2" },
  { name: "Women & Child Rights", icon: Heart, color: "#fd7e14" },
  { name: "Minority Rights", icon: Users, color: "#20c997" },
  { name: "Senior Citizen Welfare", icon: UserCheck, color: "#0d6efd" },
  { name: "Legal Awareness & Guidance", icon: Scale, color: "#6f42c1" },
  { name: "Education & Social Justice", icon: GraduationCap, color: "#0b69a3" },
  { name: "Medical & Welfare Activities", icon: Activity, color: "#dc3545" },
  { name: "Environmental Protection", icon: Leaf, color: "#28a745" },
  { name: "Disaster Relief & Humanitarian Support", icon: LifeBuoy, color: "#e6a817" },
];

const SIDEBAR_TAGS = [
  "#HumanRights",
  "#SocialJustice",
  "#Equality",
  "#Dignity",
  "#Opportunity",
  "#EducationForAll",
  "#WomenEmpowerment",
  "#ChildRights",
  "#HumanTrafficking",
  "#Poverty",
  "#VulnerableGroups",
  "#NHRC",
  "#India",
  "#HRSJM",
];

export default function HRSJMAdvancingRights({ activity }: HRSJMAdvancingRightsProps) {
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
      id="advancing-rights-detail"
      className={styles.orgSection}
      aria-label="Advancing Human Rights and Social Justice in India Overview"
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
              Advancing Human Rights and Social Justice in India
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
                Advancing Human Rights and Social Justice in India: Missions for Equality, Dignity, and Opportunity
              </h2>
              <div className={styles.metaBar}>
                <span className={styles.metaItem}>
                  <Calendar size={14} className={styles.metaIcon} aria-hidden="true" />
                  15 October 2026
                </span>
                <span className={styles.metaItem}>
                  <Tag size={14} className={styles.metaIcon} aria-hidden="true" />
                  Awareness &amp; Outreach
                </span>
                <span className={styles.metaItem}>
                  <Tag size={14} className={styles.metaIcon} aria-hidden="true" />
                  Blog
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
                  "/images/advancing-rights/hrsjm-advancing-rights-banner.jpg",
                  "Advancing Human Rights and Social Justice in India Banner"
                )
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openImageModal(
                    "/images/advancing-rights/hrsjm-advancing-rights-banner.jpg",
                    "Advancing Human Rights and Social Justice in India Banner"
                  );
                }
              }}
              aria-label="Click to enlarge Advancing Rights Banner"
            >
              <Image
                src="/images/advancing-rights/hrsjm-advancing-rights-banner.jpg"
                alt="Advancing Human Rights and Social Justice in India – Photo Grid and Services Banner"
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

            {/* Constitutional Principles Lead Box */}
            <div className={`${styles.povertyCard} ${styles.cardBorderBlue}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCircleBlue} aria-hidden="true">
                  <Users size={20} />
                </div>
                <div>
                  <p className={styles.cardBodyText} style={{ margin: 0, fontWeight: 500 }}>
                    India&apos;s Constitution guarantees fundamental rights such as equality before the law,
                    freedom of speech and expression, the right to education, and protection from discrimination.
                    These principles form the foundation of the country&apos;s ongoing human rights and{" "}
                    <strong>social justice mission</strong>.
                  </p>
                </div>
              </div>
              <p className={styles.cardBodyText} style={{ marginTop: 2 }}>
                HRSJM, along with government bodies, institutions like the NHRC, and civil society, continues to
                work towards ensuring that every citizen can live with dignity, equality, and opportunity.
              </p>
            </div>

            {/* Graphic 2: Rich Thematic Artwork */}
            <div
              className={styles.editorialImageWrap}
              onClick={() =>
                openImageModal(
                  "/images/advancing-rights/hrsjm-advancing-rights-artwork.jpg",
                  "Human Rights & Social Justice Mission – Artwork"
                )
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openImageModal(
                    "/images/advancing-rights/hrsjm-advancing-rights-artwork.jpg",
                    "Human Rights & Social Justice Mission – Artwork"
                  );
                }
              }}
              aria-label="Click to enlarge Advancing Rights Artwork"
            >
              <Image
                src="/images/advancing-rights/hrsjm-advancing-rights-artwork.jpg"
                alt="Human Rights & Social Justice Mission – Girls Education, Discrimination, Poverty, Human Trafficking, Women Empowerment Artwork"
                width={1024}
                height={800}
                className={styles.bannerImg}
                sizes="(min-width: 1080px) 65vw, 100vw"
              />
              <div className={styles.chartZoomHint}>
                <Maximize2 size={16} />
                <span>Click to Enlarge</span>
              </div>
            </div>

            {/* Current Challenges and Focus Areas */}
            <div className={`${styles.povertyCard} ${styles.cardBorderOrange}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCircleOrange} aria-hidden="true">
                  <Target size={20} />
                </div>
                <h3 className={styles.cardHeaderTitle}>Current Challenges and Focus Areas</h3>
              </div>
              <p className={styles.cardBodyText}>
                As of mid-October 2026, several issues remain central to this mission: Electoral integrity, Special
                Intensive Revision (SIR) of electoral rolls, transparency, possible mass disenfranchisement,
                protection of vulnerable groups, and the need for clean, accountable governance. Education,
                empowerment, and equality also remain key focus areas.
              </p>
            </div>

            {/* 2x2 Themed Feature Grid */}
            <div className={styles.twoByTwoGrid}>
              {/* Feature 1: Protection of Vulnerable Groups (Green) */}
              <div className={`${styles.povertyCard} ${styles.cardBorderGreen}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconCircleGreen} aria-hidden="true">
                    <ShieldCheck size={20} />
                  </div>
                  <h4 className={styles.cardHeaderTitle} style={{ fontSize: "14.5px" }}>
                    Protection of Vulnerable Groups
                  </h4>
                </div>
                <p className={styles.cardBodyText}>
                  Human rights institutions must raise their voices for prisoners, migrant workers, elderly people,
                  persons with disabilities, and others facing barriers.
                </p>
              </div>

              {/* Feature 2: Education, Empowerment, and Equality (Pink) */}
              <div className={`${styles.povertyCard} ${styles.cardBorderPink}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconCirclePink} aria-hidden="true">
                    <GraduationCap size={20} />
                  </div>
                  <h4 className={styles.cardHeaderTitle} style={{ fontSize: "14.5px" }}>
                    Education, Empowerment, and Equality
                  </h4>
                </div>
                <p className={styles.cardBodyText}>
                  Focus on rights of women, minorities, children, senior citizens, and workers. Expand social
                  protection, rural livelihoods and inclusive development programs.
                </p>
              </div>

              {/* Feature 3: Civil Space and Institutional Responsiveness (Blue) */}
              <div className={`${styles.povertyCard} ${styles.cardBorderBlue}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconCircleBlue} aria-hidden="true">
                    <Scale size={20} />
                  </div>
                  <h4 className={styles.cardHeaderTitle} style={{ fontSize: "14.5px" }}>
                    Civil Space and Institutional Responsiveness
                  </h4>
                </div>
                <p className={styles.cardBodyText}>
                  Address individual grievances through NHRC and courts while safeguarding civic freedoms and the
                  role of independent institutions.
                </p>
              </div>

              {/* Feature 4: Role of Missions and Everyday Action (Purple) */}
              <div className={`${styles.povertyCard} ${styles.cardBorderPurple}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconCirclePurple} aria-hidden="true">
                    <Layers size={20} />
                  </div>
                  <h4 className={styles.cardHeaderTitle} style={{ fontSize: "14.5px" }}>
                    Role of Missions and Everyday Action
                  </h4>
                </div>
                <p className={styles.cardBodyText}>
                  A government-registered organization like HRSJM works through education, empowerment, legal
                  awareness, community outreach and campaigns for human rights.
                </p>
              </div>
            </div>

            {/* Bottom Vision Card (Amber/Gold) */}
            <div className={`${styles.povertyCard} ${styles.cardBorderAmber}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCircleAmber} aria-hidden="true">
                  <Sun size={20} />
                </div>
                <h3 className={styles.cardHeaderTitle}>
                  Our Vision for a Fairer and More Inclusive India
                </h3>
              </div>
              <p className={styles.cardBodyText}>
                These efforts are not only about preventing harm — they are about ensuring every person, especially
                children and young people, has the chance to learn, participate, and live with dignity. Social
                justice advances when rights are understood, protected and extended to everyone. India&apos;s
                diversity is a strength, and together we can build a more equitable society grounded in constitutional
                values.
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

            {/* Key Focus Areas Widget */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarCardTitle}>Key Focus Areas</h3>
              <ul className={styles.keyFocusSidebarList}>
                {KEY_FOCUS_AREAS.map((area, idx) => {
                  const Icon = area.icon;
                  return (
                    <li key={idx} className={styles.keyFocusSidebarItem}>
                      <div
                        className={styles.keyFocusSidebarIcon}
                        style={{ backgroundColor: area.color }}
                        aria-hidden="true"
                      >
                        <Icon size={14} />
                      </div>
                      <span>{area.name}</span>
                    </li>
                  );
                })}
              </ul>
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

            {/* Tags Widget */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarCardTitle}>Tags</h3>
              <div className={styles.tagsList}>
                {SIDEBAR_TAGS.map((tag, idx) => (
                  <span key={idx} className={styles.tagPill}>
                    {tag}
                  </span>
                ))}
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
