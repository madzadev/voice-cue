import { TagCloud } from "react-tagcloud";
import { useState, useEffect } from "react";

import { transcription } from "../data/transcription";

import styles from "./TagCloud.module.css";

function SimpleCloud({ data }) {
  const [activeTag, setActiveTag] = useState();
  const [occurrences, setOccurrences] = useState([]);
  const [tagList, setTagList] = useState();

  function getTagList(occ) {
    return occ.map((el, index) => {
      return (
        <div className={styles.listItem}>
          <h3>
            #{index + 1} appears at {el.start}
          </h3>
          <p>This is the text included</p>
        </div>
      );
    });
  }

  useEffect(() => {
    setTagList(getTagList(occurrences));
  }, [occurrences]);

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}
    >
      <TagCloud
        minSize={18}
        maxSize={40}
        tags={data}
        onClick={(tag) => {
          setActiveTag(tag);
          setOccurrences([]);
          transcription.words.forEach((el, index) => {
            if (tag.value === el.word) {
              console.log(tag);
              setOccurrences((occurrences) => [...occurrences, el]);
            }
          });
        }}
      />
      <div>
        {activeTag ? (
          <>
            <div className={styles.listHead}>
              <h1>Word: {activeTag.value}</h1>
              <h3>Occurred {activeTag.count} times</h3>
            </div>

            {tagList}
          </>
        ) : (
          <h1>Select a tag to get analysis</h1>
        )}
      </div>
    </div>
  );
}

export default SimpleCloud;
