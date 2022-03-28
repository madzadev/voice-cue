import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <h2>SpeechAnalysis</h2>
      <p>Features</p>
      <p>About</p>
    </header>
  );
};

export default Header;
