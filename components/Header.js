import styles from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <Link href="/">
        <h2 className={styles.logo}>AudioCue</h2>
      </Link>
      <Link href="/features">
        <p className={styles.link}>Features</p>
      </Link>
      <Link href="/about">
        <p className={styles.link}>About</p>
      </Link>
    </header>
  );
};

export default Header;
