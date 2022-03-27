import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["MP3", "WAV"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
}

export default DragDrop;
