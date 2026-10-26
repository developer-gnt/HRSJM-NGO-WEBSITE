"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Tag,
  Shield,
  Eye,
  Award,
  CheckCircle2,
  Check,
  Quote,
  Search,
  ArrowRight,
  ArrowLeft,
  Maximize2,
  X,
  PhoneCall,
  Users,
  HeartHandshake,
  Scale,
  GraduationCap,
  HeartPulse,
  Leaf,
  LifeBuoy,
  UserCheck,
  MapPin,
} from "lucide-react";
import styles from "./orgOverview.module.css";

export interface ActivityContext {
  id?: string;
  title?: string;
  date?: string;
  location?: string;
  category?: string;
  image?: string;
}

interface HRSJMOrgOverviewProps {
  activity?: ActivityContext;
}

interface RecentPostItem {
  id: string;
  title: string;
  date: string;
  thumb: string;
  href: string;
}

const RECENT_POSTS: RecentPostItem[] = [
  {
    id: "poverty-eradication",
    title: "International Day for the Eradication of Poverty – 17 October",
    date: "October 17, 2026",
    thumb: "/images/activities/eradication-of-poverty.jpg",
    href: "/events/international-day-for-the-eradication-of-poverty-17-october",
  },
  {
    id: "world-food-day",
    title: "World Food Day – Human Rights & Social Justice Mission (HRSJM)",
    date: "October 16, 2026",
    thumb: "/images/activities/world-food-day.jpg",
    href: "/events/world-food-day-human-rights-and-social-justice-mission",
  },
  {
    id: "history-vision",
    title: "Human Rights & Social Justice Mission: History, Vision and Social Contribution",
    date: "October 14, 2026",
    thumb: "/images/activities/hrsjm-history-vision-social-contribution.jpg",
    href: "/events/human-rights-social-justice-mission-history-vision-social-contribution",
  },
  {
    id: "14-years-journey",
    title: "HUMAN RIGHTS & SOCIAL JUSTICE MISSION – 14 Years Journey",
    date: "October 12, 2026",
    thumb: "/images/activities/hrsjm-14-years-journey.jpg",
    href: "/events/human-rights-social-justice-mission-14-years-journey",
  },
  {
    id: "advancing-human-rights",
    title: "Advancing Human Rights and Social Justice in India: Missions for Equality, Dignity, and Opportunity",
    date: "October 10, 2026",
    thumb: "/images/activities/advancing-human-rights-social-justice.jpg",
    href: "/events/advancing-human-rights-and-social-justice-in-india",
  },
];

const FOCUS_AREAS = [
  {
    label: "Human Rights Protection",
    desc: "Defending fundamental freedoms & civil rights",
    icon: Shield,
    color: "#0d6efd",
  },
  {
    label: "Women & Child Rights",
    desc: "Safety, equality, education & dignity",
    icon: Users,
    color: "#d63384",
  },
  {
    label: "Minority Rights",
    desc: "Equal opportunities & social inclusion",
    icon: HeartHandshake,
    color: "#198754",
  },
  {
    label: "Senior Citizen Welfare",
    desc: "Care, respect, medical support & dignity",
    icon: UserCheck,
    color: "#fd7e14",
  },
  {
    label: "Legal Awareness & Guidance",
    desc: "Legal literacy clinics & Janta Darbar",
    icon: Scale,
    color: "#0dcaf0",
  },
  {
    label: "Education & Social Justice",
    desc: "Equitable access to quality learning",
    icon: GraduationCap,
    color: "#6f42c1",
  },
  {
    label: "Medical & Welfare Activities",
    desc: "Health camps, medicines & patient aid",
    icon: HeartPulse,
    color: "#dc3545",
  },
  {
    label: "Environmental Protection",
    desc: "Cleanliness drives, greening & eco-care",
    icon: Leaf,
    color: "#20c997",
  },
  {
    label: "Disaster Relief & Humanitarian Support",
    desc: "Emergency aid & essential community relief",
    icon: LifeBuoy,
    color: "#055160",
  },
];

const HASHTAGS = [
  "#Human_Rights_Organization",
  "#Social_Justice",
  "#Human_Rights_NGO",
  "#Human_Rights_Awareness",
  "#Social_Justice_India",
  "#Legal_Awareness",
  "#Human_Rights_Activities",
  "#Women_Rights",
  "#Child_Rights",
  "#Senior_Citizen_Rights",
  "#Minority_Rights",
  "#Humanitarian_Service",
  "#Justice_For_All",
];

export default function HRSJMOrgOverview({ activity }: HRSJMOrgOverviewProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/news?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <section id="hrsjm-org-overview" className={styles.orgSection} aria-label="HRSJM Organization Overview">
      <div className={styles.container}>
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
          <ol className={styles.breadcrumbList}>
            <li className={styles.breadcrumbItem}>
              <Link href="/">Home</Link>
            </li>
            <li className={styles.breadcrumbSep} aria-hidden="true">
              /
            </li>
            <li className={styles.breadcrumbItem}>
              <Link href="/events">Events &amp; Activities</Link>
            </li>
            <li className={styles.breadcrumbSep} aria-hidden="true">
              /
            </li>
            {activity ? (
              <>
                <li className={styles.breadcrumbItem}>
                  <Link href="/events#activities">Past Activities</Link>
                </li>
                <li className={styles.breadcrumbSep} aria-hidden="true">
                  /
                </li>
                <li className={`${styles.breadcrumbItem} ${styles.breadcrumbActive}`} aria-current="page">
                  {activity.title}
                </li>
              </>
            ) : (
              <li className={`${styles.breadcrumbItem} ${styles.breadcrumbActive}`} aria-current="page">
                HRSJM Organisation Overview
              </li>
            )}
          </ol>
        </nav>


        {/* Two-Column Editorial Layout */}
        <div className={styles.editorialLayout}>
          {/* ========================================================== */}
          {/* LEFT / MAIN COLUMN                                          */}
          {/* ========================================================== */}
          <div className={styles.mainContent}>
            {/* A. Organization Heading */}
            <header className={styles.headerBlock}>
              <h2 className={styles.orgTitle}>
                HUMAN RIGHTS & SOCIAL JUSTICE MISSION (HRSJM)
              </h2>
              <div className={styles.orgSubtitle}>
                <span>JUSTICE</span>
                <span className={styles.subtitleDot}>•</span>
                <span>EQUALITY</span>
                <span className={styles.subtitleDot}>•</span>
                <span>DIGNITY</span>
                <span className={styles.subtitleDot}>•</span>
                <span>HUMANITY</span>
              </div>
              <div className={styles.metaBar}>
                <span className={styles.metaItem}>
                  <Calendar size={14} className={styles.metaIcon} aria-hidden="true" />
                  19 Aug 2025
                </span>
                <span className={styles.metaItem}>
                  <Tag size={14} className={styles.metaIcon} aria-hidden="true" />
                  Organisation Overview
                </span>
                <span className={styles.metaItem}>
                  <Tag size={14} className={styles.metaIcon} aria-hidden="true" />
                  Awareness & Outreach
                </span>
              </div>
            </header>

            {/* B. Organization Banner Image */}
            <div className={styles.bannerWrap}>
              <Image
                src="/images/events/org/org-infographic-banner.jpg"
                alt="Human Rights and Social Justice Mission (HRSJM) Organizational Overview Banner"
                width={980}
                height={896}
                priority
                className={styles.bannerImg}
                sizes="(min-width: 1080px) 65vw, 100vw"
              />
            </div>

            {/* C. Mission, Vision, and Core Values Panels */}
            <div className={styles.mvvGrid}>
              {/* Mission */}
              <div className={`${styles.mvvCard} ${styles.mvvMission}`}>
                <div className={styles.mvvHeader}>
                  <div className={styles.mvvIconBadge} aria-hidden="true">
                    <Shield size={18} />
                  </div>
                  <h3 className={styles.mvvTitle}>Our Mission</h3>
                </div>
                <p className={styles.mvvText}>
                  To promote and protect human rights, social justice and welfare for all, with a focus on vulnerable communities and equal opportunities.
                </p>
              </div>

              {/* Vision */}
              <div className={`${styles.mvvCard} ${styles.mvvVision}`}>
                <div className={styles.mvvHeader}>
                  <div className={styles.mvvIconBadge} aria-hidden="true">
                    <Eye size={18} />
                  </div>
                  <h3 className={styles.mvvTitle}>Our Vision</h3>
                </div>
                <p className={styles.mvvText}>
                  A society where every human being lives with dignity, safety and rights, without discrimination.
                </p>
              </div>

              {/* Core Values */}
              <div className={`${styles.mvvCard} ${styles.mvvValues}`}>
                <div className={styles.mvvHeader}>
                  <div className={styles.mvvIconBadge} aria-hidden="true">
                    <Award size={18} />
                  </div>
                  <h3 className={styles.mvvTitle}>Our Core Values</h3>
                </div>
                <ul className={styles.valuesList}>
                  <li className={styles.valueItem}>
                    <Check size={15} strokeWidth={2.5} className={styles.valueCheck} aria-hidden="true" />
                    <span>Human Dignity</span>
                  </li>
                  <li className={styles.valueItem}>
                    <Check size={15} strokeWidth={2.5} className={styles.valueCheck} aria-hidden="true" />
                    <span>Equality & Justice</span>
                  </li>
                  <li className={styles.valueItem}>
                    <Check size={15} strokeWidth={2.5} className={styles.valueCheck} aria-hidden="true" />
                    <span>Service to Society</span>
                  </li>
                  <li className={styles.valueItem}>
                    <Check size={15} strokeWidth={2.5} className={styles.valueCheck} aria-hidden="true" />
                    <span>Transparency & Integrity</span>
                  </li>
                  <li className={styles.valueItem}>
                    <Check size={15} strokeWidth={2.5} className={styles.valueCheck} aria-hidden="true" />
                    <span>Community Participation</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* D. Key Focus Areas */}
            <div className={styles.focusContainer}>
              <div className={styles.focusBannerTitle}>Our Key Focus Areas</div>
              <div className={styles.focusGrid}>
                {FOCUS_AREAS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className={styles.focusItem}>
                      <div
                        className={styles.focusIcon}
                        style={{ backgroundColor: item.color }}
                        aria-hidden="true"
                      >
                        <Icon size={20} />
                      </div>
                      <div className={styles.focusTextGroup}>
                        <span className={styles.focusLabel}>{item.label}</span>
                        <span className={styles.focusDesc}>{item.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* E. Organization Description & Quote */}
            <div className={styles.descQuoteRow}>
              <div className={styles.descTextCol}>
                <p>
                  Human Rights & Social Justice Mission (HRSJM) is committed to promoting human rights, social justice, equality, dignity and access to justice for all.
                </p>
                <p>
                  Since 2012, HRSJM has been working to create awareness, support vulnerable communities and encourage citizens to contribute towards a more just, peaceful and inclusive society.
                </p>
              </div>
              <div className={styles.quoteCard}>
                <Quote size={24} className={styles.quoteIcon} aria-hidden="true" />
                <p className={styles.quoteText}>
                  &ldquo;Be the voice of justice. Be a part of positive social change.&rdquo;
                </p>
              </div>
            </div>

            {/* F. Key Areas and Leadership Photograph */}
            <div className={styles.keyAreasBlock}>
              <h3 className={styles.blockTitle}>Our Key Areas</h3>
              <div className={styles.keyAreasGrid}>
                <div className={styles.leadershipImgWrap}>
                  <Image
                    src="/images/events/org/leadership-team.jpg"
                    alt="HRSJM Leadership and Mission Office Representatives"
                    width={980}
                    height={551}
                    className={styles.leadershipImg}
                    sizes="(min-width: 1080px) 35vw, 100vw"
                  />
                </div>
                <ul className={styles.checkList}>
                  {FOCUS_AREAS.map((item) => (
                    <li key={`check-${item.label}`} className={styles.checkListItem}>
                      <CheckCircle2 size={18} className={styles.goldCheckIcon} aria-hidden="true" />
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* G. Serve the Humanity Promotional Banner */}
            <div className={styles.promoBannerSection}>
              <Image
                src="/images/events/org/serve-the-humanity.jpg"
                alt="HRSJM - Serve the Humanity Volunteer Initiative"
                width={683}
                height={1024}
                className={styles.promoImg}
                sizes="(min-width: 1080px) 65vw, 100vw"
              />
            </div>

            {/* H & I. Community Initiatives / Justice for All Banner */}
            <div className={styles.initiativesSection}>
              <h3 className={styles.blockTitle}>Justice for All</h3>
              <div className={styles.initiativesBannerWrap}>
                <Image
                  src="/images/events/org/community-initiatives-programs.jpg"
                  alt="HRSJM Community Initiatives, Programs, and Justice For All Outreach"
                  width={980}
                  height={551}
                  className={styles.promoImg}
                  sizes="(min-width: 1080px) 65vw, 100vw"
                />
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

            {/* J. Membership Category Chart in Sidebar */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarCardTitle}>Membership Category</h3>
              <div
                className={styles.chartThumbWrap}
                onClick={() => setModalOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setModalOpen(true);
                  }
                }}
                aria-label="Click to enlarge membership category chart"
              >
                <Image
                  src="/images/events/org/membership-categories-chart.jpg"
                  alt="HRSJM Membership Category Chart (Active Member, District Post, State Post, National Level)"
                  width={980}
                  height={551}
                  className={styles.chartThumbImg}
                />
                <div className={styles.chartZoomHint}>
                  <Maximize2 size={16} />
                  <span>Click to Enlarge</span>
                </div>
              </div>
            </div>

            {/* K. Membership Information Section */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarCardTitle}>
                Membership of Human Rights & Social Justice Mission
              </h3>
              <div className={styles.membershipSteps}>
                {/* Step 1 */}
                <div className={styles.stepItem}>
                  <div className={styles.stepBadge}>1</div>
                  <div className={styles.stepBody}>
                    <div className={styles.stepTitle}>Online Joining</div>
                    <div>
                      Visit:{" "}
                      <a
                        href="https://hrsjm.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.stepLink}
                      >
                        https://hrsjm.org
                      </a>
                    </div>
                    <div>Click on &ldquo;I want to join&rdquo;.</div>
                    <div>Follow the existing instructions.</div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className={styles.stepItem}>
                  <div className={styles.stepBadge}>2</div>
                  <div className={styles.stepBody}>
                    <div className={styles.stepTitle}>Offline Joining</div>
                    <div>
                      WhatsApp your photo, full Aadhaar, and sign on{" "}
                      <strong>7021057853</strong>.
                    </div>
                    <div>
                      <a
                        href="https://wa.me/917021057853?text=Hello%20HRSJM%2C%20I%20would%20like%20to%20join%20the%20mission."
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.whatsappCta}
                      >
                        <PhoneCall size={13} />
                        WhatsApp: 7021057853
                      </a>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className={styles.stepItem}>
                  <div className={styles.stepBadge}>3</div>
                  <div className={styles.stepBody}>
                    <div className={styles.stepTitle}>After Joining</div>
                    <div>Inform us on WhatsApp after completing the joining process.</div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className={styles.stepItem}>
                  <div className={styles.stepBadge}>4</div>
                  <div className={styles.stepBody}>
                    <div className={styles.stepTitle}>You Will Receive</div>
                    <div>
                      Appointment Letter & Certificate (on the same day or next day), ID Card, ID Cover, Lanyard, Car/Bike Sticker, and T-shirt (sent via Government Speed Post), within 6–7 days.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags Cloud */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarCardTitle}>Tags</h3>
              <div className={styles.tagsCloud}>
                {HASHTAGS.map((tag) => (
                  <span key={tag} className={styles.tagPill}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Modal Dialog for Enlarge Chart */}
      {modalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chart-modal-title"
        >
          <div
            className={styles.modalDialog}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h4 id="chart-modal-title" className={styles.modalTitle}>
                HRSJM Membership Category Chart
              </h4>
              <button
                className={styles.modalCloseBtn}
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <Image
                src="/images/events/org/membership-categories-chart.jpg"
                alt="HRSJM Membership Category Detailed Chart"
                width={1200}
                height={675}
                className={styles.modalImg}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
