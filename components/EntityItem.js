import { useState, useEffect } from "react";
import toHHMMSS from "../helpers/getMinuteFormat";
import getSampleText from "../helpers/getSampleText";

import { transcription } from "../data/transcription";

import styles from "./EntityItem.module.css";

const EntityItem = ({
  entity,
  word,
  color,
  sequence,
  index,
  dGTranscript,
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
            color: `${color}`,
          }}
        >
          #{sequence + 1}
        </h1>
      </div>
      <div>
        <h3>
          {entity}: <span style={{ color: `${color}` }}>{word}</span> At:{" "}
          {toHHMMSS(time)}
        </h3>
        <p className={styles.sample}>
          {getSampleText(transcript.words, index)}
        </p>
      </div>
    </div>
  );
};

export default EntityItem;
