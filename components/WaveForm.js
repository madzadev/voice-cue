import Wavesurfer from "wavesurfer.js";
import { useState, useEffect, useRef } from "react";

import styles from "./WaveForm.module.css";

const WaveForm = ({ url, setGlobalWaveForm, setTime }) => {
  const waveform = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if wavesurfer object is already created.
    if (waveform.current) {
      waveform.current.destroy();
      waveform.current = null;
    }

    if (!waveform.current) {
      // Create a wavesurfer object
      // More info about options here https://wavesurfer-js.org/docs/options.html

      waveform.current = Wavesurfer.create({
        container: "#waveform",
        waveColor: "white",
        progressColor: "#0d76ff",
        barGap: 2,
        barWidth: 3,
        barRadius: 3,
        height: 150,
        cursorWidth: 3,
        cursorColor: "tomato",
      });
      // Load audio from a remote url.
      if (typeof url == "string") {
        waveform.current.load(url);
      } else {
        waveform.current.loadBlob(url);
      }

      waveform.current.on("loading", function () {
        setLoading(true);
      });

      waveform.current.on("ready", function () {
        setLoading(false);
      });

      waveform.current.on("interaction", function () {});

      /* To load a local audio file
		    1. Read the audio file as a array buffer.
			2. Create a blob from the array buffer
			3. Load the audio using wavesurfer's loadBlob API
	 */
      setGlobalWaveForm(waveform);
    }
  }, [url]);

  return (
    <>
      <div id="waveform" className={styles.waveform} />
      {loading && <h1>Loading...</h1>}
    </>
  );
};

export default WaveForm;
