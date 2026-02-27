import styles from "./loader.module.css";

export default function Loader() {
  return (
    <div className={styles.container}>
      <img className={styles.loader} src="./loader.svg" alt="loading..." />
      {<p className={styles.text}>Loading...</p>}
    </div>
  );
}
