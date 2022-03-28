import { useState, useEffect } from "react";
import Sentiment from "sentiment";
import { transcription } from "../data/transcription";

const sentiment = new Sentiment();

const Sentiments = () => {
  const analysis = sentiment.analyze(transcription.transcript);
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
        }}
      >
        <div>
          <h3>Positive</h3>
          {analysis.positive ? (
            <p>Words: {analysis.positive.length}</p>
          ) : (
            <p>No words found</p>
          )}
        </div>
        <div>
          <h3>Neutral</h3>
        </div>
        <div>
          <h3>Negative</h3>
          {analysis.negative ? (
            <p>Words: {analysis.negative.length}</p>
          ) : (
            <p>No words found</p>
          )}
        </div>
      </div>
      <h1>Select faces to get started</h1>
    </div>
  );
};

export default Sentiments;
