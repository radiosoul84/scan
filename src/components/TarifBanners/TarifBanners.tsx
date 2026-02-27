import styles from "./TarifBanners.module.css";
import { tarifBanners } from "../../helpers/config";
import clsx from "clsx";
import { useState, useEffect } from "react";

export default function TarifBanners() {
  const [activeTariff, setActiveTariff] = useState<string | undefined | null>(
    null
  );

  useEffect(() => {
    setActiveTariff("Business");
  }, []);

  return (
    <section className={styles.tariffs}>
      <h2 className={styles.heading}>наши тарифы</h2>
      <div className={styles.container}>
        {tarifBanners.map((banner, index) => {
          const isActive = activeTariff === banner.name;
          return (
            <article
              className={clsx(
                styles.item,
                { [styles.blackBorder]: isActive && banner.color === "black" },
                { [styles.blueBorder]: isActive && banner.color === "blue" },
                { [styles.orangeBorder]: isActive && banner.color === "orange" }
              )}
              key={index}
            >
              <div
                className={clsx(
                  styles.itemTitleContainer,
                  { [styles.blueBackground]: banner.color === "blue" },
                  { [styles.blackBackground]: banner.color === "black" },
                  { [styles.orangeBackground]: banner.color === "orange" }
                )}
              >
                <div
                  className={clsx(styles.itemTitle, {
                    [styles.whiteText]: banner.color === "black",
                  })}
                >
                  <h3 className={styles.title}>{banner.name}</h3>
                  <p className={styles.text}>{banner.description}</p>
                </div>
                <img
                  className={styles.icon}
                  src={banner.icon}
                  alt="tariff icon"
                />
              </div>

              <div className={styles.infoContainer}>
                {isActive && (
                  <p className={styles.currentTariff}>Текущий тариф</p>
                )}
                <div className={styles.priceContainer}>
                  <p className={styles.currentPrice}>
                    {banner.currentPrice} &#x20bd;{" "}
                    <span className={styles.prevPrice}>
                      {banner.oldPrice} &#x20bd;
                    </span>
                  </p>
                  <p className={styles.text}>{banner.discountDescription}</p>
                </div>
                <div className={styles.descriptionContainer}>
                  <h3 className={styles.descriptionHeading}>В тариф входит:</h3>
                  <ul className={styles.descriptionList}>
                    {banner.included.map((item, index) => {
                      return (
                        <li
                          className={`${styles.text} ${styles.listItem}`}
                          key={index}
                        >
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <button className={styles.button} disabled={isActive}>
                {isActive ? "Перейти в личный кабинет" : "Подробнее"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
