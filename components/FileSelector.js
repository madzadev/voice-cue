import { useState, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["MP3", "WAV"];

function DragDrop({ setAudio }) {
  // const [file, setFile] = useState(null);
  const file = useRef(null);

  const handleChange = (file) => {
    setAudio(file);
  };
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
}

export default DragDrop;
