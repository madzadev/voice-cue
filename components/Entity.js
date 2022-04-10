import { useState, useEffect } from "react";
import nlp from "compromise/two";

import ViewSplitter from "../components/ViewSplitter";
import { entities } from "../data/entities";
import { transcription } from "../data/transcription";

import styles from "./Entity.module.css";
import EntityItem from "./EntityItem";

const Entity = ({ audioWaveForm, dGTranscript }) => {
  const [activeEntity, setActiveEntity] = useState("");
  const [entityArray, setEntityArray] = useState([]);
  const [entityList, setEntityList] = useState();
  const [transcript, setTranscript] = useState(transcription);

  let doc = nlp(transcript.transcript);

  useEffect(() => {
    const nlpArrays = doc.document;
    setEntityArray([]);
    let wordsArray = transcript.words;
    let usedWordsArray = [];
    for (let i = 0; i < nlpArrays.length; i++) {
      for (let j = 0; j < nlpArrays[i].length; j++) {
        if (nlpArrays[i][j].tags.has(activeEntity)) {
          let word1 = "";
          wordsArray.forEach((word, index) => {
            if (nlpArrays[i][j].text.toLowerCase() == word.word.toLowerCase()) {
              if (!usedWordsArray.includes(word.word.toLowerCase())) {
                setEntityArray((entityArray) => [
                  ...entityArray,
                  { ...word, index },
                ]);
                word1 = word.word.toLowerCase();
              }
            }
          });
          usedWordsArray.push(word1);
        }
      }
    }
  }, [activeEntity]);

  function getEntityList(entityArray) {
    return entityArray
      .sort((a, b) => a.start - b.start)
      .map((el, index) => {
        return (
          <EntityItem
            index={el.index}
            dGTranscript={transcript}
            sequence={index}
            key={index}
            time={el.start}
            word={el.word}
            entity={activeEntity}
            color="red"
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
    setEntityList(getEntityList(entityArray));
  }, [entityArray]);

  useEffect(() => {
    if (dGTranscript) {
      setTranscript(dGTranscript);
    }
  }, [dGTranscript]);

  return (
    <ViewSplitter>
      <div className={styles.entities}>
        {entities.map((entity, index) => {
          return (
            <div key={index}>
              <h2
                className={styles.item}
                onClick={() => {
                  setActiveEntity(entity);
                }}
              >
                {entity}
              </h2>
              <p>Words: {doc.match(`#${entity}`).ptrs.length}</p>
            </div>
          );
        })}
      </div>
      <div>
        {activeEntity ? (
          <>
            <div className={styles.listHead}>
              <h1>
                Entity: <span style={{ color: `red` }}>{activeEntity}</span>
              </h1>
              <h3 style={{ color: "grey" }}>
                Occurred {entityArray.length} times
              </h3>
            </div>
            <div style={{ maxHeight: "220px", overflowY: "scroll" }}>
              {entityList}
            </div>
          </>
        ) : (
          <h1>Select entity to get cues</h1>
        )}
      </div>
    </ViewSplitter>
  );
};

export default Entity;
