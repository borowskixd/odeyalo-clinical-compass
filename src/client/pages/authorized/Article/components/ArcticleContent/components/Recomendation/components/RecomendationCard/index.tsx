"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import { pages } from "@/shared/data";
import { type FC } from "react";

interface Props {
  recomendation: {
    id: string;
    theme: string;
    linkToPicture: string;
    maxScore: number;
  };
}

export const RecomendationCard: FC<Props> = ({ recomendation }) => {
  return (
    <Link href={pages.article.getLink({ params: { id: recomendation.id } })}>
      <div className={styles.imageContainer}>
        {recomendation.linkToPicture && (
          <img
            src={recomendation.linkToPicture}
            className={styles.image}
          />
        )}
      </div>
      <p className={styles.title}>{recomendation.theme}</p>
      <div className={styles.time}>{recomendation.maxScore} минут</div>
    </Link>
  );
};
