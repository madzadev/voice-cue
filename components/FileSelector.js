import { useState, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";
import styles from "./FileSelector.module.css";

const fileTypes = ["MP3", "WAV"];

function DragDrop({ setAudio }) {
  // const [file, setFile] = useState(null);
  const file = useRef(null);

  const handleChange = (file) => {
    setAudio(file);
  };
  return (
    <div className={styles.wrapper}>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    </div>
  );
}

export default DragDrop;
