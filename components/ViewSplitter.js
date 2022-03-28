import styles from "./ViewSplitter.module.css";

const ViewSplitter = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default ViewSplitter;
