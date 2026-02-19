"use client";

import { type FC } from "react";
import { RecommendationCard } from "./components";
import styles from "./styles.module.scss";
import { type GetArticleResponseData } from "@/shared/types";

interface Props {
  recommendations: GetArticleResponseData["recommendations"];
}

export const Recommendation: FC<Props> = ({ recommendations }) => {
  return (
    <div>
      <p className={styles.header}>Рекомендуем</p>
      <div className={styles.content}>
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </div>
    </div>
  );
};
