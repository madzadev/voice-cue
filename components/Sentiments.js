import { useState, useEffect } from "react";
import Sentiment from "sentiment";
import ViewSplitter from "../components/ViewSplitter";
import { transcription } from "../data/transcription";

import styles from "./Sentiments.module.css";

const sentiment = new Sentiment();
const analysis = sentiment.analyze(transcription.transcript);

const Sentiments = () => {
  const [emotion, setEmotion] = useState("");

  return (
    <ViewSplitter>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
        }}
      >
        <div
          style={{
            color: "limegreen",
          }}
          onClick={() => {
            setEmotion("positive");
          }}
        >
          <h3>Positive</h3>
          {analysis.positive ? (
            <p>Words: {analysis.positive.length}</p>
          ) : (
            <p>No words found</p>
          )}
        </div>
        <div>
          <h3>Score</h3>
          <p>+1</p>
        </div>
        <div
          style={{
            color: "tomato",
          }}
          onClick={() => {
            setEmotion("negative");
          }}
        >
          <h3>Negative</h3>
          {analysis.negative ? (
            <p>Words: {analysis.negative.length}</p>
          ) : (
            <p>No words found</p>
          )}
        </div>
      </div>
      <h1>Select faces to get started</h1>
    </ViewSplitter>
  );
};

export default Sentiments;
