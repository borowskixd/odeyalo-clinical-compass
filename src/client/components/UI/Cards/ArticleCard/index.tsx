import styles from "./styles.module.scss";
import Link from "next/link";
import { pages } from "@/shared/data";
import { type GetArticlesResponseData } from "@/shared/types";
import { type FC } from "react";

interface ArticleCardProps {
  article: GetArticlesResponseData[number];
}

export const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link href={pages.article.getLink({ params: { id: article.id } })}>
      <div className={styles.articleCard}>
        <div
          className={styles.imageContainer}
          style={{ backgroundImage: `url("${article.image}")` }}
        >
          <div className={styles.articleTags}>
            <div className={styles.articleTag}>
              {article.fullProgress} минут
            </div>
          </div>
        </div>
        <div className={styles.articleTitle}>{article.title}</div>
      </div>
    </Link>
  );
};
