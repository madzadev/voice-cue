import Link from "next/link";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <p className={styles.author}>
        Made with love by{" "}
        <span className={styles.link}>
          <a href="https://github.com/madzadev" target="_blank">
            Madza
          </a>
        </span>
      </p>
      <p>
        Powered by{" "}
        <span className={styles.link}>
          <a href="https://deepgram.com" target="_blank">
            Deepgram
          </a>
        </span>
        ,{" "}
        <span className={styles.link}>
          <a href="https://nextjs.org" target="_blank">
            NextJS
          </a>
        </span>{" "}
        and{" "}
        <span className={styles.link}>
          <a href="https://netlify.com" target="_blank">
            Netlify
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
