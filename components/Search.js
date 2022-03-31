import ViewSplitter from "./ViewSplitter";
import styles from "./Search.module.css";

const Search = () => {
  return (
    <ViewSplitter>
      <div>
        <h1>Search</h1>
      </div>
      <div>
        <h1>Type at least 3 chars to get cues</h1>
      </div>
    </ViewSplitter>
  );
};

export default Search;
