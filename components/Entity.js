import { useState, useEffect } from "react";
import nlp from "compromise/two";

import ViewSplitter from "../components/ViewSplitter";
import { transcription } from "../data/transcription";
let doc = nlp(transcription.transcript);

import styles from "./Entity.module.css";
import EntityItem from "./EntityItem";

const entities = [
  "Person",
  "Place",
  "Organization",
  "Money",
  "Unit",
  "NumericValue",
  "Url",
  "Email",
  "PhoneNumber",
  "Date",
  "Hashtag",
];

const Entity = ({ globalWaveForm }) => {
  const [activeEntity, setActiveEntity] = useState("");
  const [entityArray, setEntityArray] = useState([]);
  const [entityList, setEntityList] = useState();

  useEffect(() => {
    const nlpArrays = doc.document;
    setEntityArray([]);
    let wordsArray = transcription.words;
    let usedWordsArray = [];
    for (let i = 0; i < nlpArrays.length; i++) {
      for (let j = 0; j < nlpArrays[i].length; j++) {
        if (nlpArrays[i][j].tags.has(activeEntity)) {
          let word1 = "";
          wordsArray.forEach((word, index) => {
            if (nlpArrays[i][j].text.toLowerCase() == word.word.toLowerCase()) {
              if (!usedWordsArray.includes(word.word.toLowerCase())) {
                setEntityArray((entityArray) => [...entityArray, word]);
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
            index={index}
            key={index}
            time={el.start}
            word={el.word}
            entity={activeEntity}
            color="red"
            onClick={() => {
              globalWaveForm.current.skip(
                el.start - globalWaveForm.current.getCurrentTime()
              );
            }}
          />
        );
      });
  }

  useEffect(() => {
    setEntityList(getEntityList(entityArray));
  }, [entityArray]);

  return (
    <ViewSplitter>
      <div className={styles.entities}>
        {entities.map((entity, index) => {
          return (
            <p
              className={styles.item}
              key={index}
              onClick={() => {
                setActiveEntity(entity);
              }}
            >
              💰 {entity}
            </p>
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
            <div style={{ maxHeight: "260px", overflowY: "scroll" }}>
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
