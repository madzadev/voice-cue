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
          HotCues
        </h2>
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
