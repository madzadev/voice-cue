import { TagCloud } from "react-tagcloud";
import { useState } from "react";

function SimpleCloud({ data }) {
  const [activeTag, setActiveTag] = useState();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <TagCloud
        minSize={12}
        maxSize={35}
        tags={data}
        onClick={(tag) => {
          console.log(
            `'${tag.value}' was selected! Occurred ${tag.count} times`
          );
          setActiveTag(tag);
        }}
      />
      <div>
        {activeTag ? (
          <>
            <h1>Selected word: {activeTag.value}</h1>
            <h3>Occurred {activeTag.count} times</h3>
          </>
        ) : (
          <h1>Select a tag to get analysis</h1>
        )}
      </div>
    </div>
  );
}

export default SimpleCloud;
