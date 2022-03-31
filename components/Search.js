import { useState } from "react";

import ViewSplitter from "./ViewSplitter";
import styles from "./Search.module.css";

const Search = () => {
  const [input, setInput] = useState("");
  return (
    <ViewSplitter>
      <div>
        <h1>Custom search:</h1>
        <input
          spellcheck="false"
          className={styles.input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      <div>
        {input.length > 2 ? (
          <div className={styles.listHead}>
            <h1>
              Query: <span style={{ color: "#0d76ff" }}>{input}</span>
            </h1>
            <h3 style={{ color: "grey" }}>Occurred {23} times</h3>
          </div>
        ) : (
          <h1>Type at least 3 chars to get cues</h1>
        )}
      </div>
    </ViewSplitter>
  );
};

export default Search;
