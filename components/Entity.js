import { useState, useEffect } from "react";
import nlp from "compromise/two";

import ViewSplitter from "../components/ViewSplitter";
import { transcription } from "../data/transcription";
let doc = nlp(transcription.transcript);

import styles from "./Sentiments.module.css";

const Entity = () => {
  console.log(doc.tag("MaleName").out("tags"));
  return (
    <ViewSplitter>
      <div>
        <h1>This is entity</h1>
      </div>
      <div>
        <h1>Select smth</h1>
      </div>
    </ViewSplitter>
  );
};

export default Entity;
