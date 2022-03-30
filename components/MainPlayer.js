import PlayButton from "./PlayButton";
import styles from "./MainPlayer.module.css";

const MainPlayer = ({ globalWaveForm }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.time}>0:03/1:23</h1>
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
