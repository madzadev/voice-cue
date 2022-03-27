import { TagCloud } from "react-tagcloud";

function SimpleCloud({ data }) {
  return (
    <TagCloud
      minSize={12}
      maxSize={35}
      tags={data}
      onClick={(tag) => alert(`'${tag.value}' was selected!`)}
    />
  );
}

export default SimpleCloud;
