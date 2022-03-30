import styles from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <Link href="/">
        <h2 className={styles.logo}>AudioCue</h2>
      </Link>
      <p>Features</p>
      <p>About</p>
    </header>
  );
};

export default Header;
