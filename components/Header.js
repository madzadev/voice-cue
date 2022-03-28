import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <h1>SpeechAnalysis</h1>
      <p>Features</p>
      <p>About</p>
    </header>
  );
};

export default Header;
