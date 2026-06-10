import Link from "next/link";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { pages } from "@/shared/data";
import { type GetArticlesResponseData } from "@/shared/types";

interface ArticleCardProps {
  article: GetArticlesResponseData[number];
}

export const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link
      href={pages.article.getLink({ params: { id: article.id } })}
      className={styles.card}
    >
      <div className={styles.imageContainer}>
        <img
          src={article.link}
          alt={article.theme}
          className={styles.image}
        />
      </div>
      <div className={styles.title}>{article.theme}</div>
      <div className={styles.tags}>
        {article.tags.map((tag, index) => (
          <div
            className={styles.tag}
            key={index}
          >
            {tag}
          </div>
        ))}
      </div>
    </Link>
  );
};
