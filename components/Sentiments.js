import { useState, useEffect } from "react";
import Sentiment from "sentiment";
import ViewSplitter from "../components/ViewSplitter";
import SentimentItem from "../components/SentimentItem";
import { transcription } from "../data/transcription";

import styles from "./Sentiments.module.css";

const Sentiments = ({ audioWaveForm, dGTranscript }) => {
  const [emotion, setEmotion] = useState("");
  const [sentimentList, setSentimentList] = useState([]);
  const [transcript, setTranscript] = useState(transcription);

  const sentiment = new Sentiment();
  const analysis = sentiment.analyze(transcript.transcript);

  useEffect(() => {
    if (dGTranscript) {
      setTranscript(dGTranscript);
    }
  }, [dGTranscript]);

  return (
    <ViewSplitter>
      <div className={styles.wrapper}>
        <div>
          <h1
            className={styles.positive}
            onClick={() => {
              setEmotion("positive");
              setSentimentList([]);
              let usedWordsArray = [];
              analysis.calculation.forEach((el, index) => {
                if (el[Object.keys(el)] > 0) {
                  let wordsArray = transcript.words;
                  let word1 = "";
                  wordsArray.forEach((word, index) => {
                    if (
                      Object.keys(el)[0].toLowerCase() ==
                      word.word.toLowerCase()
                    ) {
                      if (!usedWordsArray.includes(word.word.toLowerCase())) {
                        setSentimentList((sentimentList) => [
                          ...sentimentList,
                          { ...word, index: index, score: el[Object.keys(el)] },
                        ]);
                        word1 = word.word.toLowerCase();
                      }
                    }
                  });
                  usedWordsArray.push(word1);
                }
              });
            }}
          >
            Positive
          </h1>
          {analysis.positive ? (
            <p>Words: {analysis.positive.length}</p>
          ) : (
            <p>No words found</p>
          )}
        </div>
        <div>
          <h1
            className={styles.negative}
            onClick={() => {
              setEmotion("negative");
              setSentimentList([]);
              let usedWordsArray = [];
              analysis.calculation.forEach((el, index) => {
                if (el[Object.keys(el)] < 0) {
                  let wordsArray = transcript.words;
                  let word1 = "";
                  wordsArray.forEach((word, index) => {
                    if (
                      Object.keys(el)[0].toLowerCase() ==
                      word.word.toLowerCase()
                    ) {
                      if (!usedWordsArray.includes(word.word.toLowerCase())) {
                        setSentimentList((sentimentList) => [
                          ...sentimentList,
                          { ...word, index: index, score: el[Object.keys(el)] },
                        ]);
                        word1 = word.word.toLowerCase();
                      }
                    }
                  });
                  usedWordsArray.push(word1);
                }
              });
            }}
          >
            Negative
          </h1>
          {analysis.negative ? (
            <p>Words: {analysis.negative.length}</p>
          ) : (
            <p>No words found</p>
          )}
        </div>
      </div>
      <div>
        {emotion ? (
          <>
            <div className={styles.listHead}>
              <h1>
                Sentiment:{" "}
                <span
                  style={{
                    color: `${emotion == "positive" ? "limegreen" : "tomato"}`,
                  }}
                >
                  {emotion}
                </span>
              </h1>
              <h3 style={{ color: "grey" }}>
                Occurred {sentimentList.length} times
              </h3>
            </div>
            <div style={{ maxHeight: "220px", overflowY: "scroll" }}>
              {sentimentList
                .sort((a, b) => a.start - b.start)
                .map((el, index) => {
                  return (
                    <SentimentItem
                      key={index}
                      sentiment={emotion}
                      dGTranscript={transcript}
                      index={el.index}
                      score={el.score}
                      word={el.word}
                      time={el.start}
                      onClick={() => {
                        audioWaveForm.current.skip(
                          el.start - audioWaveForm.current.getCurrentTime()
                        );
                      }}
                    />
                  );
                })}
            </div>
          </>
        ) : (
          <h1>Select sentiment to get cues</h1>
        )}
      </div>
    </ViewSplitter>
  );
};

export default Sentiments;
