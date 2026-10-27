import Icon from "@/components/ui/Icon";
import styles from "./rights.module.css";

const VIDEO_URL = "https://www.youtube.com/watch?v=nDgIVseTkuE";
const VIDEO_EMBED_URL = "https://www.youtube.com/embed/nDgIVseTkuE";

export default function RightsFeaturedVideo() {
  return (
    <section
      id="featured-video"
      className={styles.videoSection}
      aria-labelledby="featured-video-heading"
    >
      <div className={styles.videoInner}>
        <div className={styles.videoCopy}>
          <p className={styles.videoEyebrow}>
            <span className={styles.videoEyebrowDot} aria-hidden="true" />
            Featured Video
          </p>

          <h2 id="featured-video-heading" className={styles.videoHeading}>
            Understanding
            <br />
            Your Rights
          </h2>

          <p className={styles.videoDescription}>
            Watch this important video to understand the human rights that
            protect your dignity and freedom - and the legal protections that
            uphold them. Learn to recognise when rights are denied, and
            discover practical steps you can take to respond, seek help and
            stand up for yourself and for others in your community.
          </p>

          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.primaryBtn} ${styles.videoCta}`}
          >
            Watch on YouTube
            <span className={styles.primaryBtnIcon}>
              <Icon name="arrow" width={16} height={16} strokeWidth={2} />
            </span>
          </a>
        </div>

        <div className={styles.videoFrame}>
          <iframe
            src={VIDEO_EMBED_URL}
            title="Human Rights Awareness | HRSJM"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
