import { useState } from "react";

import styles from "./PlayButton.module.css";

const PlayButton = ({ globalWaveForm }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    if (globalWaveForm.current.isPlaying()) {
      setIsPlaying(false);
      globalWaveForm.current.pause();
    } else {
      setIsPlaying(true);
      globalWaveForm.current.play();
    }
  };
  return (
    <div>
      <img
        className={styles.button}
        onClick={playAudio}
        src={isPlaying ? "icons/pause.png" : "icons/play.png"}
        alt="play-button"
      />
    </div>
    // <button onClick={playAudio} className={styles.wrapper}>
    //   Play/Pause
    // </button>
  );
};

export default PlayButton;
