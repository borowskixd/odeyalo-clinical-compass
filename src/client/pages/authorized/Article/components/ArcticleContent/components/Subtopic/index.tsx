"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import { useGetArticleByIdQuery } from "@/client/redux";
import { type FC } from "react";

export const Subtopic: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: article } = useGetArticleByIdQuery(id);
  return (
    <div className={styles.content}>
      {article?.subtopics.map((subtopic) => (
        <>
          <p className={styles.subtitle}>{subtopic.subtitle}</p>
          {subtopic.cards.map((card) => (
            <div key={card.id}>
              <div className={styles.textContainer}>
                <p className={styles.text}>{card.text}</p>
              </div>
              <div className={styles.imageContainer}>
                <img
                  src={card.linkToPicture}
                  className={styles.image}
                />
              </div>
            </div>
          ))}
        </>
      ))}
    </div>
  );
};
