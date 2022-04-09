import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <p className={styles.author}>
        Made with ❤️ by{" "}
        <span className={styles.link}>
          <a
            href="https://github.com/madzadev"
            target="_blank"
            rel="noreferrer"
          >
            Madza
          </a>
        </span>
      </p>
      <p>
        Powered by{" "}
        <span className={styles.link}>
          <a href="https://deepgram.com" target="_blank" rel="noreferrer">
            Deepgram
          </a>
        </span>
        ,{" "}
        <span className={styles.link}>
          <a href="https://nextjs.org" target="_blank" rel="noreferrer">
            NextJS
          </a>
        </span>{" "}
        and{" "}
        <span className={styles.link}>
          <a href="https://vercel.com" target="_blank" rel="noreferrer">
            Vercel
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
