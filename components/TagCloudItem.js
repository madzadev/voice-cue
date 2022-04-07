import { useState, useEffect } from "react";
import toHHMMSS from "../helpers/getMinuteFormat";
import getSampleText from "../helpers/getSampleText";

import { transcription } from "../data/transcription";

import styles from "./TagCloudItem.module.css";

const TagCloudItem = ({
  index,
  sequence,
  time,
  color,
  onClick,
  dGTranscript,
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
        <h3>Appears at: {toHHMMSS(time)}</h3>
        <p className={styles.sample}>
          {getSampleText(transcript.words, index)}
        </p>
      </div>
    </div>
  );
};

export default TagCloudItem;
