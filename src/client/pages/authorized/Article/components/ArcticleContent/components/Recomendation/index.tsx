"use client";

import { RecomendationCard } from "./components";
import styles from "./styles.module.scss";
<<<<<<< HEAD
import { type GetArticleResponseData } from "@/shared/types";
=======
import { useParams } from "next/navigation";
import { DefaultError, LoadingLoop } from "@/client/components";
import { useGetArticleByIdQuery } from "@/client/redux";
import { pages } from "@/shared/data";
>>>>>>> main
import { type FC } from "react";

interface Props {
  recomendations: GetArticleResponseData["recomendations"];
}

export const Recomendation: FC<Props> = ({ recomendations }) => {
  return (
    <div>
      <p className={styles.header}>Рекомендуем</p>
      <div className={styles.content}>
<<<<<<< HEAD
        {recomendations.map((recomendation) => (
          <RecomendationCard
            key={recomendation.id}
            recomendation={recomendation}
          />
=======
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
>>>>>>> main
        ))}
      </div>
    </div>
  );
};
