import { useState, useEffect } from "react";
import WordInText from "./WordInText";
import ViewSplitter from "../components/ViewSplitter";
import Sentiment from "sentiment";
import getTagOccurrences from "../helpers/getTagOccurrences";
import nlp from "compromise/two";
import getTotalEntities from "../helpers/getTotalEntities";
import getTotalActions from "../helpers/getTotalActions";
import getTotalSpeakers from "../helpers/getTotalSpeakers";
import getThousandFormat from "../helpers/getThousandFormat";

import { transcription } from "../data/transcription";
import styles from "./Overview.module.css";

const Overview = ({ audioWaveForm, dGTranscript }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [transcript, setTranscript] = useState(transcription);

  let doc = nlp(transcript.transcript);
  const sentiment = new Sentiment();
  const analysis = sentiment.analyze(transcript.transcript);

  useEffect(() => {
    if (audioWaveForm) {
      setCurrentTime(0);
      const timer = setInterval(() => {
        if (audioWaveForm) {
          setCurrentTime(audioWaveForm.current.getCurrentTime());
        }
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [audioWaveForm]);

  useEffect(() => {
    if (dGTranscript) {
      setTranscript(dGTranscript);
    }
  }, [dGTranscript]);

  return (
    <ViewSplitter>
      <div>
        <div className={styles.wrapper}>
          <div>
            <h1>{getThousandFormat(transcript.transcript.length)}</h1>
            <h3 className={styles.category}>Characters</h3>
          </div>
          <div>
            <h1>{getThousandFormat(transcript.words.length)}</h1>
            <h3 className={styles.category}>Words</h3>
          </div>
          <div>
            <h1>
              {getThousandFormat(
                transcript.transcript.split(/[.!?]+\s/).filter(Boolean).length
              )}
            </h1>
            <h3 className={styles.category}>Sentences</h3>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div>
            <h1>
              {analysis.calculation.length > 0
                ? analysis.calculation.length
                : 0}
            </h1>
            <h3 className={styles.category}>Sentiments</h3>
          </div>
          <div>
            <h1>
              {analysis.score > 0 ? `+${analysis.score}` : analysis.score}
            </h1>
            <h3 className={styles.category}>Tone</h3>
          </div>
          <div>
            <h1>{getTagOccurrences(transcript.words).length}</h1>
            <h3 className={styles.category}>Tags</h3>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div>
            <h1>{getTotalEntities(doc)}</h1>
            <h3 className={styles.category}>Entities</h3>
          </div>
          <div>
            <h1>{getTotalActions(doc)}</h1>
            <h3 className={styles.category}>Actions</h3>
          </div>
          <div>
            <h1>{getTotalSpeakers(transcript.words)}</h1>
            <h3 className={styles.category}>Speakers</h3>
          </div>
        </div>
      </div>
      <div style={{ maxHeight: "220px", overflowY: "scroll" }}>
        {transcript.words.map((el, index) => {
          return (
            <WordInText
              key={index}
              word={el.punctuated_word}
              color={currentTime >= el.start ? "#0d76ff" : "#595970"}
              onClick={() => {
                audioWaveForm.current.skip(
                  el.start - audioWaveForm.current.getCurrentTime()
                );
                setCurrentTime(el.start);
              }}
            />
          );
        })}
      </div>
    </ViewSplitter>
  );
};

export default Overview;
