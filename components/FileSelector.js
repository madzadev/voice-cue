import { useState, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";
import styles from "./FileSelector.module.css";

const fileTypes = ["MP3", "WAV"];

function DragDrop({ setAudio }) {
  // const [file, setFile] = useState(null);
  const file = useRef(null);

  const handleChange = (file) => {
    setAudio(file);

    const formData = new FormData();
    formData.append("username", "Madza");
    formData.append("files", file);
    // console.log(file);

    fetch("api/deepgram", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(JSON.parse(result.body));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className={styles.wrapper}>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />

      {/* <form enctype="multipart/form-data" action="api/deepgram" method="POST">
        <label for="file-upload">Select file:</label>
        <input id="file-upload" type="file" name="file" />
        <input type="submit" value="POST to server"></input>
      </form> */}
    </div>
  );
}

export default DragDrop;
