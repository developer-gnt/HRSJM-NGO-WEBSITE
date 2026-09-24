import Image from "next/image";
import Link from "next/link";
import styles from "./layout.module.css";

interface LogoProps {
  onNavigate?: () => void;
}

export default function Logo({ onNavigate }: LogoProps) {
  return (
    <Link className={styles.logo} href="/" aria-label="HRSJM home" onClick={onNavigate}>
      <Image
        className={styles.logoMark}
        src="/logo.png"
        alt="HRSJM official crest"
        width={557}
        height={448}
        priority
      />
      <span className={styles.logoCopy}>
        <strong>HRSJM</strong>
        <small>Human Rights &amp; Social Justice Mission</small>
        <span className={styles.logoHindi} lang="hi">
          मानव अधिकार · सामाजिक न्याय
        </span>
      </span>
    </Link>
  );
}