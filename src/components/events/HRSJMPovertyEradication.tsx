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
  Activity,
  Users,
  Target,
  Megaphone,
  UserCheck,
  Globe,
  Check,
  Heart,
  MessageSquare,
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

interface HRSJMPovertyEradicationProps {
  activity?: ActivityInfo;
}

const RECENT_POSTS = [
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
  {
    id: "advancing-human-rights",
    title: "Advancing Human Rights and Social Justice in India: Missions for Equality, Dignity, and Opportunity",
    date: "October 10, 2026",
    href: "/events/advancing-human-rights-and-social-justice-in-india",
    thumb: "/images/activities/advancing-human-rights-social-justice.jpg",
  },
];

const RELATED_EVENTS = [
  {
    id: "world-food-day",
    title: "World Food Day Program & Awareness Drive",
    date: "October 16, 2026",
    href: "/events/world-food-day-human-rights-and-social-justice-mission",
    thumb: "/images/activities/world-food-day.jpg",
  },
  {
    id: "14-years-journey",
    title: "Legal Awareness Camp for Communities",
    date: "October 12, 2026",
    href: "/events/human-rights-social-justice-mission-14-years-journey",
    thumb: "/images/activities/hrsjm-14-years-journey.jpg",
  },
  {
    id: "advancing-human-rights",
    title: "Medical Health Camp and Support Drive",
    date: "October 10, 2026",
    href: "/events/advancing-human-rights-and-social-justice-in-india",
    thumb: "/images/activities/advancing-human-rights-social-justice.jpg",
  },
];

const MISSION_POINTS = [
  "Economic Development & Livelihood Opportunities",
  "Education for All",
  "Social Welfare & Community Development",
  "Human Rights Awareness & Protection",
  "Justice for All & Equal Opportunities",
  "Dignity, Unity, Peace & Humanity",
];

const WHY_JOIN_POINTS = [
  "Stand for human rights and social justice.",
  "Support awareness and community welfare initiatives.",
  "Promote education, equality and economic empowerment.",
  "Be part of a mission working towards a more inclusive India.",
];

const SIDEBAR_TAGS = [
  "#HumanRights",
  "#SocialJustice",
  "#EndPoverty",
  "#Equality",
  "#Justice",
  "#EducationForAll",
  "#CommunitySupport",
  "#HRSJM",
  "#NGOIndia",
  "#Awareness",
  "#Volunteer",
  "#BetterIndia",
];

export default function HRSJMPovertyEradication({ activity }: HRSJMPovertyEradicationProps) {
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
      id="poverty-eradication-detail"
      className={styles.orgSection}
      aria-label="International Day for the Eradication of Poverty Overview"
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
              International Day for the Eradication of Poverty | 17 October
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
                International Day for the Eradication of Poverty | 17 October
              </h2>
              <div className={styles.metaBar}>
                <span className={styles.metaItem}>
                  <Calendar size={14} className={styles.metaIcon} aria-hidden="true" />
                  17 October 2026
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
                  "/images/poverty-eradication/hrsjm-poverty-progress-banner.jpg",
                  "From Poverty to Progress – Together We Can! (17 October)"
                )
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openImageModal(
                    "/images/poverty-eradication/hrsjm-poverty-progress-banner.jpg",
                    "From Poverty to Progress – Together We Can! (17 October)"
                  );
                }
              }}
              aria-label="Click to enlarge Poverty to Progress Banner"
            >
              <Image
                src="/images/poverty-eradication/hrsjm-poverty-progress-banner.jpg"
                alt="International Day for the Eradication of Poverty – From Poverty to Progress, Together We Can!"
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

            {/* Card 1: HUMAN RIGHTS & SOCIAL JUSTICE MISSION (HRSJM) */}
            <div className={`${styles.povertyCard} ${styles.cardBorderBlue}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCircleBlue} aria-hidden="true">
                  <Activity size={20} />
                </div>
                <div>
                  <h3 className={styles.cardHeaderTitle}>
                    HUMAN RIGHTS &amp; SOCIAL JUSTICE MISSION (HRSJM)
                  </h3>
                  <p className={styles.cardHeaderSubtitle}>
                    Stand for Human Rights – Work for Social Justice
                  </p>
                </div>
              </div>
              <p className={styles.cardBodyText}>
                Poverty is not just a lack of money; it is also a lack of opportunities, education, equality and
                access to basic necessities. Together, we can work towards a society where every individual has
                the opportunity to live with dignity, respect and justice.
              </p>
            </div>

            {/* Card 2: United Against Poverty – Together, We Can Build a Better India */}
            <div className={`${styles.povertyCard} ${styles.cardBorderOrange}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCircleOrange} aria-hidden="true">
                  <Users size={20} />
                </div>
                <h3 className={styles.cardHeaderTitle}>
                  United Against Poverty – Together, We Can Build a Better India
                </h3>
              </div>
              <p className={styles.cardBodyText}>
                Human Rights &amp; Social Justice Mission (HRSJM) is an organization dedicated to promoting
                awareness of human rights, social justice, equality, dignity, fraternity and peaceful coexistence.
                Through public awareness, social initiatives and community participation, the Mission seeks to
                encourage citizens to understand their rights and responsibilities and contribute positively to
                society.
              </p>
            </div>

            {/* Card 3: Our Mission, Our Responsibility */}
            <div className={`${styles.povertyCard} ${styles.cardBorderGreen}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCircleGreen} aria-hidden="true">
                  <Target size={20} />
                </div>
                <h3 className={styles.cardHeaderTitle}>Our Mission, Our Responsibility</h3>
              </div>
              <ul className={styles.cardCheckList}>
                {MISSION_POINTS.map((point, idx) => (
                  <li key={idx} className={styles.cardCheckItem}>
                    <div className={styles.checkCircleGreen} aria-hidden="true">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 4: Join HRSJM – Become a Voice for Change! */}
            <div className={`${styles.povertyCard} ${styles.cardBorderPink}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCirclePink} aria-hidden="true">
                  <Megaphone size={20} />
                </div>
                <h3 className={styles.cardHeaderTitle}>
                  Join HRSJM – Become a Voice for Change!
                </h3>
              </div>
              <p className={styles.cardBodyText}>
                Are you passionate about helping people, supporting underprivileged communities and building a
                fairer society? Become a member of the Human Rights &amp; Social Justice Mission and contribute
                your time, dedication and efforts towards a better tomorrow.
              </p>
            </div>

            {/* Card 5: Why Join HRSJM? */}
            <div className={`${styles.povertyCard} ${styles.cardBorderBlue}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCircleBlue} aria-hidden="true">
                  <UserCheck size={20} />
                </div>
                <h3 className={styles.cardHeaderTitle}>Why Join HRSJM?</h3>
              </div>
              <ul className={styles.cardCheckList}>
                {WHY_JOIN_POINTS.map((point, idx) => (
                  <li key={idx} className={styles.cardCheckItem}>
                    <div className={styles.checkCircleBlue} aria-hidden="true">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 6: Your Participation Matters! */}
            <div className={`${styles.povertyCard} ${styles.cardBorderOrange}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCircleOrange} aria-hidden="true">
                  <Users size={20} />
                </div>
                <h3 className={styles.cardHeaderTitle}>Your Participation Matters!</h3>
              </div>
              <p className={styles.cardBodyText}>
                Share this message, invite your friends and family, and encourage more responsible citizens to
                join our mission. Every committed member can help spread awareness and strengthen the spirit of
                humanity.
              </p>
            </div>

            {/* Card 7: Join Us Today! */}
            <div className={`${styles.povertyCard} ${styles.cardBorderGreen}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCircleGreen} aria-hidden="true">
                  <Globe size={20} />
                </div>
                <h3 className={styles.cardHeaderTitle}>Join Us Today!</h3>
              </div>
              <div className={styles.contactLinksGrid}>
                <div className={styles.contactLinkRow}>
                  <Globe size={16} className={styles.iconCircleGreen} style={{ width: 24, height: 24 }} />
                  <span>Website:</span>
                  <a
                    href="https://hrsjm.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactLinkAnchor}
                  >
                    https://hrsjm.org
                  </a>
                </div>
                <div className={styles.contactLinkRow}>
                  <MessageSquare
                    size={16}
                    className={styles.iconCircleGreen}
                    style={{ width: 24, height: 24 }}
                  />
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

            {/* Card 8: Bottom Mission Summary & Hashtags Box */}
            <div className={styles.hashtagsBox}>
              <h4 className={styles.hashtagsTitle}>Human Rights &amp; Social Justice Mission</h4>
              <p className={styles.hashtagsSub}>
                Justice for All • Equality for All • Education for All • More Members, Greater Awareness, Stronger Communities, A Better India.
              </p>
              <p className={styles.hashtagsList}>
                #HRSJM #HumanRightsAndSocialJusticeMission #HumanRights #SocialJustice #JoinHRSJM #HRSJMMembership
                #EducationOfPoverty #EndPoverty #PovertyFreeIndia #JusticeForAll #EqualityForAll #EducationForAll
                #EconomicDevelopment #SocialDevelopment #CommunityWelfare #HumanRightsAwareness
                #VolunteerForChange #NGOIndia #SocialWorkIndia #EmpowerCommunities #InclusiveIndia
                #StandForHumanRights #WorkForSocialJustice #BetterIndia #HumanityFirst #hrsjmorg
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

            {/* Related Events & Activities */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarCardTitle}>Related Events &amp; Activities</h3>
              <ul className={styles.recentPostsList}>
                {RELATED_EVENTS.map((event) => (
                  <li key={event.id}>
                    <Link href={event.href} className={styles.recentPostItem}>
                      <div className={styles.recentPostThumb}>
                        <Image
                          src={event.thumb}
                          alt={event.title}
                          width={58}
                          height={52}
                          className={styles.recentPostThumbImg}
                        />
                      </div>
                      <div className={styles.recentPostMeta}>
                        <span className={styles.recentPostTitle}>{event.title}</span>
                        <span className={styles.recentPostDate}>{event.date}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/events#activities" className={styles.viewAllPostsLink}>
                <span>View All Events</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
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
