import { useState, useEffect } from "react";
import nlp from "compromise/two";

import ViewSplitter from "../components/ViewSplitter";
import { transcription } from "../data/transcription";
let doc = nlp(transcription.transcript);

import styles from "./Actions.module.css";
import ActionItem from "./ActionItem";

const actions = [
  "PastTense",
  "PerfectTense",
  "Infinitive",
  "PresentTense",
  "Copula",
  "Modal",
  "Gerund",
  "FuturePerfect",
  "Pluperfect",
  "FuturePerfect",
  "Activity",
];
const Actions = ({ globalWaveForm }) => {
  const [activeAction, setActiveAction] = useState("");
  const [actionArray, setActionArray] = useState([]);
  const [actionList, setActionList] = useState();

  useEffect(() => {
    const nlpArrays = doc.document;
    setActionArray([]);
    let wordsArray = transcription.words;
    let usedWordsArray = [];
    for (let i = 0; i < nlpArrays.length; i++) {
      for (let j = 0; j < nlpArrays[i].length; j++) {
        if (nlpArrays[i][j].tags.has(activeAction)) {
          let word1 = "";
          wordsArray.forEach((word, index) => {
            if (nlpArrays[i][j].text.toLowerCase() == word.word.toLowerCase()) {
              if (!usedWordsArray.includes(word.word.toLowerCase())) {
                setActionArray((actionArray) => [...actionArray, word]);
                word1 = word.word.toLowerCase();
              }
            }
          });
          usedWordsArray.push(word1);
        }
      }
    }
  }, [activeAction]);

  function getActionList(actionArray) {
    return actionArray
      .sort((a, b) => a.start - b.start)
      .map((el, index) => {
        return (
          <ActionItem
            index={index}
            key={index}
            time={el.start}
            word={el.word}
            action={activeAction}
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
    setActionList(getActionList(actionArray));
  }, [actionArray]);
  return (
    <ViewSplitter>
      <div>
        {actions.map((action, index) => {
          return (
            <h3
              key={index}
              onClick={() => {
                setActiveAction(action);
              }}
            >
              {action}
            </h3>
          );
        })}
      </div>
      <div>
        {activeAction ? (
          <>
            <div className={styles.listHead}>
              <h1>
                Action: <span style={{ color: `red` }}>{activeAction}</span>
              </h1>
              <h3 style={{ color: "grey" }}>
                Occurred {actionArray.length} times
              </h3>
            </div>
            <div style={{ maxHeight: "220px", overflowY: "scroll" }}>
              {actionList}
            </div>
          </>
        ) : (
          <h1>Select action to get cues</h1>
        )}
      </div>
    </ViewSplitter>
  );
};

export default Actions;
