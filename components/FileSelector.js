import { useState, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";
import styles from "./FileSelector.module.css";

const fileTypes = ["MP3", "WAV"];

function DragDrop({ setAudio, setDGTranscript }) {
  const [loading, setLoading] = useState(false);
  const file = useRef(null);

  const handleChange = (file) => {
    setLoading(true);
    setAudio(file);

    async function audioToBase64(audioFile) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(audioFile);
      });
    }

    async function fetchCall() {
      let audio64;
      await audioToBase64(file).then((result) => (audio64 = result));
      await fetch("api/deepgram", {
        method: "POST",
        body: audio64,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(JSON.parse(result.body));
          setDGTranscript(JSON.parse(result.body).channels[0].alternatives[0]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    fetchCall();
  };
  return (
    <div className={styles.wrapper}>
      {loading ? (
        <h2>Loading transcript...</h2>
      ) : (
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      )}
    </div>
  );
}

export default DragDrop;
