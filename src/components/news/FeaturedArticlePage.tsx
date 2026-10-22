"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { featuredArticle } from "@/data/articles";
import { articleCategories } from "@/data/articleCategories";
import { useScrollReveal, revealDelay } from "@/hooks/useScrollReveal";
import CategorySidebar from "./CategorySidebar";
import shared from "./news.module.css";
import styles from "./featuredArticle.module.css";

/* Dedicated Featured Article page. The hero reuses the exact featured-card
   design from the News & Blog section; the body renders the article's
   numbered sections with the shared Categories card alongside. */
export default function FeaturedArticlePage() {
  const sectionRef = useScrollReveal(shared);

  const category = articleCategories.find(
    (item) => item.label === featuredArticle.category
  );

  return (
    <div className={shared.sectionInner}>
      <section
        ref={sectionRef}
        className={styles.detail}
        aria-labelledby="featured-article-heading"
      >
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">
            /
          </span>
          <Link href="/news" className={styles.breadcrumbLink}>
            News &amp; Blog
          </Link>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">
            /
          </span>
          {category && (
            <>
              <Link href={category.href} className={styles.breadcrumbLink}>
                {category.label}
              </Link>
              <span className={styles.breadcrumbSeparator} aria-hidden="true">
                /
              </span>
            </>
          )}
          <span className={styles.breadcrumbCurrent}>Featured Article</span>
        </nav>

        <article
          className={shared.featuredCard}
          data-reveal
          style={revealDelay(1)}
        >
          <div className={shared.featuredMedia}>
            <Image
              src={featuredArticle.image}
              alt={featuredArticle.alt}
              fill
              priority
              sizes="(max-width: 700px) 100vw, (max-width: 1023px) 55vw, 720px"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className={shared.featuredBody}>
            <div className={shared.featuredTags}>
              {featuredArticle.tags?.map((tag) => (
                <span
                  key={tag}
                  className={
                    tag === "Featured"
                      ? `${shared.tag} ${shared.tagGold}`
                      : shared.tag
                  }
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 id="featured-article-heading" className={styles.heroTitle}>
              {featuredArticle.title}
            </h1>

            <p className={shared.featuredDesc}>{featuredArticle.description}</p>

            <div className={shared.featuredMeta}>
              <span className={shared.avatar} aria-hidden="true">
                H
              </span>
              <span className={shared.metaText}>
                <span className={shared.author}>{featuredArticle.author}</span>
                <span className={shared.metaInfo}>
                  {featuredArticle.date} &bull; {featuredArticle.readTime}
                </span>
              </span>
            </div>
          </div>
        </article>

        <div className={styles.contentGrid}>
          <div className={styles.articleMain}>
            {featuredArticle.sections?.map((section, index) => (
              <section
                key={section.heading}
                className={styles.articleSection}
                data-reveal-fade
                aria-labelledby={`article-section-${index + 1}`}
              >
                <p className={styles.sectionNumber}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2
                  id={`article-section-${index + 1}`}
                  className={styles.sectionHeading}
                >
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={styles.sectionParagraph}>
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <div className={styles.articleEnd}>
              <span className={styles.endStroke} aria-hidden="true" />
              <Link href="/news" className={styles.backLink}>
                <ArrowLeft size={15} strokeWidth={2.2} aria-hidden="true" />
                Back to News &amp; Blog
              </Link>
            </div>
          </div>

          <div className={styles.sidebarSticky}>
            <CategorySidebar activeLabel={featuredArticle.category} />
          </div>
        </div>
      </section>
    </div>
  );
}