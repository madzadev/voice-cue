import styles from "./AboutItem.module.css";

const AboutItem = ({ question, answers }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.question}>{question}</h3>
      {answers.map((item, index) => {
        return (
          <p key={index} className={styles.answer}>
            {item}
          </p>
        );
      })}
    </div>
  );
};

export default AboutItem;
