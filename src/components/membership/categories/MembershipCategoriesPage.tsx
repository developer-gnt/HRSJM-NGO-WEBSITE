import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { membershipCategorySections } from "./categoriesData";
import styles from "./categories.module.css";

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
        aria-label="Membership categories tables"
      >
        <div className={styles.container}>
          {membershipCategorySections.map((section) => {
            const SectionIcon = section.icon;

            return (
              <div key={section.id} id={section.id} className={styles.categoryCard}>
                {/* Card Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.cardHeaderLeft}>
                    <div className={styles.cardIconWrap}>
                      <SectionIcon size={22} strokeWidth={2.2} aria-hidden="true" />
                    </div>
                    <div className={styles.cardHeaderInfo}>
                      <h2 className={styles.cardTitle}>{section.title}</h2>
                      <p className={styles.cardSubtitle}>{section.subtitle}</p>
                    </div>
                  </div>

                  <div className={styles.cardHeaderRight}>
                    {section.headerArt && (
                      <div className={styles.headerArtWrap}>
                        <Image
                          src={section.headerArt}
                          alt=""
                          width={145}
                          height={58}
                          className={styles.headerArtImg}
                        />
                      </div>
                    )}
                    {section.quote && (
                      <div className={styles.headerQuoteWrap}>
                        <p className={styles.headerQuoteText}>
                          &ldquo;{section.quote}&rdquo;
                        </p>
                        <span className={styles.headerQuoteLine} aria-hidden="true" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Table */}
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th
                          className={`${styles.thCell} ${styles.thCenter}`}
                          style={{ width: "65px" }}
                        >
                          No.
                        </th>
                        <th className={styles.thCell} style={{ width: "230px" }}>
                          Post
                        </th>
                        <th className={styles.thCell} style={{ width: "230px" }}>
                          Required Qualification
                        </th>
                        <th
                          className={`${styles.thCell} ${styles.thCenter}`}
                          style={{ width: "110px" }}
                        >
                          Fees (₹)
                        </th>
                        <th
                          className={`${styles.thCell} ${styles.thCenter}`}
                          style={{ width: "95px" }}
                        >
                          Validity
                        </th>
                        <th className={styles.thCell}>
                          {section.kitHeaderLabel}
                        </th>
                        {section.hasLetterPadColumn && (
                          <th
                            className={`${styles.thCell} ${styles.thCenter}`}
                            style={{ width: "135px" }}
                          >
                            {section.letterPadHeaderLabel || "Letter Pad Authority"}
                          </th>
                        )}
                        <th
                          className={`${styles.thCell} ${styles.thCenter}`}
                          style={{ width: "135px" }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item) => (
                        <tr key={item.srNo}>
                          <td className={styles.tdSrNo}>{item.srNo}</td>
                          <td className={styles.tdPost}>{item.post}</td>
                          <td className={styles.tdQualification}>
                            {item.qualification}
                          </td>
                          <td className={styles.tdFees}>{item.fees}</td>
                          <td className={styles.tdValidity}>{item.validity}</td>
                          <td className={styles.tdKit}>
                            {item.kit.length > 1 ? (
                              <ul className={styles.kitList}>
                                {item.kit.map((kitItem) => (
                                  <li key={kitItem} className={styles.kitItem}>
                                    <span
                                      className={styles.kitBullet}
                                      aria-hidden="true"
                                    >
                                      •
                                    </span>
                                    <span>{kitItem}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              item.kit[0]
                            )}
                          </td>
                          {section.hasLetterPadColumn && (
                            <td
                              className={`${styles.tdValidity} ${styles.thCenter}`}
                              style={{
                                fontWeight: item.letterPad === "-" ? 700 : 500,
                                color: item.letterPad === "-" ? "#334155" : "inherit",
                                fontSize: item.letterPad === "-" ? 16 : 12.5,
                              }}
                            >
                              {item.letterPad || "-"}
                            </td>
                          )}
                          <td className={styles.tdAction}>
                            <Link
                              href={`/membership/apply?post=${encodeURIComponent(
                                item.post
                              )}`}
                              className={styles.applyBtn}
                            >
                              Apply Now
                              <ArrowRight
                                size={12}
                                strokeWidth={2.4}
                                aria-hidden="true"
                              />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
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
