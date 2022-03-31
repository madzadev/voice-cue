import { useState, useEffect } from "react";
import PlayButton from "./PlayButton";
import toHHMMSS from "../helpers/getMinuteFormat";

import styles from "./MainPlayer.module.css";

const MainPlayer = ({ globalWaveForm }) => {
  const [audioLength, setAudioLength] = useState(0);

  useEffect(() => {
    if (globalWaveForm) {
      globalWaveForm.current.on("ready", function () {
        console.log(globalWaveForm.current);
        setAudioLength(toHHMMSS(globalWaveForm.current.getDuration()));
      });
    }
  }, [globalWaveForm]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.time}>0:03/{audioLength}</h1>
      <h3 className={styles.title}>My test audio file.mp3</h3>
      <div className={styles.player}>
        <h3>beg</h3>
        <h3>back</h3>
        <PlayButton globalWaveForm={globalWaveForm} />
        <h3>forw</h3>
        <h3>end</h3>
      </div>
    </div>
  );
};

export default MainPlayer;
