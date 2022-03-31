import { useState } from "react";

import ViewSplitter from "./ViewSplitter";
import styles from "./Search.module.css";

const Search = () => {
  const [input, setInput] = useState("");
  return (
    <ViewSplitter>
      <div>
        <h1>Search</h1>
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      <div>
        {input.length > 2 ? (
          <div>
            <h1>Query: {input}</h1>
          </div>
        ) : (
          <h1>Type at least 3 chars to get cues</h1>
        )}
      </div>
    </ViewSplitter>
  );
};

export default Search;
