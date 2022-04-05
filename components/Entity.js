import { useState, useEffect } from "react";
import nlp from "compromise/two";

import ViewSplitter from "../components/ViewSplitter";
import { transcription } from "../data/transcription";
let doc = nlp(transcription.transcript);

import styles from "./Sentiments.module.css";
import EntityItem from "./EntityItem";

const entities = [
  "Person",
  "Place",
  "Money",
  "Date",
  "Url",
  "Email",
  "Organization",
  "NumericValue",
  "Hashtag",
  "PhoneNumber",
  "Unit",
];
const Entity = ({ globalWaveForm }) => {
  const [activeEntity, setActiveEntity] = useState("");
  const [entityArray, setEntityArray] = useState([]);
  const [entityList, setEntityList] = useState();

  useEffect(() => {
    const nlpArrays = doc.document;
    setEntityArray([]);
    let wordsArray = transcription.words;
    for (let i = 0; i < nlpArrays.length; i++) {
      for (let j = 0; j < nlpArrays[i].length; j++) {
        if (nlpArrays[i][j].tags.has(activeEntity)) {
          wordsArray.forEach((word, index) => {
            if (nlpArrays[i][j].text.toLowerCase() == word.word.toLowerCase()) {
              setEntityArray((entityArray) => [...entityArray, word]);
              wordsArray.slice(index, 1);
            }
          });
        }
      }
    }
  }, [activeEntity]);

  function getEntityList(entityArray) {
    return entityArray.map((el, index) => {
      return (
        <EntityItem
          index={index}
          key={index}
          time={el.start}
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
      <div>
        {entities.map((entity, index) => {
          return (
            <h3
              key={index}
              onClick={() => {
                setActiveEntity(entity);
              }}
            >
              {entity}
            </h3>
          );
        })}
      </div>
      <div>
        {activeEntity ? (
          <>
            <h1>List</h1>
            {entityList}
          </>
        ) : (
          <h1>Select entity to get cues</h1>
        )}
      </div>
    </ViewSplitter>
  );
};

export default Entity;
