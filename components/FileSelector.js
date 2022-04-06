import { useState, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";
import styles from "./FileSelector.module.css";

const fileTypes = ["MP3", "WAV"];

function DragDrop({ setAudio }) {
  // const [file, setFile] = useState(null);
  const file = useRef(null);

  const handleChange = (file) => {
    setAudio(file);

    const data = { username: "madza" };

    fetch("api/deepgram", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className={styles.wrapper}>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    </div>
  );
}

export default DragDrop;
