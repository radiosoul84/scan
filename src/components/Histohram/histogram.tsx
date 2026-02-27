import styles from "./histogram.module.css";
import { useRef, useState, useEffect, useMemo } from "react";
import Article from "../article/article";
import { useAppSelector, useAppDispatch } from "../../helpers/hooks";
import { dateFormat } from "../../helpers/utils";
import Loader from "../loader/loader";
import {
  fetchArticles,
  fetchDocumentsIds,
  fetchOverviewData,
  resetData,
} from "../../redux/dataSlice";
import { useLocation } from "react-router-dom";

export default function Histogram() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollableToPrev, setscrollableToPrev] = useState<boolean>(false);
  const [scrollableToNext, setscrollableToNext] = useState<boolean>(true);
  const [scrollAmount, setScrollAmount] = useState<number>(266);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isButtonDisplayed, setIsButtonDisplayed] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const overviewData = useAppSelector((state) => state.data.overviewData);
  const { overviewIsLoading, idsAreLoading, articlesAreLoading } =
    useAppSelector((state) => state.data);
  const iDsList = useAppSelector((state) => state.data.ids);
  const articles = useAppSelector((state) => state.data.articles);
  const location = useLocation();
  const { data } = location.state;
  const variantsSum = useMemo(() => {
    return overviewData.reduce((acc, item) => acc + item["documentsCount"], 0);
  }, [overviewData]);

  useEffect(() => {
    dispatch(resetData());
    Promise.all([
      dispatch(fetchOverviewData(data)),
      dispatch(fetchDocumentsIds(data)),
    ]).catch((error) => {
      console.log("Ошибка получения данных: ", error);
    });
  }, [dispatch, data]);

  useEffect(() => {
    if (!idsAreLoading && !overviewIsLoading && iDsList.length > 0) {
      if (iDsList.length <= 10) {
        dispatch(fetchArticles({ ids: iDsList }));
        setIsButtonDisplayed(false);
      }
      if (iDsList.length > 10) {
        dispatch(fetchArticles({ ids: iDsList.slice(0, 10) }));
        setCurrentIndex(10);
      }
    }
  }, [dispatch, iDsList, idsAreLoading, overviewIsLoading]);

  const handleLoadMore = () => {
    if (articlesAreLoading) return;

    const updatedIndex = currentIndex + 10;
    const updatedList = iDsList.slice(currentIndex, updatedIndex);

    if (updatedList.length === 0) {
      setIsButtonDisplayed(false);
      return;
    }

    dispatch(fetchArticles({ ids: updatedList }));
    setCurrentIndex(updatedIndex);

    if (updatedList.length < 10) setIsButtonDisplayed(false);
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setscrollableToPrev(scrollLeft > 0);
      setscrollableToNext(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const handleSliderScrollResize = () => {
    const innerWidth = window.innerWidth;
    if (innerWidth <= 745) {
      setScrollAmount(298);
    } else {
      setScrollAmount(266);
    }
    handleScroll();
  };

  useEffect(() => {
    handleSliderScrollResize();

    window.addEventListener("resize", handleSliderScrollResize);

    return () => {
      window.removeEventListener("resize", handleSliderScrollResize);
    };
  }, []);

  useEffect(() => {
    handleScroll();

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (slider) {
        slider.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.headingContainer}>
        <div className={styles.headingTextWrapper}>
          <h2 className={styles.heading}>Ищем. Скоро будут результаты</h2>
          <p className={styles.text}>
            Поиск может занять некоторое время, просим сохранять терпение.
          </p>
        </div>
        <img
          className={styles.image}
          src="./searshing_img.png"
          alt="result image"
        />
      </div>

      <article className={styles.infoContainer}>
        <h3 className={styles.infoHeading}>Общая сводка</h3>
        <p className={styles.infoText}>Найдено вариантов: {`${variantsSum}`}</p>
        <div className={styles.sliderContainer}>
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={scrollPrev}
            disabled={!scrollableToPrev}
          ></button>
          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={scrollNext}
            disabled={!scrollableToNext}
          ></button>
          <div className={styles.sliderTitleContainer}>
            <h3 className={styles.sliderTitle}>Период</h3>
            <h3 className={styles.sliderTitle}>Всего</h3>
            <h3 className={styles.sliderTitle}>Риски</h3>
          </div>
          <div className={styles.slider} ref={sliderRef}>
            {overviewIsLoading ? (
              <Loader />
            ) : !overviewData || overviewData.length === 0 ? (
              <p className={styles.resultText}>Нет данных</p>
            ) : (
              overviewData.map((item, index) => {
                return (
                  <div className={styles.resultItem} key={index}>
                    <p className={styles.resultText}>{dateFormat(item.date)}</p>
                    <p className={styles.resultText}>{item.documentsCount}</p>
                    <p className={styles.resultText}>{item.riskCount}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </article>

      <article className={styles.documentsListContainer}>
        <h2 className={styles.documentsListHeading}>Список документов</h2>
        <ul className={styles.documentsList}>
          {articles.map((item, index) => {
            return (
              <li key={index}>
                <Article data={item} />
              </li>
            );
          })}
        </ul>
        {articlesAreLoading && <Loader />}
        {isButtonDisplayed && (
          <button className={styles.button} onClick={handleLoadMore}>
            Показать ещё
          </button>
        )}
      </article>
    </section>
  );
}
