import styles from "./mainPage.module.css";
import { Link } from "react-router-dom";
import Banners from "../banners/banners";
import TarifBanners from "../TarifBanners/TarifBanners";
import { useAppSelector } from "../../helpers/hooks";

export default function MainPage() {
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

  return (
    <>
      <section className={styles.intro}>
        <div className={styles.container}>
          <h1 className={styles.heading}>
            сервис по поиску
            <span> публикаций</span>
            <span>о компании </span>
            <span>по её ИНН</span>
          </h1>
          <p className={styles.text}>
            Комплексный анализ публикаций, получение данных в формате PDF на
            электронную почту.
          </p>
          {isAuthorized && (
            <Link className={styles.link} to={"/search"}>
              Запросить данные
            </Link>
          )}
        </div>
        <img
          className={styles.image}
          src="./mainpage_image1.png"
          alt="illustration"
        />
      </section>
      <Banners />
      <div className={styles.divider}>
        <img
          className={styles.dividerImage}
          src="./mainpage_image2.png"
          alt="illustration"
        />
      </div>
      <TarifBanners />
    </>
  );
}
