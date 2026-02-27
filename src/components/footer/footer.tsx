import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <img className={styles.image} src="./white_logo.png" alt="logo" />
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <p className={styles.text}>г. Москва, Цветной б-р, 40</p>
            <p className={styles.text}>+7 495 771 21 11</p>
            <p className={styles.text}>info@skan.ru</p>
          </div>
          <p className={styles.text}>Created by Radiosoul 2026</p>
        </div>
      </div>
    </footer>
  );
}
