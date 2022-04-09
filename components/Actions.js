import { useState, useEffect } from "react";
import nlp from "compromise/two";

import ViewSplitter from "../components/ViewSplitter";
import ActionItem from "./ActionItem";

import { actions } from "../data/actions";
import { transcription } from "../data/transcription";

import styles from "./Actions.module.css";

const Actions = ({ audioWaveForm, dGTranscript }) => {
  const [activeAction, setActiveAction] = useState("");
  const [actionArray, setActionArray] = useState([]);
  const [actionList, setActionList] = useState();
  const [transcript, setTranscript] = useState(transcription);

  let doc = nlp(transcript.transcript);

  useEffect(() => {
    const nlpArrays = doc.document;
    setActionArray([]);
    let wordsArray = transcript.words;
    let usedWordsArray = [];
    for (let i = 0; i < nlpArrays.length; i++) {
      for (let j = 0; j < nlpArrays[i].length; j++) {
        if (nlpArrays[i][j].tags.has(activeAction)) {
          let word1 = "";
          wordsArray.forEach((word, index) => {
            if (nlpArrays[i][j].text.toLowerCase() == word.word.toLowerCase()) {
              if (!usedWordsArray.includes(word.word.toLowerCase())) {
                setActionArray((actionArray) => [
                  ...actionArray,
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
  }, [activeAction]);

  function getActionList(actionArray) {
    return actionArray
      .sort((a, b) => a.start - b.start)
      .map((el, index) => {
        return (
          <ActionItem
            key={index}
            index={el.index}
            dGTranscript={transcript}
            sequence={index}
            time={el.start}
            word={el.word}
            action={activeAction}
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
    setActionList(getActionList(actionArray));
  }, [actionArray]);

  useEffect(() => {
    if (dGTranscript) {
      setTranscript(dGTranscript);
    }
  }, [dGTranscript]);

  return (
    <ViewSplitter>
      <div className={styles.actions}>
        {actions.map((action, index) => {
          return (
            <div key={index}>
              <h2
                className={styles.item}
                onClick={() => {
                  setActiveAction(action);
                }}
              >
                {action}
              </h2>
              <p>Words: {doc.match(`#${action}`).ptrs.length}</p>
            </div>
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
