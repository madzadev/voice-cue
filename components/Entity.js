import { useState, useEffect } from "react";
import nlp from "compromise/two";

import ViewSplitter from "../components/ViewSplitter";
import { transcription } from "../data/transcription";
let doc = nlp(transcription.transcript);

import styles from "./Sentiments.module.css";

const Entity = () => {
  // console.log(doc.tag("MaleName").out("tags"));
  const [activeEntity, setActiveEntity] = useState("");
  return (
    <ViewSplitter>
      <div>
        <h1>This is entity</h1>
        <h3>Person</h3>
        <h3>Place</h3>
        <h3>Money</h3>
        <h3>Date</h3>
        <h3>Url</h3>
        <h3>Email</h3>
        <h3>Organization</h3>
        <h3>NumericValue</h3>
        <h3>HashTag</h3>
        <h3>PhoneNumber</h3>
        <h3>Unit</h3>
        <h3>Activity</h3>
      </div>
      <div>
        {activeEntity ? <h1>List</h1> : <h1>Select entity to get cues</h1>}
      </div>
    </ViewSplitter>
  );
};

export default Entity;
