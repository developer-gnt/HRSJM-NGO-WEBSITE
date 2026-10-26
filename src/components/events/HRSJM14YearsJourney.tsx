"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Tag,
  Search,
  ArrowRight,
  ArrowLeft,
  Maximize2,
  X,
  PhoneCall,
  Target,
  BookOpen,
  HelpCircle,
  HeartHandshake,
  MapPin,
  FileText,
} from "lucide-react";
import type { ActivityContext } from "./HRSJMOrgOverview";
import styles from "./orgOverview.module.css";

interface HRSJM14YearsJourneyProps {
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
    id: "hrsjm-mission",
    title: "HUMAN RIGHTS & SOCIAL JUSTICE MISSION (HRSJM)",
    date: "October 15, 2026",
    thumb: "/images/activities/hrsjm-org-banner-card.jpg",
    href: "/events/human-rights-social-justice-mission",
  },
  {
    id: "history-vision",
    title: "Human Rights & Social Justice Mission: History, Vision and Social Contribution",
    date: "October 14, 2026",
    thumb: "/images/activities/hrsjm-history-vision-social-contribution.jpg",
    href: "/events/human-rights-social-justice-mission-history-vision-social-contribution",
  },
  {
    id: "advancing-human-rights",
    title: "Advancing Human Rights and Social Justice in India: Missions for Equality, Dignity, and Opportunity",
    date: "October 10, 2026",
    thumb: "/images/activities/advancing-human-rights-social-justice.jpg",
    href: "/events/advancing-human-rights-and-social-justice-in-india",
  },
];

export default function HRSJM14YearsJourney({ activity }: HRSJM14YearsJourneyProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState("/images/events/org/membership-categories-chart.jpg");
  const [modalImgTitle, setModalImgTitle] = useState("HRSJM Membership Category Chart");
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
    <section id="hrsjm-14-years-journey" className={styles.orgSection} aria-label="HRSJM 14 Years Journey Overview">
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
              {activity?.title || "HRSJM Organisation Overview – 14 Years Journey"}
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
                HUMAN RIGHTS &amp; SOCIAL JUSTICE MISSION – 14 Years Journey
              </h2>
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
                  Awareness &amp; Outreach
                </span>
              </div>
            </header>

            {/* Top Primary Banner Image */}
            <div
              className={styles.editorialImageWrap}
              onClick={() => openImageModal("/images/journey/hrsjm-14-years-banner.jpg", "HRSJM 14 Years Journey Banner")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openImageModal("/images/journey/hrsjm-14-years-banner.jpg", "HRSJM 14 Years Journey Banner");
                }
              }}
              aria-label="Click to enlarge 14 Years Journey Banner"
            >
              <Image
                src="/images/journey/hrsjm-14-years-banner.jpg"
                alt="Human Rights & Social Justice Mission – 14 Years Journey Banner"
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
                The <strong>Human Rights &amp; Social Justice Mission (HRSJM)</strong> is a government-registered,
                democratic regional network and non-governmental organisation (NGO) in India. Headquartered with
                a strong organisational structure in Mumbai, it has been working since 2012 to create awareness,
                support vulnerable communities and encourage citizens to contribute towards a more just, peaceful
                and inclusive society. Our activities, and volunteers, are focused on promoting participatory democracy,
                good governance, and civil liberties across both regional and national levels.
              </p>
            </div>

            {/* Graphic 1: Services and Mission */}
            <div
              className={styles.editorialImageWrap}
              onClick={() => openImageModal("/images/journey/hrsjm-services-and-mission.jpg", "HRSJM Mission and Core Services")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openImageModal("/images/journey/hrsjm-services-and-mission.jpg", "HRSJM Mission and Core Services");
                }
              }}
              aria-label="Click to enlarge HRSJM Services and Mission Graphic"
            >
              <Image
                src="/images/journey/hrsjm-services-and-mission.jpg"
                alt="HRSJM Services: Work For Justice, Donate Food For Poor, Education For Women, Free Legal Counseling, Service Old Age Home"
                width={980}
                height={653}
                className={styles.bannerImg}
                sizes="(min-width: 1080px) 65vw, 100vw"
              />
              <div className={styles.chartZoomHint}>
                <Maximize2 size={16} />
                <span>Click to Enlarge</span>
              </div>
            </div>

            {/* Callout Card: Our Philosophy & Work Focus */}
            <div className={styles.sectionCalloutCard}>
              <div className={styles.sectionCalloutHeader}>
                <div className={styles.sectionCalloutIcon} aria-hidden="true">
                  <Target size={20} />
                </div>
                <h3 className={styles.sectionCalloutTitle}>OUR PHILOSOPHY &amp; WORK FOCUS</h3>
              </div>
              <p className={styles.sectionCalloutText}>
                Operating under the guiding motto of <strong>&ldquo;No Exploitation - Only Contribution&rdquo;</strong>,
                HRSJM primarily works to support the oppressed and underprivileged sections of society.
                The mission champions systemic reform rather than self-promotion, working quietly to
                reverse human rights violations and address failures in institutional justice.
              </p>
            </div>

            {/* Graphic 2: National Body Instructions / Janata Darbars */}
            <div
              className={styles.editorialImageWrap}
              onClick={() => openImageModal("/images/journey/hrsjm-national-body-instructions.jpg", "Important Instruction From The National Body - Janata Darbars")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openImageModal("/images/journey/hrsjm-national-body-instructions.jpg", "Important Instruction From The National Body - Janata Darbars");
                }
              }}
              aria-label="Click to enlarge National Body Instructions"
            >
              <Image
                src="/images/journey/hrsjm-national-body-instructions.jpg"
                alt="HRSJM National Body Instructions - Initiate Janata Darbars, Apply For President, Form Units, Office Establishment"
                width={683}
                height={1024}
                className={styles.bannerImg}
                sizes="(min-width: 1080px) 65vw, 100vw"
              />
              <div className={styles.chartZoomHint}>
                <Maximize2 size={16} />
                <span>Click to Enlarge</span>
              </div>
            </div>

            {/* Callout Card: Key Focus Areas & Objectives */}
            <div className={styles.sectionCalloutCard}>
              <div className={styles.sectionCalloutHeader}>
                <div className={styles.sectionCalloutIcon} aria-hidden="true">
                  <Target size={20} />
                </div>
                <h3 className={styles.sectionCalloutTitle}>KEY FOCUS AREAS &amp; OBJECTIVES</h3>
              </div>
              <ul className={styles.objectivesList}>
                <li className={styles.objectiveItem}>
                  <div className={styles.objectiveNum} aria-hidden="true">1</div>
                  <div className={styles.objectiveContent}>
                    <strong>Spreading Rights Awareness:</strong> Educating citizens on constitutional provisions,
                    including civil liberties, fundamental rights, labour rights, right to information (RTI),
                    and special protections for women, minorities, and senior citizens.
                  </div>
                </li>
                <li className={styles.objectiveItem}>
                  <div className={styles.objectiveNum} aria-hidden="true">2</div>
                  <div className={styles.objectiveContent}>
                    <strong>Social Reform &amp; Education:</strong> Targeting systemic vulnerabilities such as
                    child marriage, dowry practices, elder neglect, and social violence, alongside filling critical
                    gaps in general, legal and medical education.
                  </div>
                </li>
                <li className={styles.objectiveItem}>
                  <div className={styles.objectiveNum} aria-hidden="true">3</div>
                  <div className={styles.objectiveContent}>
                    <strong>Community Empowerment:</strong> Actively conducting counselling workshops,
                    legal aid support, and local intervention programs to protect victims of social injustice.
                  </div>
                </li>
              </ul>
            </div>

            {/* Graphic 3: Join and Serve Humanity */}
            <div
              className={styles.editorialImageWrap}
              onClick={() => openImageModal("/images/journey/hrsjm-join-and-serve-humanity.jpg", "HRSJM - Join and Serve Humanity")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openImageModal("/images/journey/hrsjm-join-and-serve-humanity.jpg", "HRSJM - Join and Serve Humanity");
                }
              }}
              aria-label="Click to enlarge Join and Serve Humanity Graphic"
            >
              <Image
                src="/images/journey/hrsjm-join-and-serve-humanity.jpg"
                alt="HRSJM - Tree Plantation, Donate Food, Support Needy - Join us today for better tomorrow"
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

            {/* Bottom Two Feature Cards Side by Side */}
            <div className={styles.bottomFeaturesGrid}>
              {/* Feature 1: Dedicated Signature Programs */}
              <div className={styles.featureBox}>
                <div className={styles.featureBoxHeader}>
                  <div className={styles.featureBoxIcon} aria-hidden="true">
                    <BookOpen size={16} />
                  </div>
                  <h4 className={styles.featureBoxTitle}>DEDICATED SIGNATURE PROGRAMS</h4>
                </div>
                <ul className={styles.programItemsList}>
                  <li className={styles.programItem}>
                    <div className={styles.programNum} aria-hidden="true">1</div>
                    <div>
                      <strong>Child Adhikar:</strong> A specialized child rights protection framework
                      that establishes a stronger environment for children&apos;s safety, education and dignity.
                    </div>
                  </li>
                  <li className={styles.programItem}>
                    <div className={styles.programNum} aria-hidden="true">2</div>
                    <div>
                      <strong>Paryavaran Raksha:</strong> An environmental justice initiative focusing on
                      eco-sustainability, including tree plantation, waste conservation campaigns, and resource preservation.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Feature 2: Inquiries & Help */}
              <div className={styles.inquiryBox}>
                <div className={styles.inquiryContent}>
                  <HelpCircle size={22} className={styles.inquiryIcon} aria-hidden="true" />
                  <p className={styles.inquiryText}>
                    Are you looking for information on how to place a complaint with HRSJM, or do you need details regarding their national leadership team?
                  </p>
                </div>
                <div className={styles.inquiryActions}>
                  <Link href="/complaint" className={styles.inquiryBtn}>
                    <FileText size={13} aria-hidden="true" />
                    <span>Lodge Complaint</span>
                  </Link>
                  <Link href="/about" className={styles.inquiryBtnLight}>
                    <span>Leadership Team</span>
                    <ArrowRight size={12} aria-hidden="true" />
                  </Link>
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

            {/* Membership Category Chart */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarCardTitle}>Membership Category</h3>
              <div
                className={styles.chartThumbWrap}
                onClick={() => openImageModal("/images/events/org/membership-categories-chart.jpg", "HRSJM Membership Category Detailed Chart")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    openImageModal("/images/events/org/membership-categories-chart.jpg", "HRSJM Membership Category Detailed Chart");
                  }
                }}
                aria-label="Click to enlarge membership category chart"
              >
                <Image
                  src="/images/events/org/membership-categories-chart.jpg"
                  alt="HRSJM Membership Category Chart"
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

            {/* Membership Steps */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarCardTitle}>
                Membership of Human Rights &amp; Social Justice Mission
              </h3>
              <div className={styles.membershipSteps}>
                <div className={styles.stepItem}>
                  <div className={styles.stepBadge}>1</div>
                  <div className={styles.stepBody}>
                    <div className={styles.stepTitle}>Online Joining</div>
                    <div>
                      Visit:{" "}
                      <a href="https://hrsjm.org" target="_blank" rel="noopener noreferrer" className={styles.stepLink}>
                        https://hrsjm.org
                      </a>
                    </div>
                    <div>Click on &ldquo;I want to join&rdquo;.</div>
                    <div>Follow the existing instructions.</div>
                  </div>
                </div>

                <div className={styles.stepItem}>
                  <div className={styles.stepBadge}>2</div>
                  <div className={styles.stepBody}>
                    <div className={styles.stepTitle}>Offline Joining</div>
                    <div>
                      WhatsApp your photo, full Aadhaar, and sign on <strong>7021057853</strong>.
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

                <div className={styles.stepItem}>
                  <div className={styles.stepBadge}>3</div>
                  <div className={styles.stepBody}>
                    <div className={styles.stepTitle}>After Joining</div>
                    <div>Inform us on WhatsApp after completing the joining process.</div>
                  </div>
                </div>

                <div className={styles.stepItem}>
                  <div className={styles.stepBadge}>4</div>
                  <div className={styles.stepBody}>
                    <div className={styles.stepTitle}>You Will Receive</div>
                    <div>
                      Appointment Letter &amp; Certificate (on the same day or next day), ID Card, ID Cover, Lanyard, Car/Bike Sticker, and T-shirt (sent via Government Speed Post), within 6–7 days.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Be a Part of Positive Change CTA Card */}
            <div className={styles.positiveChangeCard}>
              <div className={styles.positiveChangeIconWrap} aria-hidden="true">
                <HeartHandshake size={28} />
              </div>
              <h3 className={styles.positiveChangeTitle}>Be a Part of Positive Change</h3>
              <p className={styles.positiveChangeSub}>
                Join HRSJM and support our mission for a just, equal and humane society.
              </p>
              <Link href="/membership/apply" className={styles.positiveChangeBtn}>
                <span>Join Now</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Modal Dialog for Enlarging Any Image */}
      {modalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="journey-modal-title"
        >
          <div className={styles.modalDialog} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h4 id="journey-modal-title" className={styles.modalTitle}>
                {modalImgTitle}
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
                src={modalImgSrc}
                alt={modalImgTitle}
                width={1200}
                height={800}
                className={styles.modalImg}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
