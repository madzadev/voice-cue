import { useState, useEffect } from "react";
import { TagCloud } from "react-tagcloud";
import ViewSplitter from "../components/ViewSplitter";
import TagCloudItem from "../components/TagCloudItem";

import { transcription } from "../data/transcription";
import getTagOccurrences from "../helpers/getTagOccurrences";

import styles from "./TagCloud.module.css";

function SimpleCloud({ audioWaveForm, dGTranscript }) {
  const [activeTag, setActiveTag] = useState();
  const [activeColor, setActiveColor] = useState("white");
  const [occurrences, setOccurrences] = useState([]);
  const [tagList, setTagList] = useState();
  const [transcript, setTranscript] = useState(transcription);

  function getTagList(occ) {
    return occ.map((el, index) => {
      return (
        <TagCloudItem
          index={el.index}
          dGTranscript={transcript}
          sequence={index}
          key={index}
          time={el.start}
          color={activeColor}
          onClick={() => {
            audioWaveForm.current.skip(
              el.start - audioWaveForm.current.getCurrentTime()
            );
          }}
        />
      );
    });
  }

  useEffect(() => {
    setTagList(getTagList(occurrences));
  }, [occurrences]);

  useEffect(() => {
    if (dGTranscript) {
      setTranscript(dGTranscript);
    }
  }, [dGTranscript]);

  return (
    <ViewSplitter>
      <TagCloud
        minSize={18}
        maxSize={40}
        tags={getTagOccurrences(transcript.words)}
        onClick={(tag, e) => {
          setActiveTag(tag);
          setOccurrences([]);
          setActiveColor(e.target.style.color);
          transcript.words.forEach((el, index) => {
            if (tag.value === el.word) {
              setOccurrences((occurrences) => [
                ...occurrences,
                { ...el, index },
              ]);
            }
          });
        }}
      />
      <div>
        {activeTag ? (
          <div>
            <div className={styles.listHead}>
              <h1>
                Tag:{" "}
                <span style={{ color: `${activeColor}` }}>
                  {activeTag.value}
                </span>
              </h1>
              <h3 style={{ color: "grey" }}>
                Occurred {activeTag.count} times
              </h3>
            </div>
            <div style={{ maxHeight: "220px", overflowY: "scroll" }}>
              {tagList}
            </div>
          </div>
        ) : (
          <h1>Select a tag to get cues</h1>
        )}
      </div>
    </ViewSplitter>
  );
}

export default SimpleCloud;
