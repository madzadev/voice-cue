import styles from "./WordInText.module.css";

const WordInText = ({ word, time, onClick }) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      {word}
    </div>
  );
};

export default WordInText;
