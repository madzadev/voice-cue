import styles from "./FeatureItem.module.css";

const FeatureItem = ({title, description}) =>{
    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </div>
    )
}

export default FeatureItem;