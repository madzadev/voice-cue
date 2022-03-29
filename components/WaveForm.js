import Wavesurfer from "wavesurfer.js";
import { useEffect, useRef } from "react";

import styles from "./WaveForm.module.css";

const WaveForm = ({ url, setGlobalWaveForm }) => {
  const waveform = useRef(null);

  useEffect(() => {
    // Check if wavesurfer object is already created.
    if (!waveform.current) {
      // Create a wavesurfer object
      // More info about options here https://wavesurfer-js.org/docs/options.html
      waveform.current = Wavesurfer.create({
        container: "#waveform",
        waveColor: "white",
        progressColor: "#567FFF",
        barGap: 2,
        barWidth: 3,
        barRadius: 3,
        height: 150,
        cursorWidth: 3,
        cursorColor: "#567FFF",
      });
      // Load audio from a remote url.
      waveform.current.load(url);

      /* To load a local audio file
		    1. Read the audio file as a array buffer.
			2. Create a blob from the array buffer
			3. Load the audio using wavesurfer's loadBlob API
	 */
      setGlobalWaveForm(waveform);
    }
  }, []);

  const playAudio = () => {
    // Check if the audio is already playing
    console.log(waveform.current);
    if (waveform.current.isPlaying()) {
      waveform.current.pause();
    } else {
      waveform.current.play();
    }
  };

  return (
    <>
      <div id="waveform" className={styles.waveform} />
      <button onClick={playAudio} className={styles.playButton}>
        Play/Pause
      </button>

      {/* <button
        onClick={() => {
          console.log(waveform.current.getCurrentTime());
        }}
      >
        Get current time
      </button>
      <button
        onClick={() => {
          waveform.current.skipForward(2);
        }}
      >
        2 sec forward
      </button> */}
    </>
  );
};

export default WaveForm;
