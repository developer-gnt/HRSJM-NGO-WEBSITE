import Image from "next/image";
import Icon from "@/components/ui/Icon";
import styles from "./rights-resources.module.css";

interface Resource {
  title: string;
  image: string;
  pdfUrl: string;
  fileName: string;
}

const resources: Resource[] = [
  {
    title: "Citizen Rights Handbook",
    image: "/Rights%20PDF%20Cards/card-1.png",
    pdfUrl: "/documents/citizen-rights-handbook.pdf",
    fileName: "citizen-rights-handbook.pdf",
  },
  {
    title: "Women's Rights Guide",
    image: "/Rights%20PDF%20Cards/card-2.png",
    pdfUrl: "/documents/womens-rights-guide.pdf",
    fileName: "womens-rights-guide.pdf",
  },
  {
    title: "Child Protection Guide",
    image: "/Rights%20PDF%20Cards/card-3.png",
    pdfUrl: "/documents/child-protection-guide.pdf",
    fileName: "child-protection-guide.pdf",
  },
  {
    title: "RTI Application Guide",
    image: "/Rights%20PDF%20Cards/card-4.png",
    pdfUrl: "/documents/rti-application-guide.pdf",
    fileName: "rti-application-guide.pdf",
  },
  {
    title: "Legal Aid Contacts",
    image: "/Rights%20PDF%20Cards/card-5.png",
    pdfUrl: "/documents/legal-aid-contacts-guide.pdf",
    fileName: "legal-aid-contacts-guide.pdf",
  },
  {
    title: "Right to Education Guide",
    image: "/Rights%20PDF%20Cards/card-6.png",
    pdfUrl: "/documents/right-to-education-guide.pdf",
    fileName: "right-to-education-guide.pdf",
  },
];

export default function RightsResources() {
  return (
    <section
      id="resources"
      className={styles.section}
      aria-labelledby="resources-heading"
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.headerCopy}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Tools &amp; Resources
            </p>

            <h2 id="resources-heading" className={styles.heading}>
              Helpful Resources
            </h2>

            <p className={styles.description}>
              Download guides, watch videos and access resources to better
              understand your rights.
            </p>
          </div>

          <a href="#resources" className={styles.viewAll}>
            View All Resources
            <span className={styles.viewAllIcon}>
              <Icon name="arrow" width={15} height={15} strokeWidth={2} />
            </span>
          </a>
        </div>

        <ul className={styles.grid}>
          {resources.map((resource) => (
            <li key={resource.title} className={styles.cell}>
              <article className={styles.card}>
                <a
                  href={resource.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.media}
                  aria-label={`Open ${resource.title} PDF`}
                >
                  <Image
                    src={resource.image}
                    alt={resource.title}
                    fill
                    sizes="(min-width: 1200px) 180px, (min-width: 640px) 33vw, calc(100vw - 48px)"
                    className={styles.mediaImg}
                  />
                  <span className={styles.pdfBadge} aria-hidden="true">
                    <Icon name="fileText" width={16} height={16} strokeWidth={1.8} />
                  </span>
                </a>

                <div className={styles.body}>
                  <h3 className={styles.cardTitle}>
                    <a
                      href={resource.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.titleLink}
                    >
                      {resource.title}
                    </a>
                  </h3>
                  <p className={styles.cardType}>(PDF)</p>

                  <a
                    href={`/api/download?file=${resource.fileName}`}
                    download={resource.fileName}
                    className={styles.download}
                    aria-label={`Download ${resource.title} PDF`}
                  >
                    <Icon name="download" width={16} height={16} strokeWidth={2} />
                    Download
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
