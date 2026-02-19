"use client";

import Link from "next/link";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { pages } from "@/shared/data";

interface Props {
  recommendation: {
    id: string;
    theme: string;
    linkToPicture: string;
    tags: string[];
  };
}

export const RecommendationCard: FC<Props> = ({ recommendation }) => {
  return (
    <Link href={pages.article.getLink({ params: { id: recommendation.id } })}>
      <div className={styles.imageContainer}>
        {recommendation.linkToPicture && (
          <img
            src={recommendation.linkToPicture}
            className={styles.image}
          />
        )}
      </div>
      <p className={styles.title}>{recommendation.theme}</p>
      <div className={styles.tags}>
        {recommendation.tags.map((tag, index) => (
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
