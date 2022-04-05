import { useState, useEffect } from "react";
import WordInText from "./WordInText";
import ViewSplitter from "../components/ViewSplitter";

import { transcription } from "../data/transcription";
import styles from "./Overview.module.css";

const Overview = ({ globalWaveForm }) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (globalWaveForm) {
      globalWaveForm.current.on("audioprocess", function () {
        setCurrentTime(globalWaveForm.current.getCurrentTime());
      });
    }
  }, [globalWaveForm]);

  console.log(transcription);

  return (
    <ViewSplitter>
      <div>
        <div className={styles.wrapper}>
          <div>
            <h1>{transcription.words.length}</h1>
            <h2 className={styles.category}>Words</h2>
          </div>
          <div>
            <h1>21 secs</h1>
            <h3 className={styles.category}>Length</h3>
          </div>
          <div>
            <h1>2</h1>
            <h3 className={styles.category}>Speakers</h3>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div>
            <h1>+4</h1>
            <h3 className={styles.category}>Sentiment</h3>
          </div>
          <div>
            <h1>234</h1>
            <h3 className={styles.category}>Total words</h3>
          </div>
          <div>
            <h1>234</h1>
            <h3 className={styles.category}>Total words</h3>
          </div>
        </div>
      </div>
      <div style={{ maxHeight: "220px", overflowY: "scroll" }}>
        {transcription.words.map((el, index) => {
          return (
            <WordInText
              key={index}
              word={el.word}
              color={currentTime > el.start ? "#0d76ff" : "white"}
              onClick={() => {
                globalWaveForm.current.skip(
                  el.start - globalWaveForm.current.getCurrentTime()
                );
                setCurrentTime(el.start + 0.01);
              }}
            />
          );
        })}
      </div>
    </ViewSplitter>
  );
};

export default Overview;
