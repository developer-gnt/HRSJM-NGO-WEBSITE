"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import type { Article } from "@/data/articles";
import { useScrollReveal, revealDelay } from "@/hooks/useScrollReveal";
import CategorySidebar from "@/components/news/CategorySidebar";
import shared from "@/components/news/news.module.css";
import styles from "@/components/news/featuredArticle.module.css";

/* Detail page for the latest-articles grid (/articles/[slug]). It reuses
   the exact Featured Article page layout — image-left hero card on navy,
   numbered editorial sections, Categories card alongside — so every
   article detail reads like part of the same system. */
export default function ArticleDetailPage({ article }: { article: Article }) {
  const sectionRef = useScrollReveal(shared);

  return (
    <div className={shared.sectionInner}>
      <section ref={sectionRef} className={styles.detail} aria-labelledby="article-heading">
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
          <Link href="/articles" className={styles.breadcrumbLink}>
            All Articles
          </Link>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">
            /
          </span>
          <span className={styles.breadcrumbCurrent}>{article.category}</span>
        </nav>

        <article className={shared.featuredCard} data-reveal style={revealDelay(1)}>
          <div className={shared.featuredMedia}>
            <Image
              src={article.image}
              alt={article.alt}
              fill
              priority
              sizes="(max-width: 700px) 100vw, (max-width: 1023px) 55vw, 720px"
              style={{
                objectFit: "cover",
                ...(article.imagePosition ? { objectPosition: article.imagePosition } : {}),
              }}
            />
          </div>

          <div className={shared.featuredBody}>
            <div className={shared.featuredTags}>
              <span className={shared.tag}>{article.category}</span>
            </div>

            <h1 id="article-heading" className={styles.heroTitle}>
              {article.title}
            </h1>

            <p className={shared.featuredDesc}>{article.description}</p>

            <div className={shared.featuredMeta}>
              <span className={shared.avatar} aria-hidden="true">
                H
              </span>
              <span className={shared.metaText}>
                <span className={shared.author}>{article.author ?? "HRSJM Editorial Team"}</span>
                <span className={shared.metaInfo}>
                  {article.date} &bull; {article.readTime}
                </span>
              </span>
            </div>
          </div>
        </article>

        <div className={styles.contentGrid}>
          <div className={styles.articleMain}>
            {article.sections?.map((section, index) => (
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
              <Link href="/articles" className={styles.backLink}>
                <ArrowLeft size={15} strokeWidth={2.2} aria-hidden="true" />
                Back to All Articles
              </Link>
            </div>
          </div>

          <div className={styles.sidebarSticky}>
            <CategorySidebar activeLabel={article.category} />
          </div>
        </div>
      </section>
    </div>
  );
}
