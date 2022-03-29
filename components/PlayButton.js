import styles from "./PlayButton.module.css";

const PlayButton = ({ globalWaveForm }) => {
  const playAudio = () => {
    if (globalWaveForm.current.isPlaying()) {
      globalWaveForm.current.pause();
    } else {
      globalWaveForm.current.play();
    }
  };
  return (
    <button onClick={playAudio} className={styles.wrapper}>
      Play/Pause
    </button>
  );
};

export default PlayButton;
