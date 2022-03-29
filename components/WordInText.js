import styles from "./WordInText.module.css";

const WordInText = ({ word, time, onClick, color }) => {
  return (
    <div
      className={styles.wrapper}
      onClick={onClick}
      style={{ color: `${color}`, fontWeight: "bold" }}
    >
      {word}
    </div>
  );
};

export default WordInText;
