"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import { DefaultError, LoadingLoop } from "@/client/components";
import { useGetArticleByIdQuery } from "@/client/redux";
import { pages } from "@/shared/data";
import { type FC } from "react";

export const Recomendation: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: article, ...getArticleState } = useGetArticleByIdQuery(id);
  if (getArticleState.isLoading) return <LoadingLoop />;
  if (getArticleState.isError)
    return <DefaultError error={getArticleState.error} />;
  return (
    <div>
      <p className={styles.header}>Рекомендуем</p>
      <div className={styles.content}>
        {article?.recomendations.map((recomendation) => (
          <a
            key={recomendation.id}
            href={pages.article.getLink({ params: { id: recomendation.id } })}
            className={styles.card}
          >
            <div className={styles.imageContainer}>
              <img
                src={recomendation.linkToPicture}
                className={styles.image}
              />
            </div>
            <p className={styles.title}>{recomendation.theme}</p>
            <div className={styles.time}>{recomendation.maxScore} минут</div>
          </a>
        ))}
      </div>
    </div>
  );
};
