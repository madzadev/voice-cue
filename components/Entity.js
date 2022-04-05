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
const Entity = () => {
  const [activeEntity, setActiveEntity] = useState("");

  useEffect(() => {
    const nlpArrays = doc.document;
    for (let i = 0; i < nlpArrays.length; i++) {
      for (let j = 0; j < nlpArrays[i].length; j++) {
        console.log("111");
      }
    }
  }, [activeEntity]);

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
            {entities.map((entity, index) => {
              return <EntityItem key={index} />;
            })}
          </>
        ) : (
          <h1>Select entity to get cues</h1>
        )}
      </div>
    </ViewSplitter>
  );
};

export default Entity;
