import toHHMMSS from "../helpers/getMinuteFormat";

import styles from "./EntityItem.module.css";

const EntityItem = ({ color, index, time, onClick }) => {
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
        <h3>Appears at: {toHHMMSS(time)}</h3>
        <p>This is the text included</p>
      </div>
    </div>
  );
};

export default EntityItem;
