import styles from "./SentimentItem.module.css";

const SentimentItem = ({ sentiment, score, word }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <h1
          style={{
            color: `${sentiment == "positive" ? "limegreen" : "tomato"}`,
          }}
        >
          {score > 0 ? "+" : ""}
          {score}
        </h1>
      </div>
      <div>
        <h3>
          Word:{" "}
          <span
            style={{
              color: `${sentiment == "positive" ? "limegreen" : "tomato"}`,
            }}
          >
            {word}
          </span>
        </h3>
        <p>The sentence use case</p>
      </div>
    </div>
  );
};

export default SentimentItem;
