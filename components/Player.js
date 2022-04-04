import { useState, useEffect } from "react";
import toHHMMSS from "../helpers/getMinuteFormat";

import styles from "./Player.module.css";

const Player = ({ globalWaveForm, audio }) => {
  const [audioLength, setAudioLength] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (globalWaveForm) {
      globalWaveForm.current.on("ready", function () {
        setAudioLength(toHHMMSS(globalWaveForm.current.getDuration()));
      });
      globalWaveForm.current.on("audioprocess", function () {
        setCurrentTime(toHHMMSS(globalWaveForm.current.getCurrentTime()));
      });
      globalWaveForm.current.on("finish", function () {
        setIsPlaying(false);
      });
    }
  }, [globalWaveForm]);

  // Update this via useEffect
  setInterval(() => {
    if (globalWaveForm) {
      setAudioLength(toHHMMSS(globalWaveForm.current.getDuration()));
      setCurrentTime(toHHMMSS(globalWaveForm.current.getCurrentTime()));
    }
  }, 100);

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
    <div className={styles.wrapper}>
      <h1 className={styles.time}>
        {currentTime}/{audioLength}
      </h1>
      <h3 className={styles.title}>
        {audio ? audio.name : "Sample audio track.mp3"}
      </h3>
      <div className={styles.player}>
        <img
          className={styles.ffStop}
          src="icons/fast-backward-start.png"
          onClick={() => {
            globalWaveForm.current.stop();
            setIsPlaying(false);
          }}
          alt="ff-stop-icon"
        />
        <img
          className={styles.ff}
          src="icons/fast-backward.png"
          onClick={() => {
            globalWaveForm.current.skipBackward(10);
          }}
          alt="ff-icon"
        />
        <img
          className={styles.play}
          onClick={playAudio}
          src={isPlaying ? "icons/pause.png" : "icons/play.png"}
          alt="play-button"
        />
        <img
          className={styles.ff}
          src="icons/fast-forward.png"
          onClick={() => {
            globalWaveForm.current.skipForward(10);
            console.log(globalWaveForm.current.getDuration());

            setAudioLength(toHHMMSS(globalWaveForm.current.getDuration()));

            globalWaveForm.current.on("audioprocess", function () {
              setCurrentTime(toHHMMSS(globalWaveForm.current.getCurrentTime()));
            });
          }}
          alt="ff-icon"
        />
        <img
          className={styles.ffStop}
          src="icons/fast-forward-end.png"
          onClick={() => {
            globalWaveForm.current.seekTo(1);
            globalWaveForm.current.pause();
            setIsPlaying(false);
          }}
          alt="ff-stop-icon"
        />
      </div>
    </div>
  );
};

export default Player;
