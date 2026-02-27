import styles from "./article.module.css";
import { Link } from "react-router-dom";
import {
  parseText,
  dateFormat,
  findImgInArticle,
  removeImages,
} from "../../helpers/utils";
import { ArticleProps } from "../../types/types";

export default function Article({ data }: ArticleProps) {
  const { attributes, date, source, text, title, url } = data;
  const parsedText = parseText(text);
  const foundImage = findImgInArticle(parsedText);
  const cleanText = removeImages(parsedText);
  return (
    <div className={styles.articlesListItem}>
      <div className={styles.articleInfoContainer}>
        <p className={styles.articleText}>{dateFormat(date)}</p>
        <a href="#" className={`${styles.articleText} ${styles.articleLink}`}>
          {source}
        </a>
      </div>
      <h3 className={styles.articleHeading}>{title}</h3>
      <div className={styles.articleTypeContainer}>
        {attributes.isDigest && <p className={styles.articleType}>Дайджест</p>}
        {attributes.isAnnouncement && (
          <p className={styles.articleType}>Анонс</p>
        )}
        {attributes.isTechNews && (
          <p className={styles.articleType}>Технические новости</p>
        )}
      </div>

      <div className={styles.articleImage}>
        {foundImage ? (
          <img src={foundImage} alt="article image" />
        ) : (
          <img src="./article_placeholder.png" alt="article image" />
        )}
      </div>
      <p
        className={`${styles.articleText} ${styles.articleDescription}`}
        dangerouslySetInnerHTML={{ __html: cleanText }}
      ></p>
      <div className={styles.articleButtonContainer}>
        <Link to={url} target="_blank" className={styles.articleButton}>
          Читать в источнике
        </Link>
        <p className={styles.articleText}>Слов: {`${attributes.wordCount}`}</p>
      </div>
    </div>
  );
}
