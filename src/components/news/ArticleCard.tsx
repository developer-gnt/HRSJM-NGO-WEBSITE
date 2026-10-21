import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/data/articles";
import { revealStagger } from "@/hooks/useScrollReveal";
import styles from "./news.module.css";

/* Editorial article card shared by the Latest News grid, the All Articles
   page and the category listings. Cards with an `href` (or a `slug`, which
   maps to its /articles/[slug] detail page) link through; the rest render
   as previews until their detail pages exist. */
export default function ArticleCard({
  article,
  index = 0,
}: {
  article: Article;
  index?: number;
}) {
  const { image, imagePosition, alt, category, title, description, date, readTime } = article;
  const href = article.href ?? (article.slug ? `/articles/${article.slug}` : undefined);

  const media = (
    <Image
      src={image}
      alt={alt}
      fill
      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 340px"
      style={{
        objectFit: "cover",
        ...(imagePosition ? { objectPosition: imagePosition } : {}),
      }}
    />
  );

  return (
    <article className={styles.articleCard} data-reveal-item style={revealStagger(index)}>
      {href ? (
        <Link href={href} className={styles.articleMedia} tabIndex={-1} aria-hidden="true">
          {media}
        </Link>
      ) : (
        <div className={styles.articleMedia}>{media}</div>
      )}

      <div className={styles.articleBody}>
        <p className={styles.articleCategory}>{category}</p>
        <h3 className={styles.articleTitle}>
          {href ? <Link href={href}>{title}</Link> : title}
        </h3>
        <p className={styles.articleDesc}>{description}</p>
        <div className={styles.articleFooter}>
          <span className={styles.articleMeta}>
            {date} &bull; {readTime}
          </span>
          <span className={styles.articleArrow}>
            <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}
