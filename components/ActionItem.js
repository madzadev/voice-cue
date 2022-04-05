import toHHMMSS from "../helpers/getMinuteFormat";

import styles from "./ActionItem.module.css";

const ActionItem = ({ action, word, color, index, time, onClick }) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <div>
        <h1
          style={{
            color: `${color}`,
          }}
        >
          #{index + 1}
        </h1>
      </div>
      <div>
        <h3>
          {action}: <span style={{ color: `${color}` }}>{word}</span> At:{" "}
          {toHHMMSS(time)}
        </h3>
        <p>This is the text included</p>
      </div>
    </div>
  );
};

export default ActionItem;
