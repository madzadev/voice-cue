import toHHMMSS from "../helpers/getMinuteFormat";

import styles from "./SentimentItem.module.css";

const SentimentItem = ({ sentiment, score, word, time, onClick }) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
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
          </span>{" "}
          at {toHHMMSS(time)}
        </h3>
        <p>The sentence use case</p>
      </div>
    </div>
  );
};

export default SentimentItem;
