import { useState, useEffect } from "react";

import ViewSplitter from "./ViewSplitter";
import SearchItem from "./SearchItem";
import styles from "./Search.module.css";
import { transcription } from "../data/transcription";

const Search = ({ audioWaveForm, dGTranscript }) => {
  const [input, setInput] = useState("");
  const [resultsArray, setResultsArray] = useState([]);
  const [transcript, setTranscript] = useState(transcription);

  useEffect(() => {
    if (dGTranscript) {
      setTranscript(dGTranscript);
    }
  }, [dGTranscript]);

  return (
    <ViewSplitter>
      <div className={styles.wrapper}>
        <h2>Custom search:</h2>
        <input
          spellCheck="false"
          className={styles.input}
          onChange={(e) => {
            setInput(e.target.value);
            setResultsArray([]);
            if (e.target.value.length > 2) {
              transcript.words.forEach((word, index) => {
                if (
                  word.word.toLowerCase().includes(e.target.value.toLowerCase())
                ) {
                  setResultsArray((resultsArray) => [
                    ...resultsArray,
                    { ...word, index },
                  ]);
                }
              });
            }
          }}
        />
      </div>
      <div>
        {input.length > 2 ? (
          <>
            <div className={styles.listHead}>
              <h1>
                Query: <span style={{ color: "#0d76ff" }}>{input}</span>
              </h1>
              <h3 style={{ color: "grey" }}>
                Occurred {resultsArray.length} times
              </h3>
            </div>
            <div style={{ maxHeight: "220px", overflowY: "scroll" }}>
              {resultsArray.map((word, index) => {
                return (
                  <SearchItem
                    color="#0d76ff"
                    key={index}
                    sequence={index}
                    index={word.index}
                    dGTranscript={transcript}
                    time={word.start}
                    word={word.word}
                    onClick={() => {
                      audioWaveForm.current.skip(
                        word.start - audioWaveForm.current.getCurrentTime()
                      );
                    }}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <h1>Type at least 3 chars</h1>
        )}
      </div>
    </ViewSplitter>
  );
};

export default Search;
