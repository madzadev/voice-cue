import WordInText from "./WordInText";

import { transcription } from "../data/transcription";

const Overview = () => {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}
    >
      <div>
        <p>File title: My test speech</p>
        <p>Total words: 234</p>
        <p>Length: 2min 34sec</p>
        <p>Speakers: 2</p>
        <p>Overall sentiment: +4</p>
        <p>Total words: 234</p>
        <p>Total words: 234</p>
      </div>
      <div>
        {transcription.words.map((el, index) => {
          return (
            <WordInText
              key={index}
              word={el.word}
              onClick={() => {
                console.log(`Jump to ${el.start}`);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Overview;
