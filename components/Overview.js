import { useEffect } from "react";
import WordInText from "./WordInText";
import ViewSplitter from "../components/ViewSplitter";

import { transcription } from "../data/transcription";

const Overview = ({ globalWaveForm }) => {
  // useEffect(() => {
  //   globalWaveForm.on("audioprocess", function () {
  //     console.log(globalWaveForm.current.getCurrentTime());
  //   });
  // }, []);

  return (
    <ViewSplitter>
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          <h3>Total words: {transcription.words.length}</h3>
          <h3>Length: 2min 34sec</h3>
          <h3>Speakers: 2</h3>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          <p>Overall sentiment: +4</p>
          <p>Total words: 234</p>
          <p>Total words: 234</p>
        </div>
      </div>
      <div>
        {transcription.words.map((el, index) => {
          return (
            <WordInText
              key={index}
              word={el.word}
              onClick={() => {
                // console.log(`Jump to ${el.start}`);
                globalWaveForm.current.skip(
                  el.start - globalWaveForm.current.getCurrentTime()
                );
              }}
            />
          );
        })}
      </div>
    </ViewSplitter>
  );
};

export default Overview;
