import { useState, useEffect } from "react";
import Sentiment from "sentiment";
import ViewSplitter from "../components/ViewSplitter";
import SentimentItem from "../components/SentimentItem";
import { transcription } from "../data/transcription";

import styles from "./Sentiments.module.css";

const sentiment = new Sentiment();
const analysis = sentiment.analyze(transcription.transcript);

const Sentiments = () => {
  const [emotion, setEmotion] = useState("");
  const [sentimentList, setSentimentList] = useState([]);
  console.log(analysis);

  return (
    <ViewSplitter>
      <div className={styles.wrapper}>
        <div
          className={styles.positive}
          onClick={() => {
            setEmotion("positive");
            setSentimentList([]);
            analysis.calculation.forEach((el, index) => {
              if (el[Object.keys(el)] > 0) {
                setSentimentList((sentimentList) => [...sentimentList, el]);
              }
            });
          }}
        >
          <h1>Positive</h1>
          {analysis.positive ? (
            <p>Words: {analysis.positive.length}</p>
          ) : (
            <p>No words found</p>
          )}
        </div>
        <div
          className={styles.negative}
          onClick={() => {
            setEmotion("negative");
            setSentimentList([]);
            analysis.calculation.forEach((el, index) => {
              if (el[Object.keys(el)] < 0) {
                setSentimentList((sentimentList) => [...sentimentList, el]);
              }
            });
          }}
        >
          <h1>Negative</h1>
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
            <div style={{ maxHeight: "260px", overflowY: "scroll" }}>
              {sentimentList.map((el, index) => {
                return (
                  <SentimentItem
                    sentiment={emotion}
                    score={el[Object.keys(el)]}
                    word={Object.keys(el)}
                    key={index}
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
