import Image from "next/image";
import Icon from "@/components/ui/Icon";
import styles from "./rights-resources.module.css";

interface Resource {
  title: string;
  image: string;
  pdfUrl: string;
}

/* TEMPORARY: each pdfUrl points at a public dummy PDF so the Download
   action works today. These are NOT official HRSJM documents — replace
   every pdfUrl with the real HRSJM file when it is finalised. */
const resources: Resource[] = [
  {
    title: "Citizen Rights Handbook",
    image: "/Rights%20PDF%20Cards/card-1.png",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    title: "Women's Rights Guide",
    image: "/Rights%20PDF%20Cards/card-2.png",
    pdfUrl: "https://pdfobject.com/pdf/sample.pdf",
  },
  {
    title: "Child Protection Guide",
    image: "/Rights%20PDF%20Cards/card-3.png",
    pdfUrl: "https://css4.pub/2015/textbook/somatosensory.pdf",
  },
  {
    title: "RTI Application Guide",
    image: "/Rights%20PDF%20Cards/card-4.png",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    title: "Legal Aid Contacts",
    image: "/Rights%20PDF%20Cards/card-5.png",
    pdfUrl: "https://pdfobject.com/pdf/sample.pdf",
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
        </div>

        <ul className={styles.grid}>
          {resources.map((resource) => (
            <li key={resource.title} className={styles.cell}>
              <article className={styles.card}>
                <div className={styles.media}>
                  <Image
                    src={resource.image}
                    alt={resource.title}
                    fill
                    sizes="(min-width: 1024px) 250px, (min-width: 640px) 33vw, calc(50vw - 14px)"
                    className={styles.mediaImg}
                  />
                  <span className={styles.pdfBadge} aria-hidden="true">
                    <Icon name="fileText" width={16} height={16} strokeWidth={1.8} />
                  </span>
                </div>

                <div className={styles.body}>
                  <h3 className={styles.cardTitle}>{resource.title}</h3>
                  <p className={styles.cardType}>(PDF)</p>

                  <a
                    href={resource.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className={styles.download}
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
