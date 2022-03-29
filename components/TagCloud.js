import { useState, useEffect } from "react";
import { TagCloud } from "react-tagcloud";
import ViewSplitter from "../components/ViewSplitter";

import { transcription } from "../data/transcription";

import styles from "./TagCloud.module.css";

function SimpleCloud({ data }) {
  const [activeTag, setActiveTag] = useState();
  const [activeColor, setActiveColor] = useState("white");
  const [occurrences, setOccurrences] = useState([]);
  const [tagList, setTagList] = useState();

  function getTagList(occ) {
    return occ.map((el, index) => {
      return (
        <div
          className={styles.listItem}
          onClick={() => {
            console.log(`Time is ${el.start}`);
          }}
        >
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
    <ViewSplitter>
      <TagCloud
        minSize={18}
        maxSize={40}
        tags={data}
        onClick={(tag, e) => {
          setActiveTag(tag);
          setOccurrences([]);
          setActiveColor(e.target.style.color);
          transcription.words.forEach((el, index) => {
            if (tag.value === el.word) {
              setOccurrences((occurrences) => [...occurrences, el]);
            }
          });
        }}
      />
      <div>
        {activeTag ? (
          <>
            <div className={styles.listHead}>
              <h1>
                Word:{" "}
                <span style={{ color: `${activeColor}` }}>
                  {activeTag.value}
                </span>
              </h1>
              <h3>Occurred {activeTag.count} times</h3>
            </div>

            {tagList}
          </>
        ) : (
          <h1>Select a tag to get analysis</h1>
        )}
      </div>
    </ViewSplitter>
  );
}

export default SimpleCloud;
