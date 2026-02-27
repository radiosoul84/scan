import styles from "./banners.module.css";
import { banners } from "../../helpers/config";
import { useState, useEffect } from "react";

export default function Banners() {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [displayedItems, setDisplayedItems] = useState<number>(3);
  const totalBannersItems = banners.length;

  const displayedBannersItems = [
    ...banners.slice(startIndex, startIndex + displayedItems),
    ...banners.slice(
      0,
      Math.max(0, startIndex + displayedItems - totalBannersItems)
    ),
  ];

  const handleNext = () =>
    setStartIndex((prevIndex) => (prevIndex + 1) % totalBannersItems);
  const handlePrev = () =>
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + totalBannersItems) % totalBannersItems
    );

  const handleBannersResize = () => {
    const innerWidth = window.innerWidth;
    if (innerWidth <= 745) {
      setDisplayedItems(1);
    } else if (innerWidth <= 1350) {
      setDisplayedItems(2);
    } else {
      setDisplayedItems(3);
    }
  };

  useEffect(() => {
    handleBannersResize();

    window.addEventListener("resize", handleBannersResize);

    return () => {
      window.removeEventListener("resize", handleBannersResize);
    };
  }, []);

  return (
    <section className={styles.banners}>
      <h2 className={styles.heading}>почему именно мы</h2>
      <div className={styles.container}>
        <button
          className={`${styles.button} ${styles.buttonPrev}`}
          onClick={handlePrev}
        ></button>
        {displayedBannersItems.map((item, index) => {
          return (
            <div key={index} className={styles.item}>
              <img className={styles.image} src={item.img} alt={item.alt} />
              <p className={styles.text}>{item.text}</p>
            </div>
          );
        })}
        <button
          className={`${styles.button} ${styles.buttonNext}`}
          onClick={handleNext}
        ></button>
      </div>
    </section>
  );
}
