import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Calendar,
  Users,
  Briefcase,
  Crown,
  Award,
  Shield,
  Star,
  Landmark,
  User,
  Building2,
  type LucideIcon,
} from "lucide-react";
import {
  membershipCategorySections,
  type CategoryIconName,
} from "./categoriesData";
import styles from "./categories.module.css";

const iconMap: Record<CategoryIconName, LucideIcon> = {
  Users,
  Briefcase,
  Crown,
  Award,
  Shield,
  Star,
  Landmark,
  User,
  Building2,
};

function GreenCheck() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      className={styles.benefitCheckIcon}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="8" fill="#16a34a" />
      <path
        d="M4.5 8.2L6.8 10.5L11.5 5.5"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MembershipCategoriesPage() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero} aria-labelledby="categories-heading">
        <Image
          src="/membership/membership-categories-hero.jpg"
          alt="HRSJM members and citizens advocating for human rights and social justice"
          fill
          priority
          sizes="100vw"
          className={styles.heroBg}
        />
        <div className={styles.heroGradient} aria-hidden="true" />

        <div className={styles.container}>
          <div className={styles.heroInner}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <ChevronRight size={13} strokeWidth={2.2} aria-hidden="true" />
              <Link href="/membership">Membership</Link>
              <ChevronRight size={13} strokeWidth={2.2} aria-hidden="true" />
              <span className={styles.breadcrumbCurrent} aria-current="page">
                Membership Categories
              </span>
            </nav>

            {/* Hero Copy */}
            <div className={styles.heroContent}>
              <p className={styles.heroEyebrow}>
                <span className={styles.heroEyebrowDot} aria-hidden="true" />
                MEMBERSHIP
              </p>

              <h1 id="categories-heading" className={styles.heroHeading}>
                Membership{" "}
                <span className={styles.heroHeadingGold}>Categories</span>
              </h1>

              <p className={styles.heroSubtitle}>
                Find the right way to support human rights and social justice.
              </p>

              <p className={styles.heroDescription}>
                Join HRSJM and become part of a larger movement for human
                dignity, equality and justice. Choose a membership category that
                matches your interest and contribute towards a stronger, fairer
                and more inclusive society.
              </p>

              <div className={styles.heroActions}>
                <Link href="#categories" className={styles.heroBtn}>
                  Become a Member
                  <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Categories Section */}
      <section
        id="categories"
        className={styles.categoriesSection}
        aria-label="Membership categories plans"
      >
        <div className={styles.container}>
          <p className={styles.choosePlanIntro}>
            Choose a membership plan that fits you
          </p>

          {membershipCategorySections.map((section) => (
            <div key={section.id} id={section.id} className={styles.sectionGroup}>
              {/* Section Header Banner */}
              <div className={styles.sectionBanner}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
              </div>

              {/* List of Item Cards */}
              <div className={styles.cardsList}>
                {section.items.map((item) => {
                  const ItemIcon =
                    (item.iconName && iconMap[item.iconName]) || Users;
                  const isGreenTheme = item.theme === "green";

                  return (
                    <div key={item.srNo} className={styles.itemCard}>
                      {/* Top Row: Icon + Title & Subtitle | Price & Validity */}
                      <div className={styles.itemTopRow}>
                        <div className={styles.itemIdentity}>
                          <div
                            className={`${styles.itemIconWrap} ${
                              isGreenTheme ? styles.iconGreen : styles.iconBlue
                            }`}
                            aria-hidden="true"
                          >
                            <ItemIcon size={19} strokeWidth={2.2} />
                          </div>
                          <div className={styles.itemTitles}>
                            <h3 className={styles.itemPostName}>{item.post}</h3>
                            <p className={styles.itemQualification}>
                              {item.qualification}
                            </p>
                          </div>
                        </div>

                        <div className={styles.itemPricing}>
                          <div className={styles.itemPrice}>{item.fees}</div>
                          <div className={styles.itemPriceValidity}>
                            {item.validity}
                          </div>
                        </div>
                      </div>

                      {/* Subtle Horizontal Divider */}
                      <div className={styles.cardDivider} aria-hidden="true" />

                      {/* Card Body: Two-Column Layout (Preserved on Desktop, Tablet, and Mobile) */}
                      <div className={styles.itemBody}>
                        {/* Left Column: Benefits + Duration at Bottom */}
                        <div className={styles.bodyLeft}>
                          <ul className={styles.benefitsList}>
                            {item.kit.map((kitItem, idx) => (
                              <li key={idx} className={styles.benefitItem}>
                                <GreenCheck />
                                <span className={styles.benefitText}>
                                  {kitItem}
                                </span>
                              </li>
                            ))}
                          </ul>

                          <div className={styles.durationWrap}>
                            <Calendar
                              size={15}
                              className={styles.durationCalendarIcon}
                              aria-hidden="true"
                            />
                            <div className={styles.durationContent}>
                              <span className={styles.durationLabel}>
                                Membership Duration
                              </span>
                              <span className={styles.durationValue}>
                                {item.duration || item.validity}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Kit List + Apply Now at Bottom */}
                        <div className={styles.bodyRight}>
                          <div className={styles.kitTopSection}>
                            <div className={styles.kitHeader}>
                              <Calendar
                                size={13}
                                className={styles.kitHeaderIcon}
                                aria-hidden="true"
                              />
                              <span className={styles.kitHeaderTitle}>
                                Membership Kit
                              </span>
                            </div>
                            <ol className={styles.kitNumberedList}>
                              {item.kit.map((kitItem, idx) => (
                                <li key={idx} className={styles.kitNumberedItem}>
                                  <span className={styles.kitNumber}>
                                    {idx + 1}.
                                  </span>
                                  <span className={styles.kitNumberedText}>
                                    {kitItem}
                                  </span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          <Link
                            href={`/membership/apply?post=${encodeURIComponent(
                              item.post
                            )}`}
                            className={styles.applyBtn}
                          >
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner: Join HRSJM Today */}
      <section className={styles.bottomCta} aria-labelledby="bottom-cta-heading">
        <Image
          src="/membership/membership-cta.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.bottomCtaBg}
        />
        <div className={styles.container}>
          <div className={styles.bottomCtaInner}>
            <div className={styles.bottomCtaCopy}>
              <h2 id="bottom-cta-heading" className={styles.bottomCtaHeading}>
                Join{" "}
                <span className={styles.bottomCtaHeadingGold}>
                  HRSJM Today
                </span>
              </h2>
              <p className={styles.bottomCtaSubtitle}>
                Be a part of the movement for human rights, equality and social justice.
              </p>
            </div>
            <Link
              href="/membership/apply"
              className={styles.bottomCtaBtn}
            >
              Become a Member
              <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
