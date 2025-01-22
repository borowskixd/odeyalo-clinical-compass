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
      <div className={styles.card}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url("${article.image}")` }}
        ></div>
        <div className={styles.title}>{article.title}</div>
        <div className={styles.tags}>
          <div className={styles.tag}>{article.fullProgress} минут</div>
        </div>
      </div>
    </Link>
  );
};
