import styles from "./styles.module.scss";
import Link from "next/link";
import { pages } from "@/shared/data";
import { type GetArticlesResponseData } from "@/shared/types";
import { type FC } from "react";

interface ArticleCardProps {
  article: GetArticlesResponseData[number];
}

export const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  const imageSrc = article.educationMaterials?.[0]?.pictureLink || "";
  return (
    <Link
      href={pages.article.getLink({ params: { id: article.id } })}
      className={styles.card}
    >
      {imageSrc && (
        <div className={styles.imageContainer}>
          <img
            src={imageSrc}
            alt={article.theme}
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.title}>{article.theme}</div>
      <div className={styles.tags}>
        <div className={styles.tag}>{article.tags}</div>
      </div>
    </Link>
  );
};
