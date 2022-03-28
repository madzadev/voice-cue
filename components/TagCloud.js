import { TagCloud } from "react-tagcloud";
import { useState } from "react";

import { transcription } from "../data/transcription";

function SimpleCloud({ data }) {
  const [activeTag, setActiveTag] = useState();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <TagCloud
        minSize={12}
        maxSize={35}
        tags={data}
        onClick={(tag) => {
          console.log(
            `'${tag.value}' was selected! Occurred ${tag.count} times`
          );
          setActiveTag(tag);
        }}
      />
      <div>
        {activeTag ? (
          <>
            <h1>Selected word: {activeTag.value}</h1>
            <h3>Occurred {activeTag.count} times</h3>
            {transcription.words.map((el, index) => {
              console.log(el.word);
              if (activeTag.value === el.word) {
                <p key={index}>
                  Occurrence {index + 1}: {el.word} at {el.start}
                </p>;
              }
            })}
          </>
        ) : (
          <h1>Select a tag to get analysis</h1>
        )}
      </div>
    </div>
  );
}

export default SimpleCloud;
