import { useState } from "react";

import ViewSplitter from "./ViewSplitter";
import SearchItem from "./SearchItem";
import styles from "./Search.module.css";
import { transcription } from "../data/transcription";

const Search = ({ globalWaveForm }) => {
  const [input, setInput] = useState("");
  const [resultsArray, setResultsArray] = useState([]);
  return (
    <ViewSplitter>
      <div>
        <h2>Custom search:</h2>
        <input
          spellCheck="false"
          className={styles.input}
          onChange={(e) => {
            setInput(e.target.value);
            setResultsArray([]);
            if (e.target.value.length > 2) {
              transcription.words.forEach((word, index) => {
                if (
                  word.word.toLowerCase().includes(e.target.value.toLowerCase())
                ) {
                  console.log(word);
                  setResultsArray((resultsArray) => [...resultsArray, word]);
                }
              });
            }
          }}
        />
      </div>
      <div>
        {input.length > 2 ? (
          <div className={styles.listHead}>
            <h1>
              Query: <span style={{ color: "#0d76ff" }}>{input}</span>
            </h1>
            <h3 style={{ color: "grey" }}>
              Occurred {resultsArray.length} times
            </h3>
          </div>
        ) : (
          <h1>Type at least 3 chars</h1>
        )}
        {resultsArray.map((word, index) => {
          return (
            <SearchItem
              color="#0d76ff"
              index={index}
              time={word.start}
              word={word.word}
              onClick={() => {
                globalWaveForm.current.skip(
                  word.start - globalWaveForm.current.getCurrentTime()
                );
              }}
            />
          );
        })}
      </div>
    </ViewSplitter>
  );
};

export default Search;
