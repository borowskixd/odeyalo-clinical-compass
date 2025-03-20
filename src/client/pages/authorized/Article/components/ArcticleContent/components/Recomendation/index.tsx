"use client";

import { RecomendationCard } from "./components";
import styles from "./styles.module.scss";
import { type GetArticleResponseData } from "@/shared/types";
import { type FC } from "react";

interface Props {
  article: GetArticleResponseData;
}

export const Recomendation: FC<Props> = ({ article }) => {
  return (
    <div>
      <p className={styles.header}>Рекомендуем</p>
      <div className={styles.content}>
        {article.recomendations.map((recomendation) => (
          <RecomendationCard
            key={recomendation.id}
            recomendation={recomendation}
          />
        ))}
      </div>
    </div>
  );
};
