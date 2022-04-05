import Link from "next/link";
import Router from "next/router";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <Link href="/">
        <h2
          className={styles.logo}
          onClick={() => {
            window.location.pathname === "/" &&
              Router.reload(window.location.pathname);
          }}
        >
          HotCues <span style={{ color: "red" }}>| | |</span>
        </h2>
      </Link>
      <Link href="/features">
        <div className={styles.navItem}>
          <p className={styles.link}>Features</p>
        </div>
      </Link>
      <Link href="/about">
        <div className={styles.navItem}>
          <p className={styles.link}>About</p>
        </div>
      </Link>
    </header>
  );
};

export default Header;
