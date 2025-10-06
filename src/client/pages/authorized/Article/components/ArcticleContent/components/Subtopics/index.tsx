"use client";

import { Card } from "./components";
import styles from "./styles.module.scss";
import { type GetArticleResponseData } from "@/shared/types";
import { type FC } from "react";

interface Props {
  subtopics: GetArticleResponseData["subtopics"];
}

export const Subtopics: FC<Props> = ({ subtopics }) => {
  return (
    <div className={styles.content}>
      {subtopics.map((subtopic) => (
        <div key={subtopic.subtitle}>
          <p className={styles.subtitle}>{subtopic.subtitle}</p>
          {subtopic.cards.map((card) => (
            <Card
              key={card.id}
              card={card}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
