"use client";

import { Card } from "./components";
import styles from "./styles.module.scss";
import { type GetArticleResponseData } from "@/shared/types";
import { type FC } from "react";

interface Props {
  article: GetArticleResponseData;
}

export const Subtopics: FC<Props> = ({ article }) => {
  return (
    <div className={styles.content}>
      {article?.subtopics.map((subtopic) => (
        <>
          <p className={styles.subtitle}>{subtopic.subtitle}</p>
          {subtopic.cards.map((card) => (
            <Card
              key={card.id}
              card={card}
            />
          ))}
        </>
      ))}
    </div>
  );
};
