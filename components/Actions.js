import ViewSplitter from "./ViewSplitter";
import styles from "./Actions.module.css";

const Actions = () => {
  return (
    <ViewSplitter>
      <div>
        <h1>Past, now, future</h1>
        <h3>Activity</h3>
      </div>
      <div>
        <h1>Select an action to get cues</h1>
      </div>
    </ViewSplitter>
  );
};

export default Actions;
