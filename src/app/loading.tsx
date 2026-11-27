import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingContainer} aria-live="polite" aria-busy="true">
      <div className={styles.spinner} />
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
}
