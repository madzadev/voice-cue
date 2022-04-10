import { useState, useEffect } from "react";
import toHHMMSS from "../helpers/getMinuteFormat";

import styles from "./Player.module.css";

const Player = ({ audio, audioWaveForm, dGTranscript }) => {
  const [audioLength, setAudioLength] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioWaveForm) {
      audioWaveForm.current.on("ready", function () {
        setAudioLength(toHHMMSS(audioWaveForm.current.getDuration()));
      });
      audioWaveForm.current.on("finish", function () {
        setIsPlaying(false);
      });
    }

    const timer = setInterval(() => {
      if (audioWaveForm) {
        setAudioLength(toHHMMSS(audioWaveForm.current.getDuration()));
        setCurrentTime(toHHMMSS(audioWaveForm.current.getCurrentTime()));
      }
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [audioWaveForm]);

  useEffect(() => {
    setIsPlaying(false);
  }, [audio]);

  useEffect(() => {
    if (dGTranscript) {
      if (audioWaveForm) {
        audioWaveForm.current.on("ready", function () {
          setAudioLength(toHHMMSS(audioWaveForm.current.getDuration()));
        });
        audioWaveForm.current.on("finish", function () {
          setIsPlaying(false);
        });
      }
    }
  }, [dGTranscript]);

  const playAudio = () => {
    if (audioWaveForm.current.isPlaying()) {
      setIsPlaying(false);
      audioWaveForm.current.pause();
    } else {
      setIsPlaying(true);
      audioWaveForm.current.play();
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.time}>
        {currentTime}/{audioLength}
      </h2>
      <h3 className={styles.title}>
        {audio ? audio.name : "DEV X Deepgram hackathon.mp3"}
      </h3>
      <div className={styles.player}>
        <img
          className={styles.ffStop}
          src="icons/fast-backward-start.png"
          onClick={() => {
            audioWaveForm.current.stop();
            setIsPlaying(false);
          }}
          alt="ff-stop-icon"
        />
        <img
          className={styles.ff}
          src="icons/fast-backward.png"
          onClick={() => {
            audioWaveForm.current.skipBackward(10);
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
            audioWaveForm.current.skipForward(10);

            setAudioLength(toHHMMSS(audioWaveForm.current.getDuration()));

            audioWaveForm.current.on("audioprocess", function () {
              setCurrentTime(toHHMMSS(audioWaveForm.current.getCurrentTime()));
            });
          }}
          alt="ff-icon"
        />
        <img
          className={styles.ffStop}
          src="icons/fast-forward-end.png"
          onClick={() => {
            audioWaveForm.current.seekTo(1);
            audioWaveForm.current.pause();
            setIsPlaying(false);
          }}
          alt="ff-stop-icon"
        />
      </div>
    </div>
  );
};

export default Player;
