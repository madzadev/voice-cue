import styles from "./SentimentItem.module.css";

const SentimentItem = ({ score, word }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <h1 className={styles.score}>
          {score > 0 ? "+" : ""}
          {score}
        </h1>
      </div>
      <div>
        <h3>Word: {word}</h3>
        <p>The sentence use case</p>
      </div>
    </div>
  );
};

export default SentimentItem;
