import AboutItem from "../components/AboutItem";
import {about} from "../data/about";

import styles from "../styles/About.module.css";

const About = () => {
  return (
    <div>
      <h1 className={styles.title}>About the VoiceCue</h1>
      <h3 className={styles.subtitle}>Answers to frequently asked questions</h3>
      <div className={styles.grid}>
        {about.map((item, index)=>{
          return (
            <AboutItem key={index} question={item.question} answers={item.answers}/>
          )
        })}
      </div>
    </div>
  );
};

export default About;
