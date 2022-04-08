import { useState, useEffect } from "react";
import toHHMMSS from "../helpers/getMinuteFormat";
import getSampleText from "../helpers/getSampleText";

import { transcription } from "../data/transcription";

import styles from "./SentimentItem.module.css";

const SentimentItem = ({
  dGTranscript,
  index,
  sentiment,
  score,
  word,
  time,
  onClick,
}) => {
  const [transcript, setTranscript] = useState(transcription);

  useEffect(() => {
    if (dGTranscript) {
      setTranscript(dGTranscript);
    }
  }, [dGTranscript]);

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
        <p className={styles.sample}>
          {getSampleText(transcript.words, index)}
        </p>
      </div>
    </div>
  );
};

export default SentimentItem;
