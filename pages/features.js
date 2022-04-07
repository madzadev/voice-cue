import FeatureItem from "../components/FeatureItem";
import {features} from "../data/features";

import styles from "../styles/Features.module.css";

const Features = () => {
  return (
    <div>
      <h1 className={styles.title}>The features of VoiceCue</h1>
      <h3 className={styles.subtitle}>Explore the power and all the good bits</h3>
      <div className={styles.grid}>
        {features.map((item, index)=>{
        return (
          <FeatureItem key={index} title={item.title} description={item.description}/>
        )
        })}
      </div>
    </div>
  );
};

export default Features;
