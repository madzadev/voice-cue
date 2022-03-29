import { useState, useEffect } from "react";

import ViewSplitter from "../components/ViewSplitter";
import { transcription } from "../data/transcription";

import styles from "./Sentiments.module.css";

const Entity = () => {
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
